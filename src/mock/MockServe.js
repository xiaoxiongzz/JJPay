//引入Mock对象
import Mock from 'mockjs'
//引入json数据格式
//json数据格式不需要操作对外暴露
//webpack默认对外暴露：图片，json数据格式
import banner from './banner.json'
import floor from './floor.json'
//mock数据：第一个参数请求地址   第二个参数：请求数据
Mock.mock("/mock/floor", {
    code: 200,
    data: floor
})
//模拟首页大轮播图的数据
Mock.mock("/mock/banner", {
    code: 200,
    data: banner
})