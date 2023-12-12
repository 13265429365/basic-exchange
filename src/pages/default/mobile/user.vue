<template>
  <div>
    <div>User</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  name: 'UserIndex',
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
};
</script>
