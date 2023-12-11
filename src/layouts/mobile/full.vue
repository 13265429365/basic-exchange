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
  // 手机版input样式
  :deep .q-field .q-field__native {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  :deep .q-field .q-field__prefix {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  :deep .q-field .q-field__append {
    color: rgba(0, 0, 0, 0.54);
  }

  :deep .q-field__control:before {
    background: #F5F6FA !important;
  }

  :deep .q-field .q-field__control {
    background: #F5F6FA !important;
    border-radius: 10px !important;
    height: 50px !important;
    min-height: 50px !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .q-page-container {
    height: 100vh !important;
  }

  // 常用字体颜色
  :deep .text-color-3 {
    color: #333333 !important;
  }

  :deep .text-color-6 {
    color: #666666;
  }

  :deep .text-color-9 {
    color: #999999;
  }
</style>
