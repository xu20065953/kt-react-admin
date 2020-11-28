import axios from 'axios'
import { getToken } from '@/utils/auth'

/**
 * 登录
 * @param data
 */
export function login(data){
    let form = new FormData();
    form.append("client_id", "mvc");
    form.append("client_secret", "123456");
    form.append("grant_type", "password");
    form.append("username", data.username);
    form.append("password", data.password);

    return axios({
        url: '/auth/connect/token',
        method: 'post',
        data: form
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
