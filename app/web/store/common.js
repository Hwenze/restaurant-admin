import { observable , action } from 'mobx';


const state = {
    index:1,
}

export default class Common{
    @observable state = state;

    @action setIndex(index){
        this.state.index = index;
    }

    @action reset(){
        this.state = state;
    }

}