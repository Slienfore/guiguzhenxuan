import request from '@/utils/request'
import type { SkuDetailInfoResponseData, SkuResponseData } from './type'

enum API {
    SKU_URL = '/admin/product/list/',// 获取 SKU 数据列表
    ON_SALE_URL = '/admin/product/onSale/',// 上架
    UN_SALE_URL = '/admin/product/cancelSale/',// 下架
    SKU_DETAIL_INFO_URL = '/admin/product/getSkuInfo/',// 获取商品详情接口
}

// 获取 SKU 数据列表
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

// 上架商品
export const reqOnSaleSku = (skuId: number) => request.get<any, any>(API.ON_SALE_URL + skuId)

// 下架商品
export const reqUnSaleSku = (skuId: number) => request.get<any, any>(API.UN_SALE_URL + skuId)

// 获取商品详情信息
export const reqSkuDetailInfo = (skuId: number) => request.get<any, SkuDetailInfoResponseData>(API.SKU_DETAIL_INFO_URL + skuId)