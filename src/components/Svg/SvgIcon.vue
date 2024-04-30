<script setup lang="ts">
import {defineProps} from "vue"

//  接收父组件参数
defineProps({
  name: String,// 标签名称
  prefix: {// 标签前缀
    type: String, default: '#icon-'
  },
  color: {// 标签颜色
    type: String, default: ''
  },
  width: {
    type: String, default: '16px'
  },
  height: {
    type: String, default: '16px'
  }
})
</script>

<template>
  <svg :style="{width, height}">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped>

</style>