<template>
  <!-- <div class="Header"> -->
  <q-header reveal class="bg-white text-color-3 row justify-between q-py-md q-pl-xl q-pr-lg no-wrap">
    <div class="row items-center no-wrap">
      <q-img @click="to('/')" class="q-mr-lg cursor-pointer" src="/images/default/pc/logo.png" width="172px" height="42px" />
      <span class="text-color-3 q-ml-sm q-mr-xl cursor-pointer">Support Center</span>
      <div class="row no-wrap items-center cursor-pointer">
        <span>more</span>
        <q-icon name="keyboard_arrow_down" />
        <q-menu :offset="[0, 27]" auto-close transition-show="jump-down" transition-hide="jump-up">
          <q-list style="min-width: 268px" class="q-py-sm">
            <q-item v-for="(item,i) in moreList" :key="i" clickable class="row no-wrap items-center">
              <q-img class="q-mr-sm" :src="`/images/default/${item.url}.png`" width="38px" height="38px" />
              <div>
                <div style="font-size: 16px;">{{item.name}}</div>
                <div style="font-size: 12px;">{{item.content}}</div>
              </div>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>
    <div class="row items-center no-wrap">
      <!-- 搜索框 -->
      <q-input placeholder="searching..." rounded outlined v-model="search">
        <template v-slot:prepend>
          <q-img class="q-mr-sm" src="/images/default/pc/search.png" width="20px" height="20px" />
        </template>
      </q-input>
      <!-- 登录状态下 -->
      <div v-if="isLogin" class="row items-center">
        <!-- Deposit -->
        <q-btn class="q-ml-md text-weight-regular cursor-pointer" style="padding: 0 10px;min-height: 30px" unelevated
          rounded no-caps color="primary" label="Deposit">
          <q-menu :offset="[140, 22]" auto-close transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 214px" class="q-px-sm">
              <q-item v-for="(item,i) in depositList" :key="i" clickable class="row no-wrap items-center">
                <q-img class="q-mr-sm" :src="`/images/default/pc/${item.url}.png`" width="20px" height="20px" />
                <div style="font-size: 16px;">{{item.name}}</div>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- 头像 -->
        <q-avatar class="q-ml-md cursor-pointer" style="width: 34px;height: 34px;">
          <img src="/images/default/pc/avatar.png">
          <q-menu :offset="[30, 22]" auto-close transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 218px;padding: 20px 23px 0 23px">
              <q-item style="padding: 0;">
                <div class="row">
                  <div>
                    <q-avatar class="q-mr-sm" style="width: 30px;height: 30px">
                      <img src="/images/default/head.png">
                    </q-avatar>
                  </div>
                  <div class="col-8">
                    <div class="row no-wrap items-center q-mb-xs">
                      <div class="text-weight-bold q-mr-sm">
                        Jack
                      </div>
                      <div style="font-size: 12px;">
                        569***@qq.com
                      </div>
                    </div>
                    <div class="row no-wrap">
                      <q-chip class="q-chip" style="border: 1px solid #F7DEB6;">
                        <q-img class="vip" src="/images/default/Vip_icon.png" />
                        Lv.3
                      </q-chip>
                      <q-chip class="q-chip bg-primary text-white" style="font-size: 12px;">
                        unverified
                      </q-chip>
                    </div>
                  </div>
                </div>
              </q-item>
              <q-separator class="q-mt-lg" style="background: #F1F1F1;" />
              <q-item @click="to(item.url)" v-for="(item,i) in infoList" :key="i" clickable class="row no-wrap items-center q-py-md q-px-xs">
                <q-img class="q-mr-sm" :src="`/images/default/pc/${item.url}.png`" width="20px" height="20px" />
                <div>{{item.name}}</div>
              </q-item>
              <q-separator class="q-mt-md" style="background: #F1F1F1;" />
              <q-item @click="logOut()" clickable class="row no-wrap items-center q-py-xs q-px-xs">
                <q-img class="q-mr-sm" src="/images/default/pc/LogOut.png" width="20px" height="20px" />
                <div>Log out</div>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
        <!--  -->
        <q-img class="q-ml-md iconLogo cursor-pointer" src="/images/default/darkness/email.png" />
        <q-img class="q-ml-md iconLogo cursor-pointer" style="overflow: unset;"
          src="/images/default/darkness/prompt.png">
          <q-badge style="background: #F45E0C;" class="badge" floating rounded>20</q-badge>
        </q-img>
      </div>
      <!-- 未登录状态下 -->
      <div v-else class="row items-center no-wrap">
        <q-btn @click="LoginShow=true" class="q-ml-md text-color-3 text-weight-regular"
          style="padding: 0 10px;min-height: 30px" unelevated rounded no-caps color="white" label="Login" />
        <q-btn @click="registerShow=true" class="q-ml-md text-weight-regular" style="padding: 0 10px;min-height: 30px"
          unelevated rounded no-caps color="primary" label="Register" />
      </div>
      <q-img class="q-ml-md iconLogo cursor-pointer" src="/images/default/darkness/language.png" />
    </div>

    <!-- 登录 -->
    <q-dialog v-model="LoginShow">
      <q-card style="width: 410px;">
        <q-card-section style="padding: 30px;">
          <div class="text-center text-weight-bold text-primary" style="font-size: 36px;">
            Login
          </div>
          <div class="text-center" style="font-size: 18px;">
            Login to your account
          </div>
          <div class="q-mt-lg">
            <q-form>
              <q-input class="q-mb-md" standout v-model="userParams.username" placeholder="Username">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/user.png" />
                </template>
              </q-input>
              <q-input class="q-mb-md" v-model="userParams.password" standout :type="isPwd ? 'password' : 'text'" placeholder="Password">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/password.png" />
                </template>
                <template v-slot:append>
                  <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <q-input class="q-mb-md" v-model="userParams.captchaVal" standout placeholder="Password">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/code.png" />
                </template>
                <template v-slot:append>
                  <q-img no-spinner v-if="userParams.captchaId !== ''" :src="imageSrc(
                    '/captcha/' + userParams.captchaId + '/200-50', true
                  )
                    " width="120px" height="32px" @click="refreshCaptchaFunc"></q-img>
                </template>
              </q-input>
              <div @click="toForgot()" class="text-right q-mb-lg" style="font-size: 14px;color:#999999">
                Forgot Password?
              </div>
              <!-- 登录按钮 -->
              <q-btn @click="toMypage()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px;" color="primary" label="Login" />
              <!-- 前往注册 -->
              <div class="text-center" style="font-size: 14px;">
                First time here?
                <span @click="toRegister()" class="login">Signup</span>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- 注册 -->
    <q-dialog v-model="registerShow">
      <q-card style="width: 410px;">
        <q-card-section style="padding: 30px;">
          <div class="text-center text-weight-bold text-primary" style="font-size: 36px;">
            Sign Up
          </div>
          <div class="text-center" style="font-size: 18px;">
            Create an account
          </div>
          <div class="q-mt-lg">
            <q-form>
              <q-input standout class="q-mb-md" v-model="registerParams.username" placeholder="Username">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/user.png" />
                </template>
              </q-input>
              <q-input standout class="q-mb-md" v-model="registerParams.email" placeholder="Email">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/email.png" />
                </template>
              </q-input>
              <q-input class="q-mb-md" v-model="registerParams.password" standout :type="isPwd ? 'password' : 'text'" placeholder="Password">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/password.png" />
                </template>
                <template v-slot:append>
                  <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <q-input class="q-mb-md" standout v-model="password" :type="isPwd2 ? 'password' : 'text'" placeholder="Confirm Password">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/password.png" />
                </template>
                <template v-slot:append>
                  <q-icon style="color: #999999;" :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd2 = !isPwd2" />
                </template>
              </q-input>
              <q-input class="q-mb-md" standout v-model="registerParams.captchaVal" placeholder="Code">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/code.png" />
                </template>
                <template v-slot:append>
                  <q-img no-spinner v-if="userParams.captchaId !== ''" :src="imageSrc(
                    '/captcha/' + userParams.captchaId + '/200-50', true
                  )
                    " width="120px" height="32px" @click="refreshCaptchaFunc"></q-img>
                </template>
              </q-input>
              <q-input class="q-mb-md" standout v-model="registerParams.securityKey" placeholder="Secret Key">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/key.png" />
                </template>
              </q-input>
              <q-input class="q-mb-md" standout v-model="registerParams.code" placeholder="Invite Code">
                <template v-slot:prepend>
                  <q-img class="iconLogo" src="/images/default/user.png" />
                </template>
              </q-input>
              <div class="row no-wrap">
                <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options"
                  class="q-mb-md q-mr-sm select" standout>
                  <template v-slot:prepend>
                    <q-img class="countryLogo" src="/images/default/china.png" @click.stop.prevent />
                    <q-icon name="keyboard_arrow_down" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-img class="countryLogo" src="/images/default/china.png" @click.stop.prevent />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:append>
                    <div>+86</div>
                  </template>
                </q-select>
                <q-input class="q-mb-lg full-width" standout v-model="registerParams.telephone" placeholder="Telphone" />
              </div>
              <!-- 点击注册 -->
              <q-btn @click="register()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px;"
                color="primary" label="Signup" />
              <!-- 前往登录 -->
              <div class="size14 text-center">
                Already have an account?
                <span @click="toLogin()" class="login">Login</span>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-header>
  <!-- </div> -->
