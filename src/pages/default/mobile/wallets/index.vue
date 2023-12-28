<template>
  <div class="column full-width" style="min-height: 100vh;">
    <div class="col page_bg q-pa-md full-width">

      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between rounded-borders q-mb-md">
        <div class="column justify-center">
          <div class="row items-center">
            <div class="text-white text-weight-bold">{{ $t('balance') }}</div>
            <q-icon @click="moneyShow = !moneyShow" :name="!moneyShow ? 'o_visibility' : 'o_visibility_off'"
              class="q-ml-sm cursor-pointer text-white" size="18px"></q-icon>
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div v-if="moneyShow" class="text-white text-weight-bold " style="font-size: 22px;">${{ money }} </div>
          <div v-else class="text-white text-weight-bold " style="font-size: 22px;">**** </div>
        </div>
        <q-img :src="imageSrc('/assets/icon/menu/withdraw.png')" class="self-center" width="68px" height="53.83px" />
      </div>

      <div class="row justify-between q-mb-xs btn">
        <q-btn @click="$router.push(quickMenu.route)" v-for="(quickMenu, quickMenuIndex) in quickMenuList"
          :key="quickMenuIndex" style="width: 47%;" class="bg-white q-py-sm rounded-borders" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc(quickMenu.icon)" width="42px" height="42px" />
            <div>{{ $t(quickMenu.name) }}</div>
          </div>
        </q-btn>
      </div>

      <div class="q-py-md row">
        <div class="text-color-3 text-subtitle1 text-weight-bolder column col-3">
          <span>Transactions</span>
          <q-separator style="height: 4px;width: 20px;border-radius: 2px;" class="bg-primary self-center" />
        </div>
      </div>

      <!-- 明细列表 -->
      <div v-for="(item, i) in rows" :key="i" class="rounded-borders bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-weight-bold">{{ item.name }}</div>
            <div class="text-grey-6 text-weight-medium text-caption">{{ date.formatDate(Number(item.updatedAt *
              1000), 'YYYY-MM-DD HH:mm:ss') }}</div>
          </div>
          <div>
            <div class="text-body1 text-weight-bold text-center">
              {{ item.name.indexOf('提现') > -1 ? '-' + item.money : '+' + item.money }}</div>
            <div class="text-weight-medium text-center text-caption">
              {{ item.fee }}</div>
          </div>
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
      form: {} as any,

      // 点击显示、隐藏金额
      moneyShow: true,

      // 快捷菜单
      quickMenuList: [] as any,

      // 分页
      pagination: {
        rowsPerPage: 999, //  n条/一页
        page: 1, //  当前页数
        descending: true,
        sortBy: 'created_at',
      },

      // 账单
      rows: [] as any,
    });

    context.emit('update', {
      title: t('myWallet'),
    })

    onMounted(() => {
      state.quickMenuList = $initStore.quickMenu;
      state.money = $userStore.userInfo.money;
      getOrder()
    })

    // 获取钱包订单
    const getOrder = () => {
      state.rows = []
      const params = {
        // assetsId: {},
        types: [1, 11],
        pagination: {
          rowsPerPage: Number(state.pagination.rowsPerPage), //  n条/一页
          page: Number(state.pagination.page), //  当前页数
          descending: state.pagination.descending,
          sortBy: state.pagination.sortBy,
        },
      }
      walletsOrderIndexAPI(params).then((res: any) => {
        console.log('钱包订单', res)
        state.form = res
        res.items.forEach((element: any) => {
          state.rows.push(element)
        })
      })
    }


    return {
      imageSrc,
      date,
      ...toRefs(state),
    }
  }
});
</script>
