import request from '@/utils/request'
import type { CategoryResponseData, Attr} from './type'

enum API {
    CATEGORY_ONE_URL = '/admin/product/getCategory1',// 一级分类
    CATEGORY_TWO_URL = '/admin/product/getCategory2/',// 二级分类
    CATEGORY_THREE_URL = '/admin/product/getCategory3/',// 三级分类
    ATTR_URL = '/admin/product/attrInfoList/',// 获取分类下已有属性与属性值
    ADD_OR_EDIT_ATTR_URL = '/admin/product/saveAttrInfo',// 添加 or 修改属性
    DELETE_ATTR_URL = '/admin/product/deleteAttr/'
}

// 获取一级分类
export const reqCategoryOne = () => request.get<any, CategoryResponseData>(API.CATEGORY_ONE_URL)

// 获取二级分类 -> 需要一级分类
export const reqCategoryTwo = (category_one: number | string) => request.get<any, CategoryResponseData>(API.CATEGORY_TWO_URL + category_one)

// 获取三级分类 -> 需要二级分类
export const reqCategoryThree = (category_two: number | string) => request.get<any, CategoryResponseData>(API.CATEGORY_THREE_URL + category_two)

// 获取标签属性
export const reqAttr = (category_one: string | number, category_two: string | number, category_three: string | number) => request.get<any, any>(API.ATTR_URL + `${category_one}/${category_two}/${category_three}`)

// 新增 or 修改属性(添加 没有 ID, 修改有 ID)
export const reqAddOrEditAttr = (data: Attr) => request.post<any, any>(API.ADD_OR_EDIT_ATTR_URL, data)

// 删除属性
export const reqDeleteAttr = (attrId: number) => request.delete<any, any>(API.DELETE_ATTR_URL + attrId)