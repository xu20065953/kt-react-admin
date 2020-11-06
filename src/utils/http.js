import axios from 'axios'
import Qs from 'qs'
import { getToken } from '@/utils/auth'
import { buildAxiosPageParams, buildAxiosSortParams, buildAxiosFilterParams } from "@/utils/common"


let http = axios.create({
    // timeout: Config.timeout, // 请求超时时间
    timeout: 50000, // 请求超时时间
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data, headers) {
        // 对 data 进行任意转换处理
        let isObj = Object.prototype.toString.call(data) == '[object Object]';

        if (isObj && data.DATA_MODEL == 'filters'){
            let cloneData = _.cloneDeep(data);
            delete cloneData.DATA_MODEL;
            //处理分页
            let page = buildAxiosPageParams(cloneData);
            let sort = buildAxiosSortParams(cloneData);

            //处理filter过滤字段
            let filters = buildAxiosFilterParams(cloneData);
            return JSON.stringify({
                ...page,
                sort: sort,
                filters: [filters]
            });
        }
        // console.log(Object.prototype.toString.call(data) == '[object FormData]');
        // console.log(isObj);
        if (isObj || Object.prototype.toString.call(data) == '[object Array]'){
            return JSON.stringify(data);
        }

        return data;

    }],

    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    paramsSerializer: function(params) {
        let isObj = Object.prototype.toString.call(params) == '[object Object]';

        if (isObj && params.DATA_MODEL == 'filters'){
            let cloneData = _.cloneDeep(params);
            delete cloneData.DATA_MODEL;
            //处理分页
            let page = buildAxiosPageParams(cloneData);
            let sort = buildAxiosSortParams(cloneData);

            //处理filter过滤字段
            let filters = buildAxiosFilterParams(cloneData);
            let t = Qs.stringify({
                ...page,
                sort: sort,
                filters: [filters]
            }, {arrayFormat: 'indices', allowDots: true});

            return t;
        }
        return Qs.stringify(params, { allowDots: true, arrayFormat: 'indices' })
    },
});

//返回其他状态吗
// http.defaults.validateStatus = function (status) {
//     return status >= 200 && status <= 500; // 默认的
// };
//跨域请求，允许保存cookie
http.defaults.withCredentials = false;


//HTTPrequest拦截
http.interceptors.request.use(config => {
    // config.headers['Authorization'] = "Bearer " + token
    if (getToken()) {
        config.headers['Authorization'] = "Bearer " + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
}, error => {
    Promise.reject(error)
});

let flag = 1;

//HTTPresponse拦截
http.interceptors.response.use(res => {

    let data = res.data;
    if (data.response && data.response.response){
        data = data.response;
    }

    // 后端数据格式不统一导致 前端临时处理 end

    const status = data.code || data.status;
    const message = data.msg;
    const success = data.success;

    if (status != 200){
        // Notification.error({
        //     title: '提示',
        //     message: message,
        // });

        if (status == 401){
            // store.dispatch('LogOut').then(() => {
            //     // 用户登录界面提示
            //     Cookies.set('point', 401)
            //     location.reload()
            // })
        }

        if (status == 403){
            //router.push({ path: '/401' })
        }
    }

    // 返回的是错误
    if (!success){
        let error = data.error || {};
        let errorMsg = Object.keys(error).map(item=>{
            return `${item}: ${error[item]}`
        })

        // Notification({
        //     type: "error",
        //     title: '提示',
        //     dangerouslyUseHTMLString: true,
        //     duration: 4500,
        //     message: errorMsg.join("<br />")
        // });

        return Promise.reject(data)

    }
    return data;

}, error => {
    let status = 0;
    let data = {};
    try {
        data = error.response.data
        status = data.code || data.status;
    }catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
            // Notification.error({
            //     title: '网络请求超时',
            //     duration: 5000
            // })
            return Promise.reject(error)
        }

        if (error.toString().indexOf('Error: Network Error') !== -1) {
            // Notification.error({
            //     title: 'Network Error',
            //     duration: 5000
            // })
            return Promise.reject(error)
        }
    }

    // 未登录
    if (status == 401){
        // store.dispatch('LogOut').then(() => {
        //     // 用户登录界面提示
        //     Cookies.set('point', 401)
        //     location.reload()
        // })
    }

    // 未授权
    if (status == 403){
        // router.push({ path: '/401' })
    }

    // 429 ip限流
    if(status == 429){
        // Notification.error({
        //     title: '刷新次数过多，请稍事休息重试！',
        //     duration: 5000
        // })
    }

    let m_error = data.error || {};

    let errorMsg = Object.keys(m_error).map(item=>{
        if (typeof m_error[item] == "object"){
            return m_error[item].Message
        }
        return `${m_error[item]}`
    })

    console.log(errorMsg);

    if (errorMsg && errorMsg.length){
        // Notification({
        //     type: "error",
        //     title: '提示',
        //     dangerouslyUseHTMLString: true,
        //     duration: 4500,
        //     message: errorMsg.join("<br />")
        // });
    }

    return Promise.reject(error);
});


export default http;
