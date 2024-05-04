<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

const router = useRouter()

// 回到首页
const goHome = () => {
    router.push('/home')
}

// 使用 moment 获取时间
const time = ref(moment().format('HH:hh:ss  DD-MM-YYYY'))

const timer = ref<any>('')
onMounted(() => {// 动态更新时间
    timer.value = setInterval(() => {
        time.value = moment().format('HH:hh:ss  DD-MM-YYYY')
    }, 1000)
})

onBeforeUnmount(() => {
    clearInterval(timer.value)// 组件销毁前, 清除定时器
})

</script>

<template>
    <div class="top">
        <div class="left">
            <span @click="goHome" class="left-btn">首页</span>
        </div>
        <div class="center">
            <span class="title">智慧旅游可视化大数据平台</span>
        </div>
        <div class="right">
            <span class="right-btn">首页</span>
            <span class="time">{{ time }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.top {
    height: 100%;
    width: 100%;
    display: flex;

    .left {
        flex: 1;
        background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
        background-size: cover;

        .left-btn {
            width: 150px;
            height: 40px;
            background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #15e8ff;
            font-size: 20px;
            float: right;
        }
    }

    .center {
        flex: 2;

        .title {
            display: inline-block;
            width: 100%;
            height: 74px;
            background: url('../../images/dataScreen-header-center-bg.png');
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #15e8ff;
            font-size: 30px;
        }
    }

    .right {
        flex: 1;
        background: url('../../images/dataScreen-header-right-bg.png') no-repeat;
        background-size: cover;
        text-align: center;

        .right-btn {
            width: 150px;
            height: 40px;
            background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #15e8ff;
            font-size: 20px;
            float: left;
        }

        .time {
            text-align: center;
            line-height: 40px;
            color: #15e8ff;
            font-size: 15px;
            letter-spacing: 1.3px;
            font-family: 'JetBrains Mono ExtraBold';
        }
    }
}
</style>