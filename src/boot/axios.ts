import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Loading, QSpinnerBars } from 'quasar';
import { useInitStore } from 'src/stores/init';
import { NotifyNegative } from 'src/utils/notify';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.baseURL });

// 请求数据拦截
api.interceptors.request.use((config: any) => {
  if (!config.hasOwnProperty('showLoading') || config.showLoading) {
    Loading.show({
      spinner: QSpinnerBars,
      spinnerColor: 'secondary',
      spinnerSize: 50,
      message: 'Some important process is in progress. Hang on...',
    });
  }

  const initStore = useInitStore();
  // 如果存在Token，那么请求带上Token
  if (
    initStore.userToken !== '' &&
    !config.headers.hasOwnProperty('Authorization')
  ) {
    config.headers['Authorization'] = 'Bearer ' + initStore.userToken;
  }

  // 如果设置了语言，那么请求带上语言
  if (initStore.userLang !== '') {
    config.headers['Accept-Language'] = initStore.userLang;
  }
  return config;
});

// 响应数据拦截
api.interceptors.response.use(
  (response) => {
    Loading.hide();
    const res = response.data;

    if (res.hasOwnProperty('code')) {
      if (res.code === 0) {
        return res.data;
      }
      NotifyNegative(res.msg);
      return Promise.reject(res.msg);
    } else {
      return res;
    }
  },
  (err) => {
    Loading.hide();
    if (err.response) {
      switch (err.response.status) {
        case 401:
          NotifyNegative('No permission to execute');
          break;
        case 500:
          NotifyNegative('The system is busy, please try again');
          break;
        default:
          NotifyNegative('ERR_UNHANDLED_REJECTION');
      }
    }
    //  返回错误
    return Promise.reject('ERR_UNHANDLED_REJECTION').catch(() => {
      console.log('Please check whether the request address is correct...');
    });
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
