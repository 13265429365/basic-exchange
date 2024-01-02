<template>
  <div class="column full-height full-width">
    <div class="col q-pa-md full-width column justify-between">
      <div class="text-body2 text-weight-medium q-pb-xs">{{ $t('depositAccount') }}</div>
      <!-- 卡类型选择 -->
      <q-scroll-area style="height: 80px; width: 100%;" :thumb-style="{ display: 'none' }" :visible="false">
        <div class="row no-wrap">
          <div v-for="(payment, paymentIndex) in paymentList" :key="paymentIndex" :style="{
            width: '200px', height: '50px', borderRadius: '8px', background: '#F5F6FA',
            border: paymentIndex == currentPaymentIndex ? '1px solid #01AC66' : '',
          }" class="q-pa-sm row justify-center cursor-pointer relative-position q-mr-sm"
            @click="switchPaymentFunc(payment, paymentIndex)">
            <q-img class="q-mr-sm" :src="imageSrc(payment.icon)" width="32px" height="32px" />
            <div class="self-center">{{ payment.name }}</div>
            <q-img v-if="paymentIndex == currentPaymentIndex" class="absolute" src="/images/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>
      </q-scroll-area>

      <!-- 充值信息 -->
      <div class="column full-width">
        <div class="q-my-sm">
          <div class="q-mb-sm">{{ $t('depositAmount') }}</div>
          <q-input dense type="number" outlined v-model="params.money" />
        </div>

        <!-- 银行名称 -->
        <div class="q-my-sm" v-if="paymentList[currentPaymentIndex]">
          <div class="q-mb-sm">{{ paymentList[currentPaymentIndex].type == 1 ? $t('bankName') : $t('digitalNetwork')
          }}
          </div>
          <q-select dense outlined v-model="currentPaymentInfo" :disable="params.id > 0"
            :options="paymentList[currentPaymentIndex].items" option-value="id" option-label="name">
            <template v-slot:selected>
              <div class="row items-center q-gutter-sm">
                <div>
                  <q-avatar size="md">
                    <q-img no-spinner :src="imageSrc(currentPaymentInfo.icon)"></q-img>
                  </q-avatar>
                </div>
                <div>{{ currentPaymentInfo.name }}</div>
              </div>
            </template>

            <template v-slot:option="scope">
              <q-item clickable v-close-popup @click="currentPaymentInfo = scope.opt">
                <q-item-section>
                  <div class="row items-center q-gutter-sm cursor-pointer">
                    <div>
                      <q-avatar size="md">
                        <q-img no-spinner :src="imageSrc(scope.opt.icon)"></q-img>
                      </q-avatar>
                    </div>
                    <div>{{ scope.opt.name }}</div>
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

        </div>

        <div class="q-my-sm">
          <div class="q-mb-xs">
            {{ $t('depositProof') }}
          </div>
          <div>
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
        </div>

        <div class="q-mt-lg q-mb-md text-grey">
          <div>充值提示：</div>
          <div>1、确认地址, 并且等待主网同步</div>
          <div>2、谨防假冒在线客服充值</div>
        </div>

        <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps @click="deposit"
          size="md" />
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
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
      // 支付类型
      paymentList: [] as any,
      currentPaymentIndex: 0,
      currentPaymentInfo: {} as any,
    });

    context.emit('update', {
      title: t('deposit')
    })

    onMounted(() => {
      walletsPaymentIndexAPI({ modes: [] }).then((res: any) => {
        state.paymentList = res
        if (state.paymentList.length > 0) {
          switchPaymentFunc(state.paymentList[0], 0)
        }
      })
    })

    // 充值
    const deposit = () => {
      state.params.paymentId = state.currentPaymentInfo.id
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

    // 切换支付类型
    const switchPaymentFunc = (paymentInfo: any, paymentIndex: number) => {
      if (state.params.id > 0) {
        return
      }

      if (paymentInfo.items.length > 0) {
        state.currentPaymentInfo = paymentInfo.items[0]
      }
      state.currentPaymentIndex = paymentIndex
    }

    return {
      imageSrc,
      ...toRefs(state),
      switchPaymentFunc,
      deposit,
    }
  }
};
</script>

<style lang="scss" scoped></style>
