import CommonStore from './common';


export default class Stote{
  constructor(){
    this.commonStore = new CommonStore(this);
  }
}