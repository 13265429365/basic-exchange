<template>
  <div>
    <navBar title="language" height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb" color="grey-2" />
    <q-list bordered class="q-mb-md border-a-8" style="border:0 !important;overflow: hidden;border-radius: 8px;">
      <div @click="switchLang(item.name)" v-for="(item, i) in list" :key="i" class="bg-white">
        <q-item v-ripple class="q-pa-md" clickable>
          <q-item-section avatar style="padding-right: 11px;min-width: 0;">
            <q-img :src="imageSrc(item.icon)" class="country" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{ item.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-img v-if="shape == item.name" src="page_bg/radio_active.png" class="radioIcon" />
            <q-img v-else src="page_bg/radio.png" class="radioIcon" />
            <!-- radio_active.png -->
            <!-- <q-radio v-model="shape" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="item.name" /> -->
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
import navBar from 'src/layouts/mobile/header.vue';
import { NotifyPositive } from 'src/utils/notify';
import { useInitStore } from 'src/stores/init';
import { imageSrc } from 'src/utils';

// 列表
export default defineComponent({
  name: 'languageView',
  components: {
    navBar
  },
  setup() {
    const initStore = useInitStore();
    const router = useRouter();
    let store = reactive({
      list: [] as any,
      shape: 'China',
    })

    onMounted(() => {
      store.list = initStore.languageList;
      console.log(initStore.config.defaultLang)

    })

    return {
      ...toRefs(store),
      switchLang(name: string) {
        store.shape = name
        NotifyPositive('切换成功')
        setTimeout(() => {
          router.back()
        }, 500)
      },
      imageSrc
    }
  }
})
</script>

<style scoped>
  @import url("../../../css/mobileCss.css");
.radioIcon {
  width: 20px;
  height: 20px;
}

.country {
  width: 32px;
  height: 21px;
}
</style>
