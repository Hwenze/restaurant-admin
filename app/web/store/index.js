import CommonStore from './common';
import UserStore from './user';
import OperateStore from './operate';
import ProductStore from './product';
import OrderStore from './order';


export default class Stote{
  constructor(){
    this.commonStore = new CommonStore(this);
    this.userStore = new UserStore(this);
    this.operateStore = new OperateStore(this);
    this.productStore = new ProductStore(this);
    this.orderStore = new OrderStore(this);
  }
}