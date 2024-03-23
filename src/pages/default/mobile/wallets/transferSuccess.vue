<template>
  <div class="q-pa-md q-gutter-y-lg">
    <div class="text-center q-mt-xl">
      <q-img width="95px" height="95px" src="/images/icons/success.png" no-spinner alt=""></q-img>
    </div>
    <div class="text-center">{{ $t('flashSuccessful') }}</div>
    <div class="text-center">
      <span class="text-h5 text-weight-medium">{{ flashDetails.nums }}</span>
      <span class="q-ml-sm text-body1">{{ flashDetails.symbolAssetsName }}</span>
    </div>


    <q-card flat class="q-py-none">
      <q-card-section class="bg-grey-2">
        <div class="row justify-between">
          <span class="text-grey">{{ $t('flash') }}</span>
          <div class="text-weight-medium">
            <span>{{ flashDetails.money }}</span>
            <span class="q-ml-xs">{{ flashDetails.assetsName }}</span>
          </div>
        </div>
        <div class="row justify-between q-mt-sm">
          <span class="text-grey">{{ $t('ratio') }}</span>
          <div class="text-weight-medium">
            <span>1 {{ flashDetails.assetsName }} ≈ {{ flashDetails.nums / flashDetails.money }}</span>
            <span class="q-ml-xs">{{ flashDetails.symbolAssetsName }}</span>
          </div>
        </div>
      </q-card-section>
    </q-card>


    <div class="row q-col-gutter-x-lg q-px-md absolute-bottom" style="bottom: 20px;">
      <div class="col-6">
        <q-btn rounded flat no-caps class="bg-grey-3 full-width q-py-sm">{{ $t('返回') }}</q-btn>
      </div>
      <div class="col-6">
        <q-btn @click="$router.push({ name: 'FlashExchangeRecord', query: { type: 2 } })" rounded flat no-caps
          class="bg-primary text-white full-width q-py-sm">{{ $t('flashExchangeHistor') }}</q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { walletsTransfeIndexAPI } from 'src/apis/wallets'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FlashExchangeSuccess',
  setup(props: any, context: any) {
    const { t } = useI18n()
    context.emit('update',
      {
        title: t('flashExchange'),
        rightBtn: { icon: '' },
      }
    )
    const state = reactive({
      flashDetails: {} as any,

      params: {
        pagination: {
          sortBy: 'id',
          descending: true,
          page: 1,
          rowsPerPage: 20,
        },
        dateTime: {
          from: '',
          to: ''
        },
        type: 2,
      } as any
    })

    onMounted(() => {
      // 获取划转列表
      walletsTransfeIndexAPI(state.params).then((res: any) => {
        if (res.items.length <= 0) {
          return false
        }
        state.flashDetails = res.items[0]
        console.log(state.flashDetails);
      })
    })


    return {
      ...toRefs(state),
    }
  },
})
</script>
