<template>
  <q-list padding class="q-ml-xl q-mt-xl q-mr-md" style="width: 220px">
    <div @click="routerTo(menu.route)" v-for="(menu, menuIndex) in menuList" :key="menuIndex">
      <!-- 含有子级的列表 -->
      <q-expansion-item v-if="menu.children.length > 0" default-opened>
        <!-- 父级 -->
        <template v-slot:header>
          <q-item-section avatar>
            <q-img :src="imageSrc(config.logo)" width="24px" height="24px"></q-img>
          </q-item-section>
          <q-item-section avatar class="q-mr-xl">
            {{ menu.name }}
          </q-item-section>
        </template>

        <!-- 子级 -->
        <q-item @click="routerTo(children.route)" v-for="(children, childrenIndex) in menu.children" :key="childrenIndex"
          :header-inset-level="1" :active="activeRouter == children.route" active-class="active" clickable v-ripple>
          <q-item-section avatar style="opacity: 0">
            <q-icon name="inbox" />
          </q-item-section>
          <q-item-section>
            {{ children.name }}
          </q-item-section>
        </q-item>
      </q-expansion-item>


      <!-- 不含子级的列表 -->
      <q-item v-else :active="activeRouter == menu.route" active-class="active" :clickable="activeRouter != menu.route"
        v-ripple>
        <q-item-section avatar>
          <q-img :src="imageSrc(config.logo)" width="24px" height="24px"></q-img>
        </q-item-section>
        <q-item-section>
          {{ menu.name }}
        </q-item-section>
      </q-item>
    </div>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { routerTo, imageSrc } from 'src/utils/index'
import { InitStoreState } from 'src/stores/init'

export default defineComponent({
  name: 'LayoutsMenu',
  setup() {
    const $router = useRouter();
    let state = reactive({
      // 项目logo
      config: InitStoreState.config,

      // 选中菜单
      activeRouter: '/',

      // 菜单列表
      menuList: [] as any,
    });

    state.menuList = [
      { name: 'Dashboard', route: '/user', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
      { name: 'My Wallet', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
      { name: 'Assets', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
      {
        name: 'Card', route: '', icon: 'dashboard', activeIcon: '', children: [
          { name: 'Identification', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
          { name: 'Security', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: true } },
        ], data: { isMobile: true, isDesktop: true }
      },
      { name: 'My Team', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
      { name: 'Settings', route: '', icon: 'dashboard', activeIcon: '', children: [], data: { isMobile: true, isDesktop: false } },
    ]

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
</style>
