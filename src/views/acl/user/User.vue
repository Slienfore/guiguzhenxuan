<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { reqUserList, reqAddOrUpdateUser, reqGetUserRoles, reqAssignRole, reqDeleteUser, reqDeleteBatchUser } from '@/api/acl/user'
import { AllRoleResponseData, AssignRoleData, Records, RoleList, User, UserResponseData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus';

onMounted(() => {
  getUsers()
})

const userList = ref<Records>([])
const currentPage = ref(0)
const limit = ref(3)
const total = ref(0)

// 获取用户信息列表
const getUsers = async (pager = 1) => {
  currentPage.value = pager
  const res: UserResponseData = await reqUserList(currentPage.value, limit.value)
  console.log(res.data)
  if (res.code === 200) {
    total.value = res.data.total
    userList.value = res.data.records
  }
}

// 处理分页器显示数量
const handleSizeChange = () => {
  getUsers()
}

const userParams = reactive<User>({ username: '', name: '', password: '' })
const drawer = ref<boolean>(false)

// 添加用户
const addUser = () => {
  // 初次加载时候, 页面上还没有表单组件 -> nextTick
  nextTick(() => {// 重置表单校验规则
    form.value.clearValidate('username')
    form.value.clearValidate('name')
    form.value.clearValidate('password')
  })

  // 清空表单数据
  Object.assign(userParams, { username: '', name: '', password: '' })
  drawer.value = true
}

// 更新用户
const updateUser = (row: User) => {
  // 初次加载时候, 页面上还没有表单组件 -> nextTick
  nextTick(() => {// 重置表单校验规则
    form.value.clearValidate('username')
    form.value.clearValidate('name')
  })

  drawer.value = true
  // 将当前用户信息传递到表单
  Object.assign(userParams, row)
}

const form = ref()// 表单组件
// 保存表单
const save = async () => {
  // 表单是否通过校验规则 (返回 Promise)
  await form.value.validate()

  const res = await reqAddOrUpdateUser(userParams)

  if (res.code === 200) {
    await getUsers(userParams.id ? currentPage.value : 1)// 有 ID -> 修改用户, 留在当前页
    // 避免修改当前账号信息依旧会保持登陆状态, 修改完用户后需要进行全局刷新 -> 将会触发请求拦截器, 判断当前登录用户
    window.location.reload()

    ElMessage({ type: 'success', message: `${userParams.id ? '修改' : '添加'}成功` })
    drawer.value = false
  } else {
    ElMessage({ type: 'error', message: `${userParams.id ? '修改' : '添加'}失败` })
  }
}

// 取消操作drawer
const cancel = () => {
  drawer.value = false
}

// 自定义表单校验规则
const validateUserName = (rule: any, value: string, callback: Function) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名称至少为5位'))
  }
}

const validateName = (rule: any, value: string, callback: Function) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称至少为5位'))
  }
}

const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('密码至少为6位'))
  }
}

// 表单校验规则
const rules = {
  username: [{ validator: validateUserName, required: true, trigger: 'blur' }],
  name: [{ validator: validateName, required: true, trigger: 'blur' }],
  password: [{ validator: validatePassword, required: true, trigger: 'blur' }]
}

// 职位分配抽屉
const roleDrawer = ref(false)
const checkAll = ref(false)// 是否全选
const isIndeterminate = ref(true)// 全选框 不确定状态
const allRole = ref<RoleList>([])// 所有职位
const userRole = ref<RoleList>([])// 已选职位

// 职位分配
const roleAllocation = async (row: User) => {
  Object.assign(userParams, row)// 表单中需要进行展示用户的信息
  const res: AllRoleResponseData = await reqGetUserRoles(row.id as number)

  if (res.code === 200) {
    allRole.value = res.data.allRolesList
    userRole.value = res.data.assignRoles
  }

  roleDrawer.value = true// 打开抽屉
}

// @change 全选
const handleCheckAllChange = (val: boolean) => {// 全选激活 -> 已选的就是全部
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false// 更改全选按钮不确定状态
}
// 当个复选框变化
const handleSingleCheckBoxChange = (val: string[]) => {// 全部单个复选框选定之后, 将会触发全选
  isIndeterminate.value = allRole.value.length === userRole.value.length
  const checkedClt = val.length// 已经选择的数组
  checkAll.value = checkedClt === allRole.value.length
  isIndeterminate.value = !checkAll.value
}

