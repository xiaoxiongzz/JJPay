import {
    reqCodeByPhone,
    reqUserRegister,
    reqUserLogin,
    reqUserInfoByToken,
    reqUserLoginOut
} from '@/api'
import {
    setToken,
    getToken,
    reToken
} from '@/utils/token'
//注册登录的模块
const state = {
    code: '',
    token: getToken(),
    userInfo: {}

}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //退出登录清除数据
    LOGINOUT(state) {
        state.userInfo = ''
        state.token = ''
        reToken()
    }
}
const actions = {
    //获取验证码
    async getCode({
        commit
    }, phone) {
        let result = await reqCodeByPhone(phone)
        if (result.code = 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //注册账号
    //只传参，没从服务器带数据，不用commit
    async userRegister({
        commit
    }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录账号(校验)---是否成功
    async userLogin({
        commit
    }, data) {
        let result = await reqUserLogin(data)
        //持久化存储token
        setToken(result.data.token)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息，先登陆成功(必须有(token)再获取
    async UserInfoByToken({
        commit
    }) {
        let result = await reqUserInfoByToken()
        if (result.code == 200) {
            commit('USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录,---清除用户信息和token,,！！要在mutations里修改数据
    async userLoginOut({
        commit
    }) {
        let result = await reqUserLoginOut()
        if (result.code == 200) {
            commit("LOGINOUT")
        }
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