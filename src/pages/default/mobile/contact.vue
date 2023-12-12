<template>
  <div>
    <div>Contact</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  name: 'ContactIndex',
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
};
</script>
