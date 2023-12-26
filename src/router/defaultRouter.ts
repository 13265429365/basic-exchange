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
    componentDesktop: LayoutsDesktopPath('setting.vue'),
    children: [
      {
        name: 'HomeIndex',
        route: '/',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'home.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: {},
      },
      {
        name: 'MarketIndex',
        route: '/markets',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'market.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'market.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'ContactIndex',
        route: '/contract',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'contact.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'contact.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'FuturesIndex',
        route: '/futures',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'futures.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'futures.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'UserIndex',
        route: '/user',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'user/user.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
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
        name: 'HomeIndex',
        route: '/',
        componentMobile: PagesTemplateMobilePath(TemplateName, ''),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'home.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
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
      // 充值(共用)
      {
        name: 'Deposit',
        route: '/wallets/deposit',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/deposit.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/deposit.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 提现(共用)
      {
        name: 'Withdraw',
        route: '/wallets/withddraw',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/withdraw.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/withdraw.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 添加卡片(共用)
      {
        name: 'AddCard',
        route: '/create/card',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/account/create.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/account/create.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 设置基本信息(手机)
      {
        name: 'infoEdit',
        route: '/settings/info',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/setting/infoEdit.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户设置新密码(手机)
      {
        name: 'UpdatePassword',
        route: '/settings/password',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/setting/password.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户设置新秘钥(手机)
      {
        name: 'UpdateCode',
        route: '/settings/code',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/setting/secretKey.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户绑定手机(手机)
      {
        name: 'BindPhone',
        route: '/settings/bind/phone',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/setting/phone.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户绑定邮箱(手机)
      {
        name: 'EnterEmail',
        route: '/settings/enter/email',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/setting/email.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户设置语言(手机)
      {
        name: 'SettingLanguage',
        route: '/settings/language',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/setting/language.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 文章(桌面)
      {
        name: 'Article',
        route: '/article',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          ''
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'article/article.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 文章(桌面)
      {
        name: 'ArticleDetails',
        route: '/article/details',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          ''
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
      // 卡片管理(共用)
      {
        name: 'AccountCard',
        route: '/wallets/account/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/account/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/account/index.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 我的钱包(共用)
      {
        name: 'Wallet',
        route: '/wallets/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/index.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 我的资产(共用)
      {
        name: 'Assets',
        route: '/wallets/assets/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/assets/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/assets/index.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 单个资产详情(共用)
      {
        name: 'AssetsDetail',
        route: '/wallets/assets/detail',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/assets/detail.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/assets/detail.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 我的团队(共用)
      {
        name: 'Team',
        route: '/team/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/team/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/team/index.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 团队成员收益(共用)
      {
        name: 'TeamBenefits',
        route: '/team/earnings/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/team/benefits.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/team/benefits.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 团队分享(共用)
      {
        name: 'Share',
        route: '/team/share',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/team/share.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/team/share.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 手机版会员权益(共用)
      {
        name: 'Level',
        route: '/user/level',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/level.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/level.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },

      // 下载(共用)
      {
        name: 'Download',
        route: '/download',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'download.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'download.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
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
        meta: { requireAuth: false, keepAlive: false },
      },
      // 实名认证(共用)
      {
        name: 'RealAuth',
        route: '/user/realauth',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/setting/realAuth.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/setting/realAuth.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户设置页面(共用)
      {
        name: 'userSettings',
        route: '/user/settings',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'user/setting/index.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/setting/index.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },

    ],
    meta: {},
  },

];
