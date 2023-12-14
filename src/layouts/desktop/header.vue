<template>
  <div>
    <q-toolbar style="height: 60px">
      <!-- 左侧 logo -->
      <q-toolbar-title shrink class="cursor-pointer text-black">
        <q-avatar>
          <img width="42px" height="42px" :src="imageSrc(config.logo)">
        </q-avatar>
        <span class="q-ml-sm">{{ config.name }}</span>
      </q-toolbar-title>

      <!-- 左侧tabBar菜单 -->
      <div v-for="(tabBar, tabBarIndex) in tabBarList" :key="tabBarIndex">
        <q-btn v-if="tabBar.data.isDesktop" :label="tabBar.name" rounded flat dense no-wrap
          :icon-right="tabBar.children.length > 0 ? 'expand_more' : ''" class="text-black q-mx-md q-px-md" no-caps>
          <!-- 父级菜单 -->
          <q-menu v-for="(children, childrenIndex) in tabBar.children" :key="childrenIndex" :offset="[0, 20]"
            style="box-shadow: 0px 4px 10px 0px rgba(153,153,153,0.25);">
            <q-list>
              <q-item clickable aria-hidden="true">
                <q-item-section avatar>
                  <q-icon :name="children.icon" />
                </q-item-section>
                <q-item-section>{{ children.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>


      <!-- 左侧快捷菜单 -->
      <q-btn label="more" rounded flat dense no-wrap icon-right="expand_more" class="text-black q-mx-md q-px-md" no-caps>
        <q-menu :offset="[-80, 20]" flat style="box-shadow: 0px 4px 10px 0px rgba(153,153,153,0.25);">
          <q-list>
            <q-item v-for="(quickMenu, quickMenuIndex) in quickMenuList" :key="quickMenuIndex" clickable v-close-popup
              aria-hidden="true">
              <q-item-section avatar>
                <q-icon :name="quickMenu.icon" />
              </q-item-section>
              <q-item-section>{{ quickMenu.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-space />

      <!-- 右侧搜索 -->
      <q-input dense standout="bg-primary" v-model="search" placeholder="Search">
        <template v-slot:prepend>
          <q-icon style="color: #999999 !important;" name="search" />
        </template>
      </q-input>

      <!-- 右侧Deposit -->
      <q-btn rounded flat dense no-wrap class="bg-primary text-white q-mx-md q-px-md" no-caps label="Deposit"></q-btn>

      <!-- 右侧固定按钮 -->
      <div class="q-gutter-sm row items-center no-wrap">
        <!-- 头像 -->
        <q-btn round flat>
          <q-avatar size="34px">
            <img :src="imageSrc(config.logo)">
          </q-avatar>
          <q-menu :offset="[160, 18]" class="q-pa-md" style="box-shadow: 0px 4px 10px 0px rgba(153,153,153,0.25);">
            <q-list style="min-width: 218px;">
              <!-- 固定头部 -->
              <q-item clickable v-close-popup aria-hidden="true">
                <div class="row no-wrap">
                  <q-avatar size="30px">
                    <img :src="imageSrc(config.logo)">
                  </q-avatar>
                  <div class="q-ml-sm">
                    <div class="row no-wrap">
                      <span class="q-mr-sm">Jack</span>
                      <span class="text-grey-7">569***@qq.com</span>
                    </div>
                    <div class="row no-wrap q-mt-xs">
                      <q-btn size="xs" icon="verified" rounded flat dense no-wrap class="q-px-sm q-mr-sm" no-caps
                        style="border: 1px solid #F7DEB6;color: #F7DEB6;background: #322B19;">
                        <span class="text-caption">Lv.3</span>
                      </q-btn>
                      <q-btn size="xs" rounded flat dense no-wrap class="bg-primary text-white q-px-sm" no-caps>
                        <span class="text-caption">unverified</span>
                      </q-btn>
                    </div>
                  </div>
                </div>
              </q-item>

              <q-separator />

              <!-- 用户列表 -->
              <q-item v-for="(userMenu, userMenuIndex) in userMenuList" :key="userMenuIndex" clickable v-close-popup
                aria-hidden="true">
                <q-item-section avatar>
                  <q-icon :name="userMenu.icon" />
                </q-item-section>
                <q-item-section>{{ userMenu.name }}</q-item-section>
              </q-item>

              <q-separator />

              <!-- 退出 -->
              <q-item clickable v-close-popup aria-hidden="true">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>退出</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!-- 钱包 -->
        <q-btn round dense flat color="grey-8" icon="account_balance_wallet"></q-btn>

        <!-- 消息 -->
        <q-btn round dense flat color="grey-8" icon="notifications">
          <q-badge color="red" text-color="white" rounded floating>
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
  name: 'LayoutsHeader',
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

      //  左侧tabBar菜单
      tabBarList: [] as any,

      // 左侧快捷菜单
      quickMenuList: [] as any,

      // 右侧头像菜单
      userMenuList: [] as any,
    });

    // 左侧tabBar菜单
    state.tabBarList = [
      { name: '首页', route: '/', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
      { name: '行情', route: '/market', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
      { name: '合约', route: '/contact', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
      {
        name: '期货', route: '/futures', icon: 'dashboard', activeIcon: '', children: [
          { name: '黄金期货', route: '/contact', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
        ], data: { isMobile: true, isDesktop: true }
      },
      { name: '我的', route: '/user', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
    ];

    // 左侧快捷菜单
    state.quickMenuList = state.tabBarList;

    // 右侧头像菜单
    state.userMenuList = state.tabBarList;


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
</style>
