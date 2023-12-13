<template>
  <div class="register">
    <div>
      <!-- logo -->
      <div class="row justify-center">
        <q-img class="q-mt-lg q-mb-md" width="70px" height="70px" :src="`${imageSrc('/images/logo.png')}`" />
      </div>
      <div class="row justify-center">
        <div class="text-h5 text-weight-bold">Create New Account</div>
      </div>

      <q-form class="q-mt-lg q-px-lg">
        <!-- 邮箱 -->
        <q-input v-if="registerSetting.showEmail" standout class="q-mb-md" v-model="params.email" placeholder="email">
          <template v-slot:prepend>
            <q-img src="/icons/email.png" />
          </template>
        </q-input>

        <!-- 账号 -->
        <q-input standout class="q-mb-md" v-model="params.username" placeholder="Username">
          <template v-slot:prepend>
            <q-img src="/icons/username.png" />
          </template>
        </q-input>

        <!-- 密码 -->
        <q-input class="q-mb-md" v-model="params.password" standout :type="isPwd ? 'text' : 'password'"
          placeholder="Password">
          <template v-slot:prepend>
            <q-img src="/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon class="text-grey-7 cursor-pointer" :name="isPwd ? 'visibility' : 'visibility_off'"
              @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <!-- 确认密码 -->
        <q-input v-if="registerSetting.showCmfPass" class="q-mb-md" v-model="password" standout
          :type="isPwd2 ? 'text' : 'password'" placeholder="Password">
          <template v-slot:prepend>
            <q-img src="/icons/password.png" />
          </template>
          <template v-slot:append>
            <q-icon class="text-grey-7 cursor-pointer" :name="isPwd2 ? 'visibility' : 'visibility_off'"
              @click="isPwd2 = !isPwd2" />
          </template>
        </q-input>

        <!-- 验证码 -->
        <q-input v-if="registerSetting.showVerify" class="q-mb-md" standout v-model="params.captchaVal"
          placeholder="Code">
          <template v-slot:prepend>
            <q-img src="/icons/code.png" />
          </template>
          <template v-slot:append>
            <q-img no-spinner v-if="params.captchaId !== ''" :src="imageSrc('/captcha/' + params.captchaId + '/200-50')
              " width="120px" height="32px" @click="refreshCaptchaFunc"></q-img>
          </template>
        </q-input>

        <!-- 秘钥 -->
        <q-input v-if="registerSetting.showSecurityPass" class="q-mb-md" standout v-model="params.securityKey"
          placeholder="Secret Key">
          <template v-slot:prepend>
            <q-img src="/icons/key.png" />
          </template>
        </q-input>

        <!-- 邀请码 -->
        <q-input class="q-mb-md" standout v-model="params.code" placeholder="Invite Code">
          <template v-slot:prepend>
            <q-img src="/icons/profile.png" />
          </template>
        </q-input>

        <!-- 手机号码 -->
        <div v-if="registerSetting.showTelephone" class="row no-wrap">
          <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options"
            class="q-mb-md q-mr-sm select" standout>
            <template v-slot:prepend>
              <q-img width="24px" height="16px" @click.stop.prevent />
              <q-icon name="keyboard_arrow_down" />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-img width="24px" height="16px" @click.stop.prevent />
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
          <q-input class="q-mb-lg full-width" standout v-model="params.telephone" placeholder="Telphone" />
        </div>

        <!-- 前往登录、点击注册 -->
        <q-btn @click="submitFunc()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px;"
          color="primary" label="Signup" />
        <div class="size14 text-center q-pb-xl">
          Already have an account?
          <span @click="$router.push('/login')" class="text-primary cursor-pointer">Login</span>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CaptchaAPI } from 'src/apis';
import { userRegister } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { useInitStore } from 'src/stores/init';
import { NotifyNegative } from 'src/utils/notify';
import { InitStoreState } from 'src/stores/init';
export default defineComponent({
  name: 'userRegister',
  setup() {
    const $router = useRouter();
    const $initStore = useInitStore();

    let state = reactive({
      // 注册配置
      registerSetting: InitStoreState.config.settings.register,

      // 是否显示密码
      isPwd: true,
      isPwd2: true,

      // 地区选择
      options: [
        { label: '+86', value: '中国' },
        { label: '+866', value: '香港' },
      ],

      // 确认密码
      password: '',

      // 手机区号
      areaCode: '+86',

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
    onMounted(() => {
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
      if (state.params.password !== state.password) {
        NotifyNegative('判断两次密码不一致');
        return false
      };
      userRegister(state.params).then((res: any) => {
        $initStore.updateUserToken(res.token);
        $router.push({ name: 'Home' })
      }).catch(() => {
        refreshCaptchaFunc();
      });
    }

    // 监听地区选择
    const newValue = (newValue: void) => {
      console.log(newValue)
    }

    return {
      ...toRefs(state),
      newValue,
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
</style>
