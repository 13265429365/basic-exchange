import { defineStore } from 'pinia';
import { cookiesOptions } from 'src/utils';
import { Cookies } from 'quasar';

export const UserInfoKey = '_UserInfo';
export const UserTokenKey = '_UserToken';
export const UserLangKey = '_UserLang';

// 初始化用户Store
export const initializationUserStore = ({ ssrContext }: any) => {
  const $cookies = Cookies.parseSSR(ssrContext);
  const $userStore = useUserStore();

  //  初始化用户Token
  $userStore.userToken = $cookies.get(UserTokenKey) ?? '';

  //  初始化用户Lang
  $userStore.userLang = $cookies.get(UserLangKey) ?? '';

  //  初始化用户信息
  $userStore.userInfo = $cookies.get(UserInfoKey);

  return $userStore;
};

export const useUserStore = defineStore('user', {
  state: () => {
    return {
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
    //  更新用户Token
    updateUserToken(token: string) {
      this.userToken = token;
      Cookies.set(UserTokenKey, token, cookiesOptions());
    },

    //  更新用户语言
    updateUserLang(lang: string) {
      this.userLang = lang;
      Cookies.set(UserLangKey, lang, cookiesOptions());
    },

    //  更新用户信息
    updateUserInfo(userInfo: object) {
      this.userInfo = userInfo;
      Cookies.set(UserInfoKey, JSON.stringify(userInfo), cookiesOptions());
    },
  },
});
