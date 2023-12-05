<template>
  <div class="lang row items-center justify-end">
    <div class="row no-wrap items-center">
      <q-img class="img" src="/images/default/switch.png" />
      <div id="">language</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    name: 'NotFound',
  });
</script>
<style lang="scss" scoped>
  .lang {
    padding: 16px 20px 18px 20px;
  }
  .img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
</style>
