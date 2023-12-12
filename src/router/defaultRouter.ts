import { TemplateRouteInterface } from 'src/router';

export const TemplateName = 'default';

export const defaultRouter: TemplateRouteInterface[] = [
  //  主体布局文件 Tabbar + 桌面端头部尾部
  {
    name: 'Layouts',
    route: '',
    componentMobile: 'layouts/mobile/tabbar.vue',
    componentDesktop: 'layouts/desktop/main.vue',
    children: [
      {
        name: 'Home',
        route: '/',
        componentMobile: 'pages/' + TemplateName + '/mobile/index.vue',
        componentDesktop: 'pages/' + TemplateName + '/desktop/index.vue',
        children: [],
        meta: {},
      },
    ],
    meta: {},
  },

  //  带头部的返回布局文件
  {
    name: 'Layouts',
    route: '',
    componentMobile: '',
    componentDesktop: '',
    children: [],
    meta: {},
  },

  //  全屏的布局文件
  {
    name: 'Layouts',
    route: '',
    componentMobile: '',
    componentDesktop: '',
    children: [],
    meta: {},
  },
];
