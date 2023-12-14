<template>
  <div>
    <q-toolbar style="height: 64px">
      <!-- left logo -->
      <q-toolbar-title shrink class="row items-center no-wrap cursor-pointer">
        <q-img width="42px" height="42px" :src="imageSrc('/images/logo.png')"></q-img>
      </q-toolbar-title>

      <!-- more -->
      <q-btn rounded flat dense no-wrap class="text-black q-mx-md q-px-md" no-caps label="Support Center"></q-btn>
      <q-btn rounded flat dense no-wrap class="text-black q-mx-md q-px-md" no-caps label="more" icon-right="expand_more">
        <q-menu>
          <q-list>
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

      <q-space />

      <!-- right -->
      <q-input dense standout="bg-primary" v-model="search" placeholder="Search" />

      <!-- Deposit -->
      <q-btn rounded flat dense no-wrap class="bg-primary text-white q-mx-md q-px-md" no-caps label="Deposit">
        <q-menu>
          <q-list>
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
          <q-menu>
            <q-list>
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

        <!-- 钱包 -->
        <q-btn round dense flat color="grey-8" icon="account_balance_wallet">
          <q-menu>
            <q-list>
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

        <!-- 消息 -->
        <q-btn round dense flat color="grey-8" icon="notifications">
          <q-badge color="red" text-color="white" floating>
            2
          </q-badge>
        </q-btn>
        <q-btn round dense flat color="grey-8" icon="language"></q-btn>
      </div>
    </q-toolbar>

    <LoginPages ref="LoginRef"></LoginPages>
    <RegisterPages ref="RegisterRef"></RegisterPages>
  </div>
</template>

<script lang="ts">
import LoginPages from 'src/pages/default/desktop/login.vue';
import RegisterPages from 'src/pages/default/desktop/register.vue';
import { reactive, toRefs, ref } from 'vue';
import { imageSrc } from 'src/utils';
import { useInitStore } from 'src/stores/init';

export default {
  name: 'headerBar',
  components: { LoginPages, RegisterPages },
  setup() {
    const $initStore = useInitStore()
    const LoginRef = ref(null) as any;
    const RegisterRef = ref(null) as any;


    const state = reactive({
      config: $initStore.config,

      //  是否登录
      isLogin: $initStore.userToken != '',

      // 搜索框
      search: '',

      createMenu: [] as any,
    });

    // dialogOpenFunc 打开登录注册
    const dialogOpenFunc = (dialogRef: any) => {
      dialogRef.value.open(true)
    }

    // switchDialogFunc 切换注册登录dialog
    const switchDialogFunc = (opt: string) => {
      LoginRef.value.open(opt == 'login')
      RegisterRef.value.open(opt == 'register')
    }

    return {
      imageSrc,
      ...toRefs(state),
      LoginRef,
      RegisterRef,
      dialogOpenFunc,
      switchDialogFunc,
    };
  },
};
</script>

<style lang="scss" scoped></style>
