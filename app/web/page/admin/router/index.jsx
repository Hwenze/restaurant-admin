import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import Home from './home/index';
import About from './about/index';
import './index.css';

const { Header, Sider, Content } = Layout;

export default class AppRoute extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'easy-admin',
      collapsed: false,
      defaultSelectedKeys: [this.props.url]
    };
  }

  toggle() {
    this.setState({
      title: this.state.collapsed ? 'easy-admin' : 'admin',
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout className="admin" style={{height:"100vh"}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">{ this.state.title }</div>
          <Menu className={ this.state.collapsed ? 'left-menu-collapsed' : 'left-menu'} 
            theme="dark" mode="inline" defaultSelectedKeys={this.state.defaultSelectedKeys}>
            <Menu.Item key="/">
              <Icon type="home" />
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Icon type="video-camera" />
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={()=>this.toggle()}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/about" component={About}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}