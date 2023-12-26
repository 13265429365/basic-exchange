<template>
  <div class="column" style="padding: 48px 244px;background: #F8F9FC;">
    <div class="col column justify-between bg-white rounded-borders">
      <div class="q-py-md q-px-lg row items-center no-wrap size20 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img :src="imageSrc('')" width="40PX" height="40px"></q-img>
        <div class="q-ml-md">{{ $t('deposit') }}</div>
      </div>
      <div class="col full-width q-pa-lg">
        <div class="text-color-3 text-subtitle1 text-weight-medium q-py-sm q-px-md"
          style="border-radius: 2px;background: #F8F9FC;">
          Account Type
        </div>

        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
          <div v-for="(typeI, typeIndex) in cardType" :key="typeIndex"
            style="width: 214px;height: 50px;border-radius: 9px;background: #F8F9FC;"
            :class="`q-pa-sm row q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
            @click="selectType(typeIndex)">
            <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
            <div style="font-size: 16px;" class="text-color-3 text-weight-bold self-center">{{ typeI.name }}</div>
            <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <!-- 银行卡类型 -->
        <!-- <div class="q-mb-xl">
          <div class="text-center text-color-6 text-weight-medium" style="margin: 60px 0 16px 0;">充币地址二维码</div>
          <div class="row justify-center">
            <q-img src="/images/delete/M.png" width="170px" height="170px" />
          </div>

          <div class="row justify-center q-mt-lg">
            <div class="q-py-md q-px-md row justify-between no-wrap"
              style="width: 430px;border-radius: 10px;border: 1px solid #DDDDDD;">
              <div class="ellipsis">
                {{ inviteUrl }}
              </div>
              <div class="text-primary q-ml-md cursor-pointer" @click="copyToClipboardFunc(inviteUrl)">
                copy
              </div>
            </div>
          </div>
        </div> -->

        <!-- 数字货币类型 -->
        <div class="q-pa-md">
          <div style="border-bottom: 1px dashed #DDDDDD">
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
            <div class="text-color-3 text-weight-medium q-mr-xs">{{ $t('depositAmount') }}：</div>
            <q-input suffix="元" type="number" standout v-model="form.money" />
          </div>

          <!-- 银行名称 -->
          <div class="q-mb-md row no-wrap items-center"
            v-if="cardType[ActiveCardIndex] && cardType[ActiveCardIndex].items && cardType[ActiveCardIndex].items.length > 0">
            <div class="text-color-3 text-weight-medium q-mr-xs">{{ $t('bankName') }}：</div>
            <div class="row justify-between q-px-md q-py-sm"
              style="border-radius: 4px;width: 420px;border: 1px solid #DDDDDD;">
              <div class="self-center row">
                <q-img :src="imageSrc(cardType[ActiveCardIndex].items[ActiveBankIndex].icon)" width="26px"
                  height="26px" />
                <div class="self-center q-ml-sm">{{ cardType[ActiveCardIndex].items[ActiveBankIndex].name }}</div>
              </div>
              <q-icon class="self-center" name="expand_more" size="24px"></q-icon>
              <!-- 下拉 -->
              <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 268px" class="q-py-sm">
                  <q-item style="padding: 8px 16px;" @click="ActiveBankIndex = bankTypeIndex"
                    v-for="(bankType, bankTypeIndex) in cardType[ActiveCardIndex].items" :key="bankTypeIndex" clickable
                    class="row no-wrap items-center">
                    <q-img class="q-mr-sm" :src="imageSrc(bankType.icon)" width="38px" height="38px" />
                    <div>
                      <div style="font-size: 16px;">{{ bankType.name }}</div>
                    </div>
                    <q-space />
                    <q-icon v-if="ActiveBankIndex == bankTypeIndex" name="o_check_circle" color="primary"
                      size="20px"></q-icon>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>

          <div class="row no-wrap">
            <div class="text-color-3 text-weight-medium q-mr-xs">
              {{ $t('depositProof') }}：
            </div>
            <div class="q-mb-xl" style="width: 180px;">
              <uploader :respValue="form.voucher" @uploaded="uploaded" :listStyle="{
                height: '160px',
              }">
                <template v-slot:noneAdd>
                  <div style="width: 100%;height: 100%;" class="column justify-center items-center fit">
                    <q-icon name="add" size="29px" />
                  </div>
                </template>
              </uploader>
            </div>
            <!-- <uploader @uploaded="uploaded" :listStyle="{
              height: '120px',
            }">
              <template v-slot:noneAdd>
                <div style="border: 1px dashed #D7D7D7;width: 120px;height: 120px;background-color: #F5F6FA;"
                  class="rounded-borders column justify-center">
                  <q-icon name="add" size="24px" class="self-center"></q-icon>
                </div>
              </template>
            </uploader> -->
          </div>
        </div>
        <div class="q-mt-lg q-mb-md text-color-6">
          <div>充值提示：1、确认地址, 并且等待主网同步 2、谨防假冒在线客服充值</div>
        </div>
        <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps
          style="height: 40px;width: 207px;" @click="Deposit" />
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
                @click="alertPass = !alertPass" />
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { copyToClipboard } from 'quasar';
import { NotifyPositive } from 'src/utils/notify';
import { imageSrc } from 'src/utils/index';
import uploader from 'src/components/uploader.vue';
import { userPayment, userDeposit } from 'src/apis/wallets';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: 'rechargeIndex',
  components: { uploader },
  setup() {
    const { t } = useI18n()
    const $router = useRouter()

    const state = reactive({
      alertPass: false,
      password: '',
      inviteUrl: '09z8we73847zusyd873ezs88d009z8we73847zusyd873ezs88d0',

      form: {} as any,

      // 当前选中的银行key
      ActiveBankIndex: 0,

      // 选中卡片类型
      ActiveCardIndex: 0,

      // 卡片类型
      cardType: [] as any,
    });

    onMounted(async () => {
      getPayment()
    })

    // 获取支付列表
    const getPayment = () => {
      userPayment({ modes: [1, 2] }).then((res: any) => {
        console.log('支付列表', res);
        state.cardType = res
        // 预设
        state.cardType.forEach((cardType: any, cardTypeIndex: any) => {
          if (cardType.name == state.form.name) {
            state.ActiveCardIndex = cardTypeIndex
            cardType.items.forEach((items: any, itemsIndex: any) => {
              if (items.id == state.form.paymentId) {
                state.ActiveBankIndex = itemsIndex
              }
            })
          }
        });
      })
    }

    // 充值
    const Deposit = () => {
      const params = {
        paymentId: state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].id,
        money: Number(state.form.money),
        voucher: state.form.voucher,
      }
      userDeposit(params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        console.log('充值成功', res);
        $router.push({ name: 'AccountCard' })
      })
    }

    // 切换卡片类型
    const selectType = (typeIndex: any) => {
      state.ActiveCardIndex = typeIndex
      state.ActiveBankIndex = 0
    }

    // 复制
    const copyToClipboardFunc = (str: string) => {
      copyToClipboard(str)
        .then(() => { })
        .catch(() => { });
    };

    const uploaded = (url: any) => {
      state.form.voucher = url
      console.log(url);

    }

    return {
      imageSrc,
      copyToClipboardFunc,
      ...toRefs(state),
      selectType,
      Deposit,
      uploaded,
    }
  }
};
</script>

<style lang="scss" scoped>
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

.q-badge {
  width: 6px;
  height: 6px;
  padding: 0;
  min-height: 6px;
  background: #DDDDDD;
}
</style>
