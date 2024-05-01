<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqUserList } from '@/api/acl/user'
import { Records, UserResponseData } from '@/api/acl/user/type'

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
      <el-button type="success">添加用户</el-button>
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
          <el-button title="编辑角色" type="warning" icon="Edit" circle></el-button>
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