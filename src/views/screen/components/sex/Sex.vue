<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const charts = ref()
onMounted(() => {
    //初始化echarts实例
    const mycharts = echarts.init(charts.value)
    //设置配置项
    mycharts.setOption({
        //组件标题
        title: {
            text: '男女比例',
            textStyle: {
                color: 'skyblue'
            },
            left: '40%'
        },
        xAxis: {
            show: false,// 隐藏
            // x 轴的 最大值与最小值
            min: 0, max: 100
        },
        yAxis: {
            show: false,// 隐藏
            type: 'category'// y 轴均匀分布
        },
        series: [
            {
                type: 'bar',
                data: [58],
                barWidth: 20,
                z: 100,
                itemStyle: {
                    color: 'skyblue',
                    borderRadius: 20
                }
            }
            ,
            {
                type: 'bar',
                data: [100],// 女士为 100%, 那么男士的层级应该有限 z: 100， 男士覆盖女士
                barWidth: 20,
                //调整女士柱条位置
                barGap: '-100%',
                itemStyle: {
                    color: 'pink',
                    borderRadius: 20
                }
            }
        ],
        grid: {
            left: 0, top: 0, right: 0, bottom: 0
        }
    });
})
</script>

<template>
    <div class="box1">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png" alt="">
            </div>
            <div class="women">
                <img src="../../images/woman.png" alt="">
            </div>

        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref='charts'></div>
    </div>
</template>

<style scoped lang="scss">
.box1 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .sex {
        display: flex;
        justify-content: center;

        .man {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/man-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .women {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/woman-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }

    }

    .rate {
        display: flex;
        justify-content: space-between;
        color: white;
    }

    .charts {
        height: 100px;
    }
}
</style>