<template>
  <div class="register">
    <lang></lang>
    <div>
      <div class="row justify-center">
        <q-img class="q-mt-lg q-mb-md" width="70px" height="70px" src="/images/default/logo.png" :ratio="1" />
      </div>
      <div class="row justify-center">
        <div class="text-weight-bold" style="font-size: 24px;">Welcome Back</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <q-input class="q-mb-md" standout v-model="userParams.username" placeholder="Name">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/images/default/user.png" />
            </template>
          </q-input>
          <q-input class="q-mb-md" v-model="userParams.password" standout :type="isPwd ? 'password' : 'text'"
            placeholder="Password">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="q-mb-sm" standout v-model="userParams.captchaVal" placeholder="Code">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/images/default/code.png" />
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
          <q-btn @click="toMypage()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px;"
            color="primary" label="Login" />
          <div class="text-center q-mb-xl" style="font-size: 14px;">
            First time here?
            <span @click="toRegister()" class="text-primary cursor-pointer">Signup</span>
          </div>
        </q-form>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import lang from 'src/components/mobile/lang.vue';
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CaptchaAPI } from 'src/api';
import { userLogin } from 'src/api/user';
import { imageSrc } from 'src/utils';
import { useUserStore } from 'src/stores/user';

// 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
export default defineComponent({
  components: {
    lang
  },
  name: 'loginView',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    let store = reactive({
      isPwd: true,
      userParams: {
        username: '',
        password: '',
        captchaId: '', //验证id
        captchaVal: '', // 验证码
      }

    });
    onMounted(() => {
      refreshCaptchaFunc();
    })
    // 获取验证码
    const refreshCaptchaFunc = () => {
      CaptchaAPI().then((res: any) => {
        store.userParams.captchaId = res;
      })
    };
    return {
      ...toRefs(store),
      toRegister() {
        router.push('/')
      },
      toForgot() {
        router.push('forgot')
      },
      toMypage() {
        refreshCaptchaFunc();
        userLogin(store.userParams).then((res: any) => {
          userStore.updateUserToken(res);
          router.push('info')
        })

      },
      imageSrc,
      refreshCaptchaFunc
    }
  }
});
</script>
<style lang="scss" scoped></style>
