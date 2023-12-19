import { defineStore } from 'pinia';
import { getUserInfo } from 'src/apis/user';

export const userInfoState = {} as any;

// 初始化数据
export const userInfoStore = defineStore('userInfo', {
  state: () => ({
    info: {} as any,
  }),
  getters: {},
  actions: {
    // 更新初始化数据
    updateInfo() {
      getUserInfo().then((res) => {
        console.log(res);

        this.info = res
        console.log(this.info);

      })
    },
  },
});
