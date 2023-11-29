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
        path: '/Login',
        name: 'Login',
        componentPath: 'pages',
        component: 'login.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/User',
        name: 'User',
        componentPath: 'pages',
        component: 'user.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },
];
