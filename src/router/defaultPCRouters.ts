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
      // 总览
      {
        path: '/dashboard',
        name: 'dashboard',
        componentPath: 'pages',
        component: 'dashboard/dashboard.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 设置
      {
        path: '/settings',
        name: 'settings',
        componentPath: 'pages',
        component: 'settings/settings.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      //账户安全
      {
        path: '/security',
        name: 'security',
        componentPath: 'pages',
        component: 'account/security.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      //实名认证
      {
        path: '/identification',
        name: 'identification',
        componentPath: 'pages',
        component: 'account/identification.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },
];
