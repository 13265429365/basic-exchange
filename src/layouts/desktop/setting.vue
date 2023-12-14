<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="bg-white">
      <HeaderLayouts></HeaderLayouts>
    </q-header>

    <q-page-container>
      <div>
        <div>

        </div>
        <div>
          <router-view />
        </div>
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

export default {
  components: { HeaderLayouts, FooterLayouts },
  name: 'LayoutsSetting',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
