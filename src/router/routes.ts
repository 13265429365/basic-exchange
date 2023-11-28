import { RouteRecordRaw, Router } from 'vue-router';

export interface TemplateRouteInterface {
  path: string;
  name: string;
  component: string;
  componentPath: string;
  meta: any;
  children: TemplateRouteInterface[];
}

// componentPathList 获取文件路径文件
const componentPathList = {
  layouts: import.meta.glob('../layouts/**/*.vue'),
  pages: import.meta.glob('../pages/**/*.vue'),
} as any;

// 动态加载路由
export const dynamicRouterFunc = (
  router: Router, //  路由对象
  routerList: TemplateRouteInterface[], //  载入的路由
  template: string, //  模版文件
  isMobile: boolean, //  是否手机端
  parent = '' //  父级路由
) => {
  if (routerList && routerList.length > 0 && template !== '') {
    routerList.forEach((item) => {
      template = isMobile ? template : template + 'Pc';
      //  获取路径
      let vuePath = '../' + item.componentPath + '/' + item.component;
      if (item.componentPath === 'pages') {
        vuePath = '../pages';
        vuePath +=
          item.component.indexOf('/') === 0
            ? item.component
            : '/' + template + '/' + item.component;
      }

      router.addRoute(parent, {
        path: item.path,
        name: item.name,
        component: componentPathList[item.componentPath][vuePath],
        meta: item.meta,
      });

      //  递归加载路由
      if (
        item.hasOwnProperty('children') &&
        item.children !== null &&
        item.children.length > 0
      ) {
        dynamicRouterFunc(router, item.children, template, isMobile, item.name);
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
