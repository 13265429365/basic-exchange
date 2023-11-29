<template>
  <div class="column full-height bg-white">
    <navBar title="Download"></navBar>
    <q-separator style="background: #F4F5FD;" />
    <div class="col">
      <div class="text-color-3  column justify-between items-center">
        <div class="logo column justify-center ">
          <q-img class="self-center" src="/images/default/download.png" width="56px" height="56px" />
        </div>
        <div class="text-h6 text-weight-bold q-mt-md">Solo App</div>
        <div class="text-body2 text-weight-regular q-mt-sm">Caption app news app news</div>
        <q-btn unelevated rounded color="primary" label="Download" style="width: 269px;height: 44px;margin-top: 40px;"
          no-caps />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/components/navBar.vue';
import { date } from 'quasar';

export default {
  name: 'defaultDownload',
  components: { navBar },
  setup() {
    const state = reactive({
    });
    return {
      ...toRefs(state), date
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 80px;
  height: 80px;
  margin-top: 60px;
  box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.1);
  border-radius: 15px;
}
</style>
