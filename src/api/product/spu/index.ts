import request from '@/utils/request'
import type { SpuResponseData, TrademarksResponseData, ImagesResponseData, SaleAttrsResponseData, AllSaleAttrsResponseData, Spu, SkuFormData, SkuInfoData } from './type'

enum API {
    ALL_SPU_URL = '/admin/product/', // 所有SPU列表
    ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',// 获取哦所有品牌数据
    IMAGE_SPU_URL = '/admin/product/spuImageList/',// spu 下所有商品图片
    SALE_ATTR_SPU_URL = '/admin/product/spuSaleAttrList/', // spu 销售属性
    ALL_SALE_ATTRS_URL = '/admin/product/baseSaleAttrList',// 所有的基本销售属性
    ADD_SPU_URL = '/admin/product/saveSpuInfo',// 添加 spu
    UPDATE_SPU_URL = '/admin/product/updateSpuInfo',// 更新 spu
    Add_SKU_URL = '/admin/product/saveSkuInfo',// 添加sku信息
    SKU_INFO_URL = '/admin/product/findBySpuId/',// 商品下所有的SKU属性
    DELETE_SPU_URL = '/admin/product/deleteSpu/'
}

// 获取所有 SPU 属性
export const reqAllSpu = (page: number, limit: number, categoryThreeId: string | number) => request.get<any, SpuResponseData>(API.ALL_SPU_URL + `${page}/${limit}?category3Id=${categoryThreeId}`)

// 获取所有 SPU 品牌数据
export const reqAllTrademark = () => request.get<any, TrademarksResponseData>(API.ALL_TRADEMARK_URL)

// spu 下所有图片
export const reqImagesSpu = (spuId: number) => request.get<any, ImagesResponseData>(API.IMAGE_SPU_URL + spuId)

// spu 下所有的销售属性
export const reqSaleAttrsSpu = (spuId: number) => request.get<any, SaleAttrsResponseData>(API.SALE_ATTR_SPU_URL + spuId)

// 获取全部销售属性
export const reqAllSaleAttrs = () => request.get<any, AllSaleAttrsResponseData>(API.ALL_SALE_ATTRS_URL)

// 更新或者修改 spu (有 ID, 修改，无 ID, 添加)
export const reqAddOrUpdate = (data: Spu) => {
    if (!data.id) {
        return request.post<any, any>(API.ADD_SPU_URL, data)
    } else {
        return request.post<any, any>(API.UPDATE_SPU_URL, data)
    }
}

// 添加新的 sku 属性
export const reqAddSkuInfo = (data: SkuFormData) => request.post<any, any>(API.Add_SKU_URL, data)

// 商品属性数据列表
export const reqSkuList = (spuId: number | string) => request.get<any, SkuInfoData>(API.SKU_INFO_URL + spuId)
