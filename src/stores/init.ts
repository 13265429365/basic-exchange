import { defineStore } from 'pinia';
import { Cookies } from 'quasar';

export const UserTokenKey = '_UserToken';
export const UserLangKey = '_UserLang';

// 初始化数据
export const useInitStore = defineStore('init', {
  state: () => ({
    //  用户Token
    userToken: '',

    //  用户语言
    userLang: '',

    //  用户信息
    userInfo: {} as any,

    //  tabbars 菜单
    tabbars: [] as tabbarInterface[],

    // 用户菜单
    userMenu: [] as menuInterface[][],

    // 快捷菜单
    quickMenu: [] as menuInterface[][],

    //  翻译数据
    translate: [] as translateInterface[],

    //  国家列表
    countryList: [] as countryInterface[],

    //  语言列表
    languageList: [] as LanguageInterface[],

    //  配置文件
    config: {
      //  项目名称
      name: 'BaJie',
      //  项目Logo
      logo: '/images/defulat/logo.png',
      //  默认语言
      defaultLang: 'en-US',
      //  默认模版
      template: 'default',

      //  配置设置
      settings: {
        //  注册配置
        register: {
          //  是否显示确认密码
          showCmfPass: false,
          //  是否显示安全密钥
          showSecurityPass: false,
          //  是否显示验证码
          showVerify: true,
          //  是否显示手机号码
          showTelephone: false,
          //  是否显示邮箱
          showEmail: false,
        },
        //  登录配置
        login: {
          //  是否显示验证码
          showVerify: true,
          //  是否显示注册
          showRegister: true,
        },
        //  切换语言配置
        lang: {
          //  登录页面是否显示语言切换
          showLogin: true,
          //  注册页面是否显示语言切换
          showRegister: true,
          //  首页是否显示语言切换
          showHome: true,
        },
        //  在线客服配置
        online: {
          //  登录页面是否显示在线客服
          showLogin: true,
          //  注册页面是否显示在线客服
          showRegister: true,
          //  首页是否显示在线客服
          showHome: true,
          //  充值是否跳转到客服
          depositLink: false,
          //  提现是否跳转到客服
          withdrawLink: false,
        },
        wallet: {
          //  是否开启安全密钥, 如果开启了。 提现需要输入安全密钥，修改卡片｜新建卡片｜删除卡片 需要输入安全密钥
          showSecurityPass: true,
          //  卡片管理是否开启删除
          showDelete: true,
          //  卡片管理是否开启更新
          showUpdate: true,
          //  卡片是否隐藏卡号
          showNumber: false,
        },
      },
    },
  }),
  getters: {},
  actions: {
    //  更新用户Token
    updateUserToken(token: string) {
      this.userToken = token;
      console.log('更新了token');
      Cookies.set(UserTokenKey, token, { expires: '30d 3h 5m' });
    },
  },
});

interface tabbarInterface {
  //  标题
  name: string;

  //  默认图标
  icon: string;

  //  激活图标
  activeIcon: string;

  //  路由
  route: string;
}

interface menuInterface {
  //  标题
  name: string;

  //  默认图标
  icon: string;

  //  路由
  route: string;
}

interface countryInterface {
  //  国家ID
  id: number;

  //  国家名称
  name: string;

  //  国家图标
  icon: string;

  //  国家代码
  code: string;
}

interface translateInterface {
  // 建铭
  label: string;
  //  键值
  value: string;
}

interface LanguageInterface {
  //  语言ID
  id: number;

  //  语言名称
  name: string;

  //  语言图标
  icon: string;
}
