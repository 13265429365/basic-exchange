<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { initializationInitStore, useInitStore } from 'src/stores/init';
import { initializationUserStore } from './stores/user';
import { dynamicRouterFunc } from 'src/router/routes';
import { templateRoutes } from 'src/router/index';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  preFetch: async ({ ssrContext }) => {
    //  初始化 userStore
    const $userStore = initializationUserStore({ ssrContext });
    const initStore = useInitStore();

    //  请求管理配置文件
    // const initPath =
    //   '/init/' +
    //   ssrContext?.req.headers.host +
    //   '/' +
    //   $userStore.userLang;
    // await api.get(initPath).then((res: any) => {
    //   if (res != null) {
    //     console.log(111)

    //     //  初始化管理配置信息
    //     initializationInitStore({
    //       config: res.config,
    //       translate: res.translate,
    //       countryList: res.countryList,
    //       languageList: res.languageList,
    //     });
    //     initStore.newInitializationInitStore({
    //       config: res.config,
    //       translate: res.translate,
    //       countryList: res.countryList,
    //       languageList: res.languageList,
    //     });
    //   }
    // });
  },

  created: () => {
    const $initStore = useInitStore();
    const $router = useRouter();
    const $q = useQuasar();
    console.log(111111)

    console.log($initStore.languageList)

    setTimeout(() => {
      console.log($initStore.languageList)
    }, 5000)
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
      templateRoutes.get($q.platform.is.mobile ? 'default' : 'defaultPc'),
      $q.platform.is.mobile ? 'default' : 'defaultPc',
      <boolean>$q.platform.is.mobile
    );
    //  覆盖当前路由
    $router.replace($router.currentRoute.value.fullPath);
  },
});
</script>
