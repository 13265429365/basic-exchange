<template>
  <div>
    <div style="padding: 60px 120px;" class="row justify-between">
      <div class="text-h5 text-weight-bolder">{{ $t('flash') }}</div>
      <q-btn @click="$router.push({ name: 'WalletsAssetsIndex' })" unelevated style="background: #EAECEF;">
        <div class="row no-wrap items-center">
          <span>
            {{ $t('flashRecord') }}
          </span>
          <q-icon class="q-ml-xs" size="15px" name="arrow_forward"></q-icon>
        </div>
      </q-btn>
    </div>

    <!--  -->
    <div class="row justify-center q-mt-lg">
      <div class="column">
        <q-card class="relative-position bg-grey-2 rounded-borders" flat style="width: 390px">
          <q-card-section class="q-pa-lg text-grey-7">
            <div class="row items-center justify-between">
              <div>{{ $t('begin') }}</div>
              <div class="row items-center justify-between">
                {{ $t('usable') }}: {{ toAssets.money }} {{ toAssets.name }}
              </div>
            </div>
            <div class="row items-center no-wrap justify-between q-mt-sm">
              <q-input v-model="toAssets.value" borderless class="bg-grey-2 rounded-borders"
                :input-style="{ fontSize: '20px' }" placeholder="请输入金额">
                <template v-slot:append>
                  <span @click="toAssets.value = toAssets.money"
                    class="text-primary text-body2 cursor-pointer q-mr-md">{{ $t('maximum') }}</span>
                </template>
              </q-input>
              <q-btn-dropdown @click="showAssetsPopup = true; assetsPopupType = 'to'" rounded color="black"
                class="bg-white" flat no-caps :menu-offset="[0, 18]">

                <template v-slot:label>
                  <div class="row items-center no-wrap">
                    <q-img width="26px" height="26px" :src="imageSrc(toAssets.icon ?? '')" no-spinner alt="" />
                    <span class="text-weight-bold q-ml-sm">{{ toAssets.name }}</span>
                  </div>
                </template>
              </q-btn-dropdown>
            </div>

          </q-card-section>
        </q-card>
        <div class="row justify-center q-my-lg">
          <q-img src="/images/icons/flash-exchange.png" no-spinner width="40px" height="40px"></q-img>
        </div>
        <q-card class="relative-position bg-grey-2 rounded-borders" flat style="width: 390px">
          <q-card-section class="q-pa-lg  text-grey-7">
            <div class="row items-center justify-between">
              <div>{{ $t('end') }}</div>
            </div>
            <div class="row items-center no-wrap justify-between q-mt-sm">
              <div class="row items-center">
                <div class="text-h6 text-black">{{ toAssets.value * rate }}</div>
              </div>
              <q-btn-dropdown @click="showAssetsPopup = true; assetsPopupType = 'from'" rounded color="black"
                class="bg-white" flat no-caps :menu-offset="[0, 18]">

                <template v-slot:label>
                  <div class="row items-center no-wrap">
                    <q-img width="26px" height="26px" :src="imageSrc(fromAssets.icon ?? '')" no-spinner alt="" />
                    <span class="text-weight-bold q-ml-sm">{{ fromAssets.name }}</span>
                  </div>
                </template>
              </q-btn-dropdown>
            </div>

          </q-card-section>
        </q-card>
        <q-btn @click="preview" rounded unelevated no-caps color="primary" class="q-mt-lg q-py-sm">{{
        $t('previewFlashResult')
      }}</q-btn>
      </div>
    </div>

    <!-- 选择所有币种弹窗 -->
    <q-dialog v-model="showAssetsPopup">
      <q-card class="q-py-md relative-position" style="width: 400px;">
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
    <q-dialog v-model="showPreview">
      <q-card class="q-py-md relative-position" style="width: 400px;">
        <q-card-section class="q-pa-none">
          <div class="text-h6 text-center">{{ $t('confirmRedemption') }}</div>
          <q-btn icon="close" color="grey" class="absolute-bottom-right" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-px-md q-mt-xs q-gutter-y-md">
          <div class="text-center text-grey-7">{{ $t('receive') }}</div>
          <div class="text-center">
            <span class="text-h5 text-weight-medium">{{ toAssets.value * rate }}</span>
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
                <span>1 {{ toAssets.name }} ≈ {{ rate }}</span>
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
  setup() {
    const $router = useRouter()
    const { t } = useI18n()
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
        $router.push({ name: 'WalletsAssetsIndex' })
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
