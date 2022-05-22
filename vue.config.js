const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // publicPath: ,
  // productionSourceMap: false,  //去掉map 打包 不报错
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        /* pathRewrite: {
          "^/api": ""
        } */
      }
    }
  }

})