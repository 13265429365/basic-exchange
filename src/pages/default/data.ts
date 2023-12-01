// info.vue
export const infoList = [
  {
    element: [
      {
        name: 'Card Management',
        avatar: 'info/card.png',
        url: 'card'
      }, {
        name: 'My Wallet',
        avatar: 'info/wallet.png',
        url: 'wallet/index'
      }, {
        name: 'My property',
        avatar: 'info/property.png'
      }
    ],
  },
  {
    element: [
      {
        name: 'Share',
        avatar: 'info/share.png',
        url: 'share'
      }, {
        name: 'Team Management',
        avatar: 'info/Management.png',
        url: 'team/management'
      }, {
        name: 'Team Benefits',
        avatar: 'info/Benefits.png',
        url: '/team/benefits'
      }
    ],
  },
  {
    element: [
      {
        name: 'VIP',
        avatar: 'info/vip.png',
        url: '/grade',
      }, {
        name: 'Identification',
        avatar: 'info/Identification.png',
        url: 'identification'
      }, {
        name: 'Help Center',
        avatar: 'info/help.png',
        url: 'help/center'
      }, {
        name: 'Settings',
        avatar: 'info/settings.png',
        url: 'setting'
      }, {
        name: 'Download',
        avatar: 'info/download.png',
        url: 'download'
      }
    ],
  },
]
// setting.vue
export const settingList = [
  {
    name: 'Notification Settings',
    avatar: 'darkness/user.png',
    url: 'setting'
  }, {
    name: 'Login Password',
    avatar: 'darkness/password.png',
    url: 'new/password',
  }, {
    name: 'Secret Key',
    avatar: 'darkness/key.png',
    url: 'new/code'
  }, {
    name: 'Blind Phone Number',
    avatar: 'darkness/phone.png',
    url: 'authentication'
  }, {
    name: 'Email',
    avatar: 'darkness/email.png',
    url: 'enter/email'
  },{
    name: 'Language',
    avatar: 'darkness/language.png',
    url: 'language'
  }, {
    name: 'New Notices',
    avatar: 'darkness/message.png',
    url: 'setting',
    toggle: true
  }, {
    name: 'About',
    avatar: 'darkness/about.png',
    url: 'about',
    version: 'V1.1.1',
  }
]
// language.vue
export const langList = [
  {
    name: 'English',
    avatar: 'english.png',
    shape: false,
  }, {
    name: 'China',
    avatar: 'china.png',
    shape: false,
  }, {
    name: 'Japan',
    avatar: 'Japan.png',
    shape: false,
  }, {
    name: 'Koren',
    avatar: 'Koren.png',
    shape: false,
  },
]
// about.vue
export const aboutList = [
  {
    name: 'Privacy Policy',
    url: 'privacy/policy',
  }, {
    name: 'Copyright Information',
    url: '',
  }, {
    name: 'About',
    url: '',
  }
]
// privacyPolicy.vue
export const privacyList = [
  {
    name: 'Cancelation Policy',
    content: 'However mean your life is,meet it and live it ;do not shun it and call it hard names.it is not sobad as you are.it looks poorest when you are richest.The fault-fnder will find faults in paradise.Loveyour life,poor as it is.You may perhaps have some pleasant,thrilling,glorious hourss,even in a poor-house.The setting sun is reflected from the windows of the alms-house as brightly as from the richmans abode;the snow melts before its door as early in the soring.l do not see but a quiet mind maylive as contentedly there and have as cheering thoughts,as in a palace. The towns poor seem to meoften to live the most independent lives of any.May be they are simply great enough to receive',
  }, {
    name: 'Cancelation Policy',
    content: 'However mean your life is,meet it and live it ;do not shun it and call it hard names.it is not sobad as you are.it looks poorest when you are richest.The fault-fnder will find faults in paradise.Loveyour life,poor as it is.You may perhaps have some pleasant,thrilling,glorious hourss,even in a poor-house.The setting sun is reflected from the windows of the alms-house as brightly as from the richmans abode;the snow melts before its door as early in the soring.l do not see but a quiet mind maylive as contentedly there and have as cheering thoughts,as in a palace. The towns poor seem to meoften to live the most independent lives of any.May be they are simply great enough to receive',
  }
]
//  /wallet/index.vue or btc.vue
export const walletList = [
  {
    name: 'Recharge-BTC',
    date: '2023/10/12 12:20:36',
    money: '+236',
    type: 'examine'
  },
  {
    name: 'Recharge-BTC',
    date: '2023/10/12 13:26:06',
    money: '+236',
    type: 'fail'
  },
  {
    name: 'Recharge-BTC',
    date: '2023/10/12 08:20:36',
    money: '+236',
    type: 'success'
  },
  {
    name: 'Cash Out-Digital Currency',
    date: '2023/10/12 10:12:32',
    money: '+236',
    type: 'success'
  }
]
