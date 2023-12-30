<template>
  <div class="column full-height full-width">
    <div class="col q-pa-md full-width column justify-between">
      <div class="text-body2 text-weight-medium q-pb-xs">{{ $t('depositAccount') }}</div>
      <!-- 卡类型选择 -->
      <q-scroll-area style="height: 80px; width: 100%;" :thumb-style="{ display: 'none' }" :visible="false">
        <div class="row no-wrap">
          <div v-for="(typeI, typeIndex) in cardType" :key="typeIndex"
            style="width: 185px;height: 50px;border-radius: 9px"
            :class="`bg-grey-3 q-pa-sm q-mr-md q-mb-md row justify-center no-wrap cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
            @click="selectType(typeIndex)">
            <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
            <div class=" text-weight-bold self-center">{{ typeI.name }}</div>
            <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>
      </q-scroll-area>

      <!-- 数字货币类型 -->
      <div class="page_bg q-pa-md q-mb-md rounded-borders">
        <div style="border-bottom: 1px dashed #DDDDDD" class="text-body2 text-weight-medium q-pb-xs">
          {{ $t('depositAccountInfo') }}</div>
        <div class="q-mt-md row justify-between no-wrap" style="width: 315px;border-radius: 10px;">
          <div class="ellipsis text-weight-medium">
            Mrh Raju
          </div>
          <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('Mrh Raju')">
            {{ $t('copy') }}
          </div>
        </div>
        <div class="q-mt-md row justify-between no-wrap" style="width: 315px;border-radius: 10px;">
          <div class="ellipsis text-weight-medium">
            5254 7634 8734 7690
          </div>
          <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('5254 7634 8734 7690')">
            {{ $t('copy') }}
          </div>
        </div>
        <div class="q-mt-md row justify-between no-wrap" style="width: 315px;border-radius: 10px;">
          <div class="ellipsis text-weight-medium">
            BBC BANK
          </div>
          <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('BBC BANK')">
            {{ $t('copy') }}
          </div>
        </div>
      </div>

      <!-- 充值信息 -->
      <div>
        <div class="text-body2 text-weight-medium q-pb-xs">{{ $t('depositAmount') }}</div>
        <q-input type="number" outlined dense v-model="params.money" class="q-mb-md" />

        <div class=" text-body2 text-weight-medium q-pb-xs">{{ $t('bankName') }}</div>
        <div class="row justify-between q-px-md q-py-sm rounded-borders q-mb-md" style="height: 45px;">
          <div class="self-center row">
            <q-img :src="imageSrc(cardType[ActiveCardIndex] ? cardType[ActiveCardIndex].items[ActiveBankIndex].icon : '')"
              width="26px" height="26px" />
            <div class="self-center q-ml-sm">{{
              cardType[ActiveCardIndex] ? cardType[ActiveCardIndex].items[ActiveBankIndex].name : '' }}</div>
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

        <div class=" text-body2 text-weight-medium q-pb-xs">{{ $t('depositProof') }}</div>
        <uploader @uploaded="(url) => { params.voucher = url }">
          <template v-slot:default>
            <q-uploader-add-trigger />
            <q-card flat>
              <div class="column items-center justify-center" style="height: 150px;border: grey 1px dashed">
                <q-icon name="add" color="grey" size="30px" v-if="params.voucher == ''" />
                <q-img v-else :src="imageSrc(params.voucher)"></q-img>
              </div>
            </q-card>
          </template>
        </uploader>
      </div>

      <div class="q-mt-md q-mb-lg text-grey-7">
        <div>充值提示：</div>
        <div>1.确认地址, 并且等待主网同步 </div>
        <div>2.谨防假冒在线客服充值</div>
      </div>
      <q-btn unelevated rounded color="primary" :label="$t('deposit')" class="full-width q-my-md" no-caps
        style="height: 44px;" @click="Deposit" />

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
  name: 'depositIndex',
  components: { uploader },
  setup(props: any, context: any) {
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

    context.emit('update', {
      title: t('deposit')
    })

    onMounted(() => {
      walletsPaymentIndexAPI({ modes: [1, 2] }).then((res: any) => {
        console.log('支付列表', res);
        state.cardType = res
        // 预设银行类型
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
    })

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
          console.log(t('copy'));
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
</style>
