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
        path: '/Forgot',
        name: 'Forgot',
        componentPath: 'pages',
        component: 'forgot.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/myPage',
        name: 'myPage',
        componentPath: 'pages',
        component: 'myPage.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },
];
