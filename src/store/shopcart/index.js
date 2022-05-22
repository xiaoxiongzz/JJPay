import {
    reqShopCartList,
    reqDeleteCartById,
    reqCheckCartById
} from '@/api/index'
const state = {
    shopcartlist: []
}
const mutations = {
    SHOPCARTLIST(state, shopcartlist) {
        state.shopcartlist = shopcartlist
    }
}
const actions = {
    //获取购物车列表数据
    async getShopCartList({
        commit
    }) {
        let result = await reqShopCartList()
        if (result.code == 200) {
            commit('SHOPCARTLIST', result.data)
        }
    },
    //删除购物车商品
    async getDeleteCartId({
        commit
    }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除购物车选中商品
    async deleteAllCart({
        dispatch,
        getters
    }) {
        let promiseAll = []
        getters.shopcartlist.cartInfoList.forEach((item) => {
            let promise = item.isChecked == 1 ? dispatch('getDeleteCartId', item.skuId) : ''
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },

    //购物车是否选中
    async getCheckedCartById({
        commit
    }, {
        skuId,
        isChecked
    }) {
        let result = await reqCheckCartById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 购物车是否全选
    getCheckedAllCartById({
        dispatch,
        state
    }, isChecked) {
        let promiseAll = []
        state.shopcartlist[0].cartInfoList.forEach((item) => {
            let promise = dispatch('getCheckedCartById', {
                skuId: item.skuId,
                isChecked
            })
            promiseAll.push(promise)
        })
        //最终返回结果
        return Promise.all(promiseAll)
    }
}

const getters = {
    shopcartlist(state) {
        return state.shopcartlist[0] || {}
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}