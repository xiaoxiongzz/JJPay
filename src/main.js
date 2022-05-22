import Vue from 'vue'
import App from './App.vue'
//三级联动组件————全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//引入ele组件
import {
  MessageBox,
  Button
} from 'element-ui'
//第一个参数：全局组件的名字  第二个参数 ：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
//ele注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入懒加载
import '@/puglins/vue-lazyload'
//引入表单验证
import '@/puglins/vee-validate'
//引入MockServe.js-----mock的数据
import "@/mock/MockServe"
Vue.config.productionTip = false
//引入所有接口
import * as API from '@/api'
//引入路由
import router from '@/router'
import store from '@/store'
import "../node_modules/swiper/css/swiper.css"
//引入表单校验插件
import "@/puglins/vee-validate";
new Vue({
  render: h => h(App),
  router,
  //注册仓库
  store,
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$api = API
  }
  //在vue原型上添加一个对象
}).$mount('#app')