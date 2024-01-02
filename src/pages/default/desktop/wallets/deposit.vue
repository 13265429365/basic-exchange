<template>
  <div class="column" style="padding: 48px 244px;background: #F8F9FC;">
    <div class="col column justify-between bg-white rounded-borders">
      <div class="q-py-md q-px-lg row items-center no-wrap size20 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img :src="imageSrc('')" width="40PX" height="40px"></q-img>
        <div class="q-ml-md">{{ $t('deposit') }}</div>
      </div>
      <div class="col full-width q-pa-lg">
        <div class=" text-subtitle1 text-weight-medium q-py-sm q-px-md" style="border-radius: 2px;background: #F8F9FC;">
          {{ $t('depositAccount') }}
        </div>

        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
          <div v-for="(typeI, typeIndex) in cardType" :key="typeIndex"
            style="width: 214px;height: 50px;border-radius: 9px;background: #F8F9FC;"
            :class="`q-pa-sm row q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
            @click="selectType(typeIndex)">
            <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
            <div style="font-size: 16px;" class=" text-weight-bold self-center">{{ typeI.name }}</div>
            <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <!-- 数字货币类型 -->
        <div class="q-pa-md">
          <div style="border-bottom: 1px dashed #DDDDDD">
            <q-list>
              <q-expansion-item expand-separator :label="$t('depositAccountInfo')" class="text-body2">
                <q-card>
                  <q-card-section class="q-pa-none">
                    <div class="q-mt-md row justify-between no-wrap">
                      <div class="row no-wrap items-center">
                        <q-badge rounded class="q-mr-sm" />
                        <div class="ellipsis ">

                        </div>
                      </div>
                      <div class="text-primary q-ml-md cursor-pointer"
                        @click="copyToClipboardFunc(cardType[ActiveCardIndex].name ?? '')">
                        {{ $t('copy') }}
                      </div>
                    </div>
                    <div class="q-mt-md row justify-between no-wrap">
                      <div class="row no-wrap items-center">
                        <q-badge rounded class="q-mr-sm" />
                        <div class="ellipsis ">

                        </div>
                      </div>
                      <div class="text-primary q-ml-md cursor-pointer"
                        @click="copyToClipboardFunc(cardType[ActiveCardIndex].mode ?? '')">
                        {{ $t('copy') }}
                      </div>
                    </div>
                    <div class="q-mt-md q-mb-md row justify-between no-wrap">
                      <div class="row no-wrap items-center">
                        <q-badge rounded class="q-mr-sm" />
                        <div class="ellipsis ">

                        </div>
                      </div>
                      <div class="text-primary q-ml-md cursor-pointer"
                        @click="copyToClipboardFunc(cardType[ActiveCardIndex].type ?? '')">
                        {{ $t('copy') }}
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>

        <!-- 充值金额、充值凭证 -->
        <div class="q-mt-lg q-gutter-lg" style="width: 40%;">
          <div class="row no-wrap items-center">
            <div class=" text-weight-medium q-mr-xs">{{ $t('depositAmount') }}：</div>
            <q-input type="number" class="col-8" dense outlined v-model="params.money" />
          </div>

          <!-- 银行名称 -->
          <div class="row no-wrap items-center"
            v-if="cardType[ActiveCardIndex] && cardType[ActiveCardIndex].items && cardType[ActiveCardIndex].items.length > 0">
            <div class=" text-weight-medium q-mr-xs">{{ $t('bankName') }}：</div>
            <div class="row col-8 justify-between q-px-md q-py-sm rounded-borders" style="border: 1px solid #DDDDDD;">
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
            <div class=" text-weight-medium q-mr-xs">
              {{ $t('depositProof') }}：
            </div>
            <div class="q-mb-xl" style="width: 180px;">
              <uploader @uploaded="(url) => { params.voucher = url }">
                <template v-slot:default>
                  <q-uploader-add-trigger />
                  <q-card flat>
                    <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                      <q-icon name="add" color="grey" size="40px" v-if="params.voucher == ''" />
                      <q-img v-else :src="imageSrc(params.voucher)"></q-img>
                    </div>
                  </q-card>
                </template>
              </uploader>
            </div>
          </div>
        </div>

        <div class="q-mt-lg q-mb-md ">
          <div>充值提示：1、确认地址, 并且等待主网同步 2、谨防假冒在线客服充值</div>
        </div>

        <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps
          style="height: 40px;width: 207px;" @click="Deposit" />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { copyToClipboard } from 'quasar';
import { NotifyPositive } from 'src/utils/notify';
import { imageSrc } from 'src/utils/index';
import uploader from 'src/components/uploader.vue';
import { walletsPaymentIndexAPI, walletsDepositCreateAPI } from 'src/apis/wallets';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { InitStore } from 'src/stores/init';

export default {
  name: 'rechargeIndex',
  components: { uploader },
  setup() {
    const { t } = useI18n()
    const $router = useRouter()
    const $initStore = InitStore()

    const state = reactive({
      params: {
        voucher: '',
      } as any,

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
      walletsPaymentIndexAPI({ modes: [1, 2] }).then((res: any) => {
        console.log('支付列表', res);
        state.cardType = res
        // 预设
        state.cardType.forEach((cardType: any, cardTypeIndex: any) => {
          if (cardType.name == state.params.name) {
            state.ActiveCardIndex = cardTypeIndex
            cardType.items.forEach((items: any, itemsIndex: any) => {
              if (items.id == state.params.paymentId) {
                state.ActiveBankIndex = itemsIndex
              }
            })
          }
        });
      })
    }

    // 充值
    const Deposit = () => {
      state.params.paymentId = state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].id
      state.params.money = Number(state.params.money)

      walletsDepositCreateAPI(state.params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        console.log('充值成功', res);

        // 提现后是否跳转客服页面
        if ($initStore.config.settings.online.depositLink) {
          $router.push({ name: 'WalletsAccountIndex' })
        } else {
          $router.push({ name: 'WalletsAccountIndex' })
        }
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
        .then(() => {
          console.log('复制成功')
        })
    };

    return {
      imageSrc,
      copyToClipboardFunc,
      ...toRefs(state),
      selectType,
      Deposit,
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  background-color: rgba(241, 250, 246, 1) !important;
  border: 1px solid $primary;
}

.q-badge {
  width: 6px;
  height: 3px;
  padding: 0;
  min-height: 6px;
  background: #DDDDDD;
}
</style>
