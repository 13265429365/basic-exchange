<template>
  <div>
    <navBar title="测试"></navBar>
    <div v-for="(i, index) in 6" :key="index">消息</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/components/navBar.vue';

export default {
  name: 'noticeVue',
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
