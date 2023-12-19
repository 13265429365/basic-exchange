<template>
  <q-dialog v-model="LoginShow">
    <q-card style="width: 410px">
      <q-card-section class="q-pa-lg">
        <!--  -->
        <div class="text-center text-weight-bold text-primary text-h4">
          Login
        </div>
        <div class="text-center text-h6 text-weight-regular">
          Login to your account
        </div>

        <q-form class="q-mt-lg">
          <!-- 账号 -->
          <q-input class="q-mb-md" standout v-model="params.username" placeholder="Name">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/icons/username.png" />
            </template>
          </q-input>

          <!-- 密码 -->
          <q-input class="q-mb-md" v-model="params.password" standout :type="isPwd ? 'text' : 'password'"
            placeholder="Password">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/icons/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999" :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <!-- 验证码 -->
          <q-input v-if="loginSetting.showVerify" class="q-mb-sm" standout v-model="params.captchaVal" placeholder="Code">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/icons/code.png" />
            </template>
            <template v-slot:append>
              <q-img class="cursor-pointer" no-spinner v-if="params.captchaId !== ''"
                :src="imageSrc('/api/v1/captcha/' + params.captchaId + '/200-50')" width="120px" height="32px"
                @click="refreshCaptchaFunc"></q-img>
            </template>
          </q-input>

          <!-- 忘记密码、登录、注册 -->
          <div class="text-right q-mb-lg text-grey-7 cursor-pointer">Forgot Password?</div>
          <q-btn @click="submitFunc()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px"
            color="primary" label="Login" />
          <div v-if="loginSetting.showRegister" class="text-center q-mb-xl">
            First time here?
            <span @click="toRegister()" class="text-primary cursor-pointer">Signup</span>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
// 登录相关
import { useRouter } from 'vue-router';
import { CaptchaAPI } from 'src/apis';
import { userLogin, getUserInfo } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { NotifyPositive } from 'src/utils/notify';
import { useInitStore } from 'src/stores/init';

export default defineComponent({
  name: 'userLogin',
  setup(props: any, context: any) {
    const $router = useRouter();
    const $initStore = useInitStore();

    const state = reactive({
      // 悬浮按钮
      fabShow: false,

      // 登录配置
      loginSetting: $initStore.config.settings.login,

      // 登录弹窗
      LoginShow: false,

      // 是否显示密码
      isPwd: false,

      params: {
        username: '',
        password: '',
        captchaId: '', //验证Id
        captchaVal: '', // 验证码
      },
    });

    onMounted(() => {
      refreshCaptchaFunc();
    });

    // 获取验证码
    const refreshCaptchaFunc = () => {
      CaptchaAPI().then((res: any) => {
        state.params.captchaId = res;
      });
    };

    // 提交登录
    const submitFunc = () => {
      userLogin(state.params)
        .then(async (res: any) => {
          // 关闭弹窗
          state.LoginShow = false
          NotifyPositive('欢迎回来')

          // 更改配置文件userToken
          $initStore.updateUserToken(res.token);
          await userInfo()
        })
        .catch(() => {
          refreshCaptchaFunc();
        });
    };

    // 获取用户信息
    const userInfo = () => {
      getUserInfo()
        .then((res: any) => {
          // 将用户资料存到浏览器缓存
          localStorage.setItem('userInfo', JSON.stringify(res))

          if ($router.currentRoute.value.path == '/') {
            context.emit('updateLoginStatus')
          } else {
            context.emit('updateLoginStatus')
            $router.push({ name: 'HomeIndex' });
          }
        })
    };

    // 打开登录弹窗
    const open = (status: boolean) => {
      state.LoginShow = status
    };

    // 点击注册
    const toRegister = () => {
      context.emit('switchDialogFunc', false, true);
    }

    return {
      imageSrc,
      ...toRefs(state),
      refreshCaptchaFunc,
      submitFunc,
      open,
      toRegister,
    };
  },
});
</script>

<style lang="scss" scoped></style>
