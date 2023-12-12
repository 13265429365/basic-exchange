<template>
  <q-dialog v-model="LoginShow">
    <q-card style="width: 410px">
      <q-card-section style="padding: 30px">
        <div class="text-center text-weight-bold text-primary" style="font-size: 36px">
          Login
        </div>
        <div class="text-center" style="font-size: 18px">
          Login to your account
        </div>
        <div class="q-mt-lg">
          <q-form>
            <q-input class="q-mb-md" standout v-model="userParams.username" placeholder="Username">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/user.png" />
              </template>
            </q-input>
            <q-input class="q-mb-md" v-model="userParams.password" standout :type="isPwd ? 'password' : 'text'"
              placeholder="Password">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/password.png" />
              </template>
              <template v-slot:append>
                <q-icon style="color: #999999" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <q-input class="q-mb-md" v-model="userParams.captchaVal" standout placeholder="Password">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/code.png" />
              </template>
              <template v-slot:append>
                <q-img no-spinner v-if="userParams.captchaId !== ''"
                  :src="imageSrc('/captcha/' + userParams.captchaId + '/200-50')" width="120px" height="32px"
                  @click="refreshCaptchaFunc"></q-img>
              </template>
            </q-input>
            <div @click="toForgot()" class="text-right q-mb-lg" style="font-size: 14px; color: #999999">
              Forgot Password?
            </div>
            <!-- 登录按钮 -->
            <q-btn @click="toMypage()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px"
              color="primary" label="Login" />
            <!-- 前往注册 -->
            <div class="text-center" style="font-size: 14px">
              First time here?
              <span @click="toRegister()" class="text-primary cursor-pointer">Signup</span>
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
  import { reactive, toRefs, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  // 登录相关
  import { CaptchaAPI } from 'src/apis';
  import { userLogin } from 'src/apis/user';
  import { imageSrc } from 'src/utils';
  // import { NotifyNegative, NotifyPositive } from 'src/utils/notify'
  export default {
    name: 'loginDialog',
    setup() {
      const router = useRouter();
      let store = reactive({
        // 是否显示密码
        isPwd: true,
        //登录input数据
        userParams: {
          username: '',
          password: '',
          captchaId: '', //验证id
          captchaVal: '', // 验证码
        },
        // 登录弹窗
        LoginShow: false,
        // 确认密码
        password: '',
      });
      onMounted(() => {
        refreshCaptchaFunc();
      });
      // 获取验证码
      const refreshCaptchaFunc = () => {
        CaptchaAPI().then((res : any) => {
          store.userParams.captchaId = res;
        });
      };
      const toLogin = () => {
          store.LoginShow = true;
      };
      return {
        ...toRefs(store),
        // 点击登录
        toMypage() {
          refreshCaptchaFunc();
          userLogin(store.userParams).then((res : any) => {
            store.LoginShow = false;
            router.push('/dashboard');
          });
        },
        // 登录弹窗
        toLogin,
        refreshCaptchaFunc,
        imageSrc,
      };
    },
  };
</script>

<style lang="scss" scoped>
  // @import url("../../css/pcCss.css");
  // .q-header {
  //   min-width: 1100px;
  //   position: absolute;
  // }

  // .q-chip {
  //   height: 18px;
  //   font-size: 10px;
  //   color: #F7DEB6;
  //   background: #322B19;
  //   margin: 0;
  //   margin-right: 4px;
  //   padding: 4px 5px;
  // }

  // .vip {
  //   width: 11px;
  //   height: 11px;
  //   margin-right: 2px;
  // }

  // .badge {
  //   width: 20px;
  //   height: 20px;
  //   border-radius: 50%;
  //   padding: 2px;
  //   top: -35%;
  //   right: -35%;
  // }
</style>
