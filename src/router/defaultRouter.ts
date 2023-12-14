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
        route: '/market',
        componentMobile: PagesTemplateMobilePath(TemplateName, 'market.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'market.vue'),
        children: [],
        meta: {},
      },
      {
        name: 'ContactIndex',
        route: '/contact',
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
        componentMobile: PagesTemplateMobilePath(TemplateName, 'user.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user.vue'),
        children: [],
        meta: { requireAuth: true, keepAlive: true },
      },
    ],
    meta: {},
  },

  //  带头部的返回布局文件
  {
    name: 'LayoutsHeader',
    route: '/',
    componentMobile: LayoutsMobilePath('header.vue'),
    componentDesktop: LayoutsDesktopPath('main.vue'),
    children: [
      {
        name: 'UserSettingsProfile',
        route: '/user/profile',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'user/settings/profile.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'home.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 忘记密码
      {
        name: 'UserForgot',
        route: '/forgot',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'forgot.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户设置
      {
        name: 'UserSetting',
        route: '/setting',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'setting.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户设置
      {
        name: 'UserInfoEdit',
        route: '/infoEdit',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'UserInfoEdit.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户创建新密码
      {
        name: 'UserUpdatePasswd',
        route: '/updatePasswd',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'updatePassword.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户创建新安全密钥
      {
        name: 'UserUpdateKey',
        route: '/updateKey',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'updateCode.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户绑定邮箱
      {
        name: 'UserEnterEmail',
        route: '/enterEmail',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'enterEmail.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户手机认证
      {
        name: 'UserBindPhone',
        route: '/bindPhone',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'authentication.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户手机认证验证码
      {
        name: 'UserVerify',
        route: '/verify',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'verify.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户语言选择
      {
        name: 'UserLanguage',
        route: '/language',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'language.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 关于我们
      {
        name: 'About',
        route: '/about',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'about.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 政策隐私
      {
        name: 'privacyPolicy',
        route: '/privacy/policy',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'privacyPolicy.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 政策隐私
      {
        name: 'privacyPolicy',
        route: '/privacy/policy',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'privacyPolicy.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 会员
      {
        name: 'Vip',
        route: '/vip',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'Vip.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'Vip.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 团队收益
      {
        name: 'Benefits',
        route: '/benefits',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'team/benefits.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'team/benefits.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 团队
      {
        name: 'Team',
        route: '/team',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'team/team.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'team/team.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 团队收益
      {
        name: 'Benefits',
        route: '/benefits',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'team/benefits.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'team/benefits.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 分享
      {
        name: 'Share',
        route: '/share',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'share/share.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'share/share.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 帮助中心
      {
        name: 'Help',
        route: '/help',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'help/help.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'help/help.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 下载
      {
        name: 'Download',
        route: '/download',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'download/download.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户实名认证
      {
        name: 'Identification',
        route: '/identification',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'identification/identification.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'identification/identification.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户卡片管理
      {
        name: 'Card',
        route: '/card',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'card/card.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'card/card.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户卡片新增
      {
        name: 'AddCard',
        route: '/add/card',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'card/addCard.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'card/addCard.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户卡片编辑
      {
        name: 'EditCard',
        route: '/edit/card',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'card/editCard.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'card/editCard.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 我的钱包
      {
        name: 'Wallet',
        route: '/wallet',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/wallet.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/wallet.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 充值
      {
        name: 'Recharge',
        route: '/recharge',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/recharge.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/recharge.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 提现
      {
        name: 'Withdrawal',
        route: '/withdrawal',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/withdrawal.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'wallet/withdrawal.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 钱包账单明细
      {
        name: 'BillDetail',
        route: '/bill/detail',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/billDetail.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户资产
      {
        name: 'MyProperty',
        route: '/property',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'myProperty/myProperty.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'myProperty/myProperty.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户单个资产详情
      {
        name: 'Btc',
        route: '/btc',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'myProperty/btc.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'myProperty/btc.vue'),
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
];
