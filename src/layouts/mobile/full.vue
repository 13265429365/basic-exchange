<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  // import { useI18n } from 'vue-i18n';
  export default {
    name: 'LayoutsTabs',
    setup() {
      const state = reactive({});
      return {
        ...toRefs(state),
      };
    },
  };
</script>

<style lang="scss" scoped>

  .q-page-container {
    height: 100vh !important;
  }
</style>
