import React, { Component } from 'react';

import Header from '~web/component/Header';
import Sidebar from '~web/component/Sidebar';
import routerList from './router.js';
import BaseComponent from '~web/layout/base';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import NotFound from '~web/page/admin/notFound';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

const { Sider, Content } = Layout;

@inject(('store'))
@observer
export default class Root extends Component {


  componentDidMount() {
    const { store, userinfo = {}, menuList = [] } = this.props;
    const { commonStore } = store;
    commonStore.setUserinfo(userinfo);
    commonStore.setMenulist(menuList);
  }



  render() {
    const { store: { commonStore }, menuList = [] } = this.props;
    console.log('menuList', this.props);
    return (
      <Layout className="admin-main">
        <Sider className="admin-sidebar">
          <Sidebar menuList={menuList} />
        </Sider>
        <Content className="admin-content">
          <Header />
          <div className='admin-container'>
            <Switch>
              {routerList.map((item, index) => {
                if(Array.isArray(item.path)){
                  if(item.path.findIndex(it=>{
                    return menuList.includes(it);
                  }) === -1){
                    return null;
                  }
                }
                // else {
                if (item.redirect) {
                  return <Redirect key={index} to={item.redirect} />
                }
                return (
                  <Route key={index}
                    path={item.path}
                    exact={item.exact}
                    strict={item.strict}
                    component={item.component}
                  ></Route>
                )
                // }
              })}
            </Switch>
          </div>
        </Content>
      </Layout>
    )
  }
}