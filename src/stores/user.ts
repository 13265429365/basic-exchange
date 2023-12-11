import { defineStore } from 'pinia';
import { cookiesOptions } from 'src/utils';
import { Cookies } from 'quasar';

export const UserTokenKey = '_UserToken';
export const UserLangKey = '_UserLang';

// 初始化用户Store
export const initializationUserStore = ({ ssrContext }: any) => {
  const $cookies = Cookies.parseSSR(ssrContext);
  const $userStore = useUserStore();
  //  初始化用户Token
  // $userStore.isLogin = $cookies.get(UserTokenKey) ?? '';
  //  初始化用户Token
  $userStore.userToken = $cookies.get(UserTokenKey) ?? '';

  //  初始化用户Lang
  $userStore.userLang = $cookies.get(UserLangKey) ?? 'en-US';

  return $userStore;
};

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // 判断是否登录
      isLogin: false,
      //  用户Token
      userToken: '',

      //  用户语言
      userLang: '',

      //  用户信息
      userInfo: {} as any,
    };
  },
  getters: {},

  actions: {
    //  更新用户登录状态
    // updateLoginStatus(token: string) {
    //   this.isLogin = token;
    //   Cookies.set(UserTokenKey, token, cookiesOptions());
    // },
    //  获取Token
    getUserToken() {
      const token = Cookies.get(UserTokenKey)
      return token
    },
    //  更新用户Token
    updateUserToken(token: string) {
      this.userToken = token;
      console.log(Cookies)
      Cookies.set(UserTokenKey, token, cookiesOptions());
    },

    //  更新用户语言
    updateUserLang(lang: string) {
      this.userLang = lang;
      Cookies.set(UserLangKey, lang, cookiesOptions());
    },
    removeUserToken() {
      this.userToken = '';
      console.log(Cookies)
      Cookies.remove(UserTokenKey);
    },
  },
});
