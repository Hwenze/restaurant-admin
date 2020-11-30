import React from 'react';
import { Layout, Row, Col, Icon, Badge, Menu, Dropdown, Avatar, Popover, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { selfService } from '~web/service/self';
import { orderService } from '~web/service/order';
import {
  PoweroffOutlined,
  UserOutlined,
  HomeOutlined,
  SoundOutlined,
  SmileOutlined
} from '@ant-design/icons';
import './index.less';
const userState = window.__INITIAL_STATE__;


const { Header } = Layout;

class commonHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  componentDidMount() {
    orderService.getOrderStatusCount().then(res => {
      if (res.code === 200) {
        this.setState({
          count: res.data.count
        })
      }
    })
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

  render() {
    const { userinfo = {} } = userState;
    const { count } = this.state;
    const { avatar = '', nickname = '', shop_name = '' } = userinfo;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to={'/operate/shop'}>
            <HomeOutlined />
            查看店铺信息
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.handleLogOut}>
          <PoweroffOutlined />
          退出
        </Menu.Item>
      </Menu>
    );

    const content = (
      <div>
        {count > 0 ?
          <Link to={'/order/list?current=1&q_status=0'}>有{count}条订单未处理</Link>
          :
          <>
            <SmileOutlined />
            <span>暂无要处理的订单</span>
          </>
        }
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
          <Popover content={content} title="系统消息" trigger="click">
            {count > 0 ?
              < Badge className="header-icon" count={count}>
                <SoundOutlined style={{ fontSize: '24px' }} />
              </Badge> :
              <SoundOutlined style={{ fontSize: '24px' }} />
            }
          </Popover>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" >
              {avatar ?
                <Avatar style={{ verticalAlign: 'middle' }} src={avatar} />
                :
                <Avatar style={{ verticalAlign: 'middle', backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
              <Icon type="down" />
              <span className="admin-nickname">{nickname}</span>
            </a>
          </Dropdown>
        </div>
      </Header >
    )
  }
}

export default withRouter(commonHeader)
