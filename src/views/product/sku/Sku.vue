<script setup lang="ts">
import { ref } from 'vue'
const limit = ref(3)
const total = ref(0)

// 获取 SKU 数据
const getSku = () => {

}

// 分页器
// 页面展示数量变化
const handleSizeChange = () => {

}

</script>

<template>
    <el-card>
        <el-table border>
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="名称" align="center" show-overflow-tooltip width="230px"></el-table-column>
            <el-table-column label="描述" align="center" show-overflow-tooltip width="230px"></el-table-column>
            <el-table-column label="图片" align="center" width="180px"></el-table-column>
            <el-table-column label="重量" align="center" width="180px"></el-table-column>
            <el-table-column label="价格" align="center" width="180px"></el-table-column>
            <el-table-column label="操作" fixed="right" align="center"></el-table-column>
        </el-table>
        
        <el-divider border-style="dashed"/>

        <!-- 分页器 -->
        <el-pagination @current-change="getSku" @size-change="handleSizeChange" v-model:current-page="currentPage"
                v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" background
                layout="prev, pager, next, ->, sizes, total" :total="total" />
    </el-card>
</template>

<style scoped></style>