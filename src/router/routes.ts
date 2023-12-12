import { RouteRecordRaw, Router } from 'vue-router';
import { TemplateRouteInterface } from 'src/router';
import { defaultRouter, TemplateName } from 'src/router/defaultRouter';

// 所有模版路由信息 桌面端必须带上 Desktop

export const templateRoutes: any = new Map([[TemplateName, defaultRouter]]);

// componentPathList 获取文件路径文件
const componentPathList = Object.assign(
  import.meta.glob('src/layouts/**/*.vue'),
  import.meta.glob('src/pages/**/*.vue')
);

// 动态加载路由
export const dynamicRouterFunc = (
  router: Router, //  路由对象
  parent = '', //  父级路由
  template: string, //  模版文件
  routerList: TemplateRouteInterface[], //  载入的路由
  isMobile: boolean //  是否手机端
) => {
  if (routerList && routerList.length > 0 && template !== '') {
    routerList.forEach((item) => {
      //  动态添加路由
      router.addRoute(parent, {
        path: item.route,
        name: item.name,
        component:
          componentPathList[
            isMobile ? item.componentMobile : item.componentDesktop
          ],
        meta: item.meta,
      });

      //  是否需要递归子级, 动态添加路由
      if (
        item.hasOwnProperty('children') &&
        item.children !== null &&
        item.children.length > 0
      ) {
        dynamicRouterFunc(router, item.name, template, item.children, isMobile);
      }
    });
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/404.vue'),
  },
];

export default routes;
