import React from 'react';
import { Layout, Row, Col, Icon, Badge, Menu, Dropdown, Avatar, Popover, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { selfService } from '~web/service/self';
import './index.less';

const { Header } = Layout;

class commonHeader extends React.Component {
  constructor() {
    super()
  }

  handleLogOut = () => {
    const result = selfService.logout({});
    result.then(res => {
      message.success('注销成功！');
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }).catch(err => {
      message.error('注销失败！');
    })
  }

  setCookie = (c_name, value, expiredays) => {                   
    const exdate = new Date();                   
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "="+ escape (value) + ";expires=" + exdate.toGMTString();
} 

  render() {
    const { profile = {} } = this.props;
    let username = profile.user ? profile.user.name : '测试用户';
    const menu = (
      <Menu>
        <Menu.Item>
          选项1
        </Menu.Item>
        <Menu.Item>
          选项2
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.handleLogOut}>注销</a>
        </Menu.Item>
      </Menu>
    );

    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </div>
    );

    return (
      <Header className="admin-header" >
        <div className="sider-trigger">
          <Icon
            className="trigger"
            type='menu-unfold'
          />
        </div>
        <div className="header-right">
          <Badge className="header-icon" count={5}>
            <Link to="/mailbox">
              <Icon type="mail" />
            </Link>
          </Badge>
          <Popover content={content} title="Title" trigger="click">
            <Badge className="header-icon" dot>
              <a href="#">
                <Icon type="notification" />
              </a>
            </Badge>
          </Popover>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              <Avatar style={{ verticalAlign: 'middle' }}>{username}</Avatar> <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default withRouter(commonHeader)
