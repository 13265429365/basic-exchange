<template>
  <q-menu>
    <q-list>
      <q-item @click="switchLang(language)" :active="locale == language.Alias"
        v-for="(language, languageIndex) in languageList" :key="languageIndex" clickable v-close-popup aria-hidden="true">
        <q-item-section avatar>
          <q-img width="24px" height="24px" :src="imageSrc(language.icon)" />

        </q-item-section>
        <q-item-section>{{ language.name }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue';
import { useI18n } from 'vue-i18n'
import { imageSrc } from 'src/utils';
import { InitStore } from 'src/stores/init';


export default defineComponent({
  name: 'SwitchLanguage',
  setup() {
    const $initStore = InitStore()
    const { locale } = useI18n({ useScope: 'global' })

    const state = reactive({
      // 配置
      config: $initStore.config,

      // 语言列表
      languageList: [] as any,

      // 切换语言
      locale,
    })

    const switchLang = async (language: any) => {
      state.locale = language.Alias
      await $initStore.updateUserLang(language.Alias)

      // location.reload()
    }

    state.languageList = $initStore.languageList

    return {
      imageSrc,
      ...toRefs(state),
      switchLang
    }
  }
});
</script>
<style lang="scss" scoped>
:deep(.q-item .q-item__section) {
  min-width: auto;
  padding-right: 10px;
}
</style>
