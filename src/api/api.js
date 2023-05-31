import request from '../utils/request'

//获取奖品信息
export function getSearch(obj) {
    return request({
        URL: '/ads/search',
        method: 'get',
        obj
        
    })
 }