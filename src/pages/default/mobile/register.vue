<template>
  <!-- 语言切换 -->
  <q-header v-if="registerSetting.lang.showLogin" class="bg-white">
    <q-toolbar>
      <q-space />
      <q-btn class="text-grey-8" rounded no-caps flat>
        <q-icon name="o_swap_horiz" />
        <div>{{ $t('language') }}</div>
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
      <div class="text-h5 text-weight-bold">{{ $t('registerSmall') }}</div>
    </div>

    <q-form class="q-mt-lg q-px-lg">
      <!-- 邮箱 -->
      <q-input v-if="registerSetting.register.showEmail" standout class="q-mb-md" v-model="params.email"
        :placeholder="$t('email')">
        <template v-slot:prepend>
          <q-img src="/icons/email.png" />
        </template>
      </q-input>

      <!-- 账号 -->
      <q-input standout class="q-mb-md" v-model="params.username" :placeholder="$t('username')">
        <template v-slot:prepend>
          <q-img src="/icons/username.png" />
        </template>
      </q-input>

      <!-- 密码 -->
      <q-input class="q-mb-md" v-model="params.password" standout :type="isPwd ? 'text' : 'password'"
        :placeholder="$t('password')">
        <template v-slot:prepend>
          <q-img src="/icons/password.png" />
        </template>
        <template v-slot:append>
          <q-icon class="text-grey-7 cursor-pointer" :name="isPwd ? 'visibility' : 'visibility_off'"
            @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <!-- 确认密码 -->
      <q-input v-if="registerSetting.register.showCmfPass" class="q-mb-md" v-model="password" standout
        :type="isPwd2 ? 'text' : 'password'" :placeholder="$t('cmfPassword')">
        <template v-slot:prepend>
          <q-img src="/icons/password.png" />
        </template>
        <template v-slot:append>
          <q-icon class="text-grey-7 cursor-pointer" :name="isPwd2 ? 'visibility' : 'visibility_off'"
            @click="isPwd2 = !isPwd2" />
        </template>
      </q-input>

      <!-- 验证码 -->
      <q-input v-if="registerSetting.register.showVerify" class="q-mb-md" standout v-model="params.captchaVal"
        :placeholder="$t('code')">
        <template v-slot:prepend>
          <q-img src="/icons/code.png" />
        </template>
        <template v-slot:append>
          <q-img no-spinner v-if="params.captchaId !== ''"
            :src="imageSrc('/api/v1/captcha/' + params.captchaId + '/200-50')" width="120px" height="32px"
            @click="refreshCaptchaFunc"></q-img>
        </template>
      </q-input>

      <!-- 秘钥 -->
      <q-input v-if="registerSetting.register.showSecurityPass" class="q-mb-md" standout v-model="params.securityKey"
        :placeholder="$t('enterSecretKey')">
        <template v-slot:prepend>
          <q-img src="/icons/key.png" />
        </template>
      </q-input>

      <!-- 邀请码 -->
      <q-input class="q-mb-md" standout v-model="params.code" :placeholder="$t('inviteCode')">
        <template v-slot:prepend>
          <q-img src="/icons/profile.png" />
        </template>
      </q-input>

      <!-- 手机号码 -->
      <div v-if="registerSetting.register.showTelephone" class="row no-wrap justify-between">
        <q-btn-dropdown class="col-4 text-weight-regular" unelevated flat no-caps dropdown-icon="expand_more"
          style="height: 50px;background: #f5f6fa;border-radius: 10px;color: #8F959E;">
          <template v-slot:label>
            <div class="row no-wrap items-center">
              <q-img :src="imageSrc(options[areaCodeIndex].icon)" width="24px" height="16px" />
              <div class="q-ml-sm">+{{ options[areaCodeIndex].code }}</div>
            </div>
          </template>
          <!-- 下拉 -->
          <q-list style="min-width: 268px" class="q-py-sm">
            <q-item @click="areaCodeIndex = i" v-for="(item, i) in options" :key="i" clickable v-close-popup
              class="row no-wrap items-center">
              <q-img class="q-mr-sm" :src="imageSrc(item.icon)" width="38px" height="38px" />
              <div>
                <div style="font-size: 16px;">{{ item.name }}</div>
              </div>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-input style="width: 64%;" standout v-model="params.telephone" :placeholder="$t('telephone')" />
      </div>

      <!-- 前往登录、点击注册 -->
      <q-btn @click="submitFunc()" class="full-width q-my-lg" unelevated rounded no-caps style="height: 44px;"
        color="primary" :label="$t('register')" />
      <div @click="$router.push('/login')" class="text-center q-pb-xl text-primary cursor-pointer">
        {{ $t('toLogin') }}
      </div>
    </q-form>
  </div>

  <!-- 客服图标 -->
  <q-page-sticky v-if="registerSetting.online.showRegister" position="bottom-right" :offset="[18, 18]">
    <q-fab style="width: 56px;height: 56px;" hide-icon>
      <template v-slot:label>
        <q-avatar class="full-width full-height">
          <img :src="imageSrc(onlineIcon ? onlineIcon : '')">
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
import { userRegister, getUserInfo } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { InitStore } from 'src/stores/init';
import { NotifyNegative, NotifyPositive } from 'src/utils/notify';

export default defineComponent({
  name: 'userRegister',
  components: {
    switchLanguage
  },
  setup() {
    const $router = useRouter();
    const $initStore = InitStore();

    let state = reactive({
      // 注册配置
      registerSetting: {
        lang: {
          showLogin: true
        },
        register: {
          showEmail: false,
          showCmfPass: false,
          showVerify: false,
          showSecurityPass: false,
          showTelephone: false,
        },
        online: {
          showRegister: true
        },
      } as any,

      // 客服图标
      onlineIcon: $initStore.config.onlineIcon,

      // 是否显示密码
      isPwd: true,
      isPwd2: true,

      // 地区选择
      options: [] as any,

      // 确认密码
      password: '',

      // 手机区号
      areaCodeIndex: 0,

      //
      params: {
        username: '',
        password: '',
        captchaId: '', //验证id
        captchaVal: '', // 验证码
        email: '',
        telephone: '',
        securityKey: '',
        code: ''
      }
    });

    // 获取国家列表
    state.options = $initStore.countryList

    onMounted(() => {
      state.registerSetting = $initStore.config.settings
      refreshCaptchaFunc();
    })

    // 获取验证码
    const refreshCaptchaFunc = () => {
      CaptchaAPI().then((res: any) => {
        state.params.captchaId = res;
      })
    };

    // 提交注册
    const submitFunc = () => {
      // 判断两次密码是否一致
      if (state.params.password !== state.password && state.registerSetting.showCmfPass) {
        NotifyNegative('判断两次密码不一致');
        return false
      };
      userRegister(state.params).then(async (res: any) => {
        NotifyPositive('注册成功')

        // 更改配置文件userToken
        await $initStore.updateUserToken(res.data.token);
        $router.push({ name: 'HomeIndex' });
      }).catch(() => {
        refreshCaptchaFunc();
      });
    }


    return {
      ...toRefs(state),
      refreshCaptchaFunc,
      submitFunc,
      imageSrc,
    }
  }
});
</script>
<style lang="scss" scoped>
.q-img {
  width: 24px;
  height: 24px;
}

:deep(.q-fab > a) {
  padding: 0;

  .q-fab__label {
    padding-right: 0 !important;
    padding-left: 0 !important;
    max-height: 100%;
  }
}
</style>
