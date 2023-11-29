<template>
  <div class="register">
    <lang></lang>
    <div>
      <div class="row justify-center">
        <q-img class="logo" src="/images/default/Logo@2x.png" :ratio="1" />
      </div>
      <div class="row justify-center">
        <div class="size24 bold">Create New Account</div>
      </div>
      <div class="margint40 padding20">
        <q-form>
          <q-input class="marginb15" filled v-model="text" label="Email">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/sms@2x.png" />
            </template>
          </q-input>
          <q-input class="marginb15" v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/lock@2x.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="marginb15" filled v-model="text" label="Confirm Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/lock@2x.png" />
            </template>
          </q-input>
          <q-input class="marginb31" filled v-model="text" label="Code">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/shield-tick@2x.png" />
            </template>
          </q-input>
          <q-input class="marginb15" filled v-model="text" label="Secret Key">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/key@2x.png" />
            </template>
          </q-input>
          <q-input class="marginb15" filled v-model="text" label="Invite Code">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/profile-2user@2x.png" />
            </template>
          </q-input>
          <div class="row no-wrap">
            <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options" class="marginb15 marginr10" filled>
              <template v-slot:prepend>
                <q-img class="countryLogo" src="/images/default/ch.png" @click.stop.prevent />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-img class="iconLogo" src="/images/default/ch.png" @click.stop.prevent />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input class="marginb31 full-width" filled v-model="text" label="Telphone" />
          </div>
          <div class="sub row justify-center items-center marginb19">Signup</div>
          <div class="size14 text-center marginb31">
            Already have an account?
            <span @click="toLogin()" class="login">Login</span>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import lang from 'src/components/lang/lang.vue';
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    components: {
      lang
    },
    name: 'indeaVue',
    setup() {
      const router = useRouter();
      let store = reactive({
        isPwd: false,
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        text: '',
        password: '',
        areaCode: '+86',
      });
      return {
        ...toRefs(store),
        newValue(newValue: void) {
          console.log(newValue)
        },
        toLogin() {
          console.log(router.getRoutes());
          router.push('Login')
        },
      }
    }
  });
</script>
<style lang="scss" scoped>
  .q-field__control {
    background-color: #F5F6FA;
  }
  .sub {
    width: 100%;
    height: 44px;
    background: rgba(1,172,102,0.5);
    border-radius: 29px;
    cursor: pointer;
    color: #fff;
    font-size: 15px;
  }
  .login {
    color: $default;
    cursor: pointer;
  }

  .logo {
    width: 70px;
    height: 70px;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .iconLogo {
    width: 24px;
    height: 24px;
  }
  .countryLogo {
    width: 24px;
    height: 16px;
  }
</style>
