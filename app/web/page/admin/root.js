import React, { Component } from 'react';

import Header from '~web/component/Header';
import Sidebar from '~web/component/Sidebar';
import routerList from './router.js';
import BaseComponent from '~web/layout/base';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
const { Sider, Content } = Layout;
import { withRouter } from 'react-router-dom';

@inject(('store'))
@observer
class Root extends BaseComponent {


  componentDidMount() {
    const { store, userinfo = {}, menuList = [] } = this.props;
    const { commonStore } = store;
    commonStore.setUserinfo(userinfo);
    commonStore.setMenulist(menuList);
  }



  render() {
    const { store: { commonStore }, menuList = [] } = this.props;
    return (
      <Layout className="admin-main">
        <Sider className="admin-sidebar">
          <Sidebar menuList={menuList} />
        </Sider>
        <Content className="admin-content">
          <Header />
          <div className='admin-container'>
            <Switch>
              {menuList.map((item, index) => {
                if (routerList[item]) {
                  const CURRENT_ROUTER = routerList[item];
                  if (CURRENT_ROUTER.redirect) {
                    <Redirect key={index} to={CURRENT_ROUTER.redirect} />
                  }
                  return <Route key={index}
                    path={CURRENT_ROUTER.path}
                    exact={CURRENT_ROUTER.exact}
                    strict={CURRENT_ROUTER.strict}
                    component={CURRENT_ROUTER.component}
                  ></Route>
                }
              })}
              <Route key='/404'
                path={routerList['/404'].path}
                exact={routerList['/404'].exact}
                strict={routerList['/404'].strict}
                component={routerList['/404'].component}
              ></Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    )
  }
}


export default withRouter(Root)