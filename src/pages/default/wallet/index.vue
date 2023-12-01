<template>
  <div class="column full-width" style="min-height: 100vh;">
    <navBar title="My Wallet">
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
            <div class="text-white text-weight-bold">Wallet Balance</div>
            <q-img src="/images/default/eyes.png" class="q-ml-sm" width="18px" height="18px" />
          </div>
          <div class="text-white text-weight-bold " style="font-size: 22px;">$1200.00 </div>
        </div>
        <q-img src="/images/default/wallet.png" class="self-center" width="68px" height="53.83px" />

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
      <div @click="toBillDetail()" v-for="(item, i) in list" :key="i" class="radius-8 bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-color-3 text-weight-bold">{{item.name}}</div>
            <div class="text-color-6 text-weight-medium text-caption">{{item.date}}</div>
          </div>
          <div>
            <div :class="['text-body1 text-weight-bold text-center', {'text-red':item.type=='fail','text-primary':item.type=='examine'} ]">{{item.money}}</div>
            <div :class="['text-weight-medium text-center text-caption', {'text-red':item.type=='fail','text-primary':item.type=='examine'} ]">{{item.type}}</div>
          </div>
        </div>
        <div v-if="item.type=='fail'" class="text-weight-medium text-caption text-red">Failure Reason：This is the reason for the
          failure</div>
      </div>
      <!-- <div class="radius-8 bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-color-3 text-weight-bold">Recharge-BTC</div>
            <div class="text-color-6 text-weight-medium text-caption">2023/10/12 12:20:36</div>
          </div>
          <div>
            <div class="text-body1 text-primary text-weight-bold text-center">+236</div>
            <div class="text-weight-medium text-primary text-center">examine</div>
          </div>
        </div>
      </div>

      <div class="radius-8 bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-color-3 text-weight-bold">Cash Out-BTC</div>
            <div class="text-color-6 text-weight-medium text-caption">2023/10/12 12:20:36</div>
          </div>
          <div>
            <div class="text-body1 text-red text-weight-bold text-center">+236</div>
            <div class="text-weight-medium text-red text-center text-caption">fail</div>
          </div>
        </div>
        <div class="text-weight-medium text-caption text-red">Failure Reason：This is the reason for the
          failure</div>
      </div>

      <div class="radius-8 bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-color-3 text-weight-bold">Cash Out-BTC</div>
            <div class="text-color-6 text-weight-medium text-caption">2023/10/12 12:20:36</div>
          </div>
          <div>
            <div class="text-body1 text-color-3 text-weight-bold text-center">+236</div>
            <div class="text-weight-medium text-color-6 text-center text-caption">success</div>
          </div>
        </div>
      </div>

      <div class="radius-8 bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-color-3 text-weight-bold">Cash Out-BTC</div>
            <div class="text-color-6 text-weight-medium text-caption">2023/10/12 12:20:36</div>
          </div>
          <div>
            <div class="text-body1 text-color-3 text-weight-bold text-center">+236</div>
            <div class="text-weight-medium text-color-6 text-center text-caption">success</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import navBar from 'src/components/navBar.vue';
import { walletList } from '../data';
export default {
  name: 'walletIndex',
  components: { navBar },
  setup() {
    const router = useRouter();
    const state = reactive({
      list: walletList,
    });
    return {
      ...toRefs(state),
      toBillDetail() {
        router.push('/bill/detail')
      },
    }
  }
};
</script>
