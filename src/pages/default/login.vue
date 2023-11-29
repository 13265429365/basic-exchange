<template>
  <div class="register">
    <lang></lang>
    <div>
      <div class="row justify-center">
        <q-img class="logo" src="/images/default/Logo@2x.png" :ratio="1" />
      </div>
      <div class="row justify-center">
        <div class="size24 bold">Welcome Back</div>
      </div>
      <div class="margint40 padding20">
        <q-form>
          <q-input class="marginb15" filled v-model="text" label="Name">
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
          <q-input class="marginb31" filled v-model="text" label="Code">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/shield-tick@2x.png" />
            </template>
          </q-input>
          <div class="sub row justify-center items-center marginb19">Login</div>
          <div class="size14 text-center marginb31">
            First time here?
            <span @click="toRegister()" class="login">Signup</span>
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
    name: 'loginView',
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
        toRegister() {
          router.push('/')
        },
      }
    }
  });
</script>
<style lang="scss" scoped>
  .sub {
    width: 100%;
    height: 44px;
    background: $default;
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
