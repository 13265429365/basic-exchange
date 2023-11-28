import { useInitStore } from 'src/stores/init';

// 图片处理方法
export const imageSrc = (url: string) => {
  const initStore = useInitStore();
  if (url === '') {
    url = initStore.config.logo;
  }
  if (url.indexOf('http') > -1) {
    return url;
  }
  return process.env.baseURL + url;
};
