<template>
  <div class="column full-width" style="min-height: 100vh;">
    <div class="col page_bg q-pa-md full-width">

      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between radius-8 q-mb-md">
        <div class="column justify-center">
          <div class="row items-center">
            <div class="text-white text-weight-bold">Wallet Balance</div>
            <q-icon @click="moneyShow = !moneyShow" :name="!moneyShow ? 'o_visibility' : 'o_visibility_off'"
              class="q-ml-sm cursor-pointer text-white" size="18px"></q-icon>
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div v-if="moneyShow" class="text-white text-weight-bold " style="font-size: 22px;">$1200.00 </div>
          <div v-else class="text-white text-weight-bold " style="font-size: 22px;">**** </div>
        </div>
        <q-img :src="imageSrc('/assets/icon/menu/withdraw.png')" class="self-center" width="68px" height="53.83px" />
      </div>

      <div class="row justify-between q-mb-md btn">
        <q-btn @click="$router.push(quickMenu.route)" v-for="(quickMenu, quickMenuIndex) in quickMenuList"
          :key="quickMenuIndex" style="width: 47%;" class="bg-white q-py-sm radius-8" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc(quickMenu.icon)" width="42px" height="42px" />
            <div>{{ quickMenu.name }}</div>
          </div>
        </q-btn>
      </div>

      <div class="q-py-md row">
        <div class="text-color-3 text-subtitle1 text-weight-bolder column col-3">
          <span>Transactions</span>
          <q-separator style="height: 4px;width: 20px;border-radius: 2px;" class="bg-primary self-center" />
        </div>
      </div>

      <!-- 明细列表 -->
      <div @click="$router.push('/wallet/detail')" v-for="(item, i) in list" :key="i"
        class="radius-8 bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-color-3 text-weight-bold">{{ item.name }}</div>
            <div class="text-color-6 text-weight-medium text-caption">{{ item.date }}</div>
          </div>
          <div>
            <div
              :class="['text-body1 text-weight-bold text-center', { 'text-red': item.type == 'fail', 'text-primary': item.type == 'examine' }]">
              {{ item.money }}</div>
            <div
              :class="['text-weight-medium text-center text-caption', { 'text-red': item.type == 'fail', 'text-primary': item.type == 'examine' }]">
              {{ item.type }}</div>
          </div>
        </div>
        <div v-if="item.type == 'fail'" class="text-weight-medium text-caption text-red">Failure Reason：This is the reason
          for the
          failure</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { walletList } from './ts/data';
import { imageSrc } from 'src/utils/index';
import { useInitStore } from 'src/stores/init';

export default {
  name: 'walletIndex',
  setup(props: any, context: any) {
    const $initStore = useInitStore()

    const state = reactive({
      list: walletList,

      // 点击显示、隐藏金额
      moneyShow: false,

      // 快捷菜单
      quickMenuList: [] as any,
    });

    context.emit('update', {
      title: 'MyWallet',
      rightBtn: {
        icon: '',
        callback: () => {
          return;
        },
      },
    })



    state.quickMenuList = $initStore.quickMenu;

    return {
      imageSrc,
      ...toRefs(state),
    }
  }
};
</script>
