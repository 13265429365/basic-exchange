<template>
  <div class="column full-width" style="min-height: 100vh;">
    <div class="col page_bg q-pa-md full-width">

      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between rounded-borders q-mb-md">
        <div class="column justify-center text-white">
          <div class="row items-center">
            <div class="">{{ $t('balance') }}</div>
            <q-icon @click="moneyShow = !moneyShow" :name="!moneyShow ? 'o_visibility_off' : 'o_visibility'"
              class="q-ml-sm cursor-pointer" size="18px"></q-icon>
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div v-if="moneyShow" class=" text-weight-medium text-h6">${{ money }} </div>
          <div v-else class="text-weight-bold text-body1">****</div>
        </div>
        <q-img :src="imageSrc('/assets/icon/menu/withdraw.png')" class="self-center" width="68px" height="53.83px" />
      </div>

      <div class="row justify-between q-mb-xs btn">
        <q-btn @click="$router.push(quickMenu.route)" v-for="(quickMenu, quickMenuIndex) in quickMenuList"
          :key="quickMenuIndex" v-show="quickMenu.data.isMobile" style="width: 47%;"
          class="bg-white q-py-sm rounded-borders" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc(quickMenu.icon)" width="42px" height="42px" />
            <div>{{ $t(quickMenu.name) }}</div>
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
      <div v-for="(wallet, i) in WalletsList" :key="i" class="rounded-borders bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-weight-bold">{{ wallet.name }}</div>
            <div class="text-grey-6 text-weight-medium text-caption">{{ date.formatDate(Number(wallet.updatedAt *
              1000), 'YYYY-MM-DD HH:mm:ss') }}</div>
          </div>
          <div>
            <div class="text-body1 text-weight-bold text-center">
              {{ wallet.type == 1 || wallet.type == 2 ? '+' + wallet.money : '-' + wallet.money }}</div>
            <div v-if="wallet.status == 10" class="text-weight-medium text-red text-center text-caption">
              {{ $t('pending') }}
            </div>
            <div v-if="wallet.status == 11" class="text-weight-medium text-primary text-center text-caption">
              {{ $t('complete') }}
            </div>
          </div>
        </div>
        <div v-if="wallet.status == 10" class="text-red text-caption">Failure Reason：This is the reason for the failure
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { UserStore } from 'src/stores/user';
import { InitStore } from 'src/stores/init';
import { walletsOrderIndexAPI } from 'src/apis/wallets';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'WalletsIndex',
  setup(props: any, context: any) {
    const $initStore = InitStore()
    const $userStore = UserStore()
    const { t } = useI18n()

    const state = reactive({
      money: 0,

      // 钱包订单数据

      // 点击显示、隐藏金额
      moneyShow: true,

      // 快捷菜单
      quickMenuList: $initStore.quickMenu as any,

      // 分页
      params: {
        types: [1, 11],
        pagination: {
          rowsPerPage: 999, //  n条/一页
          page: 1, //  当前页数
          descending: true,
          sortBy: 'created_at',
        },
      },

      // 账单
      WalletsList: [] as any,
    });

    context.emit('update', {
      title: t('myWallet'),
    })

    onMounted(() => {
      state.money = $userStore.userInfo.money;
      walletsOrderIndexAPI(state.params).then((res: any) => {
        state.WalletsList = res.items
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
