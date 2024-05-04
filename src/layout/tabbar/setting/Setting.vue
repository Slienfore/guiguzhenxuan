<script setup lang="ts" name="Setting">
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

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
  router.push({ name: 'login', query: { redirect: route.path } })// 退出登录时候, 携带历史路径, 避免误操作
}

// 暗黑模式
const dark = ref(false)

// 暗黑模式变化
const darkModeChange = () => {
  const html = document.documentElement// html 节点
  dark.value ? html.className = 'dark' : html.className = ''// 追加暗黑模式
}

</script>

<template>
  <el-button @click="updateRefresh" icon="Refresh" size="small" circle />
  <el-button @click="fullScreen" icon="FullScreen" size="small" circle />
  <el-popover title="主题设置" width="250" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker size="small" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="darkModeChange" v-model="dark" size="small" inline-prompt inactive-icon="Sunrise"
          active-icon="Moon"></el-switch>
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" size="small" circle />
    </template>
  </el-popover>
  <img :src="userStore.avatar" style="width: 25px; height: 25px; margin: 0 16px;" alt="头像" />
  <!--下拉菜单-->
  <el-dropdown>
    <span>{{ userStore.username }}
      <el-icon><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>