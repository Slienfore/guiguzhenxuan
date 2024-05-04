<script setup lang="ts" name="Menu">
import { ref, onMounted } from 'vue'
import type { Permission, PermissionList, PermissionResponseData } from '@/api/acl/menu/type'
import { reqAllPermission } from '@/api/acl/menu';

const permissionList = ref<PermissionList>([])
onMounted(() => {
    getPermission()
})

// 获取菜单数据
const getPermission = async () => {
    const res: PermissionResponseData = await reqAllPermission()

    if (res.code === 200) {
        permissionList.value = res.data
    }
}

const dialogVisible = ref(true)
// 添加权限
const addPermission = () => {
    dialogVisible.value = true
}

// 编辑菜单
const updatePermission = (row: Permission) => {
    dialogVisible.value = true

}
</script>

<template>
    <!-- row-key: 树形数据, 默认会遍历属性中的 children 属性 -->
    <el-table :data="permissionList" row-key="id" border stripe>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="code" label="权限值" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
            <template #="{ row }">
                <!-- 四级菜单为 功能, 一~三级菜单为 菜单 -->
                <!-- 四级菜单不能够添加 -->
                <el-button @click="addPermission" v-if="row.level !== 4" type="primary">{{ row.level === 3 ? '添加功能' : '添加菜单' }}</el-button>
                <!-- 一级菜单不能够编辑 | 删除 -->
                <el-button @click="updatePermission(row)" v-if="row.level !== 1" type="warning" icon="Edit"></el-button>
                <el-button v-if="row.level !== 1" type="danger" icon="Delete"></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="添加菜单" width="30%">
        <template #default>
            <el-form label-position="top">
                <el-form-item label="名称">
                    <el-input placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-input placeholder="请输入..."></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button>取消</el-button>
            <el-button type="primary">确定</el-button>
        </template>
    </el-dialog>
</template>

<style scoped></style>