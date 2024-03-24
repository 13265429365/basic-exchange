<template>
  <div class="q-pa-md">
    <div class="column">
      <!-- 闪兑资产 -->
      <q-card class="relative-position bg-grey-2 rounded-borders" flat>
        <q-card-section class="text-grey-7 q-py-md q-px-xs">
          <div class="row items-center no-wrap">
            <q-btn @click="showAssetsPopup = true; assetsPopupType = 'to'" class="col-5" flat no-caps rounded>
              <template v-slot:default>
                <div class="row items-center no-wrap">
                  <q-img width="26px" height="26px" :src="imageSrc(toAssets.icon ?? '')" no-spinner alt="" />
                  <span class="text-weight-bold q-ml-sm">{{ toAssets.name }}</span>
                  <q-icon name="arrow_drop_down" class="q-ml-sm"></q-icon>
                </div>
              </template>
            </q-btn>
            <q-separator vertical inset style="background: #bbb;" />
            <q-input v-model="toAssets.value" dense borderless class="q-px-lg">
              <template v-slot:append>
                <span @click="toAssets.value = toAssets.money" class="text-primary text-body1">{{ $t('maximum')
                  }}</span>
              </template>
            </q-input>
          </div>
        </q-card-section>
      </q-card>

      <div class="text-grey-7 q-mt-sm">
        {{ $t('usable') }}: {{ toAssets.money }} {{ toAssets.name }}
      </div>

      <!-- 闪兑后资产 -->
      <q-card class="relative-position bg-grey-2 rounded-borders q-mt-lg" flat>
        <q-card-section class="text-grey-7 q-py-md q-px-xs">
          <div class="row items-center no-wrap">
            <q-btn @click="showAssetsPopup = true; assetsPopupType = 'from'" class="col-5" flat no-caps rounded>
              <template v-slot:default>
                <div class="row items-center no-wrap">
                  <q-img width="26px" height="26px" :src="imageSrc(fromAssets.icon ?? '')" no-spinner alt="" />
                  <span class="text-weight-bold q-ml-sm">{{ fromAssets.name }}</span>
                  <q-icon name="arrow_drop_down" class="q-ml-sm"></q-icon>
                </div>
              </template>
            </q-btn>
            <q-separator vertical inset style="background: #bbb;" />
            <span class="q-px-lg q-py-sm">{{ (toAssets.value * rate).toFixed(6) }}</span>
          </div>
        </q-card-section>
      </q-card>

      <!-- 预览btn -->
      <div class="q-px-md absolute-bottom" style="bottom: 20px;">
        <q-btn @click="preview" rounded unelevated color="primary" class="full-width q-py-sm">{{
              $t('previewFlashResult') }}</q-btn>
      </div>
    </div>


    <!-- 选择所有币种弹窗 -->
    <q-dialog v-model="showAssetsPopup" position="bottom">
      <q-card class="q-py-md relative-position">
        <q-card-section class="q-pa-none">
          <div class="text-h6 text-center">{{ $t('currencies') }}</div>
          <q-btn icon="close" color="grey" class="absolute-bottom-right" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-none q-mt-lg">
          <q-list>
            <q-item
              v-show="allAssets.walletAssetsId != toAssets.walletAssetsId && allAssets.walletAssetsId != fromAssets.walletAssetsId"
              @click="selectAssets(allAssets)" v-for="(allAssets, assetsIndex) in assetsList" :key="assetsIndex"
              clickable v-ripple v-close-popup class="q-py-md">
              <div class="row items-center">
                <q-img :src="imageSrc(allAssets.icon)" width="26px" height="26px" no-spinner alt=""></q-img>
                <div class="q-ml-sm">{{ allAssets.name }}</div>
              </div>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>


    <!-- 预览结果弹窗 -->
    <q-dialog v-model="showPreview" position="bottom">
      <q-card class="q-py-md relative-position">
        <q-card-section class="q-pa-none">
          <div class="text-h6 text-center">{{ $t('confirmRedemption') }}</div>
          <q-btn icon="close" color="grey" class="absolute-bottom-right" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-px-md q-mt-xs q-gutter-y-md">
          <div class="text-center text-grey-7">{{ $t('receive') }}</div>
          <div class="text-center">
            <span class="text-h5 text-weight-medium">{{ (toAssets.value * rate).toFixed(6) }}</span>
            <span class="q-ml-sm text-body1">{{ fromAssets.name }}</span>
          </div>
          <q-card-section class="bg-grey-2">
            <div class="row justify-between">
              <span class="text-grey">{{ $t('flash') }}</span>
              <div class="text-weight-medium">
                <span>{{ toAssets.value }}</span>
                <span class="q-ml-xs">{{ toAssets.name }}</span>
              </div>
            </div>
            <div class="row justify-between q-mt-sm">
              <span class="text-grey">{{ $t('ratio') }}</span>
              <div class="text-weight-medium">
                <span>1 {{ toAssets.name }} ≈ {{ rate.toFixed(6) }}</span>
                <span class="q-ml-xs">{{ fromAssets.name }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card-section>

        <q-card-section class="row q-col-gutter-x-lg q-mt-md">
          <div class="col-6">
            <q-btn @click="preview" rounded flat no-caps class="bg-grey-2 full-width q-py-sm">{{ $t('refresh')
              }}</q-btn>
          </div>
          <div class="col-6">
            <q-btn @click="walletsTransfeCreateFunc" rounded flat no-caps
              class="bg-primary text-white full-width q-py-sm">{{
              $t('confirm') }}</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { walletsAssetsIndexAPI, walletstransferInfoAPI, walletsTransfeCreateAPI } from 'src/apis/wallets'
import { imageSrc } from 'src/utils'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NotifyPositive } from 'src/utils/notify'

