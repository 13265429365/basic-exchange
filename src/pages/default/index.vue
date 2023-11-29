<template>
  <div>
    <div v-for="(i, index) in 6" :key="index">首页</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'indexVue',
});
</script>
