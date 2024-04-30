<!-- 添加 | 修改SPU -->
<script setup lang="ts">
import { ref, defineExpose, defineEmits, computed } from 'vue'
import { reqAllTrademark, reqImagesSpu, reqSaleAttrsSpu, reqAllSaleAttrs, reqAddOrUpdate } from '@/api/product/spu'
import type { Spu, Trademark, TrademarksResponseData, SpuImage, ImagesResponseData, SaleAttr, SaleAttrsResponseData, AttrsAll, AllSaleAttrsResponseData, SaleAttrValue } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

const spuParams = ref<Spu>({
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: []
})
const trademarkList = ref<Array<Trademark>>([])
const imageList = ref<Array<SpuImage>>([])
const saleAttrsList = ref<Array<SaleAttr>>([])
const attrsList = ref<Array<AttrsAll>>([])

// 初始化当前组件数据
const initSpuFormData = async (spu: Spu) => {
    spuParams.value = spu
    // 获取全部品牌数据
    const resTrademark: TrademarksResponseData = await reqAllTrademark()
    // 获取图片
    const resImageList: ImagesResponseData = await reqImagesSpu(spu.id as number)
    // 获取 已有 的销售属性
    const resAttrs: SaleAttrsResponseData = await reqSaleAttrsSpu(spu.id as number)
    // 获取 所有 销售属性
    const resAllAttrs: AllSaleAttrsResponseData = await reqAllSaleAttrs()

    trademarkList.value = resTrademark.data
    // 处理 upload 组件的显示映射
    imageList.value = resImageList.data.map(item => { return { name: item.imgName, url: item.imgUrl } })
    saleAttrsList.value = resAttrs.data
    attrsList.value = resAllAttrs.data
}

// 预览对话框
const dialogVisible = ref<boolean>(false)
// 预览图片 地址
const dialogImageUrl = ref<string>('')

// 照片预览
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

// 照片墙移除
const handlePictureCardRemove = () => {

}

// 上传照片约束
const handleBeforeUpload = (file: any) => {
    // 约束文件类型
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
        if (file.size / 1024 / 1024 <= 3) {
            return true
        } else {
            ElMessage({ type: 'error', message: '文件大小最多为3M' })
        }
    } else {
        ElMessage({ type: 'error', message: '请选择图片文件上传格式' })
    }

    return false
}

// 尚未使用的 销售属性
const unSelectedSales = computed(() => {
    // 遍历 所有 销售属性, 使用 every 方法在 已有的销售属性中 筛选是否 不存在 该销售属性
    // 若 true -> 说明未使用, filter 返回 true | 若 false -> 说明使用, filter 返回 false
    const unSelectedList = attrsList.value.filter(item => {
        return saleAttrsList.value.every(exist => exist.saleAttrName !== item.name)
    })

    return unSelectedList
})

// 收集选择的销售属性的 ID 与 名称 格式: (${item.id}:${item.name})
const cltSaleAttrIdAndName = ref<string>('')

// 添加销售属性
const addSaleAttr = () => {
    // 切割解构
    const [baseSaleAttrId, saleAttrName] = cltSaleAttrIdAndName.value.split(':')

    // 新增的销售属性对象
    const saleAttrObj: SaleAttr = {
        baseSaleAttrId, saleAttrName,
        spuSaleAttrValueList: []
    }

    saleAttrsList.value.push(saleAttrObj)

    // 收集后清空
    cltSaleAttrIdAndName.value = ''
}

// 销售属性的 编辑
const toEdit = (row: SaleAttr) => {
    row.flag = true
}

// 销售属性 查看 -> 销售属性值进行追加
const toLook = (row: SaleAttr) => {
    // 通过 v-input 后面追加的属性值
    const { baseSaleAttrId, saleAttrValue } = row

    const saleAttrValueObj: SaleAttrValue = {
        baseSaleAttrId, saleAttrValueName: (saleAttrValue as string),
    }

    if (!saleAttrValue) {// 判空
        return ElMessage({ type: 'error', message: '属性值不能为空' })
    }

    const repeat = row.spuSaleAttrValueList.find(item => item.saleAttrValueName === saleAttrValue)
    if (repeat) {
        return ElMessage({ type: 'error', message: '属性值重复' })
    }

    row.spuSaleAttrValueList.push(saleAttrValueObj)// 追加属性值

    row.flag = false// 查看模式
}

