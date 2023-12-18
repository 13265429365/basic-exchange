<template>
  <div class="calc row items-center justify-center">
    <div class="column">
      <div>
        <div class="text-color-3  column justify-between items-center">
          <div class="logo column justify-center">
            <q-img class="self-center" :src="imageSrc('')" width="56px" height="56px" />

          </div>
          <div class="text-h6 text-weight-bold">Solo App</div>
          <div class="text-body2 text-weight-regular q-mt-sm">Caption app news app news</div>
          <q-btn unelevated rounded color="primary" label="Download" style="width: 269px;height: 44px;margin-top: 40px;"
            no-caps />
        </div>

      </div>
      <!-- <q-img :src="imageSrc('')" width="240px" height="163px" class="self-center q-mt-xl q-mb-sm" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { date } from 'quasar';
import { imageSrc } from 'src/utils/index';

export default {
  name: 'defaultDownload',
  setup() {
    const state = reactive({
    });
    return {
      imageSrc,
      date,
      ...toRefs(state),
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 80px;
  height: 80px;
  margin-top: 60px;
  margin-bottom: 13px;
  box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.1);
  border-radius: 15px;
}
</style>
