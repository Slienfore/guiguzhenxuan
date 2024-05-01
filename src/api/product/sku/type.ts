export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface SkuData {
    category3Id: string | number// 三级分类 ID
    spuId: string | number// SPU ID
    tmId: string | number// SKU 品牌ID
    skuName: string// SKU 名称
    price: string | number// SKU 价格
    weight: string | number// SKU 重量
    skuDesc: string// SKU 描述
    // 平台属性
    skuAttrValueList: Array<{ id?: number, attrId: number | string, valueId: number | string, valueName?: string }>
    // 销售属性
    skuSaleAttrValueList: Array<{ id?: number, saleAttrId: number | string, saleAttrValueId: number | string, saleAttrValueName?: string }>
    skuDefaultImg: string// sku 图片默认地址
    isSale?: number// 商品上架信息
    id?: number// 商品ID
    skuImageList?: Array<{id: number, imgUrl: string}>
}

// 响应数据
export interface SkuResponseData extends ResponseData {
    data: {
        records: Array<SkuData>
        total: number
        size: number
        current: number
        orders: []
        optimizeCountSql: boolean
        countId: null
        maxLimit: null
        searchCount: boolean
        pages: number
    }
}

// SKU 商品详情信息响应数据
export interface SkuDetailInfoResponseData extends ResponseData {
    data: SkuData
}