

import axios from '~web/utils/axios';

export const orderService = {
    // 查询商品信息
    getOrderInfo(id) {
        return axios.get(`/order/getOrderInfo/${id}`);
    },
    // 查询商品列表
    getOrderList(params) {
        return axios.get('/order/getOrderList', params);
    },
    // 获取未完成的订单数量
    getOrderStatusCount(){
        return axios.get('/order/getOrderStatusCount');
    }
}
