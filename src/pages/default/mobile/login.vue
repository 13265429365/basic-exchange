<template>
  <div class="register">
    <div>
      <!-- logo -->
      <div class="row justify-center">
        <q-img
          class="q-mt-lg q-mb-md"
          width="70px"
          height="70px"
          :src="`${imageSrc('/images/logo.png')}`"
        />
      </div>
      <div class="row justify-center">
        <div class="text-weight-bold" style="font-size: 24px">Welcome Back</div>
      </div>

      <q-form class="q-mt-lg q-px-lg">
        <!-- 账号 -->
        <q-input
          class="q-mb-md"
          standout
          v-model="params.username"
          placeholder="Name"
        >
          <template v-slot:prepend>
            <q-img
              width="24px"
              height="24px"
              src="/icons/username.png"
            />
          </template>
        </q-input>

        <!-- 密码 -->
        <q-input
          class="q-mb-md"
          v-model="params.password"
          standout
          :type="isPwd ? 'password' : 'text'"
          placeholder="Password"
        >
          <template v-slot:prepend>
            <q-img
              width="24px"
              height="24px"
              src="/icons/password.png"
            />
          </template>
          <template v-slot:append>
            <q-icon
              style="color: #999999"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <!-- 验证码 -->
        <q-input
          class="q-mb-sm"
          standout
          v-model="params.captchaVal"
          placeholder="Code"
        >
          <template v-slot:prepend>
            <q-img
              width="24px"
              height="24px"
              src="/icons/code.png"
            />
          </template>
          <template v-slot:append>
            <q-img
              no-spinner
              v-if="params.captchaId !== ''"
              :src="imageSrc('/captcha/' + params.captchaId + '/200-50')"
              width="120px"
              height="32px"
              @click="refreshCaptchaFunc"
            ></q-img>
          </template>
        </q-input>

        <!-- 忘记密码、登录、注册 -->
        <div class="text-right q-mb-lg text-grey-7">Forgot Password?</div>
        <q-btn
          @click="$router.push('/user')"
          class="full-width q-mb-lg"
          unelevated
          rounded
          no-caps
          style="height: 44px"
          color="primary"
          label="Login"
        />
        <div class="text-center q-mb-xl" style="font-size: 14px">
          First time here?
          <span
            @click="$router.push({name: 'UserRegister'})"
            class="text-primary cursor-pointer"
            >Signup</span
          >
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CaptchaAPI } from 'src/apis';
import { userLogin } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { useInitStore } from 'src/stores/init';

export default defineComponent({
  name: 'userLogin',
  setup() {
    const $router = useRouter();
    const $initStore = useInitStore();

    const state = reactive({
      isPwd: true,
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
          $initStore.updateUserToken(res.token);
          $router.push({ name: 'Home' });
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
