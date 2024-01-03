<template>
  <div class="column bg-white window-height">
    <div class="col">
      <div class="column justify-between items-center">
        <div class="column justify-center shadow-1 q-mt-xl" style="width: 80px;height: 80px;border-radius: 15px;">
          <q-img class="self-center" :src="imageSrc(config.logo)" width="56px" height="56px" />
        </div>
        <div class="text-h6 text-weight-bold q-mt-md">{{ config.name }}</div>
        <q-btn unelevated rounded color="primary" :label="$t('download')" class="q-mt-lg"
          style="width: 269px;height: 44px" no-caps />
      </div>

    </div>
    <q-img src="/images/download.png" width="240px" height="163px" class="self-center q-mb-xl" />
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { date } from 'quasar';
import { imageSrc } from 'src/utils';
import { useI18n } from 'vue-i18n';
import { InitStore } from 'src/stores/init';
import { downloadInfoAPI } from 'src/apis';

export default {
  name: 'DownloadIndex',
  setup(props: any, context: any) {
    const { t } = useI18n();
    const $initStore = InitStore();

    const state = reactive({
      config: $initStore.config,

      // 获取下载地址
      downloadUrl: {} as any,
    });

    context.emit('update', {
      title: t('download'),
    })

    onMounted(() => {
      // 获取下载地址
      downloadInfoAPI().then((res: any) => {
        state.downloadUrl = res
      })
    })

    return {
      imageSrc,
      date,
      ...toRefs(state),
    }
  }
};
</script>

<style lang="scss" scoped></style>
