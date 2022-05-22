import {
    reqAddressInfo,
    reqOrderInfo
} from '@/api'
const state = {
    addressInfo: [],
    orderInfo: {}
}
const mutations = {
    ADDRESSINFO(state, addressInfo) {
        state.addressInfo = addressInfo

    },
    ORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    //获取交易地址
    async getAddressInfo({
        commit
    }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('ADDRESSINFO', result.data)
        }
    },
    //获取交易订单的信息
    async getOrderInfo({
        commit
    }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('ORDERINFO', result.data)
        }
    }
}
const getters = {
    detailArrayList(state) {
        return state.orderInfo.detailArrayList || []
    },
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}