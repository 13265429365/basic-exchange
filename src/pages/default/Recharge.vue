<template>
  <div class="column full-height full-width">
    <navBar title="Recharge"></navBar>
    <q-separator style="background: #F4F5FD;" />
    <div class="col   q-pa-md full-width column justify-between">
      <div class="col full-width">
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">Recharge Method</div>
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
        <!-- 银行卡类型 -->
        <div class="q-mb-lg" v-if="typeArr[typeDataIndex].type == 1">
          <div class="text-center text-color-6 text-weight-medium" style="margin: 20px 0 10px 0;">充币地址二维码</div>
          <div class="row justify-center">
            <q-img src="/images/delete/M.png" width="170px" height="170px" />
          </div>

          <div class="row justify-center q-mt-sm">
            <div class="q-py-xs q-px-md row justify-between no-wrap"
              style="background-color: #F9F9F9;width: 315px;border-radius: 10px;">
              <div class="ellipsis">
                {{inviteUrl}}
              </div>
              <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc(inviteUrl)">
                copy
              </div>
            </div>
          </div>
        </div>
        <!-- 数字货币类型 -->
        <div v-else class="page_bg q-pa-md q-mb-md radius-8">
          <div style="border-bottom: 1px dashed #DDDDDD" class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">Recharge Information</div>
          <div class="q-mt-md row justify-between no-wrap"
            style="width: 315px;border-radius: 10px;">
            <div class="ellipsis text-weight-medium">
              Mrh Raju
            </div>
            <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('Mrh Raju')">
              copy
            </div>
          </div>
          <div class="q-mt-md row justify-between no-wrap"
            style="width: 315px;border-radius: 10px;">
            <div class="ellipsis text-weight-medium">
              5254 7634 8734 7690
            </div>
            <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('5254 7634 8734 7690')">
              copy
            </div>
          </div>
          <div class="q-mt-md row justify-between no-wrap"
            style="width: 315px;border-radius: 10px;">
            <div class="ellipsis text-weight-medium">
              BBC BANK
            </div>
            <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('BBC BANK')">
              copy
            </div>
          </div>
        </div>
        <div>
          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">Recharge Amount</div>
          <q-input prefix="￥" type="number" standout v-model="text" class="q-mb-md" />
          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">Recharge Voucher</div>
          <uploader :value="imgUrl" :listStyle="{
            height: '140px',
          }">
            <template v-slot:noneAdd>
              <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;background-color: #F5F6FA;"
                class="radius-8 column justify-center">
                <q-img src="/images/default/add.png" width="24px" height="24px" class="self-center" />
              </div>
            </template>
          </uploader>
        </div>
        <div class="q-mt-sm q-mb-lg text-color-6">
          <div>充值提示：</div>
          <div>1.确认地址, 并且等待主网同步 </div>
          <div>2.谨防假冒在线客服充值</div>
        </div>
        <q-btn unelevated rounded color="primary" label="Add Money" class="full-width q-my-md" no-caps style="height: 44px;"
          @click="alertPass = true" />
      </div>

      <!-- 添加按钮 -->

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
import navBar from 'src/components/mobile/navBar.vue';
import dialogAlert from 'src/components/mobile/dialogAlert.vue';
import { copyToClipboard } from 'quasar';
import { NotifyNegative, NotifyPositive } from 'src/utils';
import uploader from 'src/components/mobile/uploader.vue';
export default {
  name: 'rechargeIndex',
  components: { navBar, dialogAlert, uploader },
  setup() {
    const state = reactive({
      alertPass: false,
      password: '',
      text: '',
      model: 0,
      typeDataIndex: 0,
      imgUrl: '',
      inviteUrl: '09z8we73847zusyd873ezs88d009z8we73847zusyd873ezs88d0',
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
    // 复制
    const copyToClipboardFunc = (str: string) => {
      copyToClipboard(str)
        .then(() => {
          NotifyPositive('复制成功！');
        })
        .catch(() => {
          NotifyNegative('复制失败！');
        });
    };

    const yesFun = (router: any) => {
      state.alertPass = false;
      // 密码正确
      router.push({
        name: 'showMessage',
        state: {
          params: JSON.stringify({
            title: 'Created Successfully',
            content: '',
            yesBtn: 'OK',
            logo: '/images/default/success.png',
            backUrl: ''
          })
        }
      })
    };

    return {
      ...toRefs(state),
      yesFun,
      copyToClipboardFunc,
    }
  }
};
</script>

<style lang="scss" scoped>
  :deep .q-uploader__list {
    padding: 0;
  }

.select {
  background-color: rgba(241, 250, 246, 1) !important;
  border: 1px solid $primary;
}
:deep(.q-scrollarea__thumb) {
  display: none !important;
}
</style>
