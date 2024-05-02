<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(0)
const limit = ref(10)
const total = ref(0)

// 获取所有角色列表
const getRoles = (pager = 1) => {
    currentPage.value = pager
}

// 分页数据变化
const handleSizeChange = () => {
    getRoles()
}
</script>

<template>
    <el-card>
        <el-form class="form">
            <el-form-item label="职位搜索">
                <el-input></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-divider border-style="dashed" />

    <el-card>
        <el-row>
            <el-button type="primary" icon="Plus">添加角色</el-button>
        </el-row>
        <el-table border>
            <el-table-column type="index" label="#" align="center"></el-table-column>
            <el-table-column label="ID" align="center" width="150px"></el-table-column>
            <el-table-column label="角色名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{ row }">
                    <el-button type="primary">分配权限</el-button>
                    <el-button title="编辑" type="warning" icon="Edit"></el-button>
                    <el-button title="删除" type="danger" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-divider border-style="dashed" />

        <!-- 分页器 -->
        <el-pagination @current-change="getRoles" @size-change="handleSizeChange" v-model:current-page="currentPage"
            v-model:page-size="limit" :page-sizes="[10, 20, 30, 40]" background layout="prev, pager, next, ->, sizes, total"
            :total="total" />
    </el-card>
</template>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>