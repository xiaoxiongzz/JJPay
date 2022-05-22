import Vue from 'vue'
//引入懒加载loading图片
import loadingpic from '@/assets/th.jpg'
//引入懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: loadingpic
})