<template>
  <!-- 语言切换 -->
  <q-header v-if="loginSetting.lang.showLogin" class="bg-white">
    <q-toolbar>
      <q-space />
      <q-btn class="text-grey-8" rounded no-caps flat>
        <q-icon name="o_swap_horiz" />
        <div>language</div>
        <switchLanguage></switchLanguage>
      </q-btn>
    </q-toolbar>
  </q-header>

  <!--  -->
  <div>
    <!-- logo -->
    <div class="row justify-center">
      <q-img class="q-mt-lg q-mb-md" width="70px" height="70px" :src="`${imageSrc('/images/logo.png')}`" />
    </div>
    <div class="row justify-center">
      <div class="text-weight-bold" style="font-size: 24px">Welcome Back</div>
    </div>

    <q-form class="q-mt-lg q-px-lg">
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
      <q-input v-if="loginSetting.login.showVerify" class="q-mb-sm" standout v-model="params.captchaVal"
        placeholder="Code">
        <template v-slot:prepend>
          <q-img width="24px" height="24px" src="/icons/code.png" />
        </template>
        <template v-slot:append>
          <q-img no-spinner v-if="params.captchaId !== ''"
            :src="imageSrc('/api/v1/captcha/' + params.captchaId + '/200-50')" width="120px" height="32px"
            @click="refreshCaptchaFunc"></q-img>
        </template>
      </q-input>

      <!-- 忘记密码、登录、注册 -->
      <div class="text-right q-mb-lg text-grey-7 cursor-pointer">Forgot Password?</div>
      <q-btn @click="submitFunc()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px"
        color="primary" label="Login" />
      <div class="text-center q-mb-xl">
        First time here?
        <span @click="$router.push({ name: 'UserRegister' })" class="text-primary cursor-pointer">Signup</span>
      </div>
    </q-form>
  </div>

  <!-- 客服图标 -->
  <q-page-sticky v-if="loginSetting.online.showLogin" position="bottom-right" :offset="[18, 18]">
    <q-fab style="width: 56px;height: 56px;" hide-icon>
      <template v-slot:label>
        <q-avatar class="full-width full-height">
          <img :src="imageSrc(onlineIcon)">
        </q-avatar>
      </template>
    </q-fab>
  </q-page-sticky>
</template>

<script lang="ts">
import switchLanguage from 'src/components/switchLanguage.vue';
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CaptchaAPI } from 'src/apis';
import { userLogin } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { useInitStore, InitStoreState } from 'src/stores/init';
import { NotifyPositive } from 'src/utils/notify';

export default defineComponent({
  name: 'userLogin',
  components: {
    switchLanguage
  },
  setup() {
    const $router = useRouter();
    const $initStore = useInitStore();

    const state = reactive({
      // 登录配置
      loginSetting: $initStore.config.settings,

      // 客服图标
      onlineIcon: $initStore.config.onlineIcon,

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
        .then((res: any) => {
          NotifyPositive('欢迎回来')

          // 更改配置文件userToken
          $initStore.updateUserToken(res.token);
          $router.push({ name: 'HomeIndex' });
        })
        .catch(() => {
          refreshCaptchaFunc();
        });
    };

    return {
      imageSrc,
      ...toRefs(state),
      refreshCaptchaFunc,
      submitFunc,
    };
  },
});
</script>
<style lang="scss" scoped>
:deep(.q-fab > a) {
  padding: 0;

  .q-fab__label {
    padding-right: 0 !important;
    padding-left: 0 !important;
    max-height: 100%;
  }
}
</style>
