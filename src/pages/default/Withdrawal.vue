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
          <div class="text-color-6">available balance：￥{{Total}}</div>
        </div>
      </div>

      <!-- 添加按钮 -->
      <q-btn unelevated rounded color="primary" label="Withdrawal" class="full-width q-my-md" no-caps
        style="height: 44px;" @click="alertPass = true" />
    </div>

    <!-- 安全密码 -->
    <q-dialog v-model="alertPass">
      <dialogAlert :isShowCloseBtn="false" title="Security Key" @eventDialogAlert="alertPass = false"
        @eventDialogAlertYesBtn="yesFun($router)">
        <template v-slot:body>
          <div class="q-py-md">
            <q-input type="password" standout placeholder="请输入" v-model="password" :dense="true" class="alertInput"
              style="height: 48px;" />
          </div>
        </template>
      </dialogAlert>
    </q-dialog>
  </div>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  import navBar from 'src/components/navBar.vue';
  import dialogAlert from 'src/components/dialogAlert.vue';
  export default {
    name: 'withdrawalIndex',
    components: { navBar, dialogAlert },
    setup() {
      const state = reactive({
        alertPass: false,
        password: '',
        money: '',
        Total: 157,
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
      const yesFun = (router : any) => {
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
        ...toRefs(state),
        yesFun,
      }
    }
  };
</script>

<style lang="scss" scoped>
  :deep .q-uploader__list {
    padding: 0;
  }

  .cardTransparent {
    background: url('/images/default/cardTransparent.png') no-repeat;
    background-size: 100% 100%;
    height: 125px;
    width: 100%;
    border-radius: 14px;
  }

  .select {
    background-color: rgba(241, 250, 246, 1) !important;
    border: 1px solid $primary;
  }

  :deep(.q-scrollarea__thumb) {
    display: none !important;
  }

  :deep(.q-field__control) {
    background-color: #F5F6FA !important;
    height: 50px;
    box-shadow: none !important;
  }

  :deep(.q-field__marginal) {
    height: 50px;
  }

  :deep(.q-field--labeled .q-field__native) {
    padding: 0;
  }

  :deep(.userInfo-input .q-field__native) {
    text-align: end;
  }

  :deep(.q-field__label) {
    top: 20px;
  }

  :deep(.q-btn) {
    min-height: 44px;
  }

  :deep(.q-field--standout.q-field--rounded .q-field__control) {
    border-radius: 25px;
  }

  :deep(.q-field__control:before) {
    color: #333333 !important;
  }

  :deep(.q-field__native) {
    color: #333333 !important;
    font-weight: 500 !important;
    font-family: PingFangSC-Medium, sans-serif;
    line-height: 20px;
  }

  :deep(.q-field__prepend .q-field--standout .q-field--highlighted) {
    color: #333333 !important;
  }

  :deep(.q-field--focused .q-field--highlighted) {
    color: #333333 !important;
    background-color: #333333 !important;
  }
</style>
