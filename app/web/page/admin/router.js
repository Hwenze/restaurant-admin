import Loadable from 'react-loadable';
import React from 'react';

let routeConfig = [
  {
    path:['/'],
    component:()=>import('~web/page/admin/home')
  },
  {
    path:['/user/list'],
    component:()=>import('~web/page/admin/user/list')
  },
  {
    path:['/user/detail'],
    component:()=>import('~web/page/admin/user/detail')
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