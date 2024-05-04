<script setup lang="ts">
import { reqAddOrUpdateRole, reqAllRolesList, reqPermissionRole } from '@/api/acl/role';
import type { PermissionMenuData, PermissionMenuResponseData, RoleData, RoleResponseData } from '@/api/acl/role/type';
import useLayoutSettingStore from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
import { ref, onMounted, reactive, nextTick } from 'vue'

onMounted(() => {
    getRoles()
})

const currentPage = ref(0)
const limit = ref(10)
const total = ref(0)
const keyword = ref('')// 搜索关键词

const roleList = ref<RoleData[]>([])

// 获取所有角色列表
const getRoles = async (pager = 1) => {
    currentPage.value = pager

    const res: RoleResponseData = await reqAllRolesList(currentPage.value, limit.value, keyword.value)

    if (res.code === 200) {
        roleList.value = res.data.records
        total.value = res.data.total
    }
}

// 分页数据变化
const handleSizeChange = () => {
    getRoles()
}

// 搜索功能
const search = () => {
    getRoles()
    keyword.value = ''
}

const layoutSettingStore = useLayoutSettingStore()
// 重置功能
const reset = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh// 进行刷新
}

const dialogVisible = ref(false)
const roleParams = reactive<RoleData>({ roleName: '' })

// 添加职位
const addRole = () => {
    Object.assign(roleParams, { roleName: '', id: '' })// 重置表单

    nextTick(() => {
        form.value.clearValidate('roleName')// 重置表单校验规则
    })
    dialogVisible.value = true
}

// 修改职位
const editRole = (row: RoleData) => {
    Object.assign(roleParams, row)// 初始化表单
    nextTick(() => {
        form.value.clearValidate('roleName')// 重置表单校验规则
    })
    dialogVisible.value = true
}

// 表单校验规则
const rules = {
    roleName: [
        { required: true, message: '请输入职位名称', trigger: 'blur' },
        { min: 2, message: '职位名称至少为2位', trigger: 'blur' }
    ]
}

const form = ref()// 表单

const save = async () => {
    await form.value.validate()// 表单校验
    const res = await reqAddOrUpdateRole(roleParams)

    if (res.code === 200) {
        ElMessage({ type: 'success', message: `${roleParams.id ? '修改' : '添加'}'成功'` })
        getRoles(roleParams.id ? currentPage.value : 1)// pull data
        dialogVisible.value = false
    }
}

// 权限分配抽屉
const drawer = ref(false)
// 权限分配树形控件
const roleTreeData = ref<PermissionMenuData[]>([])
// 属性控制配置选线
// label: 指定节点标签为节点对象的某个属性值, children: 指定子树为节点对象的某个属性值
const defaultProps = { children: 'children', label: 'name' }
// 权限分配
const roleAllocation = async (row: RoleData) => {
    drawer.value = true
    Object.assign(roleParams, row)
    // 获取当前职位的权限菜单
    const res: PermissionMenuResponseData = await reqPermissionRole(row.id as number)

    if (res.code === 200) {
        roleTreeData.value = res.data
    }
}

</script>

<template>
    <el-card>
        <el-form class="form">
            <el-form-item label="职位搜索">
                <el-input v-model="keyword" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" :disabled="!keyword" type="primary">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-divider border-style="dashed" />

    <el-card>
        <el-row>
            <el-button @click="addRole" type="primary" icon="Plus" style="margin-bottom: 16px;">添加职位</el-button>
        </el-row>
        <el-table :data="roleList" border stripe>
            <el-table-column type="index" label="#" align="center"></el-table-column>
            <el-table-column prop="id" label="ID" align="center" width="150px"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{ row }">
                    <el-button @click="roleAllocation(row)" type="primary">分配权限</el-button>
                    <el-button @click="editRole(row)" title="编辑" type="warning" icon="Edit"></el-button>
                    <el-button title="删除" type="danger" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-divider border-style="dashed" />

        <!-- 分页器 -->
        <el-pagination @current-change="getRoles" @size-change="handleSizeChange" v-model:current-page="currentPage"
            v-model:page-size="limit" :page-sizes="[10, 20, 30, 40]" background
            layout="prev, pager, next, ->, sizes, total" :total="total" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="`${roleParams.id ? '修改' : '添加'}职位`" width="30%">
        <el-form ref="form" :model="roleParams" :rules="rules">
            <el-form-item prop="roleName" label="职位名称">
                <el-input v-model="roleParams.roleName" placeholder="请输入..."></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button @click="save" type="primary">确定</el-button>
        </template>
    </el-dialog>

    <el-drawer v-model="drawer" title="权限分配 && 操作按钮分配">
        <template #default>
            <el-tree :data="roleTreeData" :props="defaultProps" show-checkbox node-key="id" default-expand-all />
        </template>
        <template #footer>
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary">确定</el-button>
        </template>
    </el-drawer>
</template>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>