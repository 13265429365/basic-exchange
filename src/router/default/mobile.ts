import { TemplateRouteInterface } from 'src/router/routes';

export const defaultRouter: TemplateRouteInterface[] = [
  {
    path: '/',
    name: 'Layouts',
    componentPath: 'layouts',
    component: '/mobile/full.vue',
    children: [],
    meta: {},
  },
];
