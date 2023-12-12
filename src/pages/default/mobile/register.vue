<template>
  <div class="register">
    <div>
      <!-- logo -->
      <div class="row justify-center">
        <q-img class="q-mt-lg q-mb-md" width="70px" height="70px" src="/images/logo.png" :ratio="1" />
      </div>
      <div class="row justify-center">
        <div class="text-h5 text-weight-bold">Create New Account</div>
      </div>

      <q-form class="q-mt-lg q-px-lg">
        <!-- 账号 -->
        <q-input standout class="q-mb-md" v-model="userParams.username" placeholder="Username">
          <template v-slot:prepend>
            <q-img src="/images/mobile/login/email.png" />
          </template>
        </q-input>

        <!-- 邮箱 -->
        <q-input standout class="q-mb-md" v-model="userParams.email" placeholder="email">
          <template v-slot:prepend>
            <q-img src="/images/mobile/login/email.png" />
          </template>
        </q-input>

        <!-- 密码 -->
        <q-input class="q-mb-md" v-model="userParams.password" standout :type="isPwd ? 'password' : 'text'"
          placeholder="Password">
          <template v-slot:prepend>
            <q-img src="/images/mobile/login/password.png" />
          </template>
          <template v-slot:append>
            <q-icon class="text-grey-7 cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'"
              @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <!-- 确认密码 -->
        <q-input class="q-mb-md" v-model="password" standout :type="isPwd2 ? 'password' : 'text'"
          placeholder="Password">
          <template v-slot:prepend>
            <q-img src="/images/mobile/login/password.png" />
          </template>
          <template v-slot:append>
            <q-icon class="text-grey-7 cursor-pointer" :name="isPwd2 ? 'visibility_off' : 'visibility'"
              @click="isPwd2 = !isPwd2" />
          </template>
        </q-input>

        <!-- 验证码 -->
        <q-input class="q-mb-lg" standout v-model="userParams.captchaVal" placeholder="Code">
          <template v-slot:prepend>
            <q-img src="/images/mobile/login/code.png" />
          </template>
          <template v-slot:append>
            <q-img no-spinner v-if="userParams.captchaId !== ''" :src="imageSrc('/captcha/' + userParams.captchaId + '/200-50')
                " width="120px" height="32px" @click="refreshCaptchaFunc"></q-img>
          </template>
        </q-input>

        <!-- 秘钥 -->
        <q-input class="q-mb-md" standout v-model="userParams.securityKey" placeholder="Secret Key">
          <template v-slot:prepend>
            <q-img src="/images/mobile/login/key.png" />
          </template>
        </q-input>

        <!-- 邀请码 -->
        <q-input class="q-mb-md" standout v-model="userParams.code" placeholder="Invite Code">
          <template v-slot:prepend>
            <q-img src="/images/mobile/login/user.png" />
          </template>
        </q-input>

        <!-- 手机号码 -->
        <div class="row no-wrap">
          <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options"
            class="q-mb-md q-mr-sm select" standout>
            <template v-slot:prepend>
              <q-img width="24px" height="16px" src="/images/mobile/login/china.png" @click.stop.prevent />
              <q-icon name="keyboard_arrow_down" />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-img width="24px" height="16px" src="/images/mobile/login/china.png" @click.stop.prevent />
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
          <q-input class="q-mb-lg full-width" standout v-model="userParams.telephone" placeholder="Telphone" />
        </div>

        <!-- 前往登录、点击注册 -->
        <q-btn @click="toMypage()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px;"
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
  // 注册相关
  import { CaptchaAPI } from 'src/apis';
  import { userRegister } from 'src/apis/user';
  import { imageSrc } from 'src/utils';
  import { NotifyNegative } from 'src/utils/notify';
  export default defineComponent({
    name: 'indexView',
    setup() {
      // const userStore = useUserStore();
      const router = useRouter();
      let store = reactive({
        isPwd: true,
        isPwd2: true,
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        password: '',
        areaCode: '+86',
        userParams: {
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
        CaptchaAPI().then((res : any) => {
          store.userParams.captchaId = res;
        })
      };
      return {
        ...toRefs(store),
        newValue(newValue : void) {
          console.log(newValue)
        },
        toLogin() {
          router.push('login')
        },
        toMypage() {
          refreshCaptchaFunc();
          // 判断两次密码是否一致
          if (store.userParams.password !== store.password) {
            NotifyNegative('判断两次密码不一致');
            return
          };
          userRegister(store.userParams).then((res : any) => {
            // userStore.updateUserToken(res);
            router.push('info')
          })
        },
        refreshCaptchaFunc,
        imageSrc
      }
    }
  });
</script>
<style lang="scss" scoped>
  .q-img {
    width: 24px;
    height: 16px;
  }
</style>
