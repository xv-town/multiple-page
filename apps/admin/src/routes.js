import React, { lazy } from 'react';
import {
  ShoppingOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';

import Page404 from './components/404';

import ViewOrder from './pages/Order';

const ViewLogin = lazy(() => import(/* webpackChunkName: "view-login" */ './pages/Login'));
const ViewHome = lazy(() => import(/* webpackChunkName: "view-home" */ './pages/Home'));
const ViewAbout = lazy(() => import(/* webpackChunkName: "view-about" */ './pages/about'));
const ViewOrderList = lazy(() => import(/* webpackChunkName: "view-order-list" */ './pages/OrderList'));

let routers = [
  {
    name: 'menu.login',
    path: '/login',
    component: ViewLogin,
    exact: true,
    layout: false
  },
  {
    name: 'menu.home',
    path: '/',
    component: ViewHome,
    exact: true,
    layout: true,
    menu: true,
    history: true,
    link: true,
    icon: <HomeOutlined />
  },
  {
    name: 'menu.orderManager',
    path: '/order',
    component: ViewOrder,
    menu: true,
    layout: true,
    icon: <ShoppingOutlined />,
    children: [
      {
        name: 'menu.orderList',
        path: '/list',
        exact: true,
        layout: true,
        menu: true,
        history: true,
        link: true,
        component: ViewOrderList
      }
    ]
  },
  {
    name: 'menu.about',
    path: '/about',
    component: ViewAbout,
    exact: true,
    layout: true,
    menu: true,
    history: true,
    link: true,
    icon: <UserOutlined />
  },
  {
    path: '*',
    name: '404',
    component: Page404
  }
];

export default routers;
