<template>
  <div class="column page_bg" style="padding: 48px 244px;">
    <div class="col column justify-between bg-white radius-8">

      <!-- 大标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap size20 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img :src="imageSrc('')" width="40PX" height="40px"></q-img>
        <div class="q-ml-md">Withdrawal</div>
      </div>

      <!--  -->
      <div class="col full-width q-pa-lg">
        <div class="text-color-3 text-subtitle1 text-weight-medium page_bg q-py-sm q-px-md" style="border-radius: 2px;">
          Withdrawal account
        </div>

        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
          <div v-for="(typeI, typeIndex) in typeArr" :key="typeIndex"
            style="width: 214px;height: 50px;border-radius: 9px;"
            :class="`q-pa-sm row page_bg q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == typeDataIndex ? 'select' : ''}`"
            @click="typeDataIndex = typeIndex">
            <q-img class="self-center q-mr-sm" :src="imageSrc('')" width="32px" height="32px" />
            <div style="font-size: 16px;" class="text-color-3 text-weight-bold self-center">{{ typeI.value }}</div>
            <q-img v-if="typeIndex == typeDataIndex" class="absolute" :src="imageSrc('')" width="30PX" height="30px"
              style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <!-- 提现 -->
        <div class="q-mt-lg">
          <div class="row no-wrap items-center q-mb-md">
            <div class="text-weight-medium q-mr-xs">
              可用余额：
            </div>
            <div class="text-weight-medium size16" style="color: #F45E0C;">￥{{ Total }}</div>
          </div>
          <div class="row no-wrap items-center q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mr-xs">充值金额：</div>
            <q-input suffix="元" type="number" standout v-model="text" />
            <div @click="text = Total" class="text-primary q-ml-sm cursor-pointer">全部提现</div>
          </div>

        </div>
        <!-- 添加按钮 -->
        <q-btn unelevated rounded color="primary" label="Submit" class="q-my-md" no-caps
          style="height: 40px;width: 207px;" @click="alertPass = true" />
      </div>


    </div>

    <!-- 成功-->
    <q-dialog v-model="alertPass">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <div class="bg-white q-pt-sm q-pa-xl  justify-between" style="width:475px">
          <div class="row justify-center">
            <q-img src="/images/pc/recharge/success.png" width="120px" height="120px" />

          </div>
          <div class="row justify-center">
            <div class="text-color-3 text-h6 text-weight-medium q-mt-md">Submitted successfully</div>
          </div>
          <div class="text-color-9 text-body2 text-center q-mt-sm">
            Please be patient and keep an eye on the progress at any time
          </div>
          <div class="row justify-center">
            <q-btn unelevated rounded color="primary" label="OK" style="width: 260px;" class="q-mt-xl" no-caps
              @click="alertPass = !alertPass" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { NotifyNegative, NotifyPositive } from 'src/utils/notify';
import { imageSrc } from 'src/utils/index';

export default {
  name: 'withdrawalIndex',
  setup() {
    const state = reactive({
      alertPass: false,
      text: '' as any,
      password: '',
      money: '',
      Total: 2693.23,
      typeDataIndex: 0,
      typeArr: [{
        image: '/images/delete/USDT.png',
        value: '农业银行(9632)',
        type: 2
      }, {
        image: '/images/delete/BTC.png',
        value: '建设银行(9232)',
        type: 1
      }, {
        image: '/images/delete/USDT.png',
        value: '农业银行(9631)',
        type: 2
      }, {
        image: '/images/delete/BTC.png',
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
            logo: '/images/default/wait.png',
            backUrl: '/info'
          })
        }
      })
    };

    return {
      imageSrc,
      ...toRefs(state),
      yesFun,
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  background-color: rgba(241, 250, 246, 1) !important;
  border: 1px solid $primary;
}

// pc版input样式
:deep .q-field--standout .q-field__native {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep .q-field--standout .q-field__suffix {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep .q-field--standout .q-field__control {
  width: 230px;
  background: #fff !important;
  height: 40px !important;
  min-height: 40px !important;
  outline: none !important;
  border: 1px solid #DDDDDD;
  box-shadow: none !important;
  border-radius: 4px;
}
</style>
