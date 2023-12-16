<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="bg-white">
      <HeaderLayouts></HeaderLayouts>
    </q-header>

    <q-page-container>
      <div class="row no-wrap">
        <q-scroll-area class="q-ml-xl q-mt-xl q-mr-md" style="height: 500px;width: 260px">
          <MenuLayouts></MenuLayouts>
        </q-scroll-area>
        <router-view />
      </div>
    </q-page-container>

    <q-footer style="background: #021736;" bordered>
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

:deep(.maxWidth1200) {
  width: 100%;

  &>div {
    min-width: 1000px;
    max-width: 1200px;
  }
}
</style>
