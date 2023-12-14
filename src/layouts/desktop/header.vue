<template>
  <q-header reveal class="bg-white text-grey-10 row justify-between q-py-md q-pl-xl q-pr-lg no-wrap">
    <q-toolbar class="GPL__toolbar" style="height: 64px">
      <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap cursor-pointer">
        <q-img width="42px" height="42px" :src="`${imageSrc('/images/Logo.png')}`"></q-img>
        <span class="q-ml-sm">shopmark</span>
      </q-toolbar-title>

      <q-space />

      <q-input class="items-center" dense standout="bg-primary" v-model="search" placeholder="Search" />

      <q-btn unelevated rounded dense no-wrap color="primary" no-caps label="Deposit" class="q-mx-md q-px-md">
        <q-menu>
          <q-list class="text-grey-8" style="min-width: 100px">
            <q-item aria-hidden="true">
              <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">Create New</q-item-section>
            </q-item>
            <q-item v-for="menu in createMenu" :key="menu.text" clickable v-close-popup aria-hidden="true">
              <q-item-section avatar>
                <q-icon :name="menu.icon" />
              </q-item-section>
              <q-item-section>{{ menu.text }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>



      <div class="q-gutter-sm row items-center no-wrap">
        <!-- 头像 -->
        <q-btn round flat>
          <q-avatar size="34px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <q-menu anchor="top end" self="top end">
            <q-list class="text-grey-8" style="min-width: 100px">
              <q-item aria-hidden="true">
                <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">Create New</q-item-section>
              </q-item>
              <q-item v-for="menu in createMenu" :key="menu.text" clickable v-close-popup aria-hidden="true">
                <q-item-section avatar>
                  <q-icon :name="menu.icon" />
                </q-item-section>
                <q-item-section>{{ menu.text }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!--  -->
        <q-btn round dense flat color="text-grey-7" icon="account_balance_wallet"></q-btn>
        <q-btn round dense flat color="grey-8" icon="notifications">
          <q-badge color="red" text-color="white" floating>
            2
          </q-badge>
        </q-btn>
        <q-btn round dense flat color="grey-8" icon="language"></q-btn>
      </div>
    </q-toolbar>


    <!-- 登录、注册 -->
    <Login ref="LoginRef" @switchDialog="switchDialog"></Login>
    <Register ref="RegisterRef" @switchDialog="switchDialog"></Register>
  </q-header>
</template>

<script lang="ts">
import Login from '/src/pages/default/desktop/login.vue';
import Register from '/src/pages/default/desktop/register.vue';
import { reactive, toRefs, ref } from 'vue';
import { imageSrc } from 'src/utils';
// 登录、注册相关
export default {
  name: 'headerBar',
  components: {
    Login,
    Register,
  },
  setup() {
    let state = reactive({
      // 判断是否登录
      isLogin: false,

      // 搜索框
      search: '',

      createMenu: [
        { icon: 'photo_album', text: 'Album' },
        { icon: 'people', text: 'Shared Album' },
        { icon: 'movie', text: 'Movie' },
        { icon: 'library_books', text: 'Animation' },
        { icon: 'dashboard', text: 'Collage' },
        { icon: 'book', text: 'Photo book' }
      ],
    });

    // 切换登录、注册
    const switchDialog = (login: boolean, register: boolean) => {
      LoginRef.value?.openLogin(login);
      RegisterRef.value?.openRegister(register);
    }

    // 登录弹窗ref
    const LoginRef = ref<any>();
    const login = () => {
      LoginRef.value?.openLogin(true);
    }

    // 登录弹窗ref
    const RegisterRef = ref<any>();
    const register = () => {
      RegisterRef.value?.openRegister(true);
    }

    return {
      imageSrc,
      ...toRefs(state),
      LoginRef,
      RegisterRef,
      switchDialog,
      login,
      register,
    };
  },
};
</script>

<style lang="scss" scoped></style>
