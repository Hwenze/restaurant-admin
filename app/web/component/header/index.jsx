import React from 'react'
import { Layout, Row, Col, Icon, Badge, Menu, Dropdown, Avatar, Popover } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import './index.less';

const { Header } = Layout;

class commonHeader extends React.Component {
  constructor() {
    super()
  }

  handleLogOut = () => {
    const { logout } = this.props
    logout().payload.promise.then(() => {
      this.props.history.replace('/login');
    });
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
