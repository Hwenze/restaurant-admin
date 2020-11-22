import { observable, action } from 'mobx';
import { orderService, categoryService } from '~web/service/order';

const state = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  // 订单列表
  orderList: [],
}

export default class Common {
  @observable state = state;

  @action getOrderList(params = {}) {
    const pagination = {
      current: params && params.current ? parseInt(params.current) : 1,
      pageSize: params && params.pageSize ? parseInt(params.pageSize) : 10,
    };
    const options = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      order_id: params.q_orderId,
      member_id:params.q_memberId,
      status: params.q_status,
    }
    return new Promise((resolve, reject) => {
      orderService.getOrderList(options).then(res => {
        if (res.code === 200 && res.data) {
          this.state.orderList = res.data.list;
          this.state.pagination = {
            ...pagination,
            total: res.data.total
          }
        }
        resolve(res);
      }).catch(err => {
        resolve(err);
      })
    })
  }

  @action reset() {
    this.state = state;
  }

}