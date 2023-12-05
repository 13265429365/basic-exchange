<template>
  <div>
    <navBar title="About" height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-md" color="grey-2" />
    <div class="row justify-center">
      <q-img class="logo" src="/images/default/logo.png" :ratio="1" />
    </div>
    <div class="row justify-center">
      <div class="text-grey-10" style="font-size: 16px;">10.2.36</div>
    </div>
    <q-list bordered class="q-mb-md border-a-8"
      style="border:0 !important;overflow: hidden;border-radius: 8px;">
      <div v-for="(item, i) in list" :key="i" @click="to(item.url)" class="bg-white">
        <q-item v-ripple class="q-pa-md" clickable>
          <q-item-section>
            <q-item-label avatar class="text-weight-bold">{{item.name}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-img class="iconLogo" src="/images/default/right_arrow.png" />
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
  import { aboutList } from './data';
  export default defineComponent({
    name: 'aboutView',
    components: {
      navBar
    },
    setup() {
      const router = useRouter();
      let store = reactive({
        list: aboutList,
        shape: 'China',
      })
      return {
        ...toRefs(store),
        to(url: string) {
          if (url) {
            router.push(url)
          }
        }
      }
    }
  })
</script>

<style scoped>
</style>
