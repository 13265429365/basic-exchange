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
        componentMobile: PagesTemplateMobilePath(TemplateName, 'account/user.vue'),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
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
      // 桌面版充值
      {
        name: 'Deposit',
        route: '/wallet/deposit',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          ''
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'account/wallet/deposit.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 桌面版提现
      {
        name: 'Withdraw',
        route: '/wallet/withddraw',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          ''
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'account/wallet/withdraw.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 桌面版添加卡片
      {
        name: 'DesktopAddCard',
        route: '/add/card',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          ''
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'card/addCard.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 桌面版编辑卡片
      {
        name: 'DesktopEditCard',
        route: '/edit/card',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          ''
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'card/editCard.vue'),
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
      // 卡片管理
      {
        name: 'Account',
        route: '/wallet/account/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'card/card.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'card/card.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 手机版添加卡片
      {
        name: 'MobileAddCard',
        route: '/add/card',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'card/addCard.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 手机版编辑卡片
      {
        name: 'MobileEditCard',
        route: '/edit/card',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'card/editCard.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 我的钱包
      {
        name: 'Wallet',
        route: '/wallet/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/wallet.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'account/wallet/wallet.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 钱包明细
      {
        name: 'WalletDetail',
        route: '/wallet/detail',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/billDetail.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 手机充值
      {
        name: 'Deposit',
        route: '/wallet/deposit',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/deposit.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 手机提现
      {
        name: 'Withdraw',
        route: '/wallet/withddraw',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/withdraw.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, ''),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 我的资产
      {
        name: 'Assets',
        route: '/wallet/assets/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'wallet/assets/assets.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'account/assets/assets.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 我的团队
      {
        name: 'Team',
        route: '/team/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'team/team.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'team/team.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 团队成员收益
      {
        name: 'TeamBenefits',
        route: '/team/earnings/index',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'team/teamBenefits.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'team/teamBenefits.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 手机版会员权益
      {
        name: 'MemberBenefits',
        route: '/user/level',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'grade.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'grade.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 团队分享
      {
        name: 'Share',
        route: '/team/share',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'team/share.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'team/share.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 下载
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
      // 用户设置
      {
        name: 'Setting',
        route: '/user/settings',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'account/setting.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/setting.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },

      // 用户设置新密码
      {
        name: 'UpdatePassword',
        route: '/settings/password',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'account/settings/updatePassword.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/setting.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户设置新秘钥
      {
        name: 'UpdateCode',
        route: '/settings/code',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'account/settings/updateCode.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/setting.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户绑定手机
      {
        name: 'BindPhone',
        route: '/settings/bind/phone',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'account/settings/bindPhone.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/setting.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户绑定邮箱
      {
        name: 'EnterEmail',
        route: '/settings/enter/email',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'account/settings/enterEmail.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/setting.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 用户设置语言
      {
        name: 'SettingLanguage',
        route: '/settings/language',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'account/settings/language.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/setting.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 帮助中心
      {
        name: 'HelpCenter',
        route: '/helpers',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'help.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'help.vue'),
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 实名认证
      {
        name: 'RealAuth',
        route: '/user/realauth',
        componentMobile: PagesTemplateMobilePath(
          TemplateName,
          'account/realAuth.vue'
        ),
        componentDesktop: PagesTemplateDesktopPath(TemplateName, 'user/realAuth.vue'),
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
