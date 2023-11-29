<template>
  <div class="register">
    <lang></lang>
    <div>
      <div class="row justify-center">
        <q-img class="logo" src="/images/default/Logo@2x.png" :ratio="1" />
      </div>
      <div class="row justify-center">
        <div class="text-weight-bold" style="font-size: 24px;">Welcome Back</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <q-input class="q-mb-md" filled v-model="text" label="Name">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/profile-2user@2x.png" />
            </template>
          </q-input>
          <q-input class="q-mb-md" v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/lock@2x.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="q-mb-sm" filled v-model="text" label="Code">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/shield-tick@2x.png" />
            </template>
          </q-input>
          <div @click="toForgot()" class="text-right q-mb-lg" style="font-size: 14px;color:#999999">
            Forgot Password?
          </div>
          <q-btn @click="toMypage()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px;" color="primary" label="Login" />
          <div class="text-center q-mb-xl" style="font-size: 14px;">
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
        text: '',
        password: '',
      });
      return {
        ...toRefs(store),
        toRegister() {
          router.push('/')
        },
        toForgot() {
          router.push('/forgot')
        },
        toMypage() {
          console.log(router.getRoutes());
          router.push('myPage')
        },
      }
    }
  });
</script>
<style lang="scss" scoped>
  @import url("../../css/login.scss");
</style>
