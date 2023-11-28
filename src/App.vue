<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta, Cookies, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useInitStore, UserLang, UserToken } from 'src/stores/init';
import { dynamicRouterFunc } from 'src/router/routes';
import { templateRoutes } from 'src/router/index';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  preFetch: ({ ssrContext }) => {
    const $initStore = useInitStore();
    const $cookies = Cookies.parseSSR(ssrContext);

    //  获取用户端Cookies信息
    $initStore.userToken = $cookies.get(UserToken);
    //  请求管理配置文件
    const initPath =
      '/init?domain=' +
      ssrContext?.req.headers.host +
      '&lang=' +
      $cookies.get(UserLang);
    api.get(initPath).then((res: any) => {
      if (res != null) {
        $initStore.config = res.config;
        $initStore.translate = res.translate;
        $initStore.countryList = res.countryList;
        $initStore.languageList = res.languageList;
      }
    });
  },

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
      templateRoutes.get($initStore.config.template),
      $initStore.config.template,
      <boolean>$q.platform.is.mobile
    );
    //  覆盖当前路由
    $router.replace($router.currentRoute.value.fullPath);
  },
});
</script>
