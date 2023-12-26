<template>
  <q-dialog v-model="registerShow">
    <q-card style="width: 410px">
      <q-card-section class="q-pa-lg">

        <div class="text-center text-weight-bold text-primary text-h4">
          {{ $t('register') }}
        </div>
        <div class="text-center text-h6 text-weight-regular">
          {{ $t('registerSmall') }}
        </div>


        <q-form class="q-mt-lg">
          <!-- 邮箱 -->
          <q-input v-if="registerSetting.showEmail" standout class="q-mb-md" v-model="params.email"
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
          <q-input v-if="registerSetting.showCmfPass" class="q-mb-md" v-model="ConfirmPassword" standout
            :type="isConfirmPwd ? 'text' : 'password'" :placeholder="$t('cmfPassword')">
            <template v-slot:prepend>
              <q-img src="/icons/password.png" />
            </template>
            <template v-slot:append>
              <q-icon class="text-grey-7 cursor-pointer" :name="isConfirmPwd ? 'visibility' : 'visibility_off'"
                @click="isConfirmPwd = !isConfirmPwd" />
            </template>
          </q-input>

          <!-- 验证码 -->
          <q-input v-if="registerSetting.showVerify" class="q-mb-md" standout v-model="params.captchaVal"
            :placeholder="$t('code')">
            <template v-slot:prepend>
              <q-img src="/icons/code.png" />
            </template>
            <template v-slot:append>
              <q-img no-spinner v-if="params.captchaId !== ''"
                :src="imageSrc('/api/v1/captcha/' + params.captchaId + '/100-50')" width="100px" height="50px"
                @click="refreshCaptchaFunc" class="cursor-pointer"></q-img>
            </template>
          </q-input>

          <!-- 秘钥 -->
          <q-input v-if="registerSetting.showSecurityPass" class="q-mb-md" standout v-model="params.securityKey"
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
          <div v-if="registerSetting.showTelephone" class="row no-wrap justify-between">
            <q-btn-dropdown class="col-4 text-weight-regular" unelevated flat no-caps dropdown-icon="expand_more"
              style="height: 56px;border: 1px solid #DDDDDD;color: #8F959E;">
              <template v-slot:label>
                <div class="row no-wrap items-center">
                  <q-img :src="imageSrc(options[areaCodeIndex].icon ? options[areaCodeIndex].icon : '')" width="24px"
                    height="16px" />
                  <div class="q-ml-sm">+{{ options[areaCodeIndex].code }}</div>
                </div>
              </template>
              <!-- 下拉 -->
              <q-list style="min-width: 268px" class="q-py-sm">
                <q-item @click="areaCodeIndex = i" v-for="(item, i) in options" :key="i" clickable v-close-popup
                  class="row no-wrap items-center">
                  <q-img class="q-mr-sm" :src="imageSrc(item.icon ? item.icon : '')" width="38px" height="38px" />
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
          <div @click="toLogin()" class="text-center q-pb-xl text-primary cursor-pointer">
            {{ $t('toLogin') }}
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { CaptchaAPI } from 'src/apis';
import { userRegister } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { InitStore } from 'src/stores/init';
import { NotifyNegative } from 'src/utils/notify';

export default defineComponent({
  name: 'registerDialog',
  setup(props: any, context: any) {
    const $router = useRouter();
    const $initStore = InitStore();

    let state = reactive({
      // 注册配置
      registerSetting: $initStore.config.settings.register,

      // 是否显示密码
      isPwd: false,
      isConfirmPwd: false,

      // 地区选择
      options: $initStore.countryList as any,

      // 确认密码
      ConfirmPassword: '',

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
      },

      // 注册弹窗
      registerShow: false,
    });

    // 获取验证码
    const refreshCaptchaFunc = () => {
      CaptchaAPI().then((res: any) => {
        state.params.captchaId = res;
      })
    };

    // 注册弹窗
    const open = (status: boolean) => {
      refreshCaptchaFunc();
      state.registerShow = status;
    };

    // 提交注册
    const submitFunc = () => {
      // 判断两次密码是否一致
      if (state.params.password !== state.ConfirmPassword && state.registerSetting.showCmfPass) {
        NotifyNegative('判断两次密码不一致');
        return false
      };
      userRegister(state.params).then(async (res: any) => {
        // 更改配置文件userToken
        await $initStore.updateUserToken(res.token);
        state.registerShow = false;
        if ($router.currentRoute.value.path == '/') {
          context.emit('updateLoginStatus')
        } else {
          context.emit('updateLoginStatus')
          $router.push({ name: 'HomeIndex' });
        }
      }).catch(() => {
        refreshCaptchaFunc();
      });
    }

    // 点击注册
    const toLogin = () => {
      context.emit('switchDialogFunc', true, false);
    }


    return {
      ...toRefs(state),
      toLogin,
      open,
      refreshCaptchaFunc,
      submitFunc,
      imageSrc,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-img {
  width: 24px;
  height: 24px;
}
</style>
