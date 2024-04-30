<script setup lang="ts" name="Layout">
import Logo from './logo/Logo.vue'
import Menu from './menu/Menu.vue'
import Main from './main/Main.vue'
import Tabbar from './tabbar/Tabbar.vue'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import {useRoute} from 'vue-router'

const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()

// 配置菜单激活展开
const $route = useRoute()

</script>

<template>
  <div class="container">
    <!--侧边栏-->
    <div class="aside" :class="{fold: layoutSettingStore.fold ? true : false}">
      <!--Logo组件-->
      <Logo></Logo>
      <!--菜单组件-->
      <el-scrollbar class="scroll">
        <!--router 默认使用 index 值进行跳转-->
        <el-menu router :default-active="$route.path" :collapse="layoutSettingStore.fold"
                 background-color="#36363b" text-color="#ffffff" collapse-transition>
          <Menu :menu-list="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部菜单-->
    <div class="tabbar" :class="{fold: layoutSettingStore.fold ? true : false}">
      <Tabbar></Tabbar>
    </div>
    <!--主区域-->
    <div class="main" :class="{fold: layoutSettingStore.fold ? true : false}">
      <!--路由展示区域-->
      <Main></Main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;

  .aside {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: #fff;

    .scroll {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    // 添加折叠过度动画
    transition: all .3s;
    &.fold {// fold 折叠类
      width: $base-menu-min-width;
    }
  }

  .tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;

    // 添加折叠过度动画
    transition: all .3s;
    &.fold {// fold 折叠类
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;// 折叠之后需要进行重新定位
    }
  }

  .main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 16px;

    overflow: auto; // 盒子内出现滚动条

    // 添加折叠过度动画
    transition: all .3s;
    &.fold {// fold 折叠类
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;// 折叠之后需要进行重新定位
    }
  }
}
</style>