<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(0)
const limit = ref(3)
const total = ref(0)

// 获取用户信息列表
const getUsers = (pager = 1) => {

}

// 处理分页器显示数量
const handleSizeChange = () => {

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
    <el-row>
      <el-button type="success">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
    </el-row>
    <el-table border>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" width="80px"></el-table-column>
      <el-table-column label="ID" align="center" width="120px"></el-table-column>
      <el-table-column label="用户名字" align="center"></el-table-column>
      <el-table-column label="用户名字" align="center"></el-table-column>
      <el-table-column label="用户角色" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center"></el-table-column>
      <el-table-column label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="350px">
        <template #="{ row }">
          <el-button>角色分配</el-button>
          <el-button type="warning" icon="Edit" circle></el-button>
          <el-button type="danger" icon="Delete" circle></el-button>
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