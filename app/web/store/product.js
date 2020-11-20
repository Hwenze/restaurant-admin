import { observable, action } from 'mobx';
import { productService, categoryService } from '~web/service/product';

const state = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  // 商品列表
  productList: [],
  // 分类列表
  categoryList: [],
}

export default class Common {
  @observable state = state;

  @action getProductList(params = {}) {
    const pagination = {
      current: params && params.current ? parseInt(params.current) : 1,
      pageSize: params && params.pageSize ? parseInt(params.pageSize) : 10,
    };
    const options = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      title: params.q_title,
      id: params.q_id,
      status: params.q_status,
    }
    return new Promise((resolve, reject) => {
      productService.getProductList(options).then(res => {
        if (res.code === 200 && res.data) {
          this.state.productList = res.data.list;
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


  @action getCategoryList(params = {}) {
    const pagination = {
      current: params && params.current ? parseInt(params.current) : 1,
      pageSize: params && params.pageSize ? parseInt(params.pageSize) : 10,
    };
    const options = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      name: params.q_name,
      id: params.q_id,
      status: params.q_status,
    }
    return new Promise((resolve, reject) => {
      categoryService.getCategoryList(options).then(res => {
        if (res.code === 200 && res.data) {
          this.state.categoryList = res.data.list;
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