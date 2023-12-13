<template>
  <q-header reveal class="bg-white text-grey-10 row justify-between q-py-md q-pl-xl q-pr-lg no-wrap">
    <!-- left -->
    <div class="row items-center no-wrap">
      <!-- logo -->
      <q-img @click="$router.push('/')" class="q-mr-lg cursor-pointer" :src="`${imageSrc('/images/Logo.png')}`"
        width="172px" height="42px" />

      <!-- 独立菜单 -->
      <span @click="$router.push('/help/center')" class="text-grey-10 q-ml-sm q-mr-xl cursor-pointer">Support
        Center</span>
      <div class="row no-wrap items-center cursor-pointer">
        <span>more</span>
        <q-icon name="keyboard_arrow_down" />
        <q-menu :offset="[0, 27]" auto-close transition-show="jump-down" transition-hide="jump-up">
          <q-list class="q-py-sm">
            <q-item v-for="(item, i) in moreList" :key="i" clickable class="row no-wrap items-center">
              <q-img class="q-mr-sm" :src="`/images/pc/header/${item.url}.png`" width="38px" height="38px" />
              <div>
                <div style="font-size: 16px">{{ item.name }}</div>
                <div style="font-size: 12px">{{ item.content }}</div>
              </div>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>


    <!-- right -->
    <div class="row items-center no-wrap">
      <!-- 搜索框 -->
      <q-input placeholder="searching..." rounded outlined v-model="search">
        <template v-slot:prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>

      <!-- 登录状态下 -->
      <div v-if="isLogin" class="row items-center">
        <!-- Deposit按钮 -->
        <q-btn class="q-ml-md text-weight-regular cursor-pointer" style="padding: 0 10px; min-height: 30px" unelevated
          rounded no-caps color="primary" label="Deposit">
        </q-btn>

        <!-- 头像 -->
        <q-avatar class="q-ml-md cursor-pointer" style="width: 34px; height: 34px">
          <q-img src="https://cdn.quasar.dev/img/avatar.png" />

          <!-- 头像下拉框 -->
          <q-menu :offset="[30, 22]" auto-close transition-show="jump-down" transition-hide="jump-up">
            <q-list class="q-px-lg q-pt-lg">
              <!-- 用户资料 -->
              <q-item class="q-pa-none">
                <div class="row">
                  <div>
                    <q-avatar class="q-mr-sm" style="width: 30px; height: 30px">
                      <img src="https://cdn.quasar.dev/img/avatar.png" />
                    </q-avatar>
                  </div>
                  <div class="col-8">
                    <div class="row no-wrap items-center q-mb-xs">
                      <div class="text-weight-bold q-mr-sm">Jack</div>
                      <div style="font-size: 12px">569***@qq.com</div>
                    </div>
                    <div class="row no-wrap">
                      <q-chip class="q-chip q-pa-none q-px-md text-caption" style="border: 1px solid #f7deb6">
                        <q-img class="vip" src="images/pc/header/Vip_icon.png" />
                        Lv.3
                      </q-chip>
                      <q-chip class="q-chip bg-primary text-white text-caption">
                        unverified
                      </q-chip>
                    </div>
                  </div>
                </div>
              </q-item>
              <q-separator class="q-mt-lg" style="background: #f1f1f1" />

              <!-- 用户列表 -->
              <q-item @click="$router.push(item.url)" v-for="(item, i) in infoList" :key="i" clickable
                class="row no-wrap items-center q-py-md q-px-xs">
                <q-img class="q-mr-sm" :src="`${imageSrc('/images/Logo.png')}`" width="20px" height="20px" />
                <div>{{ item.name }}</div>
              </q-item>
              <q-separator class="q-mt-md" style="background: #f1f1f1" />
              <q-item clickable class="row no-wrap items-center q-py-xs q-px-xs">
                <q-img class="q-mr-sm" :src="`${imageSrc('/images/Logo.png')}`" width="20px" height="20px" />
                <div>Log out</div>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>

        <!-- 钱包、钱包下拉框 -->
        <q-icon class="q-ml-md cursor-pointer" name="wallet" size="24px">
          <q-menu :offset="[140, 22]" auto-close transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 214px" class="q-px-sm">
              <q-item @click="$router.push(item.url)" v-for="(item, i) in depositList" :key="i" clickable
                class="row no-wrap items-center">
                <q-img class="q-mr-sm" :src="`/images/pc/header/${item.name}.png`" width="20px" height="20px" />
                <div style="font-size: 16px">{{ item.name }}</div>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon>
        <q-icon class="q-ml-md cursor-pointer" name="notifications" size="24px"></q-icon>
      </div>


      <!-- 未登录状态下 -->
      <div v-else class="row items-center no-wrap">
        <q-btn @click="login()" class="q-ml-md text-grey-10 text-weight-regular" style="padding: 0 10px; min-height: 30px"
          unelevated rounded no-caps color="white" label="Login" />
        <q-btn @click="register()" class="q-ml-md text-weight-regular" style="padding: 0 10px; min-height: 30px"
          unelevated rounded no-caps color="primary" label="Register" />
      </div>
      <q-icon class="q-ml-md cursor-pointer" name="language" size="24px"></q-icon>
    </div>


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
    let store = reactive({
      // 判断是否登录
      isLogin: false,

      // 搜索框
      search: '',

      // more下拉框数据
      moreList: [
        {
          name: 'Title',
          content: 'describedescribedescribe',
          url: 'cashOut',
        },
        {
          name: 'Title',
          content: 'describedescribedescribe',
          url: 'cashOut',
        },
        {
          name: 'Title',
          content: 'describedescribedescribe',
          url: 'cashOut',
        },
      ],

      // deposit下拉框数据
      depositList: [
        {
          name: 'Card Management',
          url: '/card',
        },
        {
          name: 'My Wallet',
          url: '/wallet',
        },
        {
          name: 'My Property',
          url: '/assets',
        },
      ],

      // 头像下拉框数据
      infoList: [
        {
          name: 'Dashboard',
          img: 'Dashboard',
          url: '/dashboard',
        },
        {
          name: 'Security',
          img: 'Security',
          url: '/security',
        },
        {
          name: 'Share',
          img: 'Share',
          url: '/share',
        },
        {
          name: 'My Team',
          img: 'TeamManagement',
          url: '/team',
        },
        {
          name: 'Vip',
          img: 'vip',
          url: '/vip',
        },
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
      ...toRefs(store),
      LoginRef,
      RegisterRef,
      switchDialog,
      login,
      register,
      imageSrc,
    };
  },
};
</script>

<style lang="scss" scoped></style>
