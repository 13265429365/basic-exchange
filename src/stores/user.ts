import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

export const UserInfo = '_UserInfo';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      //  用户信息
      userInfo: LocalStorage.getItem(UserInfo)
        ? JSON.parse(<string>LocalStorage.getItem(UserInfo))
        : null,
    };
  },

  getters: {},

  actions: {
    //  更新用户信息
    updateUserInfo(userInfo: object) {
      this.userInfo = userInfo;
      LocalStorage.set(UserInfo, JSON.stringify(userInfo));
    },
  },
});
