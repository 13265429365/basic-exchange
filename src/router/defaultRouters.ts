import { TemplateRouteInterface } from 'src/router/routes';

export const defaultRouter: TemplateRouteInterface[] = [
  {
    path: '/',
    name: 'Layouts',
    componentPath: 'layouts',
    component: 'tabs.vue',
    children: [
      {
        path: '/',
        name: 'register',
        componentPath: 'pages',
        component: 'index.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/login',
        name: 'login',
        componentPath: 'pages',
        component: 'login.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/forgot',
        name: 'forgot',
        componentPath: 'pages',
        component: 'forgot.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/info',
        name: 'info',
        componentPath: 'pages',
        component: 'info.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },
];
