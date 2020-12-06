import http from '@/utils/http'

// 获取所有的Role
export function getAll(data) {
    if (data && (data.queryString == '' || data.queryString == null)){
        delete data.queryString;
    }
    return http({
        url: "/api/Role/Get",
        method: 'get',
        params: {
            ...data,
            // DATA_MODEL: 'filters', // 标记是搜索时数据处理
        },
    })
}


export function add(data) {
    return http({
        url: baseUrl + '/api/Role/Post',
        method: 'post',
        data: data
    })
}

export function get(id) {
    return http({
        url: baseUrl + '/api/Role/Get/' + id,
        method: 'get'
    })
}


export function del({ FRoleId }) {
    return http({
        url: baseUrl + '/api/Role/Delete/' + FRoleId,
        method: 'delete'
    })
}

export function edit(data) {
    return http({
        url: baseUrl + '/api/Role/Put',
        method: 'put',
        data: data
    })
}

/**
 * 获取角色的权限菜单路由
 * @param data
 */
export function getRoleMenu({roleId}) {
    return http({
        url: baseUrl + `/api/Role/GetRoleMenu/${roleId}`,
        method: 'get',
    })
}

/**
 * 保存权限的角色路由
 * @param data
 */
export function saveRoleMenu(data) {
    return http({
        url: baseUrl + '/api/Role/SaveRoleMenu/' + data.roleId,
        method: 'post',
        data: data.menuIds
    })
}

/**
 * 获取角色的权限按钮
 * @param data
 */
export function getRoleBtn({roleId}) {
    return http({
        url: baseUrl + `/api/Role/GetRoleButton/${roleId}`,
        method: 'get',
    })
}

/**
 * 保存角色的权限按钮
 * @param data
 */
export function saveRoleBtn(data) {
    return http({
        url: baseUrl + `/api/Role/SaveRoleButton/${data.roleId}`,
        method: 'post',
        data: data.btnIds
    })
}


