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
    path: ['/product/detail'],
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
    path: ['/order/detail'],
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
  // '/operate/detail': {
  //   path: ['/operate/detail'],
  //   component: () => import('~web/page/admin/operate/detail')
  // },
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