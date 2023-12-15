<template>
  <q-menu>
    <q-list>
      <q-item @click="locale = language.alias" :active="locale == language.alias"
        v-for="(language, languageIndex) in languageList" :key="languageIndex" clickable v-close-popup aria-hidden="true">
        <q-item-section>{{ language.name }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'switchLanguage',
  setup() {
    const { locale } = useI18n({ useScope: 'global' })

    const state = reactive({
      // 语言列表
      languageList: [] as any,

      // 切换语言
      locale,
    })

    state.languageList = [
      { id: 1, name: 'English', alias: 'en-US', icon: '' },
      { id: 2, name: 'Chinese', alias: 'ch', icon: '' },
    ]

    return {
      ...toRefs(state)
    }
  }
});
</script>
<style lang="scss" scoped></style>
