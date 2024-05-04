<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Top from './components/top/Top.vue'
// 数据大屏
const screen = ref()

onMounted(() => {
    // 使用 scale 进行缩放, 并且将 screen 位移自身 50%(居中)
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 监听视图窗口大小变化
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

// 数据大屏 缩放比例
const getScale = (w = 1920, h = 1080) => {// 设计稿默认值
    const ww = window.innerWidth / w
    const hh = window.innerHeight / h
    return Math.min(ww, hh)// 获取最小缩放比例
}

</script>

<template>
    <div class="screen-container">
        <!-- 数据大屏 -->
        <div class="screen" ref="screen">
            <!-- 顶部 -->
            <div class="top">
                <Top></Top>
            </div>
            <!-- 底部 -->
            <div class="bottom">
                <div class="left"></div>
                <div class="center"></div>
                <div class="right"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.screen-container {
    width: 100vw;
    height: 100vh;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top; // 位移起始点

        .top {
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;

            .left {
                flex: 1;


            }

            .center {
                flex: 2;
            }

            .right {
                flex: 1;
            }
        }
    }
}
</style>