export default defineComponent({
  name: 'FlashExchangeIndex',
  setup(props: any, context: any) {
    const $router = useRouter()
    const { t } = useI18n()
    context.emit('update',
      {
        title: t('flashExchange'),
        rightBtn: {
          icon: 'history',
          callback: () => {
            $router.push({ name: 'FlashExchangeRecord', query: { type: 2 } })
          }
        },
      }
    )
    const state = reactive({
      // 资产列表
      assetsList: [] as any,
      showAssetsPopup: false,

      // to：闪兑资产  from：闪兑后的资产
      assetsPopupType: '' as any,

      // 已选择资产
      toAssets: { value: '', money: 0 } as any,
      fromAssets: {} as any,

      // 汇率
      rate: 0 as any,
      showPreview: false,
    })

    onMounted(() => {
      // 获取资产列表
      walletsAssetsIndexAPI().then((res: any) => {
        state.assetsList = res
        Object.assign(state.toAssets, res[0])
        Object.assign(state.fromAssets, res[1])
      })
    })

    // 获取汇率
    const walletsexChangeInfoFunc = () => {
      walletstransferInfoAPI({
        assetsId: state.toAssets.walletAssetsId,
        symbolAssetsId: state.fromAssets.walletAssetsId,
      }).then((res: any) => {
        state.rate = res.rate
        console.log(state.rate);
      })

    }

    // 闪兑
    const walletsTransfeCreateFunc = () => {
      walletsTransfeCreateAPI({
        assetsId: state.toAssets.walletAssetsId,
        symbolAssetsId: state.fromAssets.walletAssetsId,
        money: Number(state.toAssets.value),
        type: 2,
      }).then(() => {
        NotifyPositive(t('submittedSuccess'))
        $router.push({ name: 'FlashExchangeSuccess' })
      })

    }

    // 选择资产
    const selectAssets = (Assets: any) => {
      if (state.assetsPopupType == 'to') {
        Object.assign(state.toAssets, Assets)
      } else {
        Object.assign(state.fromAssets, Assets)
      }
    }

    // 预览
    const preview = () => {
      if (state.fromAssets.walletAssetsId != '' && state.toAssets.walletAssetsId != '' && state.toAssets.value) {
        walletsexChangeInfoFunc()
        state.showPreview = true
      }
    }

    return {
      imageSrc,
      ...toRefs(state),
      selectAssets,
      preview,
      walletsTransfeCreateFunc,
    }
  },
})
</script>


<style lang="scss" scoped></style>
