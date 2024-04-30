<!-- 添加 | 修改SKU -->
<script setup lang="ts">
import type { SkuFormData, Spu } from '@/api/product/spu/type'
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import { reqAttr } from '@/api/product/attr'
import { reqAddSkuInfo, reqImagesSpu, reqSaleAttrsSpu } from '@/api/product/spu'
import { ElMessage } from 'element-plus';

const emit = defineEmits(['changeScene'])
const cancel = () => {
    emit('changeScene', 'data')// 触发自定义事件, 通知父组件切换场景
}

// 平台属性
const attrList = ref<any>([])
// 销售属性
const saleAttrList = ref<any>([])
// 照片墙数据
const imageList = ref<any>([])
// 收集表单数据
const skuParams = reactive<SkuFormData>({
    category3Id: '', spuId: '', tmId: '', skuName: '',
    price: '', weight: '', skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
})

// 初始化数据
const initSkuFormData = async (categoryOneId: number, categoryTwoId: number, categoryThreeId: number, spu: Spu) => {
    skuParams.category3Id = categoryThreeId
    skuParams.spuId = spu.id as number
    skuParams.tmId = spu.tmId

    // 平台属性值列表
    const resAttrsList = await reqAttr(categoryOneId, categoryTwoId, categoryThreeId)
    // 获取对应的销售属性
    const resSaleAttr = await reqSaleAttrsSpu(spu.id as number)
    // 获取照片墙数据
    const resImageList = await reqImagesSpu(spu.id as number)

    attrList.value = resAttrsList.data
    saleAttrList.value = resSaleAttr.data
    imageList.value = resImageList.data
}

// table 组件
const table = ref()
// 设置默认照片
const handleDefaultImg = (row: any) => {
    // 排它 -> 清空用户选项
    table.value.clearSelection()
    // 多选表格 切换某行的选中状态
    table.value.toggleRowSelection(row, true)

    skuParams.skuDefaultImg = row.imgUrl
}

// 保存表单
const save = async () => {
    // 平台属性
    skuParams.skuAttrValueList = attrList.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {// 选择后进行收集
            const [attrId, valueId] = next.attrIdAndValueId.split(':')// 切割收藏
            prev.push({ attrId, valueId })
        }
        return prev
    }, [])// 初始空数组 收集元素

    // 销售属性
    skuParams.skuSaleAttrValueList = saleAttrList.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {// 选择后进行收集
            const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')// 切割收藏
            prev.push({ saleAttrId, saleAttrValueId })
        }

        return prev
    }, [])

    // 添加sku信息
    const res = await reqAddSkuInfo(skuParams)
    console.log(res)

    if (res.code === 200) {
        emit('changeScene', 'data')// 触发自定义事件, 通知父组件切换场景
        ElMessage({ type: 'success', message: '添加成功' })
    } else {
        ElMessage({ type: 'error', message: '添加失败' })
    }
}

defineExpose({ initSkuFormData })
</script>

<template>
    <el-form label-width="120px">
        <el-form-item label="SKU 名称">
            <el-input v-model="skuParams.skuName" placeholder="请输入..."></el-input>
        </el-form-item>
        <el-form-item label="价格 (元)">
            <el-input v-model.number="skuParams.price" placeholder="请输入..." type="number"></el-input>
        </el-form-item>
        <el-form-item label="重量 (克)">
            <el-input v-model.number="skuParams.weight" placeholder="请输入..." type="number"></el-input>
        </el-form-item>
        <el-form-item label="SKU 描述">
            <el-input v-model="skuParams.skuDesc" placeholder="请输入..." type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="平台属性">
            <el-form inline>
                <el-form-item v-for="item in attrList" :key="item.id" :label="item.attrName">
                    <!-- 将选择属性挂载当前 平台属性 条目中 -->
                    <el-select v-model="item.attrIdAndValueId" style="width: 240px; margin-bottom: 10px;">
                        <!-- 遍历平台属性值 -->
                        <el-option :value="`${item.id}:${attrValue.id}`" v-for="attrValue in item.attrValueList"
                            :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="销售属性">
            <el-form inline>
                <el-form-item v-for="item in saleAttrList" :key="item.id" :label="item.saleAttrName">
                    <!-- 将选择属性挂载当前 销售属性 条目中 -->
                    <el-select v-model="item.saleIdAndValueId" style="width: 240px;">
                        <el-option :value="`${item.id}:${saleAttrValue.id}`"
                            v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table ref="table" :data="imageList" border>
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="照片" align="center">
                    <template #="{ row }">
                        <el-image :src="row.imgUrl" style="width: 90px; height: 90px" />
                    </template>
                </el-table-column>
                <el-table-column prop="imgName" label="名称" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #="{ row }">
                        <el-button @click="handleDefaultImg(row)" title="设置默认"
                            :type="row.imgUrl === skuParams.skuDefaultImg ? 'success' : 'warning'" icon="CircleCheck"
                            circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>

        <el-form-item>
            <el-button @click="save" type="primary">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>

</template>

<style scoped></style>