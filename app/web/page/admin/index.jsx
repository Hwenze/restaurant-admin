import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Store from '~web/store';
import Header from '~web/component/Header';
import Sidebar from '~web/component/Sidebar';
import routerList from './router.js';
import Root from './root.js';
import { Layout } from 'antd';
import Storage from '~web/utils/storage';
import { TOKEN_KEY } from '~web/utils/constant';

const { Sider, Content } = Layout;

import './index.less';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }


  componentDidMount() {
    const { userinfo = {}, token = null, menuList = [] } = this.props;
    console.log(token);
    Storage.setItem({ name: TOKEN_KEY, value: token });
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
            <Root {...this.props} />
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}