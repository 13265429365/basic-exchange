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
        componentMobile: PagesTemplateMobilePath('login/login.vue'),
        componentDesktop: PagesTemplateDesktopPath('home/home.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'vip',
        route: '/vip',
        componentMobile: PagesTemplateMobilePath('grade/grade.vue'),
        componentDesktop: PagesTemplateDesktopPath('vip/vip.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'share',
        route: '/share',
        componentMobile: PagesTemplateMobilePath('share/share.vue'),
        componentDesktop: PagesTemplateDesktopPath('share/share.vue'),
        children: [],
        meta: {},
      },
      // 设置
      {
        name: 'setting',
        route: '/setting',
        componentMobile: PagesTemplateMobilePath('basicInfoSettings/setting.vue'),
        componentDesktop: PagesTemplateDesktopPath('settings/settings.vue'),
        children: [],
        meta: {},
      },
      // 实名认证
      {
        name: 'identification',
        route: '/identification',
        componentMobile: PagesTemplateMobilePath('identification/identification.vue'),
        componentDesktop: PagesTemplateDesktopPath('account/identification.vue'),
        children: [],
        meta: {},
      },
      // 钱包
      {
        name: 'wallet',
        route: '/wallet',
        componentMobile: PagesTemplateMobilePath('wallet/wallet.vue'),
        componentDesktop: PagesTemplateDesktopPath('wallet/wallet.vue'),
        children: [],
        meta: {},
      },
      // 充值
      {
        name: 'recharge',
        route: '/recharge',
        componentMobile: PagesTemplateMobilePath('wallet/recharge.vue'),
        componentDesktop: PagesTemplateDesktopPath('wallet/recharge.vue'),
        children: [],
        meta: {},
      },
      // 提现
      {
        name: 'withdrawal',
        route: '/withdrawal',
        componentMobile: PagesTemplateMobilePath('wallet/withdrawal.vue'),
        componentDesktop: PagesTemplateDesktopPath('wallet/withdrawal.vue'),
        children: [],
        meta: {},
      },
      // 我的资产
      {
        name: 'assets',
        route: '/assets',
        componentMobile: PagesTemplateMobilePath('myProperty/myProperty.vue'),
        componentDesktop: PagesTemplateDesktopPath('assets/assets.vue'),
        children: [],
        meta: {},
      },
      // 单个资产
      {
        name: 'vth',
        route: '/vth',
        componentMobile: PagesTemplateMobilePath('myProperty/btc.vue'),
        componentDesktop: PagesTemplateDesktopPath('assets/vth.vue'),
        children: [],
        meta: {},
      },
      // 银行卡
      {
        name: 'card',
        route: '/card',
        componentMobile: PagesTemplateMobilePath('card/card.vue'),
        componentDesktop: PagesTemplateDesktopPath('card/card.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'editCard',
        route: '/edit/card',
        componentMobile: PagesTemplateMobilePath('card/editCard.vue'),
        componentDesktop: PagesTemplateDesktopPath('card/editCard.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'addCard',
        route: '/add/card',
        componentMobile: PagesTemplateMobilePath('card/addCard.vue'),
        componentDesktop: PagesTemplateDesktopPath('card/addCard.vue'),
        children: [],
        meta: {},
      },
      // 团队管理
      {
        name: 'team',
        route: '/team',
        componentMobile: PagesTemplateMobilePath('team/team.vue'),
        componentDesktop: PagesTemplateDesktopPath('team/team.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'benefits',
        route: '/benefits',
        componentMobile: PagesTemplateMobilePath('team/benefits.vue'),
        componentDesktop: PagesTemplateDesktopPath('team/benefits.vue'),
        children: [],
        meta: {},
      },
      // 帮助中心
      {
        name: 'help',
        route: '/help',
        componentMobile: PagesTemplateMobilePath('help/help.vue'),
        componentDesktop: PagesTemplateDesktopPath('help/help.vue'),
        children: [],
        meta: {},
      },
      // pc dashboard、mobile info
      {
        name: 'dashboard',
        route: '/dashboard',
        componentMobile: PagesTemplateMobilePath('basicInfoSettings/info.vue'),
        componentDesktop: PagesTemplateDesktopPath('dashboard/dashboard.vue'),
        children: [],
        meta: {},
      },
      //
      {
        name: 'security',
        route: '/security',
        componentMobile: PagesTemplateMobilePath(''),
        componentDesktop: PagesTemplateDesktopPath('account/security.vue'),
        children: [],
        meta: {},
      },
      // 以上相同路由--------------------------------
      
      // 公告
      {
        name: 'announcements',
        route: '/announcements',
        componentMobile: PagesTemplateMobilePath(''),
        componentDesktop: PagesTemplateDesktopPath('article/announcements.vue'),
        children: [],
        meta: {},
      },
      // 公告文章
      {
        name: 'details',
        route: '/details',
        componentMobile: PagesTemplateMobilePath(''),
        componentDesktop: PagesTemplateDesktopPath('article/details.vue'),
        children: [],
        meta: {},
      },
      // 新闻
      {
        name: 'news',
        route: '/news',
        componentMobile: PagesTemplateMobilePath(''),
        componentDesktop: PagesTemplateDesktopPath('article/news.vue'),
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
