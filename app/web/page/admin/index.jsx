import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Store from '~web/store';
import Header from '~web/component/Header';
import Sidebar from '~web/component/Sidebar';
import routerList from './router.js';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

import './index.less';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }


  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // }

  render() {
    return (
      <Provider store={Store && new Store()}>
        <BrowserRouter>
          <Layout className="admin-root">
            <Header />
            <Layout className="admin-main">
              <Sider className="admin-sidebar">
                <Sidebar />
              </Sider>
              <Content className="admin-content">
                <Switch>
                  {routerList.map((item, index) => {
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
                  })}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}