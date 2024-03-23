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
    componentMobile: LayoutsMobilePath('tabBar.vue'),
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
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/setting/index.vue'),
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
      {
        name: 'MarketsDigital',
        route: '/markets/digital',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'markets/digital.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'markets/digital.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'MarketsForex',
        route: '/markets/forex',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'markets/forex.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'markets/forex.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
      },
      {
        name: 'MarketsFutures',
        route: '/markets/futures',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'markets/futures.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'markets/futures.vue'),
        children: [],
        meta: { keepAlive: false, requireAuth: false },
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
        name: 'WalletsFlash',
        route: '/wallets/flash',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/flash.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/flash.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'WalletsTransfer',
        route: '/wallets/transfer',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/transfer.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/transfer.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'FlashExchangeSuccess',
        route: '/wallets/transfer/success',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/transferSuccess.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/transferSuccess.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'FlashExchangeRecord',
        route: '/wallets/transfer/record',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/flashRecord.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/flashRecord.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'WalletAccountUpdate',
        route: '/wallets/account/update',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/account/update.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/account/update.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'SettingUpdateUserInfo',
        route: '/settings/update/info',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/info.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'SettingUpdatePassword',
        route: '/settings/update/password',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/password.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'SettingUpdateSecretKey',
        route: '/settings/update/secret-key',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/secretKey.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'SettingBindTelephone',
        route: '/settings/update/telephone',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/telephone.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'SettingUpdateEmail',
        route: '/settings/update/email',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/email.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'SettingLanguage',
        route: '/settings/language',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/setting/language.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'home.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        name: 'ArticleDetails',
        route: '/article/details',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'article/details.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'article/details.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        name: 'UserShare',
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
        name: 'DownloadApp',
        route: '/download',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'download.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'download.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        name: 'HelpersCenter',
        route: '/helpers',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'helpers.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'helpers.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        name: 'UserLevel',
        route: '/user/level',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/level.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/level.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
    ],
    meta: {},
  },

  {
    name: 'LayoutsHeader',
    route: '/',
    componentMobile: LayoutsMobilePath('header.vue'),
    componentDesktop: LayoutsDesktopPath('setting.vue'),
    children: [
      {
        name: 'WalletsAccountIndex',
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
        name: 'WalletsIndex',
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
        name: 'WalletsAccountDetails',
        route: '/wallets/detail',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/details.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/index.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'WalletsAssetsIndex',
        route: '/wallets/assets/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/assets/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/assets/index.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'WalletsAssetsDetails',
        route: '/wallets/assets/details',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallets/assets/details.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallets/assets/details.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        name: 'TeamIndex',
        route: '/team/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/team/index.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/team/index.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        name: 'TeamEarnings',
        route: '/team/earnings',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/team/earnings.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/team/earnings.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },

      {
        name: 'UserRealAuth',
        route: '/user/auth',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'users/auth.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/auth.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
      {
        name: 'SettingIndex',
        route: '/user/settings',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'users/setting/index.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'users/setting/index.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: false },
      },
    ],
    meta: {},
  },
];
