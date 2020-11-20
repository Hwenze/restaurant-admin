

import axios from '~web/utils/axios';

export const productService = {
    // 查询商品信息
    getProductInfo(id) {
        return axios.get(`/product/getProductInfo/${id}`);
    },
    // 查询商品列表
    getProductList(params) {
        return axios.get('/product/getProductList', params);
    },
    // 保存商品
    saveProduct(params) {
        return axios.post('/product/saveProduct', params)
    },
    // 上下架商品
    changeProductStatus(id) {
        return axios.post('/product/changeProductStatus', { id })
    }
}

export const categoryService = {
    // 查询分类列表
    getCategoryList(params) {
        return axios.get('/product/getCategoryList', params);
    },
    // 上下架分类
    changeCategoryStatus(id) {
        return axios.post('/product/changeCategoryStatus', { id });
    }
}
