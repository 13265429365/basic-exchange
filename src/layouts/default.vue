<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- <q-footer>
      <q-tabs v-model="currentTab" dense class="bg-white text-black" indicator-color="transparent" active-color="primary">
        <q-tab v-for="(tabi, tabIndex) in tabArr" :key="tabIndex" :name="tabi.name"
          :icon="tabi.name == currentTab ? tabi.imgActive : tabi.img" :label="tabi.label"
          @click="$router.push({ name: tabi.urlName })">
          <q-badge v-if="tabi.name == 'notice'" color="red" floating>2</q-badge>
        </q-tab>
      </q-tabs>
    </q-footer> -->
  </q-layout>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
// import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: 'LayoutsTabs',
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

<style lang="scss" scoped>
// 手机版input样式
:deep .q-field .q-field__native {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep .q-field .q-field__prefix {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep .q-field .q-field__append {
  color: rgba(0, 0, 0, 0.54);
}

:deep .q-field__control:before {
  background: #F5F6FA !important;
}

:deep .q-field .q-field__control {
  background: #F5F6FA !important;
  border-radius: 10px !important;
  height: 50px !important;
  min-height: 50px !important;
  outline: none !important;
  box-shadow: none !important;
}

.q-page-container {
  height: 100vh !important;
}
</style>
