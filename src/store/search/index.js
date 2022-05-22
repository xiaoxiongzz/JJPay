import {
    reqGetSearchList
} from '@/api/index'
const state = {
    searchList: {},
    total: ''
}
//向服务器发请求获取数据
const actions = {
    async getSearchList({
        commit
    }, params = {}) {
        let result = await reqGetSearchList(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }

}
//去进一步的处理数据，从而更方便的拿走数据，但是要等state数据请求回来之后
const getters = {
    attrsList(state) {
        // || 考虑网速，state中的数据没有返回之前，getter拿不到attrsList、goodsList、trademarkList 从而为undefined
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    total(state) {
        return state.searchList.total
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}