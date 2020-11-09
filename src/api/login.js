import axios from 'axios'
import { getToken } from '@/utils/auth'

/**
 * 登录
 * @param data
 */
export function login(data){
    return axios({
        url: '/auth/connect/token',
        method: 'post',
        data: data
    })
}

/**
 *
 */
export function getUserInfo(){
    return axios({
        url: '/auth/connect/userinfo',
        method: 'get',
        headers: {
            'Authorization' : "Bearer " + getToken()
        }
    }).then(res=>{
        return res;
    }).catch(err=>{
        console.log(err, '获取用户信息出错');
    })
}
