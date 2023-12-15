<template>
  <div class="column full-height full-width">
    <navBar title="Withdrawal"></navBar>
    <q-separator style="background: #F4F5FD;" />
    <div class="col   q-pa-md full-width column justify-between">
      <div class="col full-width">
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">Withdrawal to</div>
        <!-- 卡类型选择 -->
        <q-scroll-area style="height: 60px; width: 100%;" :visible="false">
          <div class="row no-wrap">
            <div v-for="(typeI, typeIndex) in typeArr" :key="typeIndex" style="width: 185px;height: 50px;"
              :class="`q-pa-sm row page_bg radius-8 q-mr-sm justify-center ${typeIndex == typeDataIndex ? 'select' : ''}`"
              @click="typeDataIndex = typeIndex">
              <q-img class="self-center q-mr-sm" :src="typeI.image" width="32px" height="32px" />
              <div style="font-size: 16px;" class="text-color-3 text-weight-bold self-center">{{ typeI.value }}</div>
            </div>
          </div>
        </q-scroll-area>
        <div>
          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">Withdrawal amount</div>
          <q-input prefix="￥" type="number" standout v-model="money" class="q-mb-sm">
            <template v-slot:append>
              <div @click="money = Total" style="font-size: 14px" class="text-primary">全部提现</div>
            </template>
          </q-input>
          <div class="text-color-6">available balance：￥{{ Total }}</div>
        </div>
      </div>

      <!-- 添加按钮 -->
      <q-btn unelevated rounded color="primary" label="Withdrawal" class="full-width q-my-md" no-caps
        style="height: 44px;" @click="alertPass = true" />
    </div>

    <!-- 安全密码 -->
    <q-dialog v-model="alertPass">
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/layouts/mobile/header.vue';
export default {
  name: 'withdrawalIndex',
  components: { navBar },
  setup() {
    const state = reactive({
      alertPass: false,
      password: '',
      money: '',
      Total: 157,
      typeDataIndex: 0,
      typeArr: [{
        image: '/images/mobile/card/USDT.png',
        value: '农业银行(9632)',
        type: 2
      }, {
        image: '/images/mobile/card/BTC.png',
        value: '建设银行(9232)',
        type: 1
      }, {
        image: '/images/mobile/card/USDT.png',
        value: '农业银行(9631)',
        type: 2
      }, {
        image: '/images/mobile/card/BTC.png',
        value: '建设银行(7232)',
        type: 1
      }],
    });
    // 全部提现
    // const allWithdrawals= () => {
    //   state.
    // }
    const yesFun = (router: any) => {
      state.alertPass = false;
      // 密码正确
      router.push({
        name: 'showMessage',
        state: {
          params: JSON.stringify({
            navTitle: 'withdrawal',
            title: 'Submitted successfully',
            content: 'Please be patient and keep an eye on the progress at any time',
            yesBtn: 'OK',
            logo: '/images/mobile/wait.png',
            backUrl: '/info'
          })
        }
      })
    };

    return {
      ...toRefs(state),
      yesFun,
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("../../../css/mobileCss.css");

.select {
  background-color: rgba(241, 250, 246, 1) !important;
  border: 1px solid $primary;
}

:deep .q-field .q-field__append {
  color: #01AC66 !important;
}

:deep .q-field .q-field__control:hover:before {
  opacity: 0;
}

:deep(.q-scrollarea__thumb) {
  display: none !important;
}</style>
