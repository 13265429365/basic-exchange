import { defineStore } from 'pinia';

// 初始化管理配置
export const initializationInitStore = ({
  config,
  translate,
  countryList,
  languageList,
}: any) => {
  const $initStore = useInitStore();
  $initStore.config = config;
  $initStore.translate = translate;
  $initStore.countryList = countryList;
  $initStore.languageList = languageList;

  return $initStore;
};

// 初始化数据
export const useInitStore = defineStore('init', {
  state: () => ({
    //  配置文件
    config: {
      //  项目名称
      name: 'BaJie',
      //  项目Logo
      logo: '/images/logo.png',
      //  默认语言
      defaultLang: 'en-US',
      //  默认模版
      template: 'default',
      //  配置设置
      settings: {
        //  注册配置
        register: {
          //  是否显示确认密码
          isConfirmPassword: false,
          //  是否显示安全密钥
          isSecurityKey: false,
          //  是否显示验证码
          isVerify: true,
          //  是否显示手机号码
          isTelephone: false,
          //  是否显示邮箱
          isEmail: false,
        },
        //  登录配置
        login: {
          //  是否显示验证码
          isVerify: true,
          //  是否显示注册
          isRegister: true,
        },
        //  切换语言配置
        switchLang: {
          //  登录页面是否显示语言切换
          isLogin: true,
          //  注册页面是否显示语言切换
          isRegister: true,
          //  首页是否显示语言切换
          isHome: true,
        },
        //  在线客服配置
        online: {
          //  登录页面是否显示在线客服
          isLogin: true,
          //  注册页面是否显示在线客服
          isRegister: true,
          //  首页是否显示在线客服
          isHome: true,
        },
        wallet: {
          //  是否开启安全密钥, 如果开启了。 提现需要输入安全密钥，修改卡片｜新建卡片｜删除卡片 需要输入安全密钥
          isSecurityKey: true,
          //  卡片管理是否开启删除
          isDelete: true,
          //  卡片管理是否开启更新
          isUpdate: true,
          //  卡片是否隐藏卡号
          isHidden: false,
        },
      },
    },

    //  翻译数据
    translate: [] as translateInterface[],

    //  国家列表
    countryList: [] as countryInterface[],

    //  语言列表
    languageList: [] as LanguageInterface[],
  }),
  getters: {},
  actions: {},
});

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
