import CommonStore from './common';
import UserStore from './user';
import OperateStore from './operate';
import ProductStore from './product';


export default class Stote{
  constructor(){
    this.commonStore = new CommonStore(this);
    this.userStore = new UserStore(this);
    this.operateStore = new OperateStore(this);
    this.productStore = new ProductStore(this);
  }
}