<script setup lang="ts" name="Logo">
import setting from '@/setting'

const {title, logo} = setting
</script>

<template>
  <div class="logo-container">
    <img :src="logo" :alt="title">
    <p>{{ title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  width: 100%;
  height: $base-menu-logo-height;
  padding: 10px 16px 5px;
  display: flex;
  align-items: center;
  color: #fff;
  white-space: nowrap;// 宽度缩小时候不会换行

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 24px;
  }
}
</style>