<template>
  <q-dialog v-model="registerShow">
    <q-card style="width: 410px">
      <q-card-section style="padding: 30px">
        <div class="text-center text-weight-bold text-primary" style="font-size: 36px">
          Sign Up
        </div>
        <div class="text-center" style="font-size: 18px">
          Create an account
        </div>
        <div class="q-mt-lg">
          <q-form>
            <q-input standout class="q-mb-md" v-model="registerParams.username" placeholder="Username">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/user.png" />
              </template>
            </q-input>
            <q-input standout class="q-mb-md" v-model="registerParams.email" placeholder="Email">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/email.png" />
              </template>
            </q-input>
            <q-input class="q-mb-md" v-model="registerParams.password" standout :type="isPwd ? 'password' : 'text'"
              placeholder="Password">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/password.png" />
              </template>
              <template v-slot:append>
                <q-icon style="color: #999999" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <q-input class="q-mb-md" standout v-model="password" :type="isPwd2 ? 'password' : 'text'"
              placeholder="Confirm Password">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/password.png" />
              </template>
              <template v-slot:append>
                <q-icon style="color: #999999" :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd2 = !isPwd2" />
              </template>
            </q-input>
            <q-input class="q-mb-md" standout v-model="registerParams.captchaVal" placeholder="Code">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/code.png" />
              </template>
              <template v-slot:append>
                <q-img no-spinner v-if="registerParams.captchaId !== ''" :src="
                    imageSrc('/captcha/' + registerParams.captchaId + '/200-50' )" width="120px" height="32px"
                  @click="refreshCaptchaFunc"></q-img>
              </template>
            </q-input>
            <q-input class="q-mb-md" standout v-model="registerParams.securityKey" placeholder="Secret Key">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/key.png" />
              </template>
            </q-input>
            <q-input class="q-mb-md" standout v-model="registerParams.code" placeholder="Invite Code">
              <template v-slot:prepend>
                <q-img width="24px" height="24px" src="/images/pc/header/user.png" />
              </template>
            </q-input>
            <div class="row no-wrap">
              <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options"
                class="q-mb-md q-mr-sm select" standout>
                <template v-slot:prepend>
                  <q-img width="24px" height="16px" src="/images/pc/header/china.png" @click.stop.prevent />
                  <q-icon name="keyboard_arrow_down" />
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-img width="24px" height="16px" src="/images/pc/header/china.png" @click.stop.prevent />
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
              <q-input class="q-mb-lg full-width" standout v-model="registerParams.telephone" placeholder="Telphone" />
            </div>
            <!-- 点击注册 -->
            <q-btn @click="register()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px"
              color="primary" label="Signup" />
            <!-- 前往登录 -->
            <div class="size14 text-center">
              Already have an account?
              <span @click="toLogin()" class="text-primary cursor-pointer">Login</span>
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
  import { reactive, toRefs, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  // 登录相关
  import { CaptchaAPI } from 'src/apis';
  import { userRegister } from 'src/apis/user';
  import { imageSrc } from 'src/utils';
  import { NotifyNegative, NotifyPositive } from 'src/utils/notify'
  export default {
    name: 'registerDialog',
    setup() {
      const router = useRouter();
      let store = reactive({
        // 是否显示密码
        isPwd: true,
        isPwd2: true,
        // 注册区号选择
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        // 注册input数据
        registerParams: {
          username: '',
          password: '',
          captchaId: '', //验证id
          captchaVal: '', // 验证码
          email: '',
          telephone: '',
          securityKey: '',
          code: '',
        },
        // 登录弹窗
        registerShow: false,
        // 确认密码
        password: '',

        areaCode: '+86',
      });
      onMounted(() => {
        refreshCaptchaFunc();
      });
      // 获取验证码
      const refreshCaptchaFunc = () => {
        CaptchaAPI().then((res : any) => {
          store.registerParams.captchaId = res;
        });
      };
      // 注册弹窗
      const toRegister = () => {
        store.registerShow = true;
      };
      return {
        ...toRefs(store),
        // 点击注册
        register() {
          refreshCaptchaFunc();
          // 判断两次密码是否一致
          if (store.registerParams.password !== store.password) {
            NotifyNegative('判断两次密码不一致');
            return;
          }
          userRegister(store.registerParams).then((res : any) => {
            store.registerShow = false;
            NotifyPositive('注册成功')
            router.push('/dashboard');
          });
        },
        toRegister,
        refreshCaptchaFunc,
        imageSrc,
      };
    },
  };
</script>

<style lang="scss" scoped></style>
