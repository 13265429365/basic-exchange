<template>
  <div>404</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
export default defineComponent({
  name: 'NotFound',
});
</script>
