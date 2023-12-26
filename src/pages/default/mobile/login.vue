<template>
  <!-- 语言切换 -->
  <q-header v-if="config.settings.lang.showLogin" class="bg-white">
    <q-toolbar>
      <q-space />
      <q-btn class="text-grey-8" rounded no-caps flat>
        <q-img width="24px" height="24px" class="q-mr-sm" :src="imageSrc(currentLangInfo.icon)"></q-img>
        <div>{{ currentLangInfo.name }}</div>
        <switchLanguage></switchLanguage>
      </q-btn>
    </q-toolbar>
  </q-header>

  <div>
    <!-- logo -->
    <div class="row justify-center">
      <q-img class="q-mt-lg q-mb-md" width="70px" height="70px" :src="imageSrc(config.logo)" />
    </div>
    <div class="row justify-center">
      <div class="text-weight-bold text-h6">{{ $t('loginSmall') }}</div>
    </div>

    <q-form class="q-mt-lg q-px-lg">
      <!-- 账号 -->
      <q-input class="q-mb-md" standout v-model="params.username" :placeholder="$t('username')">
        <template v-slot:prepend>
          <q-img width="24px" height="24px" src="/icons/username.png" />
        </template>
      </q-input>

      <!-- 密码 -->
      <q-input class="q-mb-md" v-model="params.password" standout :type="isPwd ? 'text' : 'password'"
        :placeholder="$t('password')">
        <template v-slot:prepend>
          <q-img width="24px" height="24px" src="/icons/password.png" />
        </template>
        <template v-slot:append>
          <q-icon style="color: #999999" :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer"
            @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <!-- 验证码 -->
      <q-input v-if="config.settings.login.showVerify" class="q-mb-sm" standout v-model="params.captchaVal"
        :placeholder="$t('code')">
        <template v-slot:prepend>
          <q-img width="24px" height="24px" src="/icons/code.png" />
        </template>
        <template v-slot:append>
          <q-img no-spinner v-if="params.captchaId !== ''" :src="baseURL + '/captcha/' + params.captchaId + '/100-50'"
            width="100px" height="50px" @click="refreshCaptchaFunc"></q-img>
        </template>
      </q-input>

      <!-- 忘记密码、登录、注册 -->
      <div class="text-right q-mb-lg text-grey-7 cursor-pointer">{{ $t('forgotPassword') }}</div>
      <q-btn @click="submitFunc()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px"
        color="primary" :label="$t('login')" />
      <div @click="$router.push({ name: 'UserRegister' })" v-if="config.settings.login.showRegister"
        class="text-center text-primary q-mb-xl cursor-pointer">
        {{ $t('toRegister') }}
      </div>
    </q-form>
  </div>

  <!-- 客服图标 -->
  <q-avatar v-if="config.settings.online.showLogin" class="fixed-bottom-right q-mb-md q-mr-md">
    <img :src="imageSrc(config.onlineIcon)" alt="">
  </q-avatar>
</template>

<script lang="ts">
import switchLanguage from 'src/components/switchLanguage.vue';
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CaptchaAPI } from 'src/apis';
import { userLogin } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { InitStore } from 'src/stores/init';

export default defineComponent({
  name: 'userLogin',
  components: {
    switchLanguage
  },
  setup() {
    const $router = useRouter();
    const $initStore = InitStore();

    const state = reactive({
      baseURL: process.env.baseURL,

      // 当前语言信息
      currentLangInfo: $initStore.languageList.find((item: any) => item.alias == $initStore.userLang),

      // 初始化配置信息
      config: $initStore.config,

      // 是否显示密码
      isPwd: false,

      // 提交参数
      params: {
        username: '', //用户名
        password: '', //密码
        captchaId: '', //验证Id
        captchaVal: '', // 验证码
      },
    });

    console.log(state.config);
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
          await $initStore.updateUserToken(res.token);
          void $router.push({ name: 'HomeIndex' });
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
<style lang="scss" scoped></style>
