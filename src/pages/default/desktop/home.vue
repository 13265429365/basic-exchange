<template>
  <div class="window-height">home</div>
  <!-- 客服图标 -->
  <q-avatar v-if="config.settings.online.showRegister"
    class="fixed-bottom-right q-mb-md q-mr-md cursor-pointer shadow-1 z-top">
    <img :src="imageSrc(config.onlineIcon)" alt="">
  </q-avatar>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { InitStore } from 'src/stores/init';
export default {
  name: 'homeIndex',
  setup() {
    const $initStore = InitStore();

    const state = reactive({

      // 登录配置
      config: $initStore.config,

      // 客服图标
      onlineIcon: $initStore.config.onlineIcon,

      // 是否登录状态
      isLogin: $initStore.userToken != '',
    });

    return {
      imageSrc,
      ...toRefs(state),
    }
  }
}
</script>

<style scoped lang="scss">
</style>
