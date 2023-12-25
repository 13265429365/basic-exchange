<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta } from 'quasar';
import { InitStore } from 'src/stores/init';
import {imageSrc} from 'src/utils';
import {useI18n} from 'vue-i18n';
import {setLanguageFunc} from 'boot/i18n';

export default defineComponent({
  name: 'App',
  created: () => {
    const $initStore = InitStore();
    const $i18n = useI18n()

    // 初始化国际化语言
    setLanguageFunc($i18n, $initStore.translate, $initStore.userLang)

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
          href: imageSrc($initStore.config.logo),
          type: 'image/png',
        },
      },
    };
    useMeta(metaData);
  },
});
</script>
