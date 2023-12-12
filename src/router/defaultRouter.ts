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
    componentMobile: LayoutsMobilePath('tabbar.vue'),
    componentDesktop: LayoutsDesktopPath('main.vue'),
    children: [
      {
        name: 'HomeIndex',
        route: '/',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'home.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'home.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'MarketIndex',
        route: '/',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'market.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'market.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'ContactIndex',
        route: '/',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'contact.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'contact.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'FuturesIndex',
        route: '/',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'futures.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'futures.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'UserIndex',
        route: '/user/index',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'user.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user.vue'),
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