// 分配职位请求
const saveUserRole = async () => {
  const data: AssignRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map(item => item.id as number)// 收集roleID
  }

  const res = await reqAssignRole(data)
  if (res.code === 200) {
    await getUsers(currentPage.value)// 刷新数据(留在当前页)

    ElMessage({ type: 'success', message: '分配成功' })
    roleDrawer.value = false
  } else {
    ElMessage({ type: 'error', message: '分配失败' })
  }
}

// 删除用户
const deleteUser = async (userId: number) => {
  const res = await reqDeleteUser(userId)

  if (res.code === 200) {
    await getUsers(userList.value.length > 1 ? currentPage.value : currentPage.value - 1)// 删除后是否回到当前页面
    ElMessage({ type: 'success', message: '删除成功' })
  }
}

// 已选择用户的 id 列表
const selectedUsers = ref<User[]>([])
// 表格 复选框勾选时候 变化
const selectChange = (val: User[]) => {
  selectedUsers.value = val
}

// 批量删除用户
const deleteBatchUser = async () => {
  const idList: number[] = selectedUsers.value.map(item => item.id as number)
  const res = await reqDeleteBatchUser(idList)

  if (res.code === 200) {
    await getUsers(userList.value.length > 1 ? currentPage.value : currentPage.value - 1)// 删除后是否回到当前页面
    ElMessage({ type: 'success', message: '删除成功' })
  }
}
</script>

<template>
  <el-card class="top-wrap">
    <el-form inline class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入搜索内容..." clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">查找</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-divider border-style="dashed" />

  <el-card>
    <el-row style="margin-bottom: 16px;">
      <el-button @click="addUser" type="success">添加用户</el-button>
      <el-button @click="deleteBatchUser" :disabled="!selectedUsers.length" type="danger">批量删除</el-button>
    </el-row>
    <el-table @selection-change="selectChange" :data="userList" border>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column type="index" label="#" align="center" width="80px"></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="120px"></el-table-column>
      <el-table-column prop="username" label="用户名字" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="用户名字" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="roleName" label="用户角色" align="center" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" width="350px">
        <template #="{ row }">
          <el-button @click="roleAllocation(row)" type="primary">角色分配</el-button>
          <el-button @click="updateUser(row)" title="编辑角色" type="warning" icon="Edit" circle></el-button>
          <el-popconfirm @confirm="deleteUser(row.id)" title="您确定删除该名用户吗?">
            <template #reference>
              <el-button type="danger" icon="Delete" circle></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-divider border-style="dashed" />

    <!-- 分页器 -->
    <el-pagination @current-change="getUsers" @size-change="handleSizeChange" v-model:current-page="currentPage"
      v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" background layout="prev, pager, next, ->, sizes, total"
      :total="total" />
  </el-card>

  <!-- 添加用户 | 修改用户 -->
  <el-drawer v-model="drawer" :title="`${userParams.id ? '修改' : '添加'}用户`" size="40%">
    <el-form ref="form" :model="userParams" :rules="rules">
      <el-form-item prop="username" label="用户姓名">
        <el-input v-model="userParams.username" placeholder="请输入..."></el-input>
      </el-form-item>
      <el-form-item prop="name" label="用户昵称">
        <el-input v-model="userParams.name" placeholder="请输入..."></el-input>
      </el-form-item>
      <!--更新用户时候, 有ID, 不显示密码框-->
      <el-form-item v-if="!userParams.id" prop="password" label="用户密码">
        <el-input v-model="userParams.password" placeholder="请输入..."></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="save" type="primary">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-drawer>

  <!-- 职位分配 -->
  <el-drawer v-model="roleDrawer" title="角色分配">
    <el-form label-width="80px">
      <el-form-item label="用户姓名">
        <el-input disabled v-model="userParams.username"></el-input>
      </el-form-item>
      <el-form-item label="职位列表">
        <!-- 全选 -->
        <el-checkbox @change="handleCheckAllChange" v-model="checkAll" :indeterminate="isIndeterminate">全选</el-checkbox>
      </el-form-item>
      <el-form-item>
        <!-- 复选框组 -->
        <el-checkbox-group @change="handleSingleCheckBoxChange" v-model="userRole">
          <el-checkbox v-for="role in allRole" :key="role" :label="role">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="saveUserRole" type="primary">确定</el-button>
      <el-button @click="roleDrawer = false">取消</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.top-wrap {
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>