import React, { Component } from 'react';
import queryString from 'query-string';
import { getPaginationProps, getParentUrl } from '~web/utils';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  loadData() {

  }

  // 返回上一层路由
  backUrl = () => {
    const { loacation = {} } = this.props;
    if (window.history && window.history.length > 2) {
      // 跳回上次
    } else {
      const backUrl = getParentUrl(location);
      if(backUrl){
        // 跳回上次
      }
    }

  }

  // 将对象参数push到路由
  pushUrlQuery(params){
    params = params || {};
    const {history, loacation:{pathname,query}} = this.props;
    const newQuery = {};

    Object.keys(query).forEach(key=>{
      if(!params.hasOwnProperty(key) && !key.startsWith('f_')){
        params[key] = query[key];
      }
    })

    Object.keys(params).forEach(key=>{
      if(typeof(params[key])!== 'undefined'){
        newQuery[key] = params[key];
      }
    })

    const search = Object.keys(newQuery).length === 0?'':`?${queryString.stringify(newQuery)}`;

    history.replace({pathname,search});
    this.loadData(params);
  }

  // 重置表单
  reset=(e)=>{
    const { from } = this.props;

    form.resetFields();

    this.pushUrlQuery({
      current:undefined,
      pageSize:undefined,
      sortOrder:undefined,
      sortField:undefined,
    })
  }


  // 分页排序
  handleTableChange = (pagination, filtersArg, sorter)=>{
    const { queryFrom } = this.state;
    let params = {
      ...queryFrom
    };

    params.current = pagination.current;
    params.pageSize = pagination.pageSize;
    params.sortOrder = pagination.sortOrder;
    params.sortField = pagination.sortField;
  }


  getPaginationProps = getPaginationProps;

}
