import { route } from 'quasar/wrappers';
import { useInitStore } from 'src/stores/init';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from 'src/router/routes';
import { defaultRouter } from 'src/router/defaultRouters';

// 所有模版路由信息
export const templateRoutes: any = new Map([['default', defaultRouter]]);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (
  {
    /* store, ssrContext */
  }
) {
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

  // 路由前置守卫
  Router.beforeEach((to, form, next) => {
    console.log(to);
    const initStore = useInitStore();
    next();
    // if (
    //   (to.name === 'Login' || to.name === 'Register') &&
    //   initStore.userToken.length > 0
    // ) {
    if (to.name === 'Login' || to.name === 'Register') {
      next();
    } else {
      // 验证是否跳转到登录页面
      if (
        to.matched.some((record) => record.meta.requireAuth) &&
        initStore.userToken.length === 0
      ) {
        next({ name: 'Login', query: { next: to.fullPath } });
      } else {
        next();
      }
    }
  });

  return Router;
});
