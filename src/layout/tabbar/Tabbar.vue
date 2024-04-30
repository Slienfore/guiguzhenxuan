<script setup lang="ts" name="Tabbar">
import BreadCrumb from './breadcrumb/BreadCrumb.vue'
import Setting from './setting/Setting.vue'

</script>

<template>
  <div class="tabbar-container">
    <div class="left">
      <!--面包屑-->
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="right">
      <Setting></Setting>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .right {
    display: flex;
    align-items: center;
  }

}
</style>