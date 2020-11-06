import http from "@/utils/http";
import axios from 'axios'

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
