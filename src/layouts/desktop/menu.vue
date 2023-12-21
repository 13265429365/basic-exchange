<template>
  <q-list class="q-ml-xl q-mt-xl q-mr-md" style="min-width: 220px;width: 220px" padding>
    <div v-for="(menu, menuIndex) in menuList" :key="menuIndex">
      <!-- 含有子级的列表 -->
      <q-expansion-item accordion v-if="menu.children.length > 0" default-opened>
        <!-- 父级 -->
        <template v-slot:header>
          <q-item-section avatar>
            <q-img :src="imageSrc(menu.icon)" width="24px" height="24px"></q-img>
          </q-item-section>
          <q-item-section avatar>
            <div style="user-select: none;min-width: 120px;">{{ $t(menu.name) }}</div>
          </q-item-section>
        </template>

        <!-- 子级 -->
        <q-item :to="children.route" @click="activeRouter = children.route"
          v-for="(children, childrenIndex) in menu.children" :key="childrenIndex" :header-inset-level="1"
          :active="activeRouter == children.route" active-class="active" clickable>
          <q-item-section avatar>
            <q-img width="24px" height="24px" src=""></q-img>
          </q-item-section>
          <q-item-section>
            <div style="user-select: none">{{ $t(children.name) }}</div>
          </q-item-section>
        </q-item>
      </q-expansion-item>


      <!-- 不含子级的列表 -->
      <q-item v-else @click="activeRouter = menu.route" :active="activeRouter == menu.route" active-class="active"
        :clickable="activeRouter != menu.route" :to="menu.route">
        <q-item-section avatar>
          <q-img :src="imageSrc(menu.icon)" width="24px" height="24px"></q-img>
        </q-item-section>
        <q-item-section>
          <div style="user-select: none">{{ $t(menu.name) }}</div>
        </q-item-section>
      </q-item>
    </div>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { imageSrc } from 'src/utils/index';
import { InitStoreState, InitStore } from 'src/stores/init';

export default defineComponent({
  name: 'LayoutsMenu',
  setup() {
    const $router = useRouter();
    const $initStore = InitStore()

    let state = reactive({
      // 项目logo
      config: InitStoreState.config,

      // 选中菜单
      activeRouter: '/wallet/account/index',

      // 菜单列表
      menuList: [] as any,
    });

    state.menuList = $initStore.userMenu;

    // 加载页面获取当前所在页面
    onMounted(() => {
      state.activeRouter = $router.currentRoute.value.path;
    });

    return {
      imageSrc,
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
