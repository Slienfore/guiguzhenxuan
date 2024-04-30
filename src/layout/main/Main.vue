<script setup lang="ts" name="Main">
import useLayoutSettingStore from '@/store/modules/setting'
import {nextTick, ref, watch} from 'vue'

const layoutSettingStore = useLayoutSettingStore()
const flag = ref(true)

watch(() => layoutSettingStore.refresh,// 监听刷新属性是否变化
    () => {
      flag.value = false// 通过 v-if 来控制组件销毁

      nextTick(() => {// DOM 树更新完成后调用
        flag.value = true
      })
    }
)

</script>

<template>
  <!--将需要显示的组件注入进来-->
  <router-view v-slot="{Component}">
    <!--过渡动画-->
    <transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all .25s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>