</template>

<script lang="ts">
  import { reactive, toRefs, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  // 登录、注册相关
  import { CaptchaAPI } from 'src/api';
  import { userLogin, userRegister } from 'src/api/user';
  import { imageSrc } from 'src/utils';
  import { useUserStore } from 'src/stores/user';
  import { NotifyNegative, NotifyPositive } from 'src/utils';
  export default {
    name: 'headerBar',
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
      let store = reactive({
        // 是否显示密码
        isPwd: true,
        isPwd2: true,

        //登录input数据
        userParams: {
          username: '',
          password: '',
          captchaId: '', //验证id
          captchaVal: '', // 验证码
        },

        // 登录弹窗
        LoginShow: false,

        //注册弹窗
        registerShow: false,

        // 注册区号选择
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        // 注册input数据
        registerParams: {
          username: '',
          password: '',
          captchaId: '', //验证id
          captchaVal: '', // 验证码
          email: '',
          telephone: '',
          securityKey: '',
          code: ''
        },
        // 确认密码
        password: '',
        areaCode: '+86',
        // 判断是否登录
        isLogin: false,
        // 搜索框
        search: '',
        // more下拉框数据
        moreList: [
          {
            name: 'Title',
            content: 'describedescribedescribe',
            url: 'cashOut',
          },
          {
            name: 'Title',
            content: 'describedescribedescribe',
            url: 'cashOut',
          },
          {
            name: 'Title',
            content: 'describedescribedescribe',
            url: 'cashOut',
          },
        ],
        // deposit下拉框数据
        depositList: [
          {
            name: 'Card Management',
            url: 'CardManagement',
          },
          {
            name: 'My Wallet',
            url: 'MyWallet',
          },
          {
            name: 'My Property',
            url: 'MyProperty',
          },
        ],
        // 头像下拉框数据
        infoList: [
          {
            name: 'Profile',
            url: 'Profile',
          },
          {
            name: 'Security',
            url: 'Security',
          },
          {
            name: 'Share',
            url: 'Share',
          },
          {
            name: 'Team Management',
            url: 'TeamManagement',
          },
          {
            name: 'Vip',
            url: 'vip',
          },
        ],
      });
      // 检查是否登录状态
      const getToken = () => {
        // 获取token，判断是否登录状态
        const token = userStore.getUserToken()
        if (token&&token!='') {
          store.isLogin = true
        } else {
          store.isLogin = false
        }
      };
      onMounted(() => {
        getToken()
        // 生命周期获取验证码
        refreshCaptchaFunc();
      })
      // 获取验证码
      const refreshCaptchaFunc = () => {
        CaptchaAPI().then((res: any) => {
          store.userParams.captchaId = res;
          store.registerParams.captchaId = res;
        })
      };
      return {
        ...toRefs(store),
        to(url: string) {
          if (url) {
            router.push(url)
          }
        },
        // 点击注册
        register() {
          refreshCaptchaFunc();
          // 判断两次密码是否一致
          if (store.registerParams.password !== store.password) {
            NotifyNegative('判断两次密码不一致');
            return
          };
          userRegister(store.registerParams).then((res: any) => {
            NotifyPositive('注册成功')
            userStore.updateUserToken(res.token);
            router.push('/dashboard')
          })
        },
        // 点击登录
        toMypage() {
          refreshCaptchaFunc();
          userLogin(store.userParams).then((res: any) => {
            NotifyPositive('登录成功')
            userStore.updateUserToken(res.token);
            getToken()
            router.push('/dashboard')
          })
        },
        // 退出登录
        logOut() {
          console.log('退出')
          // customBtn('确认退出账号?', )
          userStore.removeUserToken();
          getToken()
          router.push('/')
        },
        // 登录弹窗
        toLogin() {
          store.registerShow = false
          store.LoginShow = true
        },
        // 注册弹窗
        toRegister() {
          store.LoginShow = false
          store.registerShow = true
        },
        refreshCaptchaFunc,
        imageSrc,
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 下拉选框样式
  :deep .q-select .q-field__control:hover:before {
    opacity: 0;
  }
  :deep .q-select .q-field__prepend {
    padding-right: 0;
    color: #8F959E;
  }
  :deep .q-select  .q-field__append {
    padding-left: 4px;
    font-size: 15px;
    color: #8F959E;
  }
  :deep .q-select .q-field__native {
    display: none;
  }
  :deep .q-select  .q-field__append .q-icon {
    display: none;
  }
  // pc版input样式
  :deep .q-field--standout .q-field__native {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  :deep .q-field--standout .q-field__prefix {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  :deep .q-field--standout .q-field__append {
    color: rgba(0, 0, 0, 0.54) !important;
  }

  :deep .q-field--standout:before {
    background: #fff !important;
  }
  :deep .q-field--standout .q-field__control {
    background: #fff !important;
    height: 56px !important;
    min-height: 56px !important;
    outline: none !important;
    border: 1px solid #DDDDDD;
    box-shadow: none !important;
    border-radius: 4px;
  }
  :deep .q-field--highlighted .q-field__control {
    background: #fff !important;
    box-shadow: none !important;
  }
  .q-header {
    min-width: 1100px;
    position: absolute;
  }

  /* 头像下按钮 */
  .q-chip {
    /* width: 44px; */
    height: 18px;
    font-size: 10px;
    color: #F7DEB6;
    background: #322B19;
    margin: 0;
    margin-right: 4px;
    padding: 4px 5px;
  }

  .vip {
    width: 11px;
    height: 11px;
    margin-right: 2px;
  }

  .badge {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 2px;
    top: -35%;
    right: -35%;
  }

  :deep .q-field--outlined .q-field__control {
    background: #fff !important;
    border: 1px solid #DDDDDD !important;
    border-radius: 20px !important;
    height: 40px !important;
    min-height: 40px !important;
    outline: none !important;
  }

  :deep .q-field--outlined .q-field__marginal {
    height: 40px;
    padding-right: 0 !important;
  }
</style>
