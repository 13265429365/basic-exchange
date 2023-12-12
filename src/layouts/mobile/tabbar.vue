<template>
  <q-footer>
    <q-tabs v-model="currentTab" dense class="bg-white text-black" indicator-color="transparent" active-color="primary">
      <q-tab v-for="(tabi, tabIndex) in tabArr" :key="tabIndex" :name="tabi.name"
        :icon="tabi.name == currentTab ? tabi.imgActive : tabi.img" :label="tabi.label"
        @click="$router.push({ name: tabi.urlName })">
        <q-badge v-if="tabi.name == 'notice'" color="red" floating>2</q-badge>
      </q-tab>
    </q-tabs>
  </q-footer>
</template>

<script lang="ts">
  import { onMounted, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';

  export default {
    name: 'tabBar',
    setup() {
      const router = useRouter();
      const state = reactive({
        currentTab: 'Home' as any,
        tabArr: [
          {
            name: 'Home',
            label: '首页',
            imgActive: 'img:page_bg/home_active.png',
            img: 'img:page_bg/home.png',
            urlName: 'Home',
          },
          {
            name: 'Notice',
            label: '消息',
            imgActive: 'img:page_bg/notice_active.png',
            img: 'img:page_bg/notice.png',
            urlName: 'Notice',
          },
          {
            name: 'User',
            label: '我的',
            imgActive: 'img:page_bg/user_active.png',
            img: 'img:page_bg/user.png',
            urlName: 'User',
          },
        ],
      });

      onMounted(() => {
        state.currentTab = router.currentRoute.value.name;
      });
      return {
        ...toRefs(state),
      };
    },
  };
</script>
