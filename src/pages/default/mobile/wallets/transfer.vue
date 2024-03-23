<template>
  <div class="q-pa-md">
    <div class="column">
      <!-- 资金账户、交易账户 -->
      <q-card class="relative-position bg-grey-2 rounded-borders" flat>
        <q-img src="/images/icons/shandui.png" no-spinner width="40px" height="40px" class="absolute cursor-pointer"
          @click="reverse()" style="top: 50%; right: 22px; transform: translateY(-50%);z-index: 500;"></q-img>
        <q-card-section class="row items-center text-body1 q-pa-lg" v-for="(account, accountIndex) in tradeStatus"
          :key="accountIndex">
          <div class="text-accent">
            {{ accountIndex == 0 ? $t('begin') : $t('end') }}
          </div>
          <div class="q-ml-md">
            {{ $t(account) }}
          </div>
        </q-card-section>
      </q-card>

      <!-- 选择交易账户 -->
      <q-card class="q-mt-md relative-position bg-grey-2 rounded-borders" flat>
        <q-card-section class="row items-center text-body1">
          <q-btn :disable="tradeStatus[0] == 'fundAccount'" @click="showAssets = true" dense flat no-caps>
            <template v-slot:default>
              <div class="row items-center no-wrap">
                <q-img width="26px" height="26px" :src="imageSrc(assetsDetails.icon ?? '')" no-spinner alt="" />
                <span class="text-weight-bold q-ml-sm">{{ assetsDetails.name }}</span>
                <q-icon name="arrow_drop_down" class="q-ml-sm"></q-icon>
              </div>
            </template>
          </q-btn>
        </q-card-section>
      </q-card>
      <div v-if="tradeStatus[0] == 'fundAccount'" class="text-negative q-mt-sm q-ml-sm">
        {{ $t('notAssets') }}
      </div>

      <!-- 输入金额 -->
      <div class="q-mt-lg q-gutter-y-sm">
        <div class="text-grey">{{ $t('price') }}</div>
        <q-input v-model="params.money" borderless class="bg-grey-2 rounded-borders  text-body1"
          :input-style="{ padding: '10px 20px' }">
          <template v-slot:append>
            <div class="text-body2 q-pr-lg text-black">
              <span
                @click="tradeStatus[0] == 'fundAccount' ? params.money = userInfo.money : params.money = assetsDetails.money"
                class="text-primary cursor-pointer q-ml-md">{{ $t('maximum') }}</span>
            </div>
          </template>
        </q-input>
        <div class="row justify-between">
          <span class="text-accent">
            {{ tradeStatus[0] == 'fundAccount' ? $t('availableBalance') : $t('availableAsset') }}
          </span>
          <div>
            <span>{{ tradeStatus[0] == 'fundAccount' ? userInfo.money : assetsDetails.money }}</span>
            <span class="q-ml-xs">{{ tradeStatus[0] == 'fundAccount' ? $t('currency') : assetsDetails.name }}</span>
          </div>
        </div>
      </div>

      <div class="absolute-bottom q-px-md" style="bottom: 20px;">
        <q-btn @click="walletsTransfeCreateFunc" rounded unelevated color="primary" class="full-width q-py-sm">{{
            $t('confirm')
          }}</q-btn>
      </div>
    </div>

    <!-- 选择所有币种弹窗 -->
    <q-dialog v-model="showAssets">
      <q-card class="q-py-md relative-position" style="width: 400px;">
        <q-card-section class="q-pa-none">
          <div class="text-h6 text-center">{{ $t('currencies') }}</div>
          <q-btn icon="close" color="grey" class="absolute-bottom-right" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-none q-mt-lg">
          <q-list>
            <q-item @click="assetsDetails = assets" v-for="(assets, assetsIndex) in assetsList" :key="assetsIndex"
              clickable v-ripple v-close-popup class="q-py-md">
              <div class="row items-center">
                <q-img :src="imageSrc(assets.icon)" width="26px" height="26px" no-spinner alt=""></q-img>
                <div class="q-ml-sm">{{ assets.name }}</div>
              </div>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { walletsAssetsIndexAPI, walletsTransfeCreateAPI } from 'src/apis/wallets'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { UserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { imageSrc } from 'src/utils';
import { NotifyPositive } from 'src/utils/notify';


export default defineComponent({
  name: 'TransferIndex',
  setup(props: any, context: any) {
    const $userStore = UserStore()
    const { t } = useI18n()
    const $router = useRouter()
    context.emit('update',
      {
        title: t('transfer'),
        rightBtn: {
          icon: 'history',
          callback: () => {
            $router.push({ name: 'FlashExchangeRecord', query: { type: 1 } })
          }
        },
      }
    )
    const state = reactive({
      // 资产
      assetsList: [] as any,
      assetsDetails: {} as any,
      showAssets: false,

      //
      tradeStatus: ['fundAccount', 'tradingAccount'],
      userInfo: {} as any,
      params: {
        assetsId: '',
        symbolAssetsId: '',
        money: '',
        type: 1,
      } as any,
    })

    onMounted(() => {
      state.userInfo = $userStore.userInfo

      // 获取资产列表
      walletsAssetsIndexAPI().then((res: any) => {
        state.assetsList = res
        state.assetsDetails = res[0]
      })
    })

    // 划转
    const walletsTransfeCreateFunc = () => {
      if (state.tradeStatus[0] == 'fundAccount') {
        state.params.assetsId = 0
        state.params.symbolAssetsId = state.assetsDetails.walletAssetsId
      } else {
        state.params.assetsId = state.assetsDetails.walletAssetsId
        state.params.symbolAssetsId = 0
      }
      state.params.money = parseFloat(state.params.money)
      walletsTransfeCreateAPI(state.params).then(() => {
        NotifyPositive(t('submittedSuccess'))
        $router.push({ name: 'WalletsAssetsIndex' })
      })

    }

    // 反转划转顺序
    const reverse = () => {
      state.tradeStatus.reverse()
    }

    return {
      imageSrc,
      ...toRefs(state),
      walletsTransfeCreateFunc,
      reverse,
    }
  },
})
</script>


<style lang="scss" scoped></style>
