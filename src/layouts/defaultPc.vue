<template>
  <q-layout>
    <headerBar></headerBar>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <q-tabs v-model="currentTab" dense class="bg-white text-black" indicator-color="transparent"
        active-color="primary">
        <q-tab v-for="(tabi, tabIndex) in tabArr" :key="tabIndex" :name="tabi.name"
          :icon="tabi.name == currentTab ? tabi.imgActive : tabi.img" :label="tabi.label"
          @click="$router.push({ name: tabi.urlName })">
          <q-badge v-if="tabi.name == 'notice'" color="red" floating>2</q-badge>
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
  import { onMounted, reactive, toRefs } from 'vue';
  import headerBar from 'src/components/header.vue';
  // import navBar from 'src/components/navBar.vue';
  import { useRouter } from 'vue-router';

  export default {
    components: { headerBar },
    name: 'defaultPc',
    setup() {
      const router = useRouter();
      const state = reactive({
        footerHeight: 50 as any,
        currentTab: 'Home' as any,
        tabArr: [
          {
            name: 'Home',
            label: '首页',
            imgActive: 'img:/images/default/home_active.png',
            img: 'img:/images/default/home.png',
            urlName: 'Home',
          },
          {
            name: 'Notice',
            label: '消息',
            imgActive: 'img:/images/default/notice_active.png',
            img: 'img:/images/default/notice.png',
            urlName: 'Notice',
          },
          {
            name: 'User',
            label: '我的',
            imgActive: 'img:/images/default/user_active.png',
            img: 'img:/images/default/user.png',
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

<style scoped></style>
