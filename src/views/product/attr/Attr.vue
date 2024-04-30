<script setup lang="ts">
import { reactive, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import Category from '@/components/category/Category.vue'
import useCategoryStore from '@/store/modules/category'
import { reqAttr, reqAddOrEditAttr, reqDeleteAttr } from '@/api/product/attr'
import type { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()

// 监听 选择三级分类 时候进行请求获取对应表格属性数据
watch(() => categoryStore.categoryThreeId, (newVal) => {
  attrList.value = []// 变化时候需要清空数组
  if (!newVal) return// 当且仅当修改值不为空时, 才请求

  getAttr()
})


// 属性值列表
const attrList = ref<Array<Attr>>([])
// 获取已有的属性与属性值
const getAttr = async () => {
  const { categoryOneId, categoryTwoId, categoryThreeId } = categoryStore

  const res: AttrResponseData = await reqAttr(categoryOneId, categoryTwoId, categoryThreeId)

  attrList.value = res.data
}

// card 中显示x操作还是数据
const scene = ref<'data' | 'option'>('data')

// 收集表单
const attrParams = reactive<Attr>({
  attrName: '',// 属性名称
  attrValueList: [],// 新增属性值列表
  categoryId: '',// 三级分类 ID
  categoryLevel: 3// 代表新增的是三级的分裂级别
})
// 添加属性
const addAttr = () => {
  // 重置表单
  Object.assign(attrParams, {
    attrName: '', attrValueList: [], categoryId: categoryStore.categoryThreeId, categoryLevel: 3
  })
  scene.value = 'option'
}

// 添加属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({// 属性值列表追加
    valueName: '',
    flag: true
  })

  // 添加属性值时候该项(最后一项)也需要聚焦
  nextTick(() => {
    inputList.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 保存
const save = async () => {
  const res = await reqAddOrEditAttr(attrParams)
  if (res.code) {
    ElMessage({ type: 'success', message: `${attrParams.id ? '修改' : '修改'}成功` })
    await getAttr()// 更新数据
    scene.value = 'data'// 切换场景
  } else {
    ElMessage({ type: 'error', message: `${attrParams.id ? '修改' : '修改'}失败` })
  }
}

// 失去焦点时候隐藏
const onBlur = (row: AttrValue, $index: number) => {
  if (!row.valueName.trim()) {// 防止没有属性值, <p> 没有高度不显示
    attrParams.attrValueList.splice($index, 1)// 直接删除该属性值
    return ElMessage({ type: 'error', message: '属性值不为空' })
  }

  // 属性值是否重名
  const repeat = attrParams.attrValueList.find(item => {
    if (item !== row) {// 排除自身
      return item.valueName === row.valueName
    }
  })
  if (repeat) {// 重复
    attrParams.attrValueList.splice($index, 1)// 直接删除该属性值
    return ElMessage({ type: 'error', message: '属性值不能重复' })
  }

  row.flag = false
}

// 输入框数组
const inputList = ref<any>([])// 添加属性值自动 focus （:ref 函数保存到该数组中）

const onEdit = (row: AttrValue, $index: number) => {
  row.flag = true

  nextTick(() => {// 防止页面未更新
    inputList.value[$index].focus()
  })
}

// 修改已有属性
const editAttr = (row: Attr) => {
  scene.value = 'option'
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))// 进行深拷贝, 否则联动修改
}

// 取消操作
const cancel = () => {
  scene.value = 'data'
}

// 删除某个属性
const deleteAttr = async (attrId: number) => {
  const res = await reqDeleteAttr(attrId)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getAttr()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}

// 组件销毁时候, 将仓库内容数据清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})

</script>

<template>
  <!--分类组件-->
  <Category :scene="scene" />
  <el-divider border-style="dashed" />

  <el-card>
    <!-- template 组件不能使用 v-show -->
    <template v-if="scene === 'data'">
      <!-- 当且仅当 选择了 三级 分类时候才能够添加 -->
      <el-button @click="addAttr" :disabled="!categoryStore.categoryThreeId" type="primary" icon="Plus">添加属性</el-button>

      <el-divider />

      <el-table :data="attrList" border stripe>
        <el-table-column type="index" label="序号" align="center" width="150px"></el-table-column>
        <el-table-column prop="attrName" label="属性名称" align="center"></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{ row }">
            <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 8px">{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row }">
            <el-button @click="editAttr(row)" icon="Edit" circle></el-button>
            <el-popconfirm @confirm="deleteAttr(row.id)" title="确定删除?">
              <template #reference>
                <el-button type="danger" icon="Delete" circle></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template v-else-if="scene === 'option'">
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input v-model="attrParams.attrName" placeholder="请输入属性名称..." clearable></el-input>
        </el-form-item>
      </el-form>

      <el-row style="margin-bottom: 20px;">
        <el-col :span="19">
          <el-divider border-style="dashed" />
        </el-col>
        <el-col :offset="2" :span="3" style="display: flex; justify-content: space-between; align-items: center;">
          <el-button @click="addAttrValue" :disabled="!attrParams.attrName" type="primary" icon="Plus">添加</el-button>
          <el-button>取消</el-button>
        </el-col>
      </el-row>

      <el-table :data="attrParams.attrValueList" border style="margin-bottom: 10px;">
        <el-table-column label="序号" type="index" align="center" width="120px"></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{ row, $index }">
            <!-- 收集属性值名称 -->
            <el-input :ref="(compo: any) => inputList[$index] = compo" v-if="row.flag" @blur="onBlur(row, $index)"
              v-model="row.valueName" style="width: 50%;" placeholder="请输入属性值名称"></el-input>
            <!-- 失去焦点时候 文本框 -->
            <p v-else @click="onEdit(row, $index)">{{ row.valueName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row, $index }">
            <el-button @click="attrParams.attrValueList.splice($index, 1)" size="small" type="danger" icon="Delete"
              circle></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button @click="save" :disabled="!attrParams.attrValueList.length" type="success">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-card>
</template>

<style scoped></style>