import queryString from 'querystring';

export const jsonParse = (jsonString) => {
    let json;
    try {
        json = JSON.parse(jsonString);
    } catch (error) {
        //如果不行就不是json的字符串，就直接返回
        json = jsonString;
    }
    return jsonString;
}

/**
 * 获取父级 url
 * @param {string} location 页面当前 url 信息对象
 */
export function getParentUrl(location) {
    let { pathname, search } = location;
    let backUrl = '';
    if (!pathname) {
        return backUrl;
    }

    const reg = /^\/.*\//;
    const regResult = pathname.match(reg);
    if (regResult && regResult[0]) {
        backUrl = regResult[0];

        const tailReg = /\/$/;

        // 如果尾部带有 /，则把 / 去掉
        if (tailReg.test(backUrl)) {
            backUrl = backUrl.replace(tailReg, '');
        }

        if (search) {
            backUrl += search;
        }
    }

    return backUrl;
}


// 分页属性
export function showPagination(pagination) {
    return {
        showSize: true,
        showQuick: true,
        showTotal: total => `共 ${total} 条记录`,
        ...pagination
    }
}


// 获取url参数
export function gerUrlQuery(location = window.loaction) {
    let args = {};
    try {
        let search = location.search;
        search = search.startsWith('?') ? search.substr(1) : search;
        args = queryString.parse(search);
    } catch (err) {
        console.log(err);
    }
    return args;
}

// 去除前后空格
export function trim(value) {
    if (!value || typeof value !== 'string') {
        return value;
    }
    if (typeof value.trim === 'function') {
        return value.trim();
    }
    return value.replace(/^[\s+|\t+]|[\s+|\t+]$/gm, '');
}

// 过滤非法字符
export function filterIllegal(value, isTrim) {
    if (!value) {
        return value;
    }
    return isTrim ? trim(value.replace(/\u200B/ig, '')) : value.replace(/\u200B/ig, '');
}

// 根据map的value返回label
export function mapValue(arr, target = '', format={}) {
    const { label = 'label', value = 'value' } = format;
    if (!Array.isArray(arr)) {
        return ''
    }
    if (!target) {
        return target;
    }
    let resultLabel = '';
    for (const item of arr) {
        if (item[value] === target) {
           resultLabel = item[label];
        }
    }
    return resultLabel;
}
