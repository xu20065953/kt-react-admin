// 补充string replaceAll 方法 解决部分浏览器兼容问题
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

/**
 * 计算表格高度
 * @returns {number}
 */
export function getTableHeight() {
    let h = document.body.clientHeight;
    return h - 84 -30; // 104 导航及菜单
}

/**
 * 处理请求分页参数
 * @param data
 * @returns {{}}
 */
export function buildAxiosPageParams(data){
    let page = {};
    // 处理分页 page currentPage pageSize
    if (data.page){
        page.page = data.page;
    }

    if (data.currentPage){
        page.currentPage = data.currentPage;
    }

    if (data.pageSize){
        page.pageSize = data.pageSize;
    }
    delete data['page']
    delete data['currentPage']
    delete data['pageSize']
    return page;
}

/**
 * 处理排序参数
 * @param data
 * @returns {[]}
 */
export function buildAxiosSortParams(data){
    let sort = [];
    if (data.sort){
        sort = _.cloneDeep(data.sort);
        delete data.sort;
    }
    return sort;
}

/**
 * 对axios请求传递的参数进行统一格式化
 * @param data 处理的对象模型
 * @param groupOp 分组操作 AND 和 OR
 */
export function buildAxiosFilterParams(data) {
    let groupOp = "AND";
    if (data && data.groupOp){
        groupOp = _.cloneDeep(data.groupOp);
        delete data.groupOp;
    }

    let filters = {
        groupOp: groupOp,
        rules: []
    };
    // let cloneData = _.clone(data);

    let op_object = {};
    // 提取操字段作符并删除源数据
    Object.keys(data).forEach(item=>{
        if (item.indexOf("_op") != -1){ // 为字段比较操作符 格式如 FRoleId_op 其为FRoleId的操作符
            op_object[item.split("_")[0]] = data[item];
            delete data[item];
        }
    });

    Object.keys(data).forEach(item=>{
        if (data[item] === null || data[item] === ''){
            return false;
        }
        if (item.indexOf("_daterange") != -1 ){
            if (data[item] && data[item].length == 2){
                let key = item.split("_daterange")[0]
                let rule1 = {
                    field: key,
                    op: 'GreaterThanOrEqual',
                    data: data[item][0]
                }
                let rule2 = {
                    field: key,
                    op: 'LessThanOrEqual',
                    data: data[item][1]
                }
                filters.rules.push(rule1);
                filters.rules.push(rule2);
            }else {

            }

        }else if(item == "FEnable"){
            let rule = {
                field: item,
                op: op_object[item] || 'Equal',
                data: data[item]
            }
            filters.rules.push(rule);
        }else {
            let rule = {
                field: item,
                op: op_object[item] || 'Like',
                data: data[item]
            }
            filters.rules.push(rule);
        }

        delete data[item];

    })

    return filters;

}

/**
 * 构建树形结构
 * @param data 列表数据
 * @param id 主Id
 * @param pid 关联父Id
 * @param treeConfig 构建 tree-select 时的数据映射 如 { id: 'ForgId', label: 'FOrgFullName' }
 * @returns {*}
 * @constructor
 */
export function BuildTree(data, id, pid, treeConfig) {

    let top = data.filter(item=>{
        if (treeConfig){
            item.id = item[treeConfig.id];
            item.label = item[treeConfig.label]
        }
        return !item[pid];
    })

    function loop(top, data) {
        top.forEach(item=>{
            let children = data.filter(cate=>{
                return item[id] == cate[pid];
            });
            if (children.length){
                loop(children, data);
            }
            if (children && children.length){
                item.children = children;
            }
        })

        return top;
    }
    let result = loop(top, data);
    return result
}


/**
 * 将树形结构再次映射
 * @param data 列表数据
 * @param treeConfig 构建 tree-select 时的数据映射 如 { id: 'ForgId', label: 'FOrgFullName' }
 */
export function MapTree(data, treeConfig) {
    data.forEach(item=>{
        item.id = item[treeConfig.id]
        item.label = item[treeConfig.label]
        if (item.Children && item.Children.length){
            item.children = item.Children
        }
        if (item.children && item.children.length){
            MapTree(item.children, treeConfig)
        }
    })
    return data;
}

/**
 * 构建表格返回数据
 * @param page 表格分页数据
 * @param res 请求返回数据
 * @param callback 回调函数一些其他处理
 * @returns {*}
 * @constructor
 */
export function BuildGridResult(page, res, callback) {
    let {response} = res;
    // 执行一些其他操作
    callback && callback(response, page);

    // 返回数据 直接存放于 response 中 （不符合要求，暂时处理）
    if (!response.data){
        // 第一次时存在分页
        return page ? { result: response } : response;
    }

    // 返回没有分页 数据表格数据存于 response.data
    if (!response.dataCount && response.data){
        return page ? { result: response.data } : response.data;
    }

    return page ? {
        result: response.data,
        page: {
            pageSize: response.pageSize || page.pageSize,
            currentPage: response.currentPage || page.currentPage,
            total: response.dataCount
        }
    } : response.data;
}

/**
 * element ui 风格的保存提示
 * 确认返回 true 取消返回 false
 */
export function saveElTip(msg) {
    // let message = msg || '此操作将保存数据, 是否继续?';
    // return new Promise((resolve, reject) => {
    //     MessageBox.confirm(message , '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //     }).then(() => {
    //         resolve(true)
    //     }).catch(() => {
    //         reject(false)
    //     });
    // })

}

/**
 * element ui 风格的删除提示
 * 确认返回 true 取消返回 false
 */
export function delElTip(msg) {
    // let message = msg || '此操作将删除该数据, 是否继续?';
    // return new Promise((resolve, reject) => {
    //     MessageBox.confirm(message, '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //     }).then(() => {
    //         resolve(true)
    //     }).catch(() => {
    //         reject(false)
    //     });
    // })
}


/**
 * 寻找子ref
 * @param pRref 父节点
 * @param ref ref名称
 * @returns {null|*}
 */
export function findChildRef(pRref, ref){
    if(pRref.$refs[ref]){
        return pRref.$refs[ref]
    }
    if (pRref.$children && pRref.$children.length){
        for (let i=0;i<pRref.$children.length;i++){
            let t = findChildRef(pRref.$children[i], ref);
            if(t) return t;
        }
    }
    return null;
}


/**
 * database64文件格式转换为2进制
 *
 * @param  {[String]} data dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
 * @param  {[String]} mime [description]
 * @return {[blob]}      [description]
 */
export function data2blob(data, mime) {
    data = data.split(',')[1];
    data = window.atob(data);
    let ia = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
    };
    // canvas.toDataURL 返回的默认格式就是 image/png
    return new Blob([ia], {
        type: mime
    });
};


/**
 * 按半小时为单位计算小时
 */

export function calcHours(val){
    if (val && val.length == 2){
        let start = new Date(val[0]).getTime();
        let end = new Date(val[1]).getTime();
        let dh = (end - start)/(30 * 60 * 1000);
        let h = parseInt(dh) / 2;
        return h;
    }
    return null;
}

/**
 * 计算天数
 */
export function calcDay(val){
    if (val && val.length == 2){
        let start = new Date(val[0]).getTime() - 1000 * 60 * 60 * 24;
        let end = new Date(val[1]).getTime();
        let dh = (end - start)/(1000 * 60 * 60 * 24);
        let h = parseInt(dh);
        return h;
    }
    return null;
}




