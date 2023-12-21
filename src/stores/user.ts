import { defineStore } from 'pinia';


// 初始化数据
export const UserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as any,
  }),
  getters: {},
  actions: {
    // 更新初始化数据
    updateUserInfo(info: any) {
      this.userInfo = info
    },
  },
});
