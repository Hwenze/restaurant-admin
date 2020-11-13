import React from 'react'
import { withRouter, matchPath } from 'react-router'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

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
    openKey: "sub1",
    activeKey: "menu101",
    collapsed: false,
    mode: 'inline',
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: !this.state.collapsed ? 'vertical' : 'inline',
    });
  }

  componentDidMount () {
    // this.props.getAllMenu()
  }

  componentWillReceiveProps(nextProps) {
    Array.isArray(nextProps.items) && nextProps.items.map((item, i) => {
      Array.isArray(item.child) && item.child.map((node) => {
        if(node.url && isActive(node.url, this.props.history)){
          this.menuClickHandle({
            key: 'menu'+node.key,
            keyPath: ['menu'+node.key, 'sub'+item.key]
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

  render () {
    const { items, updateNavPath, history } = this.props
    let { activeKey, openKey } = this.state

    const _menuProcess = (nodes, pkey) => {
      return Array.isArray(nodes) && nodes.map((item, i) => {
        const menu = _menuProcess(item.child, item.key);
        if(item.url && isActive(item.url, history)){
          activeKey = 'menu'+item.key
          openKey = 'sub'+pkey
        }
        if (menu.length > 0) {
          return (
            <SubMenu
              key={'sub'+item.key}
              title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}
            >
              {menu}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={'menu'+item.key}>
              {
                item.url ? <Link to={item.url}>{item.icon && <Icon type={item.icon} />}{item.name}</Link> : <span>{item.icon && <Icon type={item.icon} />}{item.name}</span>
              }
            </Menu.Item>
          )
        }
      });
    }

    // const menu = _menuProcess(items);

    return (
      <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
        <div className="ant-layout-logo"></div>
        {/* <Menu
          mode={this.state.mode} theme="dark"
          selectedKeys={[activeKey]}
          defaultOpenKeys={[openKey]}
          onClick={this.menuClickHandle}
        >
          {menu}
        </Menu> */}
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" title="subnav 1">
            <MenuItem key="1">
              <Link to="/user/list">列表页</Link>
            </MenuItem>
            <MenuItem key="2">
              <Link to="/user/detail">详情页</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
        <div className="sider-trigger">
          <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
        </div>
      </Sider>
    )
  }
}


export default withRouter(Sidebar);