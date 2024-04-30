export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface Spu {
    id?: number
    spuName: string
    description: string
    category3Id: string | number
    tmId: number | string
    spuSaleAttrList: null | Array<SaleAttr>// 销售属性列表
    spuImageList: null | Array<SpuImage>// 照片墙
}

export type Records = Array<Spu>

export interface SpuResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        searchCount: number
        pages: number
    }
}

// 所有品牌数据类型
export interface Trademark {
    id: number
    tmName: string
    logoUrl: string
}

export interface TrademarksResponseData extends ResponseData {
    data: Array<Trademark>
}

// Spu 图片
export interface SpuImage {
    id?: number
    createTime?: string
    spuId?: number
    imgName?: string
    imgUrl?: string
    // 方便 upload 组件使用
    name?: string
    url?: string
}

export interface ImagesResponseData extends ResponseData {
    data: Array<SpuImage>
}

// 销售属性
export interface SaleAttrValue {
    id?: number
    createTime?: string
    updateTime?: string
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrValueName: string
    saleAttrName?: number
    isChecked?: boolean
}

export type SaleAttrValueList = Array<SaleAttrValue>

export interface SaleAttr {
    id?: number
    createTime?: string
    updateTime?: string
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrName: string
    spuSaleAttrValueList: SaleAttrValueList
    // 编辑 | 查看模式
    flag?: boolean
    saleAttrValue?: string
}

export interface SaleAttrsResponseData extends ResponseData {
    data: Array<SaleAttr>
}

// 全部销售属性
export interface AttrsAll {
    id: number, name: string
}
export interface AllSaleAttrsResponseData extends ResponseData {
    data: Array<AttrsAll>
}

// SKU 表单
export interface SkuFormData {
    category3Id: string | number// 三级分类 ID
    spuId: string | number// SPU ID
    tmId: string | number// SKU 品牌ID
    skuName: string// SKU 名称
    price: string | number// SKU 价格
    weight: string | number// SKU 重量
    skuDesc: string// SKU 描述
    // 平台属性
    skuAttrValueList: Array<{ attrId: number | string, valueId: number | string }>
    // 销售属性
    skuSaleAttrValueList: Array<{ saleAttrId: number | string, saleAttrValueId: number | string }>
    skuDefaultImg: string// sku 图片默认地址
}

// 商品 SKU 属性
export interface SkuInfoData extends ResponseData {
    data: Array<SkuFormData>
}