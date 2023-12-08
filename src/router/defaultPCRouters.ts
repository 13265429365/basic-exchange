import { TemplateRouteInterface } from 'src/router/routes';

export const defaultPcRouters: TemplateRouteInterface[] = [
  {
    path: '/',
    name: 'defaultPc',
    componentPath: 'layouts',
    component: 'defaultPc.vue',
    children: [
      {
        path: '/',
        name: 'home',
        componentPath: 'pages',
        component: 'home/home.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/vip',
        name: 'vip',
        componentPath: 'pages',
        component: 'vip/vip.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/share',
        name: 'share',
        componentPath: 'pages',
        component: 'share/share.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 帮助中心
      {
        path: '/help/center',
        name: 'helpCenter',
        componentPath: 'pages',
        component: 'help/helpCenter.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/article/news',
        name: 'articleNews',
        componentPath: 'pages',
        component: 'article/news.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/article/announcements',
        name: 'ArticleAnnouncements',
        componentPath: 'pages',
        component: 'article/announcements.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/article/details/:id',
        name: 'articleDetails',
        componentPath: 'pages',
        component: 'article/details.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },
];
