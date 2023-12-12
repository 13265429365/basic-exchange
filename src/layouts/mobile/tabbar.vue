<template>
  <q-layout view="hHh lpr fff" class="bg-grey-1">
    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-white text-black text-caption">
      <q-tabs
        v-model="currentTab"
        dense
        indicator-color="transparent"
        active-color="primary"
      >
        <q-route-tab
          v-for="(tab, tabIndex) in tabbarList"
          :key="tabIndex"
          :name="tab.route"
          :icon="
            'img:' +
            imageSrc(tab.route == currentTab ? tab.activeIcon : tab.icon)
          "
          :ripple="false"
          :to="tab.route"
        >
          <template v-slot:default>
            <div class="text-caption">{{ tab.name }}</div>
          </template>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { toRefs, reactive, ref } from 'vue';
import { imageSrc } from 'src/utils';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

export default {
  name: 'LayoutsTabbar',
  setup() {
    const $router = useRouter();
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const state = reactive({
      currentTab: '/',
      tabbarList: [] as any,
    });

    //  初始化数据
    state.tabbarList = [
      { name: '首页', route: '/', icon: '', activeIcon: '' },
      { name: '行情', route: '/market', icon: '', activeIcon: '' },
      { name: '合约', route: '/contact', icon: '', activeIcon: '' },
      { name: '期货', route: '/futures', icon: '', activeIcon: '' },
      { name: '我的', route: '/user', icon: '', activeIcon: '' },
    ];

    onMounted(() => {
      state.currentTab = $router.currentRoute.value.path;
    });

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      imageSrc,
      ...toRefs(state),
    };
  },
};
</script>
