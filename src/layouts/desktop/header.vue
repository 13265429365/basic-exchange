<template>
  <div>
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img :src="imageSrc(config.logo)">
        </q-avatar>
        Title
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" />
    </q-toolbar>

    <LoginPages ref="LoginRef"></LoginPages>
    <Registerpages ref="RegisterRef"></Registerpages>
  </div>
</template>

<script lang="ts">
import LoginPages from 'src/pages/default/desktop/login.vue';
import Registerpages from 'src/pages/default/desktop/register.vue';
import { reactive, toRefs, ref } from 'vue';
import { imageSrc } from 'src/utils';
import { useInitStore } from 'src/stores/init';

export default {
  name: 'headerBar',
  components: { LoginPages, Registerpages },
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
