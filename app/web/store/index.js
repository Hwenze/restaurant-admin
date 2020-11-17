import CommonStore from './common';
import UserStore from './user';
import OperateStore from './operate';


export default class Stote{
  constructor(){
    this.commonStore = new CommonStore(this);
    this.userStore = new UserStore(this);
    this.operateStore = new OperateStore(this);
  }
}