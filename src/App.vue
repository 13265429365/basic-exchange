<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta } from 'quasar';
import { useInitStore } from 'src/stores/init';
export default defineComponent({
  name: 'App',
  created: () => {
    const $initStore = useInitStore();
    //  设置客户端Meta信息
    const metaData = {
      title: $initStore.config.name,
      meta: {
        description: {
          name: 'description',
          content: $initStore.config.name,
        },
      },
      link: {
        material: {
          rel: 'icon',
          href: process.env.baseURL + $initStore.config.logo,
          type: 'image/png',
        },
      },
    };
    useMeta(metaData);
  },
});
</script>
