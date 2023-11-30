<template>
  <div>
    <navBar title="Privacy Policy" height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-md" color="grey-2" />
    <div v-for="(item, i) in list" :key="i" class="q-px-lg">
      <div class="text-primary text-weight-bold" style="font-size: 18px;">
        {{item.name}}
      </div>
      <div class="q-pb-lg text-grey-6">{{item.content}}</div>
    </div>

  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  // import { useRouter } from 'vue-router';
  import navBar from 'src/components/navBar.vue';
  // 列表
  import { privacyList } from './data';
  export default defineComponent({
    name: 'privacyPolicy',
    components: {
      navBar
    },
    setup() {
      // const router = useRouter();
      let store = reactive({
        list: privacyList,
      })
      return {
        ...toRefs(store),
      }
    }
  })
</script>

<style scoped>
</style>
