import { observable , action } from 'mobx';


const state = {
    index:1, // 
    userinfo : {}, // 用户信息
    menuList:[], // 用户菜单
}

export default class Common{
    @observable state = state;

    @action setIndex(index){
        this.state.index = index;
    }

    @action reset(){
        this.state = state;
    }

    @action setUserinfo(data){
        this.state.userinfo = data;
    }

    @action setMenulist(menuList){
        this.state.menuList = menuList;
    }

}