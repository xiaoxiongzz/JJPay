            //引入axios,对axios进行二次封装
            import axios from 'axios'
            //加载进度条
            import nprogress from 'nprogress'
            import "nprogress/nprogress.css"
            //引入store,在一开始 请求数据，就获取uuid
            import store from '@/store'
            //1、利用axios对象的方法create,去创建一个axios实例
            //2、request就是axios，只不过稍微配置一下
            const requests = axios.create({
                //配置对象
                //基础路径，发送请求的时候，路径当中会出现api
                baseURL: "/api",
                //代表请求超时的时间5s
                timeout: 5000,
            })
            //请求拦截器：在发送请求之前，请求拦截器可以检测到，在请求发出去之前做一些事情
            requests.interceptors.request.use((config) => {
                if (store.state.detail.uuid_token) {
                    //在请求头 添加一个字段(userTempId)
                    config.headers.userTempId = store.state.detail.uuid_token
                    // console.log(config);
                }
                //添加token,登陆后获取个人信息
                if (store.state.user.token) {
                    config.headers.token = store.state.user.token
                }
                //进度条开始动
                nprogress.start()
                //config:配置对象，对象里面有一个属性很重要，headers请求头
                return config;
            })
            //响应拦截器
            requests.interceptors.response.use((res) => {
                // 进度条结束
                nprogress.done()
                //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，做一些事情
                return res.data
            }, (error) => {
                //响应失败的回调函数
                return Promise.reject(new Error('faile'))
            })
            export default requests