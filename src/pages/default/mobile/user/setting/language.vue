<template>
  <div>
    <q-list bordered class="q-mb-md border-a-8" style="border:0 !important;overflow: hidden;border-radius: 8px;">
      <div @click="switchLang(item)" v-for="(item, i) in languageList" :key="i" class="bg-white">
        <q-item v-ripple class="q-pa-md" clickable>
          <q-item-section avatar style="padding-right: 11px;min-width: 0;">
            <q-img :src="imageSrc(item.icon)" class="country" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{ item.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon v-if="locale == item.Alias" name="check_circle" color="primary" size="20px"></q-icon>
          </q-item-section>
        </q-item>
        <q-separator style="background: #F4F5FD;" inset />
      </div>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { NotifyPositive } from 'src/utils/notify';
import { InitStore } from 'src/stores/init';
import { imageSrc } from 'src/utils/index';
import { useI18n } from 'vue-i18n'

// 列表
export default defineComponent({
  name: 'languageView',
  setup() {
    const { locale } = useI18n({ useScope: 'global' })
    const $initStore = InitStore();
    const router = useRouter();
    let state = reactive({
      languageList: [] as any,
      shape: 'China',
      locale,
    })

    onMounted(() => {
      state.languageList = $initStore.languageList;
    })

    const switchLang = async (language: any) => {
      // state.locale = language.Alias
      await $initStore.updateUserLang(language.Alias)
      NotifyPositive('切换成功')
      // router.back()
      setTimeout(() => {
        location.reload()
      }, 500)
    }

    return {
      ...toRefs(state),
      switchLang,
      imageSrc
    }
  }
})
</script>

<style scoped>
.country {
  width: 32px;
  height: 21px;
}
</style>
