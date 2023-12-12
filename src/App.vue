<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta, useQuasar } from 'quasar';
import { useInitStore } from 'src/stores/init';
import { dynamicRouterFunc } from 'src/router/routes';
import { templateRoutes } from 'src/router/routes';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  created: () => {
    const $initStore = useInitStore();
    const $router = useRouter();
    const $q = useQuasar();
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
    //  动态载入路由
    dynamicRouterFunc(
      $router,
      templateRoutes.get('default'),
      // $q.platform.is.mobile ? '_default' : '_defaultDesktop',
      'default',
      <boolean>$q.platform.is.mobile
    );
    //  覆盖当前路由
    $router.replace($router.currentRoute.value.fullPath);
  },
});
</script>
