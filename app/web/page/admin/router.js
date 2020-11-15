import Loadable from 'react-loadable';
import React from 'react';

let routeConfig = [
  {
    path:['/'],
    component:()=>import('~web/page/admin/home')
  },
  /* -----会员模块----- */
  // 会员列表
  {
    path:['/member','/member/list'],
    component:()=>import('~web/page/admin/member/list')
  },
  // 会员详情
  {
    path:['/member/detail'],
    component:()=>import('~web/page/admin/member/detail')
  },
  /* -----商品模块----- */
  // 商品列表
  {
    path:['/product','/product/list'],
    component:()=>import('~web/page/admin/product/list')
  },
  // 商品详情
  {
    path:['/product/detail'],
    component:()=>import('~web/page/admin/product/detail')
  },
  // 商品分类
  {
    path:['/product/category'],
    component:()=>import('~web/page/admin/product/category')
  },
  /* -----订单模块----- */
  // 订单列表
  {
    path:['/order','/order/list'],
    component:()=>import('~web/page/admin/order/list')
  },
  // 订单详情
  {
    path:['/order/detail'],
    component:()=>import('~web/page/admin/order/detail')
  },
  /* -----运营模块----- */
  // 后台人员列表
  {
    path:['/operate','/operate/user'],
    component:()=>import('~web/page/admin/operate/user')
  },
  /* -----报表模块----- */
  // 财务报表
  {
    path:['/report','/report/finance'],
    component:()=>import('~web/page/admin/report/finance')
  },
  // 404
  {
    path:['/404','*'],
    component:()=>import('~web/page/admin/notFound')
  },
]

let routerList = routeConfig.map(item=>{
  return{
    ...item,
    exact:true,
    component:Loadable({
      loader:item.component,
      loading:()=><div>loading...</div>
    })
  }
})

routerList.push({
  path:'*',
  component:'',
  redirect:'/',
})

export default routerList;