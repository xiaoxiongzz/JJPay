import {
    reqGoodsInfo,
    reqShopCart,
    reqCheckCartStatus
} from '@/api/index'
//封装游客身份uuid----->生成一个随机字符串(不可改变了)
import {
    getUUID
} from '@/utils/uuid_token'
const state = {
    goodsInfo: {},
    //游客临时身份
    uuid_token: getUUID()
}
const actions = {
    //获取商品详情
    async getGoodsInfo({
        commit
    }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GOODSINFO', result.data)

        }
    },
    //获取购物车数据
    async GetShopCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        let result = await reqShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || [
            []
        ]
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}