<template>
  <div>
    <q-toolbar class="q-pr-xl" style="height: 60px;padding-left: 64px">
      <!-- 左侧 logo -->
      <q-toolbar-title @click="$router.push({ name: 'HomeIndex' })" shrink class="cursor-pointer text-black"
        style="margin-right: 88px;">
        <q-avatar>
          <img width="42px" height="42px" :src="imageSrc(config.logo)">
        </q-avatar>
        <span class="q-ml-sm">{{ config.name }}</span>
      </q-toolbar-title>

      <!-- 左侧tabBar菜单 -->
      <div class="row no-wrap items-center">
        <q-btn-dropdown v-show="tabBar.data.isDesktop" v-for="(tabBar, tabBarIndex) in tabBarList" :key="tabBarIndex"
          :menu-offset="[80, 18]" class="text-black q-mr-sm" :label="$t(tabBar.name)" flat no-wrap no-caps
          :dropdown-icon="tabBar.children.length > 0 ? 'expand_more' : ' '">
          <q-list v-if="tabBar.children.length > 0">
            <q-item v-for="(children, childrenIndex) in tabBar.children" :key="childrenIndex" clickable
              aria-hidden="true">
              <q-item-section avatar>
                <q-img width="34px" height="34px" :src="imageSrc(children.icon)"></q-img>
              </q-item-section>
              <q-item-section>{{ $t(children.name) }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <!-- 左侧快捷菜单 -->
      <q-btn-dropdown :menu-offset="[50, 18]" class="text-black" :label="$t('more')" flat no-caps
        dropdown-icon="expand_more">
        <q-list>
          <q-item @click="$router.push(quickMenu.route)" v-for="(quickMenu, quickMenuIndex) in quickMenuList"
            :key="quickMenuIndex" clickable v-close-popup aria-hidden="true">
            <q-item-section avatar>
              <q-img width="34px" height="34px" :src="imageSrc(quickMenu.icon)"></q-img>
            </q-item-section>
            <q-item-section>{{ $t(quickMenu.name) }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-space />

      <!-- 右侧搜索 -->
      <q-input dense standout="bg-primary" v-model="searchVal" :placeholder="$t('search')">
        <template v-slot:prepend>
          <q-icon style="color: #999999 !important;" name="o_search" />
        </template>
      </q-input>


      <!-- 右侧固定按钮 -->
      <div class="row items-center no-wrap">
        <!-- 登录状态 -->
        <div v-if="isLogin" class="row items-center no-wrap">
          <!-- 右侧Deposit -->
          <q-btn @click="$router.push({ name: 'Deposit' })" rounded flat dense no-wrap
            class="bg-primary text-white q-mx-md q-px-md" no-caps :label="$t('deposit')"></q-btn>

          <!-- 头像 -->
          <q-btn class="q-mr-sm" round flat>
            <q-avatar size="34px">
              <q-img :src="imageSrc($userStore.userInfo.avatar ? $userStore.userInfo.avatar : '')"></q-img>
            </q-avatar>
            <q-menu :offset="[160, 15]" class="q-pa-md">
              <q-list style="min-width: 218px;">
                <!-- 固定头部 -->
                <q-item aria-hidden="true">
                  <div class="row no-wrap">
                    <q-avatar size="30px">
                      <q-img :src="imageSrc($userStore.userInfo.avatar ? $userStore.userInfo.avatar : '')"></q-img>
                    </q-avatar>
                    <div class="q-ml-sm">
                      <div class="row no-wrap">
                        <span class="q-mr-sm">{{ $userStore.userInfo.userName }}</span>
                        <span class="text-grey-7">{{ $userStore.userInfo.email }}</span>
                      </div>
                      <div class="row no-wrap q-mt-sm">
                        <q-btn size="xs" icon="verified" rounded flat dense no-wrap class="q-px-sm q-mr-sm" no-caps
                          style="border: 1px solid #F7DEB6;color: #F7DEB6;background: #322B19;">
                          <div style="font-size: 11px;">Lv{{ $userStore.userInfo.Level }}</div>
                        </q-btn>
                        <q-btn size="xs" rounded flat dense no-wrap class="bg-primary text-white q-px-sm" no-caps>
                          <div style="font-size: 11px;">{{ $userStore.userInfo.authStatus ? $t('realNameFailed') :
                            $t('alreadyRealName') }}
                          </div>
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </q-item>

                <q-separator inset class="q-mt-md q-mb-sm" />

                <!-- 用户列表 -->
                <q-item @click="$router.push(userMenu.route)" dense v-for="(userMenu, userMenuIndex) in homeMenuList"
                  :key="userMenuIndex" clickable v-close-popup aria-hidden="true" class="q-py-md">
                  <q-item-section avatar>
                    <q-img width="20px" height="20px" :src="imageSrc(userMenu.icon)"></q-img>
                  </q-item-section>
                  <q-item-section>
                    <div>{{ $t(userMenu.name) }}</div>
                  </q-item-section>
                </q-item>

                <q-separator inset />

                <!-- 退出 -->
                <q-item @click="Logout()" clickable v-close-popup aria-hidden="true">
                  <q-item-section avatar>
                    <q-icon name="o_logout" />
                  </q-item-section>
                  <q-item-section>{{ $t('logout') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- 钱包 -->
          <q-btn @click="$router.push({ name: 'Wallet' })" round dense flat color="grey-8"
            icon="o_account_balance_wallet"></q-btn>

          <!-- 消息 -->
          <q-btn round dense flat color="grey-8" icon="o_notifications">
            <q-badge color="red" text-color="white" rounded floating>
              2
            </q-badge>
          </q-btn>
        </div>

        <!-- 未登录状态 -->
        <div v-else>
          <q-btn @click="dialogOpenLogin(true)" rounded flat dense no-wrap class="bg-white text-grey-7 q-ml-md q-px-md"
            no-caps :label="$t('login')"></q-btn>
          <q-btn @click="dialogOpenRegister(true)" rounded flat dense no-wrap
            class="bg-primary text-white q-mx-md q-px-md" no-caps :label="$t('register')"></q-btn>
        </div>
        <q-btn v-if="config.settings.lang.showHome" round dense flat color="grey-8" icon="o_language">
          <switchLanguage :offset="[0, 20]"></switchLanguage>
        </q-btn>
      </div>

    </q-toolbar>

    <LoginPages ref="LoginRef" @updateLoginStatus="updateLoginStatus" @switchDialogFunc="switchDialogFunc"></LoginPages>
    <RegisterPages ref="RegisterRef" @updateLoginStatus="updateLoginStatus" @switchDialogFunc="switchDialogFunc">
    </RegisterPages>
  </div>
</template>

<script lang="ts">
import LoginPages from 'src/pages/default/desktop/login.vue';
import RegisterPages from 'src/pages/default/desktop/register.vue';
import switchLanguage from 'src/components/switchLanguage.vue';
import { useRouter } from 'vue-router';
import { reactive, toRefs, ref, watch } from 'vue';
import { imageSrc } from 'src/utils';
import { NotifyPositive } from 'src/utils/notify';
import { InitStore } from 'src/stores/init';
import { UserStore } from 'src/stores/user';
import { getUserInfo } from 'src/apis/user';

export default {
  name: 'LayoutsHeader',
  components: { LoginPages, RegisterPages, switchLanguage },
  setup() {
    const $router = useRouter();
    const $initStore = InitStore()
    const $userStore = UserStore()

    const LoginRef = ref(null) as any;
    const RegisterRef = ref(null) as any;

    const state = reactive({
      // 配置
      config: $initStore.config,

      //  是否登录
      isLogin: $initStore.userToken,

      userInfo: $initStore.userInfo,

      // 搜索框
      searchVal: '',

      //  左侧tabBar菜单
      tabBarList: [] as any,

      // 左侧快捷菜单
      quickMenuList: [] as any,

      // 右侧头像菜单
      homeMenuList: [] as any,
    });

    watch(state, () => {
      UserInfo()
    })

    // 左侧tabBar菜单
    state.tabBarList = $initStore.tabbars;

    // 左侧快捷菜单
    state.quickMenuList = $initStore.quickMenu;

    // 右侧头像菜单
    state.homeMenuList = $initStore.homeMenu;


    // 获取用户信息
    const UserInfo = () => {
      if (state.isLogin) {
        getUserInfo().then((res: any) => {
          console.log('用户信息', res);
          $userStore.updateUserInfo(res)
          localStorage.setItem('userInfo', JSON.stringify(res))
        })
      }
    }


    // dialogOpenFunc 打开登录注册
    const dialogOpenLogin = (showStatus: boolean) => {
      LoginRef.value?.open(showStatus)
    }

    const dialogOpenRegister = (showStatus: boolean) => {
      RegisterRef.value?.open(showStatus)
    }

    // switchDialogFunc 切换注册登录dialog
    const switchDialogFunc = (LoginStatus: boolean, RegisterStatus: boolean) => {
      LoginRef.value?.open(LoginStatus)
      RegisterRef.value?.open(RegisterStatus)
    }

    // 退出登录
    const Logout = async () => {
      NotifyPositive('退出成功')
      await $initStore.removeUserToken()
      await localStorage.removeItem('userInfo')
      $router.push({ name: 'HomeIndex' })
      updateLoginStatus()
    }

    // 更新登录状态
    const updateLoginStatus = () => {
      console.log($initStore.userToken);
      state.isLogin = $initStore.userToken != '' && $initStore.userToken
    }


    return {
      imageSrc,
      ...toRefs(state),
      LoginRef,
      RegisterRef,
      dialogOpenLogin,
      dialogOpenRegister,
      switchDialogFunc,
      Logout,
      updateLoginStatus,
      $userStore
    };
  },
};
</script>

<style lang="scss" scoped>
// input样式
:deep(.q-field .q-field__control) {
  border-radius: 20px !important;
  height: 40px !important;
  min-height: 40px !important;

  .q-field__marginal {
    height: 40px !important;
  }
}

:deep(.q-item) {
  border-radius: 8px;

  .q-item__section {
    color: #333;
  }
}

:deep(.q-item .q-item__section) {
  min-width: auto;
  padding-right: 10px;
}

:deep(.q-btn .q-btn-dropdown__arrow) {
  margin-left: 0;
  font-size: 12px;
  color: #666;
}
</style>
