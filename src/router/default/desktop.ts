import { TemplateRouteInterface } from 'src/router/routes';

export const defaultDesktopRouter: TemplateRouteInterface[] = [
  {
    path: '/',
    name: 'defaultPc',
    componentPath: 'layouts',
    component: 'desktop/mainLayouts.vue',
    children: [
      {
        path: '/',
        name: 'home',
        componentPath: 'pages',
        component: 'home/home.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/vip',
        name: 'vip',
        componentPath: 'pages',
        component: 'vip/vip.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/share',
        name: 'share',
        componentPath: 'pages',
        component: 'share/share.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 总览
      {
        path: '/dashboard',
        name: 'dashboard',
        componentPath: 'pages',
        component: 'dashboard/dashboard.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 设置
      {
        path: '/settings',
        name: 'settings',
        componentPath: 'pages',
        component: 'settings/settings.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      //账户安全
      {
        path: '/security',
        name: 'security',
        componentPath: 'pages',
        component: 'account/security.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      //实名认证
      {
        path: '/identification',
        name: 'identification',
        componentPath: 'pages',
        component: 'account/identification.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 钱包
      {
        path: '/wallet',
        name: 'wallet',
        componentPath: 'pages',
        component: 'wallet/wallet.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 充值
      {
        path: '/recharge',
        name: 'recharge',
        componentPath: 'pages',
        component: 'wallet/Recharge.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 提现
      {
        path: '/withdrawal',
        name: 'withdrawal',
        componentPath: 'pages',
        component: 'wallet/Withdrawal.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 资产管理
      {
        path: '/assets',
        name: 'assets',
        componentPath: 'pages',
        component: 'assets/assets.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/vth',
        name: 'vth',
        componentPath: 'pages',
        component: 'assets/vth.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 卡片管理
      {
        path: '/card',
        name: 'card',
        componentPath: 'pages',
        component: 'card/card.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/add/card',
        name: 'addCard',
        componentPath: 'pages',
        component: 'card/addCard.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/edit/card',
        name: 'editCard',
        componentPath: 'pages',
        component: 'card/editCard.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 团队
      {
        path: '/team',
        name: 'team',
        componentPath: 'pages',
        component: 'team/team.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/benefit',
        name: 'benefit',
        componentPath: 'pages',
        component: 'team/benefit.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      // 帮助中心
      {
        path: '/help/center',
        name: 'helpCenter',
        componentPath: 'pages',
        component: 'help/helpCenter.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/article/news',
        name: 'articleNews',
        componentPath: 'pages',
        component: 'article/news.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/article/announcements',
        name: 'ArticleAnnouncements',
        componentPath: 'pages',
        component: 'article/announcements.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
      {
        path: '/article/details/:id',
        name: 'articleDetails',
        componentPath: 'pages',
        component: 'article/details.vue',
        children: [],
        meta: { requireAuth: false, keepAlive: false },
      },
    ],
    meta: {},
  },
];
