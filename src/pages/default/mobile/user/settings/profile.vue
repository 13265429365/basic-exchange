<template>
  <div>
    <div>Profile</div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  name: 'UserSettingsProfile',
  setup(props: any, context: any) {
    context.emit('update', { title: 'xxxx' });

    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
};
</script>
