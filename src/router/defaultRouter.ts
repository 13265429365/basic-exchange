import { TemplateRouteInterface } from 'src/router';

import {
  LayoutsDesktopPath,
  LayoutsMobilePath,
  PagesTemplateDesktopPath,
  PagesTemplateMobilePath,
} from 'src/utils/router';

export const TemplateName = 'default';
export const defaultRouter: TemplateRouteInterface[] = [
  //  主体布局文件 TabBar + 桌面端头部尾部
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
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'MarketIndex',
        route: '/markets',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'market.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'market.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'DigitalMarketIndex',
        route: '/markets/digital',
        componentMobile: PagesTemplateMobilePath(TemplateName, ''),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'markets/digital.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'ForeMarketIndex',
        route: '/markets/forex',
        componentMobile: PagesTemplateMobilePath(TemplateName, ''),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'markets/forex.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'FuturesMarketIndex',
        route: '/markets/futures',
        componentMobile: PagesTemplateMobilePath(TemplateName, ''),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'markets/futures.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'ContactIndex',
        route: '/contract',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'contact.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'contact.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'FuturesIndex',
        route: '/futures',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'futures.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'futures.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'UserIndex',
        route: '/user',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'users/index.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },

    ],
    meta: {},
  },

  //  全屏的布局文件
  {
    name: 'LayoutsFull',
    route: '/',
    componentMobile: LayoutsMobilePath('full.vue'),
    componentDesktop: LayoutsDesktopPath('main.vue'),
    children: [
      {
        name: 'UserLogin',
        route: '/login',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'login.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'home.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        name: 'UserRegister',
        route: '/register',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'register.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'home.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },

  {
    name: 'LayoutsMain',
    route: '/',
    componentMobile: LayoutsMobilePath('header.vue'),
    componentDesktop: LayoutsDesktopPath('main.vue'),
    children: [
      {
        name: 'WalletsDeposit',
        route: '/wallets/deposit',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/deposit.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/deposit.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'WalletsWithdraw',
        route: '/wallets/withdraw',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/withdraw.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/withdraw.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'WalletAccountCreate',
        route: '/wallets/account/create',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/account/create.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/account/create.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'infoEdit',
        route: '/settings/info',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/infoEdit.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'UpdatePassword',
        route: '/settings/password',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/password.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 用户设置新秘钥(手机)
      {
        name: 'UpdateCode',
        route: '/settings/code',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/secretKey.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 用户绑定手机(手机)
      {
        name: 'BindPhone',
        route: '/settings/bind/phone',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/phone.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 用户绑定邮箱(手机)
      {
        name: 'EnterEmail',
        route: '/settings/enter/email',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/email.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 用户设置语言(手机)
      {
        name: 'SettingLanguage',
        route: '/settings/language',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/language.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 文章(桌面)
      // {
      //   name: 'Article',
      //   route: '/article',
      //   componentMobile: PagesTemplateMobilePath(
      //     TemplateName,
      //     ''
      //   ),
      //   componentDesktop: PagesTemplateDesktopPath(TemplateName, 'article/article.vue'),
      //   children: [],
      //   meta: { requireAuth: false, keepAlive: false },
      // },
      // 文章(桌面)
      {
        name: 'Article',
        route: '/article',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'article/details.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'article/details.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },



  //  带头部的返回布局文件
  {
    name: 'LayoutsHeader',
    route: '/',
    componentMobile: LayoutsMobilePath('header.vue'),
    componentDesktop: LayoutsDesktopPath('setting.vue'),
    children: [
      {
        name: 'AccountCard',
        route: '/wallets/account/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/account/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/account/index.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'Wallet',
        route: '/wallets/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/index.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'Assets',
        route: '/wallets/assets/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/assets/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/assets/index.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 单个资产详情(共用)
      {
        name: 'AssetsDetail',
        route: '/wallets/assets/detail',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/assets/detail.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/assets/detail.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 我的团队(共用)
      {
        name: 'Team',
        route: '/team/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/team/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/team/index.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 团队成员收益(共用)
      {
        name: 'TeamBenefits',
        route: '/team/earnings/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/team/benefits.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/team/benefits.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 团队分享(共用)
      {
        name: 'Share',
        route: '/team/share',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/team/share.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/team/share.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'Download',
        route: '/download',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'download.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'download.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },

      // 帮助中心(共用)
      {
        name: 'HelpCenter',
        route: '/helpers',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'helpers.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'helpers.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 手机版会员权益(共用)
      {
        name: 'Level',
        route: '/user/level',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/level.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/level.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      // 实名认证(共用)
      {
        name: 'RealAuth',
        route: '/user/realauth',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/realAuth.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/setting/realAuth.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'SettingIndex',
        route: '/user/setting/index',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'users/setting/index.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/setting/index.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },

    ],
    meta: {},
  },

];
