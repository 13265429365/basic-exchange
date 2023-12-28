<template>
  <div class="row justify-center" style="padding-top: 200px;">
    <q-img class=" col-3 q-mr-xl" src="/images/bt.jpg"></q-img>
    <div class="q-pl-xl">
      <div class="text-h3 text-weight-bold">{{ config.name }}</div>
      <div class="text-h4 text-grey-7 q-mt-md">The People's Exchange</div>

      <div class="row no-wrap q-mt-lg">
        <div>
          <div class="text-h6 q-mt-lg q-mb-sm">IOS</div>
          <img style="width: 150px;" class="cursor-pointer" src="/images/ios.svg">
          <div class="text-h6 q-mt-lg q-mb-sm">Android</div>
          <img style="width: 150px;" class="cursor-pointer" src="/images/android.svg">
        </div>
        <div class="q-ml-xl row items-end">
          <div class="q-pa-lg rounded-borders" style="border: 1px solid rgba(0,20,42,0.12)">
            <img :src="downloadImage" alt="">
          </div>
        </div>
      </div>

    </div>
    <!-- <q-btn unelevated rounded color="primary" :label="$t('download')" class="q-mt-lg"
            style="width: 269px;height: 44px" no-caps /> -->
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { downloadInfoAPI } from 'src/apis';
import { InitStore } from 'src/stores/init';
import QRCode from 'qrcode-svg-ts';

export default {
  name: 'defaultDownload',
  setup() {
    const $initStore = InitStore();

    const state = reactive({
      config: $initStore.config,
      downloadInfo: { android: '', ios: '' } as any,
      downloadImage: '',
    });

    onMounted(() => {
      downloadInfoAPI().then((res: any) => {
        const qrCode = new QRCode({
          content: "http://localhost:8089/download",
          width: 130,
          height: 130,
          color: '#000000',
          background: '#ffffff',
          ecl: 'M',
        });
        state.downloadImage = qrCode.toDataURL()
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
