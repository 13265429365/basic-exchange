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
import headerBar from 'src/layouts/desktop/header.vue';
import footerBar from './footer.vue';

export default {
  components: { headerBar, footerBar },
  name: 'defaultPc',
  setup() {
    // const router = useRouter();
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
:deep .calc {
  width: calc(100% - 268px);
  min-width: 1100px - 278px;
  padding-left: 10px;
}

:deep .pageHeader {
  width: 100%;
  padding: 33px 100px;
  background: #fafafa;
  font-size: 28px;
  color: #333;
  font-weight: bold;
}
</style>
