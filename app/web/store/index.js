import CommonStore from './common';
import UserStore from './user';


export default class Stote{
  constructor(){
    this.commonStore = new CommonStore(this);
    this.userStore = new UserStore(this);
  }
}