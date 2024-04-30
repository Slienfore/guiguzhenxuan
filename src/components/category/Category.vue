<script setup lang="ts" name="Category">
import { onMounted } from 'vue'
import useCategory from '@/store/modules/category'

const categoryStore = useCategory()

const getCategoryOne = () => {
  categoryStore.getCategoryOne()
}

onMounted(() => {
  getCategoryOne()
})

// 监听一级分类变化 -> 请求二级分类
const handleCategoryOneChange = () => {
  // 二级、三级分类数据进行清空
  categoryStore.categoryTwoId = ''
  categoryStore.categoryThree = []
  categoryStore.categoryThreeId = ''
  categoryStore.getCategoryTwo()
}

// 监听二级分类变化 -> 请求三级分类
const handleCategoryTwoChange = () => {
  // 三级分类数据清空
  categoryStore.categoryThreeId = ''
  categoryStore.getCategoryThree()
}

// 进行操作时候 禁用 下拉框
defineProps(['scene'])

</script>

<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select :disabled="scene === 'option'" @change="handleCategoryOneChange"
          v-model="categoryStore.categoryOneId" placeholder="请选择">
          <el-option v-for="item in categoryStore.categoryOne" :value="item.id" :label="item.name" :key="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select :disabled="scene === 'option'" @change="handleCategoryTwoChange"
          v-model="categoryStore.categoryTwoId" placeholder="请选择">
          <el-option v-for="item in categoryStore.categoryTwo" :value="item.id" :label="item.name" :key="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="scene === 'option'" v-model="categoryStore.categoryThreeId" placeholder="请选择">
          <el-option v-for="item in categoryStore.categoryThree" :value="item.id" :label="item.name" :key="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.el-select {
  width: 150px;
}
</style>