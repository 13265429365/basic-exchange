<template>
  <q-layout>
    <headerBar></headerBar>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footerBar></footerBar>
  </q-layout>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  import headerBar from './header.vue';
  import footerBar from './footer.vue';

  // import { useRouter } from 'vue-router';

  export default {
    components: { headerBar, footerBar },
    name: 'defaultPc',
    setup() {
      // const router = useRouter();
      const state = reactive({

      });
      return {
        ...toRefs(state),
      };
    },
  };
</script>

<style lang="scss" scoped>
  html body {
    min-width: 1100px !important;
    overflow: scroll;
  }

  .q-page-container {
    min-width: 1100px !important;
    width: 100%;
  }

  :deep .calc {
    width: calc(100% - 268px);
    min-width: 1100px - 268px;
    padding-left: 10px;
  }
  :deep .conent {
      max-width: 1100px;
      min-width: 1100px;
      margin: 0 auto;
  }
  :deep .pageHeader {
    width: 100%;
    padding: 33px 100px;
    background: #FAFAFA;
    font-size: 28px;
    color: #333;
    font-weight: bold;
  }

</style>
