import request from '@/utils/request'
import type { SkuResponseData } from './type'

enum API {
    SKU_URL = '/admin/product/list/',// 获取 SKU 数据列表
    ON_SALE_URL = '/admin/product/onSale/',// 上架
    UN_SALE_URL = '/admin/product/cancelSale/',// 下架
}

// 获取 SKU 数据列表
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

// 上架商品
export const reqOnSaleSku = (skuId: number) => request.get<any, any>(API.ON_SALE_URL + skuId)

// 下架商品
export const reqUnSaleSku = (skuId: number) => request.get<any, any>(API.UN_SALE_URL + skuId)