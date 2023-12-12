import { route } from 'quasar/wrappers';
import { UserTokenKey, InitStoreState } from 'src/stores/init';
import { Cookies, Platform } from 'quasar';
import { dynamicRouterFunc } from 'src/router/routes';
import { templateRoutes } from 'src/router/routes';

import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

// 路由接口
export interface TemplateRouteInterface {
  route: string; //  路由
  name: string; //  名称
  componentMobile: string; //  手机端文件
  componentDesktop: string; //  桌面端文件
  meta: any; //  meta数据
  children: TemplateRouteInterface[]; //  子级
}

import routes from 'src/router/routes';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(async function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  // 请求初始化数据
  const $cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const $platform = process.env.SERVER
    ? Platform.parseSSR(ssrContext)
    : Platform;
  store.state.value['init'] = JSON.parse(JSON.stringify(InitStoreState));
  store.state.value.init.userToken = <string>$cookies.get(UserTokenKey);

  //  动态加载路由
  dynamicRouterFunc(
    Router,
    templateRoutes.get('default'),
    <boolean>$platform.is.mobile
  );

  //  路由守卫
  Router.beforeEach((to, form, next) => {
    if (
      (to.name === 'Login' || to.name === 'Register') &&
      store.state.value.init.userToken != null &&
      store.state.value.init.userToken.length > 0
    ) {
      next({ name: 'Home' });
    } else {
      // 验证是否跳转到登录页面
      if (
        to.matched.some((record) => record.meta.requireAuth) &&
        (store.state.value.init.userToken == null ||
          store.state.value.init.userToken.length === 0)
      ) {
        next({ name: 'Login' });
      } else {
        next();
      }
    }
  });

  return Router;
});
