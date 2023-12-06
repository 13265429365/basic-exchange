<template>
  <div>
    <navBar title="Settings" height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb" color="grey-2" />
    <q-list bordered class="q-mb-md border-a-8"
      style="border:0 !important;overflow: hidden;border-radius: 8px;">
      <div v-for="(item, i) in list" :key="i" class="bg-white">
        <q-item @click="to(item.url, item.toggle)" v-ripple class="q-pa-md" clickable>
          <q-item-section avatar style="padding-right: 11px;min-width: 0;">
            <img :src="`/images/default/${item.avatar}`" class="iconLogo">
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{ item.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row no-wrap items-center">
              <div v-if="item.version">{{item.version}}</div>
              <q-toggle v-if="item.toggle" size="sm" v-model="toggle" val="lg" />
              <q-img v-else class="iconLogo" src="/images/default/right_arrow.png" />
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
  import navBar from 'src/components/mobile/navBar.vue';
  // 列表
  import { settingList } from './ts/data';
  export default defineComponent({
    name: 'infoSetting',
    components: {
      navBar
    },
    setup() {
      const router = useRouter();
      let store = reactive({
        list: settingList,
        toggle: false
      })
      return {
        ...toRefs(store),
        // 动态参数跳转
        to(url:string, toggle:boolean) {
          if (toggle) {
            return false
          }
          router.push(url)
        },
      }
    }
  })
</script>

<style scoped>
</style>
