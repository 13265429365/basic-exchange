<template>
  <div>
    <q-toolbar class="q-pr-xl" style="height: 60px;padding-left: 64px">
      <!-- 左侧 logo -->
      <q-toolbar-title shrink class="cursor-pointer text-black">
        <q-avatar>
          <img width="42px" height="42px" :src="imageSrc(config.logo)">
        </q-avatar>
        <span class="q-ml-sm">{{ config.name }}</span>
      </q-toolbar-title>

      <!-- 左侧tabBar菜单 -->
      <div v-for="(tabBar, tabBarIndex) in tabBarList" :key="tabBarIndex">
        <q-btn-dropdown :menu-offset="[80, 18]" v-if="tabBar.data.isDesktop" class="text-black" :label="tabBar.name" flat
          no-wrap :dropdown-icon="tabBar.children.length > 0 ? 'expand_more' : ' '">
          <q-list v-if="tabBar.children.length > 0">
            <q-item v-for="(children, childrenIndex) in tabBar.children" :key="childrenIndex" clickable
              aria-hidden="true">
              <q-item-section avatar>
                <q-icon :name="children.icon" />
              </q-item-section>
              <q-item-section>{{ children.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <!-- <div v-for="(tabBar, tabBarIndex) in tabBarList" :key="tabBarIndex">
        <q-btn v-if="tabBar.data.isDesktop" :label="tabBar.name" rounded flat dense no-wrap
          :icon-right="tabBar.children.length > 0 ? 'expand_more' : ''" class="text-black q-mx-md q-px-md" no-caps>
          父级菜单
          <q-menu v-for="(children, childrenIndex) in tabBar.children" :key="childrenIndex" :offset="[0, 20]"
            >
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
      </div> -->


      <!-- 左侧快捷菜单 -->
      <q-btn-dropdown :menu-offset="[50, 18]" class="text-black" label="more" flat no-caps dropdown-icon="expand_more">
        <q-list>
          <q-item v-for="(quickMenu, quickMenuIndex) in quickMenuList" :key="quickMenuIndex" clickable v-close-popup
            aria-hidden="true">
            <q-item-section avatar>
              <q-icon :name="quickMenu.icon" />
            </q-item-section>
            <q-item-section>{{ quickMenu.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

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
          <q-menu :offset="[160, 15]" class="q-pa-md">
            <q-list style="min-width: 218px;">
              <!-- 固定头部 -->
              <q-item aria-hidden="true">
                <div class="row no-wrap">
                  <q-avatar size="30px">
                    <img :src="imageSrc(config.logo)">
                  </q-avatar>
                  <div class="q-ml-sm">
                    <div class="row no-wrap">
                      <span class="q-mr-sm">Jack</span>
                      <span class="text-grey-7">569***@qq.com</span>
                    </div>
                    <div class="row no-wrap q-mt-sm">
                      <q-btn size="xs" icon="verified" rounded flat dense no-wrap class="q-px-sm q-mr-sm" no-caps
                        style="border: 1px solid #F7DEB6;color: #F7DEB6;background: #322B19;">
                        <div style="font-size: 11px;">Lv.3</div>
                      </q-btn>
                      <q-btn size="xs" rounded flat dense no-wrap class="bg-primary text-white q-px-sm" no-caps>
                        <div style="font-size: 11px;">unverified</div>
                      </q-btn>
                    </div>
                  </div>
                </div>
              </q-item>

              <q-separator inset class="q-mt-md q-mb-sm" />

              <!-- 用户列表 -->
              <q-item dense v-for="(userMenu, userMenuIndex) in userMenuList" :key="userMenuIndex" clickable v-close-popup
                aria-hidden="true" class="q-py-md">
                <q-item-section avatar>
                  <q-icon :name="userMenu.icon" />
                </q-item-section>
                <q-item-section>
                  <div>{{ userMenu.name }}</div>
                </q-item-section>
              </q-item>

              <q-separator inset />

              <!-- 退出 -->
              <q-item clickable v-close-popup aria-hidden="true">
                <q-item-section avatar>
                  <q-icon name="o_logout" />
                </q-item-section>
                <q-item-section>退出</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!-- 钱包 -->
        <q-btn round dense flat color="grey-8" icon="o_account_balance_wallet"></q-btn>

        <!-- 消息 -->
        <q-btn round dense flat color="grey-8" icon="o_notifications">
          <q-badge color="red" text-color="white" rounded floating>
            2
          </q-badge>
        </q-btn>
        <q-btn round dense flat color="grey-8" icon="o_language">
          <switchLanguage :offset="[0, 20]"></switchLanguage>
        </q-btn>
      </div>
    </q-toolbar>

    <LoginPages ref="LoginRef"></LoginPages>
    <RegisterPages ref="RegisterRef"></RegisterPages>
  </div>
</template>

<script lang="ts">
import LoginPages from 'src/pages/default/desktop/login.vue';
import RegisterPages from 'src/pages/default/desktop/register.vue';
import switchLanguage from 'src/components/switchLanguage.vue';
import { reactive, toRefs, ref } from 'vue';
import { imageSrc } from 'src/utils';
import { useInitStore } from 'src/stores/init';

export default {
  name: 'LayoutsHeader',
  components: { LoginPages, RegisterPages, switchLanguage },
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
      { name: '首页', route: '/', icon: 'o_dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
      { name: '行情', route: '/market', icon: 'o_dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
      { name: '合约', route: '/contact', icon: 'o_dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
      {
        name: '期货', route: '/futures', icon: 'o_dashboard', activeIcon: '', children: [
          { name: '黄金期货', route: '/contact', icon: 'o_dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
        ], data: { isMobile: true, isDesktop: true }
      },
      { name: '我的', route: '/user', icon: 'o_dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
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
  font-size: 12px;
  color: #666;
}
</style>
