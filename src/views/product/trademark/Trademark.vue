<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from 'vue'
import {reqHasTrademark, reqAddTrademark, reqEditTrademark, reqDeleteTrademark} from '@/api/product/trademark'
import type {Records, Trademark, TrademarkResponseData} from '@/api/product/trademark/type'
import {ElMessage} from "element-plus";

const currentPage = ref(1)// 当前页码
const limit = ref(3)// 每页显示数据数量
const total = ref(0)// 数据总量
const trademarkList = ref<Records | any>([])// 品牌列表
const dialogVisible = ref<boolean>(false)// 对话框显示

onMounted(() => {
  getTrademark()
})

// 请求品牌
const getTrademark = async () => {
  const res: TrademarkResponseData = await reqHasTrademark(currentPage.value, limit.value)
  if (res.code === 200) {
    total.value = res.data.total
    trademarkList.value = res.data.records
  }
}

// 页面显示数据数量变化
const handleSizeChange = () => {
  currentPage.value = 1// 重置当前页面为 首页
  getTrademark()
}


const trademarkParams = reactive<Trademark>({tmName: '', logoUrl: ''})
// 添加品牌
const addTrademark = () => {
  dialogVisible.value = true
  // 重置表单
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 重置校验规则
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

// 编辑品牌
const editTrademark = (row: Trademark) => {
  dialogVisible.value = true
  Object.assign(trademarkParams, row)
  // 重置校验规则
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

const cancel = () => {
  dialogVisible.value = false
}

const formRef = ref()// 表单
const confirm = async () => {
  await formRef.value.validate()// 表单进行校验(提交之后, 将会触发上传文件的校验)
  let res: any

  if (trademarkParams.id) {
    res = await reqEditTrademark(trademarkParams)
  } else {
    res = await reqAddTrademark(trademarkParams)
  }

  if (res.code === 200) {
    ElMessage({type: 'success', message: `${trademarkParams.id ? '修改' : '添加'}成功`})
    await getTrademark()
    dialogVisible.value = false
  } else {
    ElMessage({type: 'error', message: `${trademarkParams.id ? '修改' : '添加'}失败`})
  }
}

// 上传图片之前 钩子
const beforeImageUpload = (rawFile) => {
  // 限制 上传类型
  if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 <= 4) {// 限制上传图片大小 (1MB = 2^10KB = 2^20B)
      return true
    } else {
      ElMessage({type: 'error', message: '文件过大'})
    }
  } else {
    ElMessage({type: 'error', message: '请上传图片格式文件'})
  }

  return false
}

// 上传成功
const handleImageSuccess = (response) => {
  trademarkParams.logoUrl = response.data// 上传服务器后的 url
  // 上传成功之后, 需要清除之前的校验规则
  formRef.value.clearValidate('logoUrl')
}

// 校验文件名
const validateTmName = (rule: any, val: any, callback: Function) => {
  console.log('校验 name')
  val.length < 2 ? callback(new Error('品牌名称大于等于 2 位')) : callback()
}
// 校验url地址
const validateLogoUrl = (rule: any, val: any, callback: Function) => {
  console.log('校验 logo', val)
  val ? callback() : callback(new Error('请上传 logo 图片'))
}
const rules = {
  tmName: [{required: true, validator: validateTmName, trigger: 'blur'}],
  logoUrl: [{required: true, validator: validateLogoUrl}]
}

// 删除品牌
const deleteTrademark = async (row) => {
  const res = await reqDeleteTrademark(row.id)

  if (res.code === 200) {
    ElMessage({type: 'success', message: '删除成功'})
    await getTrademark()
  } else {
    ElMessage({type: 'error', message: '删除失败'})
  }
}

</script>

<template>
  <el-card>
    <template #header>
      <el-button @click="addTrademark" type="primary" icon="Plus">添加品牌</el-button>
    </template>

    <el-table :data="trademarkList" border stripe>
      <el-table-column width="80px" type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" align="center"></el-table-column>
      <el-table-column label="LOGO" align="center">
        <template #="{row}">
          <el-image :src="row.logoUrl"
                    style="width: 100px; height: 100px" fit="contain"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{row}">
          <el-button @click="editTrademark(row)" type="success" icon="Edit" circle size="large"></el-button>
          <el-popconfirm @confirm="deleteTrademark(row)" :title="`您确定要删除${row.tmName}品牌?`" icon="Delete" width="250px">
            <template #reference>
              <el-button type="danger" icon="Delete" circle size="default"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <!--
      @current-change: 当前页码变化
      @size-change: 当前页面条数显示变化
      -->
      <el-pagination
          @current-change="getTrademark"
          @size-change="handleSizeChange"
          v-model:current-page="currentPage"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          background
          layout="prev, pager, next, ->, sizes, total"
          :total="total"
      />
    </template>
  </el-card>

  <el-dialog v-model="dialogVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" center width="30%">
    <el-form ref="formRef" label-width="100px" :model="trademarkParams" :rules="rules">
      <el-form-item prop="tmName" label="品牌名称">
        <el-input v-model.trim="trademarkParams.tmName" placeholder="请输入品牌名称..."></el-input>
      </el-form-item>
      <el-form-item prop="logoUrl" label="品牌LOGO">
        <el-upload
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
            class="avatar-uploader"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="cancel" type="primary">取消</el-button>
      <el-button @click="confirm" type="success">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>