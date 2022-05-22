    //当前这个模块：对API进行统一的管理
    import requests from './ajax'
    import mockRequest from './mockAjax'
    //?三级联动接口
    ///api/product/getBaseCategoryList  get 
    //发送请求：axios 发请求返回结果Promise对象
    export const reqGetCategoryList = () => requests.get(`/product/getBaseCategoryList`)
    //?虚拟数据mock,----banner
    export const reqGetBannerList = () => mockRequest.get(`/banner`)
    //?虚拟数据mock,----floor
    export const reqGetFloorList = () => mockRequest.get(`/floor`)

    //?获取搜索模块数据，，地址：/api/list  请求方式：post  s参数：需要带
    export const reqGetSearchList = (params) => requests({
        url: '/list',
        method: 'post',
        data: params
    })

    //?获取产品详情信息的接口  /api/item/{ skuId }  get
    export const reqGoodsInfo = (skuId) => requests({
        url: `/item/${skuId}`,
        method: 'get'
    })
    //?添加到购物车(对已有物品进行数量改动) /api/cart/addToCart/{ skuId }/{ skuNum }  POST
    export const reqShopCart = (skuId, skuNum) => requests({
        url: `/cart/addToCart/${ skuId }/${ skuNum }`,
        method: 'post'
    })
    //?获取购物车列表数据接口  /api/cart/cartList   GET
    export const reqShopCartList = () => requests({
        url: `/cart/cartList`,
        method: 'get'
    })
    //?删除购物车商品   /api/cart/deleteCart/{skuId}  DELETE
    export const reqDeleteCartById = (skuId) => requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
    //?切换商品选中状态  /api/cart/checkCart/{skuID}/{isChecked}  GET
    export const reqCheckCartById = (skuId, isChecked) => requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
    //?获取验证码  /api/user/passport/sendCode/{phone}    GET
    export const reqCodeByPhone = (phone) => requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
    //?注册用户  /api/user/passport/register   POST
    export const reqUserRegister = (data) => requests({
        url: `/user/passport/register`,
        data,
        method: 'post'
    })
    //?登录账号  /api/user/passport/login   POST
    export const reqUserLogin = (data) => requests({
        url: `/user/passport/login`,
        data,
        method: 'post'
    })
    //?token校验 获取用户信息通过token /api/user/passport/auth/getUserInfo  GET
    export const reqUserInfoByToken = () => requests({
        url: `/user/passport/auth/getUserInfo `,
        method: 'get'
    })
    //? 退出登陆   /api/user/passport/logout  GET
    export const reqUserLoginOut = () => requests({
        url: `/user/passport/logout`,
        method: 'get'
    })
    //?获取用户地址信息   /api/user/userAddress/auth/findUserAddressList   get
    export const reqAddressInfo = () => requests({
        url: `/user/userAddress/auth/findUserAddressList `,
        method: 'get'
    })
    //?  获取订单交易页信息  /api/order/auth/trade  GET 
    export const reqOrderInfo = () => requests({
        url: `/order/auth/trade `,
        method: 'get'
    })
    //?提交订单   /api/order/auth/submitOrder?tradeNo={tradeNo}    POST
    export const reqSubmitOrder = (tradeNo, data) => requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'post'
    })
    //?13. 获取订单支付信息   /api/payment/weixin/createNative/{orderId}   GET
    export const reqSubmitOrderInfo = (orderId) => requests({
        url: `/payment/weixin/createNative/${orderId} `,
        method: 'get'
    })
    //?  查询支付订单状态    /api/payment/weixin/queryPayStatus/{orderId}   GET
    export const reqPayStatus = (orderId) => requests({
        url: `/payment/weixin/queryPayStatus/${orderId}  `,
        method: 'get'
    })
    //?   获取我的订单列表   /api/order/auth/{page}/{limit}    GET
    export const reqOrderList = (page, limit) => requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })