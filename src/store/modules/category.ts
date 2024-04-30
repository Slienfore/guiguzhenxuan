import { defineStore } from 'pinia'
import { reqCategoryOne, reqCategoryTwo, reqCategoryThree } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'

const useCategoryStore = defineStore('Category', {
    state(): CategoryState {
        return {
            categoryOne: [],// 一级分类
            categoryOneId: '',// 一级分类Id
            categoryTwo: [], // 二级分类
            categoryTwoId: '',// 二级分类Id
            categoryThree: [],// 三级分类
            categoryThreeId: '',// 三级分类Id
        }
    },
    actions: {
        async getCategoryOne() {// 获取一级分类
            const res: CategoryResponseData = await reqCategoryOne()

            if (res.code === 200) {
                this.categoryOne = res.data
            }
        },
        async getCategoryTwo() {// 获取二级分类
            const res: CategoryResponseData = await reqCategoryTwo(this.categoryOneId)

            if (res.code === 200) {
                this.categoryTwo = res.data
            }
        },
        async getCategoryThree() {// 获取三级分类
            const res: CategoryResponseData = await reqCategoryThree(this.categoryTwoId)

            if (res.code === 200) {
                this.categoryThree = res.data
            }
        }
    },
    getters: {}
})

export default useCategoryStore