<template>
  <div>
    <q-list bordered class="q-mb-md border-a-8" style="border:0 !important;overflow: hidden;border-radius: 8px;">
      <div v-for="(item, i) in list" :key="i" class="bg-white">
        <q-item @click="to(item.route, item.toggle)" v-ripple class="q-pa-md" clickable>
          <q-item-section avatar style="padding-right: 11px;min-width: 0;">
            <q-img width="20px" height="20px" :src="`/icons/${item.icon}`"></q-img>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{ $t(item.name) }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row no-wrap items-center">
              <div v-if="item.version">{{ item.version }}</div>
              <q-toggle v-if="item.toggle" size="sm" v-model="toggle" val="lg" />
              <q-icon v-else name="chevron_right" size="20px" />
            </div>
          </q-item-section>
        </q-item>
        <q-separator style="background: #F4F5FD;" inset />
      </div>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// 列表
import { settingList } from './ts/data';
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SettingIndex',
  setup(props: any, context: any) {
    const { t } = useI18n();
    const $router = useRouter();

    let store = reactive({
      list: settingList as any,
      toggle: false
    })

    context.emit('update', {
      title: t('settings'),
    })

    return {
      ...toRefs(store),
      // 动态参数跳转
      to(url: string, toggle: boolean) {
        if (toggle) {
          return false
        }
        $router.push(url)
      },
    }
  }
})
</script>

<style scoped></style>
