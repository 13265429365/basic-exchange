<template>
  <q-list padding class="q-ml-xl q-mt-xl q-mr-md" style="width: 220px">
    <div @click="routerTo(menu.route)" v-for="(menu, menuIndex) in menuList" :key="menuIndex">
      <!-- 含有子级的列表 -->
      <q-expansion-item accordion v-if="menu.children.length > 0" :default-opened="menuIndex == 0">
        <!-- 父级 -->
        <template v-slot:header>
          <q-item-section avatar>
            <q-img :src="imageSrc(menu.icon)" width="24px" height="24px"></q-img>
          </q-item-section>
          <q-item-section avatar class="q-mr-xl">
            <div style="user-select: none;min-width: 80px;">{{ menu.name }}</div>
          </q-item-section>
        </template>

        <!-- 子级 -->
        <q-item @click="routerTo(children.route)" v-for="(children, childrenIndex) in menu.children" :key="childrenIndex"
          :header-inset-level="1" :active="activeRouter == children.route" active-class="active" clickable>
          <q-item-section avatar>
            <q-img width="24px" height="24px" :src="imageSrc(children.icon)"></q-img>
          </q-item-section>
          <q-item-section>
            <div style="user-select: none">{{ children.name }}</div>
          </q-item-section>
        </q-item>
      </q-expansion-item>


      <!-- 不含子级的列表 -->
      <q-item v-else :active="activeRouter == menu.route" active-class="active" :clickable="activeRouter != menu.route">
        <q-item-section avatar>
          <q-img :src="imageSrc(menu.icon)" width="24px" height="24px"></q-img>
        </q-item-section>
        <q-item-section>
          <div style="user-select: none">{{ menu.name }}</div>
        </q-item-section>
      </q-item>
    </div>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { routerTo, imageSrc } from 'src/utils/index'
import { InitStoreState, useInitStore } from 'src/stores/init'

export default defineComponent({
  name: 'LayoutsMenu',
  setup() {
    const $router = useRouter();
    const $initStore = useInitStore()

    let state = reactive({
      // 项目logo
      config: InitStoreState.config,

      // 选中菜单
      activeRouter: '/',

      // 菜单列表
      menuList: [] as any,
    });

    // state.menuList = [
    //   { name: 'Dashboard', route: '/user', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
    //   { name: 'My Wallet', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
    //   { name: 'Assets', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
    //   {
    //     name: 'Card', route: '', icon: 'dashboard', activeIcon: '', children: [
    //       { name: 'Identification', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
    //       { name: 'Security', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
    //     ], data: { isMobile: true, isDesktop: true }
    //   },
    //   { name: 'My Team', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
    //   { name: 'Settings', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
    // ]
    state.menuList = $initStore.userMenu;

    // 加载页面获取当前所在页面
    onMounted(() => {
      state.activeRouter = $router.currentRoute.value.path;
    });

    return {
      imageSrc,
      routerTo,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.active {
  background: rgba(1, 172, 102, 0.1);
}

:deep(.q-item) {
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;

  .q-item__section--avatar {
    min-width: auto;
  }
}

:deep(.q-expansion-item) {
  .q-expansion-item__content {
    padding-left: 40px;
  }
}
</style>
