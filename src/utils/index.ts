import { useRouter } from 'vue-router';

// 图片处理方法
export const imageSrc = (url: string) => {
  if (url === '') {
    url = '/images/logo.png';
  }
  if (url.indexOf('http') > -1) {
    return url;
  }

  const baseURL = new URL(<string>process.env.baseURL);
  return baseURL.origin + url;
};

// 图标方法
export const iconSrc = (icon: string) => {
  return icon.indexOf('/') > -1 ? 'img:' + icon : icon;
};

// 跳转路由
export const routerTo = (route: string) => {
  if (route == '') {
    return;
  }

  if (route.indexOf('://') > -1) {
    window.location.href = route;
    return;
  }
  const $router = useRouter();
  $router.push(route);
};
