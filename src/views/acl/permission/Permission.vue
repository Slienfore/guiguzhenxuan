<script setup lang="ts" name="Menu">
import { ref, onMounted, reactive } from 'vue'
import type { AddOrUpdatePermission, Permission, PermissionList, PermissionResponseData } from '@/api/acl/menu/type'
import { reqAddOrUpdatePermission, reqAllPermission, reqDeletePermission } from '@/api/acl/menu';
import { ElMessage } from 'element-plus';

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

const menuParams = reactive<AddOrUpdatePermission>({ code: '', level: 0, name: '', pid: 0 })
const dialogVisible = ref(false)
// 添加权限
const addPermission = (row: Permission) => {
    Object.assign(menuParams, { id: 0, code: '', level: 0, name: '', pid: 0 })// 重置
    menuParams.level = row.level + 1// 添加下一级菜单
    menuParams.pid = row.pid
    dialogVisible.value = true
}

// 编辑菜单
const updatePermission = (row: Permission) => {
    Object.assign(menuParams, row)
    dialogVisible.value = true
}

// 提交表单
const save = async () => {
    const res = await reqAddOrUpdatePermission(menuParams)

    if (res.code === 200) {
        ElMessage({ type: 'success', message: `${menuParams.id ? '更新' : '添加'}成功` })
        getPermission()
        dialogVisible.value = false
    }
}

// 删除菜单
const deletePermission = async (id: number) => {
    const res: any = await reqDeletePermission(id)

    if (res.code === 200) {
        getPermission()
        ElMessage({ type: 'success', message: '删除成功' })
    }
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
                <el-button @click="addPermission(row)" v-if="row.level !== 4" type="primary">{{ row.level === 3 ? '添加功能'
                    : '添加菜单' }}</el-button>
                <!-- 一级菜单不能够编辑 | 删除 -->
                <el-button @click="updatePermission(row)" v-if="row.level !== 1" type="warning" icon="Edit"></el-button>
                <el-popconfirm @confirm="deletePermission(row.id)" title="您确定删除该菜单?">
                    <template " #reference>
                        <el-button v-if="row.level !== 1" type="danger" icon="Delete"></el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="`${menuParams.id ? '更新' : '添加'}菜单`" width="30%">
        <template #default>
            <el-form label-position="top">
                <el-form-item label="名称">
                    <el-input v-model="menuParams.name" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-input v-model="menuParams.code" placeholder="请输入..."></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button @click="save" type="primary">确定</el-button>
        </template>
    </el-dialog>
</template>

<style scoped></style>