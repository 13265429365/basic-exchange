<template>
  <div class="column page_bg" style="padding: 48px 244px;">
    <div class="col column justify-between bg-white radius-8">
      <div class="q-py-md q-px-lg row items-center no-wrap text-h5 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img src="/images/pc/recharge/recharge.png" width="40PX" height="40px"></q-img>
        <div class="q-ml-md">Recharge</div>
      </div>
      <div class="col full-width q-pa-lg">
        <div class="text-color-3 text-subtitle1 text-weight-medium page_bg q-py-sm q-px-md" style="border-radius: 2px;">
          Account Type
        </div>
        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
          <div v-for="(typeI, typeIndex) in typeArr" :key="typeIndex"
            style="width: 214px;height: 50px;border-radius: 9px;"
            :class="`q-pa-sm row page_bg q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == typeDataIndex ? 'select' : ''}`"
            @click="typeDataIndex = typeIndex">
            <q-img class="self-center q-mr-sm" :src="typeI.image" width="32px" height="32px" />
            <div style="font-size: 16px;" class="text-color-3 text-weight-bold self-center">{{ typeI.value }}</div>
            <q-img v-if="typeIndex == typeDataIndex" class="absolute" src="/images/pc/recharge/select.png"
              width="30PX" height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>
        <!-- 银行卡类型 -->
        <div class="q-mb-xl" v-if="typeArr[typeDataIndex].type == 1">
          <div class="text-center text-color-6 text-weight-medium" style="margin: 60px 0 16px 0;">充币地址二维码</div>
          <div class="row justify-center">
            <q-img src="/images/delete/M.png" width="170px" height="170px" />
          </div>

          <div class="row justify-center q-mt-lg">
            <div class="q-py-md q-px-md row justify-between no-wrap"
              style="width: 430px;border-radius: 10px;border: 1px solid #DDDDDD;">
              <div class="ellipsis">
                {{inviteUrl}}
              </div>
              <div class="text-primary q-ml-md cursor-pointer" @click="copyToClipboardFunc(inviteUrl)">
                copy
              </div>
            </div>
          </div>
        </div>
        <!-- 数字货币类型 -->
        <div v-else class="q-pa-md">
          <div style="border-bottom: 1px dashed #DDDDDD">
            <!-- 扩展项 Recharge Information -->
            <q-list>
              <q-expansion-item expand-separator label="Recharge Information">
                <q-card>
                  <q-card-section class="q-pa-none">
                    <div class="q-mt-md row justify-between no-wrap">
                      <div class="row no-wrap items-center">
                        <q-badge rounded class="q-mr-sm" />
                        <div class="ellipsis text-color-6">
                          Mrh Raju
                        </div>
                      </div>
                      <div class="text-primary q-ml-md cursor-pointer" @click="copyToClipboardFunc('Mrh Raju')">
                        copy
                      </div>
                    </div>
                    <div class="q-mt-md row justify-between no-wrap">
                      <div class="row no-wrap items-center">
                        <q-badge rounded class="q-mr-sm" />
                        <div class="ellipsis text-color-6">
                          5254 7634 8734 7690
                        </div>
                      </div>
                      <div class="text-primary q-ml-md cursor-pointer"
                        @click="copyToClipboardFunc('5254 7634 8734 7690')">
                        copy
                      </div>
                    </div>
                    <div class="q-mt-md q-mb-md row justify-between no-wrap">
                      <div class="row no-wrap items-center">
                        <q-badge rounded class="q-mr-sm" />
                        <div class="ellipsis text-color-6">
                          BBC BANK
                        </div>
                      </div>
                      <div class="text-primary q-ml-md cursor-pointer" @click="copyToClipboardFunc('BBC BANK')">
                        copy
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
        <!-- 充值金额、充值凭证 -->
        <div class="q-mt-lg">
          <div class="row no-wrap items-center q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mr-xs">充值金额：</div>
            <q-input suffix="元" type="number" standout v-model="text" />
          </div>
          <div class="row no-wrap">
            <div class="text-color-3 text-weight-medium q-mr-xs">
              充值凭证：
            </div>
            <uploader :value="imgUrl" :listStyle="{
              height: '120px',
            }">
              <template v-slot:noneAdd>
                <div style="border: 1px dashed #D7D7D7;width: 120px;height: 120px;background-color: #F5F6FA;"
                  class="radius-8 column justify-center">
                  <q-img src="/images/default/add.png" width="24px" height="24px" class="self-center" />
                </div>
              </template>
            </uploader>
          </div>
        </div>
        <div class="q-mt-lg q-mb-md text-color-6">
          <div>充值提示：1、确认地址, 并且等待主网同步 2、谨防假冒在线客服充值</div>
        </div>
        <q-btn unelevated rounded color="primary" label="Submit" class="q-my-md" no-caps
          style="height: 40px;width: 207px;" @click="alertPass = true" />
      </div>

      <!-- 添加按钮 -->
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
                @click="alertPass=!alertPass" />
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  import { copyToClipboard } from 'quasar';
  // import { NotifyNegative, NotifyPositive } from 'src/utils';
  import uploader from 'src/components/mobile/uploader.vue';
  export default {
    name: 'rechargeIndex',
    components: { uploader },
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
      const copyToClipboardFunc = (str : string) => {
        copyToClipboard(str)
          .then(() => {
            // NotifyPositive('复制成功！');
          })
          .catch(() => {
            // NotifyNegative('复制失败！');
          });
      };

      const yesFun = (router : any) => {
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
  @import url("../../../css/pcCss.css");
  :deep .q-item {
    padding: 8px 0;
    font-size: 16px;
    font-weight: bold;
  }
  .select {
    background-color: rgba(241, 250, 246, 1) !important;
    border: 1px solid $primary;
  }

  :deep(.q-scrollarea__thumb) {
    display: none !important;
  }
  // pc版input样式
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
  .q-badge {
    width: 6px;
    height: 6px;
    padding: 0;
    min-height: 6px;
    background: #DDDDDD;
  }
</style>
