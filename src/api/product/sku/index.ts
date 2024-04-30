import request from '@/utils/request'
import type { SkuResponseData } from './type'

enum API {
    SKU_URL = '/admin/product/list/',// 获取 SKU 数据列表
}

// 获取 SKU 数据列表
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

