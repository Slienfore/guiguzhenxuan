<script setup lang="ts" name="Menu">
import {defineProps} from 'vue'

defineProps(['menuList'])
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!--一级路由-->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path">
        <!--动态加载图标-->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--二级路由 && 子路由仅有一个-->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.path">
        <!--动态加载图标-->
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--二级路由 &&  子路由两个以上 => 折叠菜单-->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <!--动态加载图标-->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!--TODO 递归生成子菜单-->
      <Menu :menu-list="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<style scoped>

</style>