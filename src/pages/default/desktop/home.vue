<template>
  <div>
    <div>Home</div>
  </div>

  <!-- 客服图标 -->
  <q-page-sticky v-if="setting.online.showHome" position="bottom-right" :offset="[18, 18]">
    <q-fab style="width: 56px;height: 56px;" hide-icon>
      <template v-slot:label>
        <q-avatar class="full-width full-height">
          <img :src="imageSrc(onlineIcon)">
        </q-avatar>
      </template>
    </q-fab>
  </q-page-sticky>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { useInitStore } from 'src/stores/init';
import { imageSrc } from 'src/utils';

export default {
  name: 'HomeIndex',
  setup() {
    const $initStore = useInitStore();

    const state = reactive({
      // 注册配置
      setting: $initStore.config.settings,

      // 客服图标
      onlineIcon: $initStore.config.onlineIcon,
    });

    return {
      imageSrc,
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.q-fab > a) {
  padding: 0;

  .q-fab__label {
    padding-right: 0 !important;
    padding-left: 0 !important;
    max-height: 100%;
  }
}
</style>