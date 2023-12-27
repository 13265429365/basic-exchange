<template>
  <div class="row items-center justify-center">
    <div class="column">
      <div class="col">
        <div class="column justify-between items-center q-mb-xl">
          <div class="column justify-center shadow-1 q-mt-xl" style="width: 80px;height: 80px;border-radius: 15px;">
            <q-img class="self-center" :src="imageSrc(config.logo)" width="56px" height="56px" />
          </div>
          <div class="text-h6 text-weight-bold q-mt-md">{{ config.name }}</div>
          <q-btn unelevated rounded color="primary" :label="$t('download')" class="q-mt-lg"
            style="width: 269px;height: 44px" no-caps />
        </div>

      </div>
      <q-img src="/images/download.png" width="240px" height="163px" class="self-center q-my-xl" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { downloadInfoAPI } from 'src/apis';
import { InitStore } from 'src/stores/init';

export default {
  name: 'defaultDownload',
  setup() {
    const $initStore = InitStore();

    const state = reactive({
      config: $initStore.config,
      downloadInfo: {android: '', ios: ''} as any,
    });

    onMounted(() => {
      downloadInfoAPI().then((res: any) => {
        state.downloadInfo = res
      })
    })

    return {
      imageSrc,
      ...toRefs(state),
    }
  }
};
</script>

<style lang="scss" scoped></style>
