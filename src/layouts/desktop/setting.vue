<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="bg-white">
      <HeaderLayouts></HeaderLayouts>
    </q-header>

    <q-page-container>
      <div class="row no-wrap">
        <MenuLayouts></MenuLayouts>
        <router-view />
      </div>
    </q-page-container>

    <q-footer bordered>
      <FooterLayouts></FooterLayouts>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import HeaderLayouts from 'src/layouts/desktop/header.vue';
import FooterLayouts from 'src/layouts/desktop/footer.vue';
import MenuLayouts from 'src/layouts/desktop/menu.vue';

export default {
  components: { HeaderLayouts, FooterLayouts, MenuLayouts },
  name: 'LayoutsSetting',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.calc {
  width: 100%;
}
</style>
