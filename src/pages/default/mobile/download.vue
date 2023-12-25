<template>
  <div class="column full-height bg-white">
    <q-separator style="background: #F4F5FD;" />
    <div class="col">
      <div class="text-color-3  column justify-between items-center">
        <div class="logo column justify-center ">
          <q-img class="self-center" :src="imageSrc('')" width="56px" height="56px" />
        </div>
        <div class="text-h6 text-weight-bold q-mt-md">Solo App</div>
        <div class="text-body2 text-weight-regular q-mt-sm">Caption app news app news</div>
        <q-btn unelevated rounded color="primary" :label="$t('download')"
          style="width: 269px;height: 44px;margin-top: 40px;" no-caps />
      </div>

    </div>
    <q-img src="/images/default/downloadImg.png" width="240px" height="163px" class="self-center q-mb-sm" />
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { date } from 'quasar';
import { imageSrc } from 'src/utils/index';
import { useI18n } from 'vue-i18n';


export default {
  name: 'DownloadIndex',
  setup(props: any, context: any) {
    const { t } = useI18n();

    const state = reactive({
    });

    context.emit('update', {
      title: t('download'),
    })

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
  box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.1);
  border-radius: 15px;
}
</style>
