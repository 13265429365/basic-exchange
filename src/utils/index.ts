import { useInitStore } from 'src/stores/init';
import { Notify } from 'quasar';

// 图片处理方法
export const imageSrc = (url: string) => {
  const initStore = useInitStore();
  if (url === '') {
    url = initStore.config.logo;
  }
  if (url.indexOf('http') > -1) {
    return url;
  }

  const baseURL = new URL(<string>process.env.baseURL);
  return baseURL + url;
};

// cookiesOptions cookies 额外参数
export const cookiesOptions = () => {
  return { expires: '30d 3h 5m' };
};

// 错误提示
export const NotifyNegative = (msg: string) => {
  Notify.create({
    type: 'negative',
    position: 'top',
    timeout: 3000,
    message: msg,
  });
};

// 成功提示
export const NotifyPositive = (msg: string) => {
  Notify.create({
    type: 'positive',
    position: 'top',
    timeout: 3000,
    message: msg,
  });
};
