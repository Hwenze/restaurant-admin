import Loadable from 'react-loadable';
import React from 'react';

let routeConfig = {
  '/': {
    path: ['/'],
    component: () => import('~web/page/admin/home')
  },
  /* -----会员模块----- */
  '/member': {
    path: ['/member'],
    component: () => import('~web/page/admin/member/list')
  },
  // 会员列表
  '/member/list': {
    path: ['/member/list'],
    component: () => import('~web/page/admin/member/list')
  },
  // 会员详情
  '/member/detail': {
    path: ['/member/detail'],
    component: () => import('~web/page/admin/member/detail')
  },
  /* -----商品模块----- */
  '/product': {
    path: ['/product'],
    component: () => import('~web/page/admin/product/list')
  },
  // 商品列表
  '/product/list': {
    path: ['/product/list'],
    component: () => import('~web/page/admin/product/list')
  },
  // 商品详情
  '/product/detail': {
    path: ['/product/detail/add', '/product/detail/:id'],
    component: () => import('~web/page/admin/product/detail')
  },
  // 商品分类
  '/product/category': {
    path: ['/product/category'],
    component: () => import('~web/page/admin/product/category')
  },
  /* -----订单模块----- */
  '/order': {
    path: ['/order'],
    component: () => import('~web/page/admin/order/list')
  },
  // 订单列表
  '/order/list': {
    path: ['/order/list'],
    component: () => import('~web/page/admin/order/list')
  },
  // 订单详情
  '/order/detail': {
    path: ['/order/detail/:id'],
    component: () => import('~web/page/admin/order/detail')
  },
  /* -----运营模块----- */
  '/operate': {
    path: ['/operate'],
    component: () => import('~web/page/admin/operate/user')
  },
  // 运营模块-首页
  '/operate/home': {
    path: ['/operate/home'],
    component: () => import('~web/page/admin/operate/home')
  },
  // 后台人员列表
  '/operate/user': {
    path: ['/operate/user'],
    component: () => import('~web/page/admin/operate/user')
  },
  // 权限列表
  '/operate/role': {
    path: ['/operate/role'],
    component: () => import('~web/page/admin/operate/role')
  },
  // 权限列表
  '/operate/role/detail': {
    path: ['/operate/role/:id'],
    component: () => import('~web/page/admin/operate/role/detail')
  },
  /* -----报表模块----- */
  '/report': {
    path: ['/report'],
    component: () => import('~web/page/admin/report/finance')
  },
  // 财务报表
  '/report/finance': {
    path: ['/report/finance'],
    component: () => import('~web/page/admin/report/finance')
  },
  /* -----活动模块----- */
  '/activity': {
    path: ['/activity'],
    component: () => import('~web/page/admin/activity/real-time-info')
  },
  // 活动资讯
  '/activity/real-time-info': {
    path: ['/activity/real-time-info'],
    component: () => import('~web/page/admin/activity/real-time-info')
  },
  // 活动资讯详情
  '/activity/real-time-info/detail': {
    path: ['/activity/real-time-info/detail'],
    component: () => import('~web/page/admin//activity/real-time-info/detail')
  },
  /* -----其他模块----- */
  '/other': {
    path: ['/other'],
    component: () => import('~web/page/admin/other/user-agreement')
  },
  // 用户协议
  '/other/user-agreement': {
    path: ['/other/user-agreement'],
    component: () => import('~web/page/admin/other/user-agreement')
  },
  // 首页轮播
  '/other/home-rotation': {
    path: ['/other/home-rotation'],
    component: () => import('~web/page/admin/other/home-rotation')
  },
  // 首页轮播详情
  '/other/home-rotation/details': {
    path: ['/other/home-rotation/details/:id'],
    component: () => import('~web/page/admin/other/home-rotation/details')
  },
  // 404
  '/404': {
    path: ['/404', '*'],
    component: () => import('~web/page/admin/notFound')
  },
};
for (let i in routeConfig) {
  routeConfig[i] = {
    ...routeConfig[i],
    exact: true,
    component: Loadable({
      loader: routeConfig[i].component,
      loading: () => <div>loading...</div>
    })
  }
}

export default routeConfig;