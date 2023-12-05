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
        component: 'home.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/share',
        name: 'share',
        componentPath: 'pages',
        component: 'share.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },
];
