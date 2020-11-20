import {
  CoffeeOutlined,
  FileDoneOutlined,
  TeamOutlined,
  DesktopOutlined,
  BarChartOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';
import React from 'react';

export default [
  {
    path:'/member',
    title:'会员模块',
    icon:<TeamOutlined/>,
    redirect:'/member/list',
    children:[
      {
        path:'/member/list',
        title:'会员列表',
        icon:'',
      },
    ]
  },
  {
    path:'/order',
    title:'订单模块',
    icon:<FileDoneOutlined />,
    redirect:'/order/list',
    children:[
      {
        path:'/order/list',
        title:'订单列表',
        icon:'',
      },
    ]
  },
  {
    path:'/product',
    title:'商品模块',
    icon:<CoffeeOutlined />,
    redirect:'/product/list',
    children:[
      {
        path:'/product/list',
        title:'商品列表',
        icon:'',
      },
      {
        path:'/product/category',
        title:'商品分类',
        icon:'',
      }
    ]
  },
  {
    path:'/operate',
    title:'运营模块',
    icon:<DesktopOutlined />,
    redirect:'/operate/user',
    children:[
      {
        path:'/operate/home',
        title:'运营首页',
        icon:'',
      },
      {
        path:'/operate/user',
        title:'运营人员',
        icon:'',
      },
      {
        path:'/operate/role',
        title:'权限列表',
        icon:'',
      },
    ]
  },
  {
    path:'/report',
    title:'报表模块',
    icon:<BarChartOutlined />,
    redirect:'/report/finance',
    children:[
      {
        path:'/report/finance',
        title:'报表人员',
        icon:'',
      },
    ]
  },
  {
    path:'/other',
    title:'其他模块',
    icon:<AppstoreAddOutlined />,
    redirect:'/other/user-agreement',
    children:[
      {
        path:'/other/user-agreement',
        title:'用户协议',
        icon:'',
      },
    ]
  }
]