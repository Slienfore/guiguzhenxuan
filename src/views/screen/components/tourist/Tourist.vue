<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'// 引入水球图

const people = ref('216908')

// 挂载节点实例
const chartsDom = ref()

onMounted(() => {
    // 初始化 - 获取 echarts 实例对象
    const charts = echarts.init(chartsDom.value)

    const option = {
        title: {
            text: '水球图'
        },
        series: {
            type: 'liquidFill',
            data: [0.6, 0.4, 0.2],
            radius: '80%'
        },
        grid: {
            left: 0, right: 0, top: 0, bottom: 0
        }
    }

    // 配置配置项
    charts.setOption(option)
})

</script>

<template>
    <div class="container">
        <div class="top">
            <p class="title">实时游客统计</p>
            <span class="bg"></span>
            <p class="right">可预约总量<span>1080</span>人</p>
        </div>
        <div class="number">
            <!-- 遍历字符串 -->
            <span v-for="item in people">{{ item }}</span>
            <span>人</span>
        </div>

        <!-- Echarts - 水球图 -->
        <div ref="chartsDom" class="charts">

        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        margin-left: 20px;

        .title {
            color: #ffffff;
            font-size: 20px;
            margin-left: 20px;
        }

        .bg {
            margin: 15px 0 0 20px;
            display: inline-block;
            width: 100px;
            height: 15px;
            background: url('../../images/dataScreen-title.png');
            background-size: 100% 100%;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;
            transform: translateX(-25%);

            span {
                color: aquamarine;
            }
        }
    }

    .number {
        padding: 10px;
        margin-top: 30px;
        display: flex;

        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url('../../images/total.png') no-repeat;
            background-size: 100% 100%;
            color: #15e8ff;
            border-radius: 8px;
            margin: 0 2px;
        }
    }

    .charts {
        width: 100%;
        height: 250px;
    }
}
</style>