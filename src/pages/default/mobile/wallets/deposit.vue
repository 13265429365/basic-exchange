<template>
  <div class="column full-height full-width">
    <q-separator style="background: #F4F5FD;" />
    <div class="col   q-pa-md full-width column justify-between">
      <div class="col full-width">
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">{{ $t('depositAccount') }}</div>
        <!-- 卡类型选择 -->
        <q-scroll-area style="height: 80px; width: 100%;" :visible="false">
          <div class="row no-wrap q-mt-md">
            <div v-for="(typeI, typeIndex) in cardType" :key="typeIndex"
              style="width: 185px;height: 50px;border-radius: 9px;"
              :class="`page_bg q-pa-sm row q-mr-md q-mb-md justify-center no-wrap cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
              @click="selectType(typeIndex)">
              <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
              <div class="text-color-3 text-weight-bold self-center">{{ typeI.name }}</div>
              <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/icons/select.png" width="30PX"
                height="30px" style="bottom: 0;right: 0;"></q-img>
            </div>
          </div>
        </q-scroll-area>

        <!-- 数字货币类型 -->
        <div class="page_bg q-pa-md q-mb-md radius-8">
          <div style="border-bottom: 1px dashed #DDDDDD" class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">
            {{ $t('depositAccountInfo') }}</div>
          <div class="q-mt-md row justify-between no-wrap" style="width: 315px;border-radius: 10px;">
            <div class="ellipsis text-weight-medium">
              Mrh Raju
            </div>
            <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('Mrh Raju')">
              copy
            </div>
          </div>
          <div class="q-mt-md row justify-between no-wrap" style="width: 315px;border-radius: 10px;">
            <div class="ellipsis text-weight-medium">
              5254 7634 8734 7690
            </div>
            <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('5254 7634 8734 7690')">
              copy
            </div>
          </div>
          <div class="q-mt-md row justify-between no-wrap" style="width: 315px;border-radius: 10px;">
            <div class="ellipsis text-weight-medium">
              BBC BANK
            </div>
            <div class="text-primary q-ml-md text-weight-bold" @click="copyToClipboardFunc('BBC BANK')">
              copy
            </div>
          </div>
        </div>
        <div>
          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">{{ $t('depositAmount') }}</div>
          <q-input prefix="￥" type="number" standout v-model="form.money" class="q-mb-md" />

          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">{{ $t('bankName') }}</div>
          <div class="row justify-between q-px-md q-py-sm radius-8 q-mb-md" style="background: #f5f6fa;height: 50px;">
            <div class="self-center row">
              <q-img
                :src="imageSrc(cardType[ActiveCardIndex] ? cardType[ActiveCardIndex].items[ActiveBankIndex].icon : '')"
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

          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">{{ $t('depositProof') }}</div>
          <uploader :respValue="form.voucher" @uploaded="uploaded" :listStyle="{
            height: '140px',
          }">
            <template v-slot:noneAdd>
              <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;background-color: #F5F6FA;"
                class="radius-8 column justify-center">
                <q-icon name="add" size="24px" class="self-center"></q-icon>
              </div>
            </template>
          </uploader>
        </div>
        <div class="q-mt-sm q-mb-lg text-color-6">
          <div>充值提示：</div>
          <div>1.确认地址, 并且等待主网同步 </div>
          <div>2.谨防假冒在线客服充值</div>
        </div>
        <q-btn unelevated rounded color="primary" :label="$t('deposit')" class="full-width q-my-md" no-caps
          style="height: 44px;" @click="Deposit" />
      </div>

      <!-- 添加按钮 -->

    </div>

    <!-- 安全密码 -->
    <q-dialog v-model="alertPass">
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { copyToClipboard } from 'quasar';
import { NotifyNegative, NotifyPositive } from 'src/utils/notify';
import { imageSrc } from 'src/utils/index';
import uploader from 'src/components/uploader.vue';
import { userPayment, userDeposit } from 'src/apis/wallets';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: 'depositIndex',
  components: { uploader },
  setup(props: any, context: any) {
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

    context.emit('update', {
      title: t('deposit')
    })

    onMounted(async () => {
      getPayment()
    })

    // 获取支付列表
    const getPayment = () => {
      userPayment({ modes: [1, 2] }).then((res: any) => {
        console.log('支付列表', res.data);
        state.cardType = res.data
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
        console.log('充值成功', res.data);
        $router.push({ name: 'AccountCard' })
      })
    }

    // 切换卡片类型
    const selectType = (typeIndex: any) => {
      state.ActiveCardIndex = typeIndex
      state.ActiveBankIndex = 0
    }

    const uploaded = (url: any) => {
      state.form.voucher = url
      console.log(url);

    }

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
      imageSrc,
      copyToClipboardFunc,
      ...toRefs(state),
      yesFun,
      selectType,
      Deposit,
      uploaded,
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
