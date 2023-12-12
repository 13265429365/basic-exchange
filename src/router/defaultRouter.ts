import { TemplateRouteInterface } from 'src/router';

import {
  LayoutsDesktopPath,
  LayoutsMobilePath,
  PagesTemplateDesktopPath,
  PagesTemplateMobilePath,
} from 'src/utils/router';

export const TemplateName = 'default';
export const defaultRouter: TemplateRouteInterface[] = [
  //  主体布局文件 Tabbar + 桌面端头部尾部
  {
    name: 'Layouts',
    route: '/',
    componentMobile: LayoutsMobilePath('full.vue'),
    componentDesktop: LayoutsDesktopPath('main.vue'),
    children: [
      {
        name: 'Home',
        route: '/',
        componentMobile: PagesTemplateDesktopPath('home/home.vue'),
        componentDesktop: PagesTemplateMobilePath('index.vue'),
        children: [],
        meta: {},
      },
    ],
    meta: {},
  },

  // //  带头部的返回布局文件
  // {
  //   name: 'Layouts',
  //   route: '',
  //   componentMobile: '',
  //   componentDesktop: '',
  //   children: [],
  //   meta: {},
  // },

  // //  全屏的布局文件
  // {
  //   name: 'Layouts',
  //   route: '',
  //   componentMobile: '',
  //   componentDesktop: '',
  //   children: [],
  //   meta: {},
  // },
];
