<script setup lang="ts" name="BreadCrumb">
import useLayoutSettingStore from '@/store/modules/setting'
import {useRoute} from 'vue-router'

const layoutSettingStore = useLayoutSettingStore()

const route = useRoute()

const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}

</script>

<template>
  <!--展开图标-->
  <el-icon @click="changeIcon" style="margin-right: 10px;">
    <!--component 动态加载组件-->
    <component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>

  <!--面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index"
                        :to="item.path"
                        v-show="item.meta.title">
      <!--加载图标-->
      <el-icon style="vertical-align: top; margin-right: 5px">
        <component :is="item.meta.icon"></component>
      </el-icon>

      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>