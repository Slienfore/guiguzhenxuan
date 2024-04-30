<script setup lang="ts" name="Setting">
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import {useRouter, useRoute} from 'vue-router'

const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
const router = useRouter()
const route = useRoute()

// 更新数据
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

// 全屏模式
const fullScreen = () => {
  const isFull = document.fullscreenElement

  if (!isFull) {// 没有全屏
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()// 退出全屏
  }
}

// 退出登录
const logout = async () => {
  await userStore.userLogout()// 退出登录
  router.push({name: 'login', query: {redirect: route.path}})// 退出登录时候, 携带历史路径, 避免误操作
}

</script>

<template>
  <el-button @click="updateRefresh" icon="Refresh" size="small" circle/>
  <el-button @click="fullScreen" icon="FullScreen" size="small" circle/>
  <el-button icon="Setting" size="small" circle/>
  <img :src="userStore.avatar" style="width: 25px; height: 25px; margin: 0 16px;" alt="头像"/>
  <!--下拉菜单-->
  <el-dropdown>
        <span>{{ userStore.username }}
          <el-icon><arrow-down/></el-icon>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>