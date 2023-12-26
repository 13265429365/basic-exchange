<template>
  <q-dialog v-model="registerShow">
    <q-card style="width: 410px">
      <q-card-section class="q-pa-lg">
        <div class="text-center text-weight-bold text-primary text-h4">
          {{ $t('register') }}
        </div>
        <div class="text-center text-body1 text-weight-regular q-mt-sm text-grey">
          {{ $t('registerSmall') }}
        </div>

        <q-form class="q-mt-lg">
          <!-- 邮箱 -->
          <q-input v-if="config.settings.register.showEmail" standout class="q-mb-md" v-model="params.email"
            :placeholder="$t('email')">
            <template v-slot:prepend>
              <q-img src="/images/email.png" />
            </template>
          </q-input>

          <!-- 账号 -->
          <q-input standout class="q-mb-md" v-model="params.username" :placeholder="$t('username')">
            <template v-slot:prepend>
              <q-img src="/images/username.png" />
            </template>
          </q-input>

          <!-- 密码 -->
          <q-input class="q-mb-md" v-model="params.password" standout
            :type="showTextPassword.password ? 'text' : 'password'" :placeholder="$t('password')">
            <template v-slot:prepend>
              <q-img src="/images/password.png" />
            </template>
            <template v-slot:append>
              <q-icon class="text-grey-7 cursor-pointer"
                :name="showTextPassword.password ? 'visibility' : 'visibility_off'"
                @click="showTextPassword.password = !showTextPassword.password" />
            </template>
          </q-input>

          <!-- 确认密码 -->
          <q-input v-if="config.settings.register.showCmfPass" class="q-mb-md" v-model="params.cmfPassword" standout
            :type="showTextPassword.cmfPassword ? 'text' : 'password'" :placeholder="$t('cmfPassword')">
            <template v-slot:prepend>
              <q-img src="/images/password.png" />
            </template>
            <template v-slot:append>
              <q-icon class="text-grey-7 cursor-pointer"
                :name="showTextPassword.cmfPassword ? 'visibility' : 'visibility_off'"
                @click="showTextPassword.cmfPassword = !showTextPassword.cmfPassword" />
            </template>
          </q-input>

          <!-- 验证码 -->
          <q-input v-if="config.settings.register.showVerify" class="q-mb-md" standout v-model="params.captchaVal"
            :placeholder="$t('code')">
            <template v-slot:prepend>
              <q-img src="/images/code.png" />
            </template>
            <template v-slot:append>
              <q-img no-spinner v-if="params.captchaId !== ''" :src="baseURL + '/captcha/' + params.captchaId + '/100-50'"
                width="100px" height="50px" @click="refreshCaptchaFunc" class="cursor-pointer"></q-img>
            </template>
          </q-input>

          <!-- 安全秘钥 -->
          <q-input v-if="config.settings.register.showSecurityPass" class="q-mb-md" standout v-model="params.securityKey"
            :type="showTextPassword.securityKey ? 'text' : 'password'" :placeholder="$t('enterSecretKey')">
            <template v-slot:prepend>
              <q-img src="/images/key.png" />
            </template>
            <template v-slot:append>
              <q-icon class="text-grey-7 cursor-pointer"
                :name="showTextPassword.securityKey ? 'visibility' : 'visibility_off'"
                @click="showTextPassword.securityKey = !showTextPassword.securityKey" />
            </template>
          </q-input>

          <!-- 确认安全秘钥 -->
          <q-input v-if="config.settings.register.showSecurityPass" class="q-mb-md" standout
            v-model="params.cmfSecurityKey" :type="showTextPassword.cmfSecurityKey ? 'text' : 'password'"
            :placeholder="$t('enterSecretKey')">
            <template v-slot:prepend>
              <q-img src="/images/key.png" />
            </template>
            <template v-slot:append>
              <q-icon class="text-grey-7 cursor-pointer"
                :name="showTextPassword.cmfSecurityKey ? 'visibility' : 'visibility_off'"
                @click="showTextPassword.cmfSecurityKey = !showTextPassword.cmfSecurityKey" />
            </template>
          </q-input>

          <!-- 邀请码 -->
          <q-input v-if="config.settings.register.isInvite" class="q-mb-md" standout v-model="params.code"
            :placeholder="$t('inviteCode')">
            <template v-slot:prepend>
              <q-img src="/images/profile.png" />
            </template>
          </q-input>

          <!-- 手机号码 -->
          <div v-if="config.settings.register.showTelephone" class="row no-wrap justify-between">
            <q-btn-dropdown class="col-4 text-weight-regular" unelevated flat no-caps dropdown-icon="expand_more"
              style="height: 56px;border: 1px solid #DDDDDD;color: #8F959E;">
              <template v-slot:label>
                <div class="row no-wrap items-center">
                  <q-img :src="imageSrc(countryList[countryIndex].icon)" width="24px" height="16px" />
                  <div class="q-ml-sm">+{{ countryList[countryIndex].code }}</div>
                </div>
              </template>
              <!-- 下拉 -->
              <q-list style="min-width: 268px" class="q-py-sm">
                <q-item @click="countryIndex = i" v-for="(item, i) in countryList" :key="i" clickable v-close-popup
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
import { useRouter, useRoute } from 'vue-router';
import { CaptchaAPI } from 'src/apis';
import { userRegister } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { InitStore } from 'src/stores/init';
import { NotifyNegative } from 'src/utils/notify';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'registerDialog',
  setup(props: any, context: any) {
    const $router = useRouter();
    const $route = useRoute();
    const $initStore = InitStore();
    const { t } = useI18n();

    let state = reactive({
      baseURL: process.env.baseURL,

      // 初始配置信息
      config: $initStore.config,

      // 地区选择
      countryIndex: 0,
      countryList: $initStore.countryList as any,

      // 确认密码
      confirmPassword: '',

      // 是否显示密码
      showTextPassword: {
        // 登录密码
        password: false,
        cmfPassword: false,
        // 安全码
        securityKey: false,
        cmfSecurityKey: false,
      },

      //提交参数
      params: {
        username: '', //用户名
        password: '', //密码
        cmfPassword: '',  // 确认密码
        captchaId: '', //验证id
        captchaVal: '', // 验证码
        email: '', //邮箱
        telephone: '', //电话
        securityKey: '', //安全秘钥
        cmfSecurityKey: '',//确认安全密钥
        code: $route.query.code ? $route.query.code as any : '', //邀请码
      },

      // 注册弹窗
      registerShow: false,
    });
    console.log(state.params.code);


    // 获取验证码
    const refreshCaptchaFunc = () => {
      CaptchaAPI().then((res: any) => {
        state.params.captchaId = res;
      })
    };

    // 注册弹窗
    const openDialog = (status: boolean) => {
      refreshCaptchaFunc();
      state.registerShow = status;
    };

    // 提交注册
    const submitFunc = () => {
      // 判断两次登录密码是否一致
      if (state.config.settings.register.showCmfPass) {
        if (state.params.password !== state.params.cmfPassword) {
          NotifyNegative(t('twoPasswordsAreDifferent'));
          return false
        }
      }

      // 判断两次安全秘钥是否一致
      if (state.config.settings.register.showSecurityPass) {
        if (state.params.securityKey !== state.params.cmfSecurityKey) {
          NotifyNegative(t('twoSecretKeyAreDifferent'));
          return false
        }
      }

      userRegister(state.params).then(async (res: any) => {
        // 更改配置文件userToken
        await $initStore.updateUserToken(res.token);
        state.registerShow = false;
        if ($router.currentRoute.value.path == '/') {
          context.emit('updateLoginStatus')
        } else {
          context.emit('updateLoginStatus')
          void $router.push({ name: 'HomeIndex' });
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
      openDialog,
      refreshCaptchaFunc,
      submitFunc,
      imageSrc,
    };
  },
});
</script>

<style lang="scss" scoped></style>