const emit = defineEmits(['changeScene'])
// 取消
const cancel = () => {
    emit('changeScene', 'data')// 触发自定义事件, 通知父组件切换场景
}

// 保存表单
const saveForm = async () => {
    // 上传的图片 upload 后会 追加 response 属性
    spuParams.value.spuImageList = imageList.value.map((item: any) => {
        return { imgName: item.name, imgUrl: (item.response && item.response.data) || item.url }
    })

    spuParams.value.spuSaleAttrList = saleAttrsList.value

    const res = await reqAddOrUpdate(spuParams.value)

    if (res.code === 200) {
        ElMessage({ type: 'success', message: '保存成功' })
        emit('changeScene', 'data')// 触发自定义事件, 通知父组件切换场景
    } else {
        ElMessage({ type: 'error', message: '保存失败' })
    }
}

// 添加 SPU 业务
const initAddSpu = async (categoryThreeId: number) => {
    spuParams.value.category3Id = categoryThreeId// 保存 三级 分类Id
    // 获取 全部 品牌数据
    const resTrademark: TrademarksResponseData = await reqAllTrademark()
    // 获取 所有 销售属性
    const resAllAttrs: AllSaleAttrsResponseData = await reqAllSaleAttrs()

    trademarkList.value = resTrademark.data
    attrsList.value = resAllAttrs.data
}

// 重置表单
const resetForm = () => {
    console.log('重置表单')
    Object.assign(spuParams.value, {
        category3Id: '', spuName: '', description: '', tmId: '',
        spuImageList: [], spuSaleAttrList: []
    })
    trademarkList.value = []
    imageList.value = []
    saleAttrsList.value = []
    attrsList.value = []

    cltSaleAttrIdAndName.value = ''
}

// 对外暴露初始化方法
defineExpose({ initSpuFormData, initAddSpu, resetForm })
</script>

<template>
    <el-form label-width="120px">
        <el-form-item label="SPU 名称">
            <el-input v-model="spuParams.spuName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="SPU 品牌">
            <el-select v-model="spuParams.tmId">
                <el-option v-for="item in trademarkList" :value="item.id" :label="item.tmName"
                    :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU 描述">
            <el-input v-model="spuParams.description" type="textarea" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="SPU 照片">
            <el-upload v-model:file-list="imageList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handlePictureCardRemove"
                :before-upload="handleBeforeUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <!-- 图片预览 -->
            <el-dialog v-model="dialogVisible" width="525px">
                <el-image :src="dialogImageUrl" fit="contain" style="height: 500px; width: 500px;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU 销售属性">
            <!-- 销售属性下拉 -->
            <el-select v-model="cltSaleAttrIdAndName"
                :placeholder="unSelectedSales.length ? `${unSelectedSales.length} 个可供选择` : '无'" style="width: 130px;">
                <el-option :value="`${item.id}:${item.name}`" :label="item.name" v-for="item in unSelectedSales">{{
                    item.name }}</el-option>
            </el-select>

            <!-- 没有选择时候 禁用, 选择之后就 不禁用 -->
            <el-button @click="addSaleAttr" :disabled="!cltSaleAttrIdAndName" type="primary" icon="Plus"
                style="margin-left: 16px;">添加</el-button>

            <el-table :data="saleAttrsList" border style="margin: 10px 0;">
                <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
                <el-table-column prop="saleAttrName" label="销售属性名称" align="center"></el-table-column>
                <el-table-column label="销售属性值" align="center">
                    <template #="{ row }">
                        <el-tag @close="row.spuSaleAttrValueList.splice(index, 1)"
                            v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" closable
                            style="margin: 6px;">{{
                                item.saleAttrValueName
                            }}</el-tag>
                        <!-- 添加属性 -->
                        <el-input @blur="toLook(row)" v-model.trim="row.saleAttrValue" v-if="row.flag"
                            placeholder="请输入属性值" style="width: 100px; margin-left: 16px;"></el-input>
                        <el-button @click="toEdit(row)" v-else icon="Plus" style="margin-left: 16px;" type="primary"
                            size="small" circle></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" align="center">
                    <template #="{ row, $index }">
                        <el-button @click="saleAttrsList.splice($index, 1)" type="danger" icon="Delete"
                            circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>

        <el-form-item>
            <el-button :disabled="!saleAttrsList.length" @click="saveForm" type="success">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>