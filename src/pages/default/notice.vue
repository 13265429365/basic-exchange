<template>
  <div>
    <navBar title="测试"></navBar>
    <div class="q-mt-xs">xs</div>
    <div class="q-mt-sm">sm</div>
    <div class="q-mt-md">md</div>
    <div class="q-mt-lg">lg</div>
    <div class="q-mt-xl">xl</div>
    <div v-for="(i, index) in 6" :key="index">消息</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/components/mobile/navBar.vue';

export default {
  name: 'noticeView',
  components: { navBar },
  setup() {
    const state = reactive({

    });
    return {
      ...toRefs(state),
    }
  }
};
</script>
