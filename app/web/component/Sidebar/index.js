import React from 'react'
import { withRouter, matchPath } from 'react-router'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom';
import sidebarList from '~web/utils/sidebar';
import './index.less';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const { Sider } = Layout;

const isActive = (path, history) => {
  return matchPath(path, {
    path: history.location.pathname,
    exact: true,
    strict: false
  })
}

class Sidebar extends React.Component {

  state = {
    openKey: "",
    activeKey: "",
    collapsed: false,
    mode: 'inline',
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: !this.state.collapsed ? 'vertical' : 'inline',
    });
  }

  componentDidMount() {
    console.log(this.props);
    // this.props.getAllMenu()
  }

  componentWillReceiveProps(nextProps) {
    Array.isArray(nextProps.items) && nextProps.items.map((item, i) => {
      Array.isArray(item.child) && item.child.map((node) => {
        if (node.url && isActive(node.url, this.props.history)) {
          this.menuClickHandle({
            key: 'menu' + node.key,
            keyPath: ['menu' + node.key, 'sub' + item.key]
          })
        }
      })
    });
  }

  menuClickHandle = (item) => {
    this.setState({
      activeKey: item.key
    })
    this.props.updateNavPath(item.keyPath, item.key)
  }

  render() {
    const { items, updateNavPath, history, menuList = [] } = this.props
    let { activeKey, openKey } = this.state;

    const _menuProcess = (nodes, pkey) => {
      return Array.isArray(nodes) && nodes.map((item, i) => {
        if (menuList.indexOf(item.path) === -1) {
          return null;
        } else {
          const menu = _menuProcess(item.children, item.path);
          if (item.path && isActive(item.path, history)) {
            activeKey = 'menu' + item.path
            openKey = 'sub' + item.path
          }
          if (Array.isArray(menu) && menu.length > 0) {
            return (
              <SubMenu
                key={'sub' + item.path}
                title={<span><i className={`anticon ${item.icon}`} /><span className="nav-text">{item.title}</span></span>}
              >
                {menu}
              </SubMenu>
            )
          } else {
            return (
              <Menu.Item key={'menu' + item.path}>
                {
                  item.path ? <Link to={item.path}>{item.icon && <i className={`anticon ${item.icon}`} />}{item.title}</Link> : <span>{item.icon && <i className={`anticon ${item.icon}`} />}{item.title}</span>
                }
              </Menu.Item>
            )
          }
        }
      });
    }

    const menu = _menuProcess(sidebarList);

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="ant-layout-logo"></div>
        <Menu
          mode={this.state.mode} theme="dark"
          selectedKeys={[activeKey]}
          defaultOpenKeys={[openKey]}
          className="sidebar"
          onClick={this.menuClickHandle}
        >
          {menu}
        </Menu>
      </Sider>
    )
  }
}


export default withRouter(Sidebar);