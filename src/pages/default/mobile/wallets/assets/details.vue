<template>
  <div class="column full-width" style="min-height: 100vh;">
    <div class="col page_bg q-pa-md full-width">

      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between rounded-borders q-mb-md">
        <div class="column justify-center text-white">
          <div class="row items-center">
            <div class="text-white text-body2 q-mr-xs">{{ userAssetsInfo.name }}</div>
            <q-icon @click="showMoney = !showMoney" class="cursor-pointer" color="white" size="16px"
              :name="showMoney ? 'o_visibility' : 'o_visibility_off'"></q-icon>
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div class="text-h6 text-white text-weight-bold">
            <div v-if="showMoney" class="row no-wrap items-center">
              <div>{{ $t('currency') }}{{ Number(userAssetsInfo.money).toFixed(2) }}</div>
              <div class="text-caption q-ml-xs">≈{{ $t('currency') }}{{ Number(userAssetsInfo.moneyRate).toFixed(2) }}
              </div>
            </div>
            <div v-else>
              ******
            </div>
          </div>
        </div>
        <q-img :src="imageSrc(userAssetsInfo.icon)" class="self-center" width="50px" height="50px" />
      </div>

      <div class="row justify-between q-mb-xs btn">
        <q-btn @click="$router.push({ name: 'WalletsDeposit', query: { mode: 2 } })" style="width: 47%;"
          class="bg-white q-py-sm rounded-borders" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc('/assets/icon/menu/deposit.png')" width="42px" height="42px" />
            <div>{{ $t('deposit') }}</div>
          </div>
        </q-btn>
        <q-btn @click="$router.push({ name: 'WalletsWithdraw', query: { mode: 12 } })" style="width: 47%;"
          class="bg-white q-py-sm rounded-borders" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc('/assets/icon/menu/withdraw.png')" width="42px" height="42px" />
            <div>{{ $t('withdraw') }}</div>
          </div>
        </q-btn>
      </div>

      <div class="q-py-md row">
        <div class="text-body1 text-weight-bolder column col-3 text-center">
          <div>{{ $t('transactions') }}</div>
          <q-separator style="height: 4px;width: 20px;" class="bg-primary self-center rounded-borders" />
        </div>
      </div>

      <!-- 明细列表 -->
      <div v-if="orderList.length <= 0" class="text-center text-grey q-mt-md">{{ $t('noData') }}</div>

      <div v-for="(order, orderIndex) in orderList" :key="orderIndex" class="rounded-borders bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div>
            <div class="text-weight-bold q-mb-xs">{{ order.name }}</div>
            <div class="text-grey-6 text-caption">{{ date.formatDate(Number(order.updatedAt *
              1000), 'YYYY/MM/DD HH:mm:ss') }}</div>
          </div>
          <div>
            <div
              :class="['text-body1 text-weight-bold text-right q-mb-xs', { 'text-primary': order.status == 10, 'text-red': order.status == -1 }]">
              {{ (order.type == 1 ? '+' : '-') }}{{ order.money }}
            </div>
            <div v-if="order.status == -1" class="text-weight-medium text-red text-right text-caption">
              {{ $t('refuse') }}
            </div>
            <div v-if="order.status == 10" class="text-weight-medium text-primary text-right text-caption">
              {{ $t('pending') }}
            </div>
            <div v-if="order.status == 20" class="text-weight-medium text-right text-caption">
              {{ $t('complete') }}
            </div>
          </div>
        </div>
        <div v-if="order.status == -1" class="text-red text-caption">{{ order.data }}
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { InitStore } from 'src/stores/init';
import { walletsOrderIndexAPI, walletsUserAssetsInfoAPI } from 'src/apis/wallets';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'WalletsAssetsDetails',
  setup(props: any, context: any) {
    const $initStore = InitStore()
    const $router = useRouter()
    const { t } = useI18n()
    const WalletOrderTypeDeposit = 101
    const WalletOrderTypeWithdraw = 111
    const initPagination = {
      rowsPerPage: 20, //  每页显示条数
      page: 1, //  当前页数
      descending: true,
      sortBy: 'created_at',
    }

    const state = reactive({
      userAssetsInfo: {} as any,
      // 点击显示、隐藏金额
      showMoney: true,
      // 快捷菜单
      quickMenuList: $initStore.quickMenu as any,
      params: {
        assetsId: $router.currentRoute.value.query.id ? Number($router.currentRoute.value.query.id) : 0,
        types: [] as any,
        pagination: initPagination,
      } as any,

      // 账单
      orderList: [] as any,
    });

    context.emit('update', {
      title: t('myAssets'),
      rightBtn: {
        icon: 'o_event_note',
        callback() {
          $router.push({ name: 'WalletsAccountDetails', query: { type: 'assets' } })
        },
      },
    })

    onMounted(() => {
      // 获取钱包订单
      state.params.types = [WalletOrderTypeDeposit, WalletOrderTypeWithdraw]
      walletsOrderIndexAPI(state.params).then((res: any) => {
        state.orderList = res.items
      })

      // 请求用户资产信息
      walletsUserAssetsInfoAPI({ assetsId: state.params.assetsId }).then((res: any) => {
        state.userAssetsInfo = res
      })
    })

    return {
      imageSrc,
      date,
      ...toRefs(state),
    }
  }
});
</script>
