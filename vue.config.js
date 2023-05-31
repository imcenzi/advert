const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'https://vapi.suozhikeji.cn/api', // 目标服务器
    //     changeOrigin: true,
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     pathRewrite: {   // 路径重写
    //       '^/api': '' // 替换target中的请求地址
    //     }
    //   }
    // }
  }
})

// 引入等比适配插件
const px2rem = require('postcss-px2rem');
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16,
});




