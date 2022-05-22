import {
    reqGetCategoryList,
    reqGetBannerList,
    reqGetFloorList
} from "@/api/index"
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const actions = {
    //获取分类列表数据
    async GetCategoryList({
        commit
    }) {
        let result = await reqGetCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //获取banner轮播图数据
    async GetBannerList({
        commit
    }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },
    //获取floor数据
    async GetFloorList({
        commit
    }) {
        let result = await reqGetFloorList()
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}