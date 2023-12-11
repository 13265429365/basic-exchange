<template>
  <div class="column full-width" style="min-height: 100vh;">
    <navBar title="BTC">
      <template v-slot:right>
        <div>
          <q-img src="/images/default/walletList.png" width="22px" height="22px" />
        </div>
      </template>
    </navBar>
    <div class="col page_bg q-pa-md full-width">
      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between radius-8">
        <div class="column justify-center">
          <div class="row">
            <div class="text-white text-weight-bold">BTC</div>
            <q-img @click="moneyShow = !moneyShow" src="/images/default/eyes.png" class="q-ml-sm" width="18px" height="18px" />
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div v-if="moneyShow" class="text-white row items-center">
            <span class="q-mr-sm text-weight-bold" style="font-size: 22px;">862.76</span>
            <span>≈￥69865,21 </span>
          </div>
          <div v-else class="text-white text-weight-bold " style="font-size: 22px;">**** </div>
        </div>
        <q-img src="/images/default/btc.png" class="self-center" width="50px" height="50px" />

      </div>

      <div class="row q-col-gutter-md q-mt-sm">
        <div class="col-6">
          <div class="bg-white radius-8 row q-pa-sm row" style="height: 60px;">
            <q-img src="/images/default/recharge.png" class="self-center q-mx-sm" width="42px" height="42px" />
            <div class="text-color-3 text-weight-bold self-center ellipsis col">
              Recharge</div>
          </div>
        </div>
        <div class="col-6">
          <div class="bg-white radius-8 row q-pa-sm row" style="height: 60px;">
            <q-img src="/images/default/cashOut.png" class="self-center q-mx-sm" width="42px" height="42px" />
            <div class="text-color-3 text-weight-bold self-center ellipsis col">
              Cash Out</div>
          </div>
        </div>
      </div>

      <div class="q-py-md row">
        <div class="text-color-3 text-subtitle1 text-weight-bolder column col-3">
          <span>Transactions</span>
          <q-separator style="height: 4px;width: 20px;border-radius: 2px;" class="bg-primary self-center" />
        </div>
      </div>

      <!-- 明细列表 -->
      <div v-for="(item, i) in list" :key="i" class="radius-8 bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-color-3 text-weight-bold">{{item.name}}</div>
            <div class="text-color-6 text-weight-medium text-caption">{{item.date}}</div>
          </div>
          <div>
            <div :class="['text-body1 text-weight-bold text-right', {'text-red':item.type=='fail','text-primary':item.type=='examine'} ]">{{item.money}}</div>
            <div :class="['text-weight-medium text-right text-caption', {'text-red':item.type=='fail','text-primary':item.type=='examine'} ]">{{item.type}}</div>
          </div>
        </div>
        <div v-if="item.type=='fail'" class="text-weight-medium text-caption text-red">Failure Reason：This is the reason for the
          failure</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/layouts/mobile/header.vue';
import { walletList } from './ts/data';
export default {
  name: 'btcIndex',
  components: { navBar },
  setup() {
    const state = reactive({
      list: walletList,
      // 点击显示、隐藏金额
      moneyShow: false,
    });
    return {
      ...toRefs(state)
    }
  }
};
</script>
<style lang="scss" scoped>
  @import url("../../../css/mobileCss.css");
</style>