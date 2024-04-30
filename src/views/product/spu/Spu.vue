<script setup lang="ts">
import Category from '@/components/category/Category.vue'
import { ref, watch, nextTick, onMounted } from 'vue'
import { reqAllSpu, reqSkuList } from '@/api/product/spu'
import useCategoryStore from '@/store/modules/category'
import { SpuResponseData } from '@/api/product/spu/type';
import type { Records, SkuFormData, SkuInfoData, Spu } from '@/api/product/spu/type'
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'

const categoryStore = useCategoryStore()

const scene = ref<'data' | 'spu-form' | 'sku-form'>('data')// 场景值

const currentPage = ref(1)// 当前页
const limit = ref(5)// 每页限制多少条数据
const total = ref(0)// 数据总量

const spuList = ref<Records>([])
// 获取所有 Spu 信息
const getSpu = async (defaultPage = 1) => {
    currentPage.value = defaultPage// currentPageChange && sizePageChange 变化时候都会将页码注入 page 中

    const res: SpuResponseData = await reqAllSpu(currentPage.value, limit.value, categoryStore.categoryThreeId)

    res.data.records
    if (res.code === 200) {
        spuList.value = res.data.records
        total.value = res.data.total
    }
}

// 待删除
onMounted(async () => {
    categoryStore.categoryOneId = 2
    categoryStore.categoryTwoId = 13
    categoryStore.categoryThreeId = 61
    const res: SpuResponseData = await reqAllSpu(currentPage.value, limit.value, categoryStore.categoryThreeId)

    res.data.records
    if (res.code === 200) {
        spuList.value = res.data.records
        total.value = res.data.total
    }
})

watch(() => categoryStore.categoryThreeId, () => {
    if (!categoryStore.categoryThreeId) return

    getSpu()
})

// 分页器下拉菜单 显示条数变化
const handleSizeChange = () => {
    getSpu() // 显示条数也会传入 page 值, 如果直接在 标签中使用, 则 getSpu 不会使用 默认值 page = 1, 所以外包了一个函数
}

// SpuForm 子组件实例
const spu = ref()

// 添加spu
const addSpu = () => {
    spu.value.resetForm()// 重置表单
    scene.value = 'spu-form'
    spu.value.initAddSpu(categoryStore.categoryThreeId)
}

// 修改spu
const editSpu = (row: Spu) => {
    spu.value.resetForm()// 重置表单
    scene.value = 'spu-form'
    // 子组件需要进行请求发送, 切换场景时候, 父组件激活子组件方法发送
    spu.value.initSpuFormData(row)
}

const sku = ref()
// 添加 sku
const addSku = (row: Spu) => {
    scene.value = 'sku-form'
    // 将 一、二、三级分类ID 传递给 子组件, 以及当前 SPU 对象
    sku.value.initSkuFormData(categoryStore.categoryOneId, categoryStore.categoryTwoId, categoryStore.categoryThreeId, row)
}

const skuList = ref<Array<SkuFormData>>([])
const skuDialogVisible = ref<boolean>(false)
// 查看 sku 属性
const viewSku = async (row: Spu) => {
    const res: SkuInfoData = await reqSkuList(row.id as number)
    if (res.code === 200) {
        skuList.value = res.data
        skuDialogVisible.value = true
    }
}

// 自定义事件 -> 传递给子组件切换场景值 (子组件通知父组件切换场景)
const changeScene = (sceneStr: 'data' | 'spu-form' | 'sku-form') => {
    scene.value = sceneStr
    getSpu()// 更新数据
}

</script>

<template>
    <!--分类组件-->
    <Category :scene="scene"></Category>
    <el-divider border-style="dashed" />

    <el-card>
        <div v-show="scene === 'data'">
            <el-button @click="addSpu" :disabled="!categoryStore.categoryThreeId" type="primary">添加 SPU</el-button>
            <el-divider></el-divider>

            <!-- 表格 -->
            <el-table :data="spuList" style="margin-bottom: 16px;">
                <el-table-column width="80px" type="index" label="序号" align="center"></el-table-column>
                <el-table-column prop="spuName" label="SPU名称" align="center"></el-table-column>
                <el-table-column prop="description" show-overflow-tooltip label="SPU描述"
                    align="center"></el-table-column>
                <el-table-column label="SPU操作" align="center">
                    <template #="{ row }">
                        <el-button @click="addSku(row)" title="添加 SKU" size="small" type="primary" icon="Plus"
                            circle></el-button>
                        <el-button @click="editSpu(row)" title="编辑属性" size="small" type="waring" icon="Edit"
                            circle></el-button>
                        <el-button @click="viewSku(row)" title="查看 SKU" size="small" type="info" icon="View"
                            circle></el-button>
                        <el-button title="删除属性" size="small" type="danger" icon="Delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页器 -->
            <el-pagination @current-change="getSpu" @size-change="handleSizeChange" v-model:current-page="currentPage"
                v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" background
                layout="prev, pager, next, ->, sizes, total" :total="total" />
        </div>

        <div v-show="scene === 'spu-form'">
            <!-- 自定义事件 - 传递给子组件进行 切换场景 -->
            <SpuForm ref="spu" @change-scene="changeScene"></SpuForm>
        </div>

        <div v-show="scene === 'sku-form'">
            <!-- 自定义事件 - 传递给子组件进行 切换场景 -->
            <SkuForm ref="sku" @change-scene="changeScene"></SkuForm>
        </div>

        <el-dialog v-model="skuDialogVisible" title="SKU 列表">
            <el-table :data="skuList" border>
                <el-table-column prop="skuName" label="SKU 名字" align="center"></el-table-column>
                <el-table-column prop="price" label="SKU 价格" align="center"></el-table-column>
                <el-table-column prop="weight" label="SKU 重量" align="center"></el-table-column>
                <el-table-column label="SKU 图片" align="center">
                    <template #="{ row }">
                        <el-image :src="row.skuDefaultImg" style="width: 90px; height: 90px"></el-image>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
</template>

<style scoped></style>