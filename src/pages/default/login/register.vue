<template>
  <div class="register">
    <lang></lang>
    <div>
      <div class="row justify-center">
        <q-img class="q-mt-lg q-mb-md" width="70px" height="70px" src="/images/default/logo.png" :ratio="1" />
      </div>
      <div class="row justify-center">
        <div class="text-h5 text-weight-bold">Create New Account</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <!-- <q-input color="grey-3" label-color="orange" outlined v-model="text" label="Label">
            <template v-slot:append>
              <q-icon name="event" color="orange" />
            </template>
          </q-input> -->
          <q-input standout class="q-mb-md" v-model="userParams.username" placeholder="Username">

            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/images/default/email.png" />
            </template>
          </q-input>
          <q-input standout class="q-mb-md" v-model="userParams.email" placeholder="email">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/images/default/email.png" />
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
          <q-input class="q-mb-md" v-model="password" standout :type="isPwd2 ? 'password' : 'text'"
            placeholder="Password">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd2 = !isPwd2" />
            </template>
          </q-input>
          <q-input class="q-mb-lg" standout v-model="userParams.captchaVal" placeholder="Code">
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
          <q-input class="q-mb-md" standout v-model="userParams.securityKey" placeholder="Secret Key">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/images/default/key.png" />
            </template>
          </q-input>
          <q-input class="q-mb-md" standout v-model="userParams.code" placeholder="Invite Code">
            <template v-slot:prepend>
              <q-img width="24px" height="24px" src="/images/default/user.png" />
            </template>
          </q-input>
          <div class="row no-wrap">
            <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options"
              class="q-mb-md q-mr-sm select" standout>
              <template v-slot:prepend>
                <q-img width="24px" height="16px" src="/images/default/china.png" @click.stop.prevent />
                <q-icon name="keyboard_arrow_down" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-img width="24px" height="16px" src="/images/default/china.png" @click.stop.prevent />
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
          <!-- 点击注册 -->
          <q-btn @click="toMypage()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px;"
            color="primary" label="Signup" />
          <div class="size14 text-center q-pb-xl">
            Already have an account?
            <span @click="toLogin()" class="text-primary cursor-pointer">Login</span>
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
// 注册相关
import { CaptchaAPI } from 'src/apis';
import { userRegister } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { useUserStore } from 'src/stores/user';
import { NotifyNegative } from 'src/utils';


// 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
export default defineComponent({
  components: {
    lang,
  },
  name: 'indexView',
  setup() {
    const userStore = useUserStore();
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
      CaptchaAPI().then((res: any) => {
        store.userParams.captchaId = res;
      })
    };
    return {
      ...toRefs(store),
      newValue(newValue: void) {
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
        userRegister(store.userParams).then((res: any) => {
          userStore.updateUserToken(res);
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
:deep .q-select .q-field__control:hover:before {
  opacity: 0;
}

:deep .q-select .q-field__prepend {
  padding-right: 0;
  color: #8F959E;
}

:deep .q-select .q-field__append {
  padding-left: 4px;
  font-size: 15px;
  color: #8F959E;
}

:deep .q-select .q-field__native {
  display: none;
}

:deep .q-select .q-field__append .q-icon {
  display: none;
}
</style>
