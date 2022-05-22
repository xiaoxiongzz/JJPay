//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用VueRouter插件
Vue.use(VueRouter)
//引入store
import store from '@/store'
/* //引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder' */
//配置路由
//拿到router实例
let router = new VueRouter({
    routes: [{
            name: 'Center',
            path: '/center',
            component: () => import('@/pages/Center'),
            //二级路由
            children: [{
                    // path: '/center/myorder'
                    path: 'myOrder',
                    component: () => import('@/pages/Center/myOrder')
                },
                {
                    path: 'groupOrder',
                    component: () => import('@/pages/Center/groupOrder')
                },
                //重定向，一访问center，就跳到myorder
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]
        },
        {
            name: 'PaySuccess',
            path: '/paysuccess',
            component: () => import('@/pages/PaySuccess'),
            meta: {
                show: true
            },
            //路由独享守卫，只截持当前路由从那个路由来
            beforeEnter: (to, from, next) => {
                let fromPath = from.path
                //从pay路由进来的话，是允许的
                if (fromPath == '/pay') {
                    next()
                }
                //从别的路由进来则增然在原来界面
                //toPath=当前路由
                //toFrom=从哪个路由想进去的路由
                else {
                    next(fromPath)
                    // next(false) 相当于上面
                }
            }
        },
        {
            name: 'Pay',
            path: '/pay',
            component: () => import('@/pages/Pay'),
            beforeEnter: (to, from, next) => {
                let fromPath = from.path
                if (fromPath == '/trade') {
                    next()
                } else {
                    next(fromPath)
                }
            }
        },
        {
            name: 'Trade',
            path: '/trade',
            component: () => import('@/pages/Trade'),
            beforeEnter: (to, from, next) => {
                let fromPath = from.path
                if (fromPath == '/shopCart') {
                    next()
                } else {
                    next(fromPath)
                }
            }
        },
        {
            name: 'ShopCart',
            path: '/shopCart',
            component: () => import('@/pages/ShopCart')
        },
        {
            name: 'AddCartSuccess',
            path: '/addCartSuccess',
            component: () => import('@/pages/AddCartSuccess')
        },
        {
            name: 'detail',
            path: '/detail/:skuid',
            component: () => import('@/pages/Detail'),
            meta: {
                show: true
            }
        },

        {
            name: 'home',
            path: '/home',
            component: () => import('@/pages/Home'),
            meta: {
                show: true
            }
        }, {
            path: '/login',
            component: () => import('@/pages/Login'),
            meta: {
                show: false
            }
        }, {
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: {
                show: false
            }
        }, {
            name: 'search',
            //占位符后面加问号，params可传可不传
            path: '/search/:keyword?',
            component: () => import('@/pages/Search'),
            meta: {
                show: true
            },
            /* //简写 去掉return 加括号
            props: ($route) => ({
                value: $route.query.value
            }) */
        },
        //重定向，已加载就去home组件
        {
            path: '/',
            redirect: '/home'
        }

    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {
            y: 0
        }
    }
})
//全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转的那个路由信息
    //from:可以获取到你从哪个路由跳转的那个路由信息
    //next:  放行函数  next() 放行  next(path)放行到指定路由
    //用户有没有登录看有没有Token
    let token = store.state.user.token
    // 通过判断有没有name属性, 来看有没有获取到用户信息（userInfo）
    let name = store.state.user.userInfo.name
    let toPath = to.path
    //用户登录了
    if (token) {
        //用户登陆后不能再进登录组件,则停留在home首页
        if (toPath == '/login' || toPath == '/register') {
            next(from.path)
        } else {

            //有userInfo,则放行
            if (name) {
                next()
            }
            //第一次加载，或者每次刷新都要重新派发actions
            //没有userInfo，一刷新就要重新获取信息---重新派发actions获取用户信息 再跳转当前组件 (请求失败、请求成功---try,catch)
            else {
                try {
                    await store.dispatch("user/UserInfoByToken");
                    next()
                } catch (error) {
                    //登录不成功，就是token失效，重新登录获取token,在这之前要清除原来的信息返回给服务器
                    await store.dispatch('user/userLoginOut')
                    next('/login')
                }
            }
        }
    } else {
        next()
        //未登录不能去往订单界面
        if (toPath == '/pay' || toPath == '/paysuccess' || toPath == '/trade' || toPath == '/center/myorder') {
            alert('请先登录')
            //登录后跳到想去 的组件，携带query参数传给登录组件
            console.log(111);
            next('/login?redirect=' + toPath)
        } else {
            next()

        }
    }
})


//解决点击搜索多次报错 
//重写push/replace
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
//对外暴露
export default router