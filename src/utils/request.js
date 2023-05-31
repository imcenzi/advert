import axios from 'axios'
// import {
//     Toast
// } from 'vant';
import qs from 'qs'
import router from '../router'
 
// 创建axios 实例
const service = axios.create({
    baseURL: 'https://ads.piqiu.gold',  //请求根路径
    timeout: 10000, //超时时间，10秒
    loading: true,
})
 
//请求拦截器
service.interceptors.request.use(
    config => {
        if (config.method === "get") {
            config.data = {
                unused: 0
            }; // 这个是关键点，加入这行就可以解决get请求添加不上Content-Type
        }
        // 配置请求头
        if (config.url === "/a/login") {
            config.data = qs.stringify(config.data);
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        } else {
            config.headers["Content-type"] = "application/json;charset=UTF-8";
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);
 
//响应拦截器
service.interceptors.response.use(response => {
    // console.log(response);
    // 不做处理，请求成功直接返回
    // return response
 
    // 做处理，如果未登录强制跳到登录页面
    if (response.data.code === '0000') {
        return Promise.resolve(response)
    } else {
        if (response.data.code == '0001') {
            // Toast('您还没有登陆噢~');
          console.log("您还没有登陆噢");
            setTimeout(() => {
                router.push('/login');
            }, 1500)
        } else {
            return Promise.resolve(response)
        }
    }
}, error => {
    // console.log(error); //打印错误
    // 请求超时 ， 跳到无网络页面
    if (error.message.includes('timeout')) {
        // Toast("请求超时，请检查网络后重试")
        console.log("请求超时，请检查网络后重试");
      
        router.push('/no_network');
    }
    return Promise.reject(error)
})
 
export default service