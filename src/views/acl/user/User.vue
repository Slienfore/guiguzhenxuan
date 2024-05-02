<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { reqUserList, reqAddOrUpdateUser } from '@/api/acl/user'
import { Records, User, UserResponseData } from '@/api/acl/user/type'
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
      <el-button type="danger">批量删除</el-button>
    </el-row>
    <el-table :data="userList" border>
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
          <el-button type="primary">角色分配</el-button>
          <el-button @click="updateUser(row)" title="编辑角色" type="warning" icon="Edit" circle></el-button>
          <el-popconfirm title="您确定删除角色?">
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