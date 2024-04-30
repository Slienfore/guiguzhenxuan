<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SkuData, SkuResponseData } from '@/api/product/sku/type'
import { reqSkuList, reqOnSaleSku, reqUnSaleSku } from '@/api/product/sku';
import { ElMessage } from 'element-plus';

const currentPage = ref(1)
const limit = ref(5)
const total = ref(0)
const skuList = ref<Array<SkuData>>([])

onMounted(() => {
    getSku()
})

// 获取 SKU 数据
const getSku = async (pager = 1) => {
    currentPage.value = pager// 设置激活页码

    const res: SkuResponseData = await reqSkuList(currentPage.value, limit.value)

    if (res.code === 200) {
        total.value = res.data.total
        skuList.value = res.data.records
    }
}

// 分页器
// 页面展示数量变化
const handleSizeChange = (pager: number) => {// size-change 会将当前页码注入进来
    getSku()// 下拉菜单变化, 使用第 1 页
}

// 商品上架 | 下架
const skuOnOrUnSale = async (row: SkuData) => {
    let res: any
    if (row.isSale) {// 上架 -> 下架
        res = await reqUnSaleSku(row.id as number)
    } else { // 下架 -> 上架
        res = await reqOnSaleSku(row.id as number)
    }

    if (res.code === 200) {
        await getSku()
        ElMessage({ type: 'success', message: `${row.isSale ? '下架' : '上架'}成功` })
    } else {
        ElMessage({ type: 'error', message: `${row.isSale ? '下架' : '上架'}失败` })
    }
}

// 更新 sku -> 尚未开发
const updateSku = () => {
    ElMessage({ type: 'success', message: '开发中...' })
}

</script>

<template>
    <el-card>
        <el-table :data="skuList" border>
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column prop="skuName" label="名称" align="center" show-overflow-tooltip
                width="230px"></el-table-column>
            <el-table-column prop="skuDesc" label="描述" align="center" show-overflow-tooltip
                width="230px"></el-table-column>
            <el-table-column label="图片" align="center" width="180px">
                <template #="{ row }">
                    <el-image :src="row.skuDefaultImg" style="width: 100px; height: 100px;"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量" align="center" width="180px"></el-table-column>
            <el-table-column prop="price" label="价格" align="center" width="180px"></el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
                <template #="{ row }">
                    <el-button @click="skuOnOrUnSale(row)" :title="row.isSale ? '上架' : '下架'"
                        :type="row.isSale ? 'success' : 'primary'" :icon="row.isSale ? 'CaretTop' : 'CaretBottom'"
                        circle style="margin: 5px"></el-button>
                    <el-button @click="updateSku" title="编辑" type="warning" icon="Edit" circle
                        style="margin: 5px"></el-button>
                    <el-button title="查看" type="info" icon="View" circle style="margin: 5px"></el-button>
                    <el-button title="删除" type="danger" icon="Delete" circle style="margin: 5px"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-divider border-style="dashed" />

        <!-- 分页器 -->
        <el-pagination @current-change="getSku" @size-change="handleSizeChange" v-model:current-page="currentPage"
            v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" background layout="prev, pager, next, ->, sizes, total"
            :total="total" />
    </el-card>
</template>

<style scoped></style>