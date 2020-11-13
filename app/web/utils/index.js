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
export function getPaginationProps(pagination) {
    return {
        showSize: true,
        showQuick: true,
        showTotal: total => `共 ${total} 条记录`,
        ...pagination
    }
}