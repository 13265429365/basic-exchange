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
  import headerBar from 'src/components/pc/header.vue';
  import footerBar from 'src/components/pc/footer.vue';

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
</style>
