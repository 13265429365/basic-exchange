<template>
  <div style="padding: 48px 100px;">
    <!-- 钱包余额 -->
    <div class="row items-center justify-between rounded-borders q-pa-lg q-pr-xl"
      style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
      <div class="row">
        <q-img class="q-mr-lg" :src="imageSrc('/assets/icon/menu/deposit.png')" width="66px" height="66px"></q-img>
        <div class="q-pt-sm">
          <div class="row items-center">
            <div class="text-white text-h6 q-mr-xs">{{ $t('balance') }}</div>
            <q-icon @click="moneyShow = !moneyShow" class="cursor-pointer" color="white" size="20px"
              :name="moneyShow ? 'o_visibility' : 'o_visibility_off'"></q-icon>
          </div>
          <div class="text-h5 text-white text-weight-bold">{{ moneyShow ? '$' + money : '****' }}
          </div>
        </div>
      </div>

      <!-- 充值、提现 -->
      <div class="row">
        <q-btn @click="$router.push({ name: 'WalletsDeposit' })" unelevated class="text-primary bg-white" rounded no-caps
          :label="$t('deposit')"></q-btn>
        <q-btn @click="$router.push({ name: 'WalletsWithdraw' })" unelevated class="text-primary bg-white q-ml-md" rounded
          no-caps :label="$t('withdraw')"></q-btn>
      </div>
    </div>



    <div class="q-mt-lg rounded-borders q-py-md q-px-lg" style="border: 1px solid #DDDDDD;">
      <!-- 表格头部 -->
      <div class="row justify-between">
        <q-tabs v-model="tab" narrow-indicator class="q-mb-lg">
          <q-tab @click="switchOrder" class="text-primary" no-caps name="Transactions" label="Transactions" />
          <q-tab @click="switchBill" class="text-primary" no-caps name="Bill Detail" label="Bill Detail" />
        </q-tabs>
        <!-- 右侧 -->
        <div v-if="tab == 'Bill Detail'" class="row q-pr-md">
          <!-- 选择 -->
          <q-btn class="bg-grey-1 row no-wrap" unelevated no-caps rounded style="border: 1px solid #DDDDDD;height: 32px;">
            <div class="q-mr-xs">{{ typeList[typeIndex].name }}</div>
            <q-icon name="expand_more"></q-icon>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="(type, index) in typeList" :key="index">
                  <q-item-section>{{ type.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- 日期选择 -->
          <q-btn class="bg-grey-1 q-ml-md" unelevated no-caps rounded style="border: 1px solid #DDDDDD;height: 32px;">
            <div class="row items-center">
              <div class="q-mr-xs text-caption">{{ dates.from }}</div>
              <q-icon class="q-mx-sm" style="color: #DDDDDD;" size="16px" name="trending_flat"></q-icon>
              <div class="q-mr-xs text-caption">{{ dates.to }}</div>
              <q-icon class="q-ml-sm" size="15px" name="calendar_today"></q-icon>
            </div>
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="dates" range>
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                  <q-btn @click="switchBill" :label="$t('confirm')" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>

      <!-- 表格 -->
      <div class="q-mt-lg rounded-borders" v-if="walletsList.length > 0">
        <div v-for="(wallet, walletIndex) in walletsList" :key="walletIndex" class="q-px-md">
          <q-expansion-item :hide-expand-icon="wallet.type == 1">
            <template v-slot:header>
              <q-item-section>
                <div class="col q-py-md">
                  {{ date.formatDate((wallet.updatedAt ?? wallet.createdAt) * 1000, 'YYYY/MM/DD HH:mm:SS') }}
                </div>
              </q-item-section>
              <q-item-section>
                <div class="col text-center q-py-md">
                  {{ wallet.name }}
                </div>
              </q-item-section>
              <q-item-section>
                <div class="col text-right text-body1 q-py-md">
                  +${{ wallet.money }}
                </div>
              </q-item-section>
              <q-item-section>
                <div class="col text-right q-pr-md text-primary q-py-md">
                  {{ $t('complete') }}
                </div>
              </q-item-section>
            </template>
            <div v-if="wallet.type != 1" class="text-red q-py-md q-px-md bg-grey-1">fail reasons，fail reasons fail reasons
            </div>
          </q-expansion-item>
          <q-separator />
        </div>

        <!-- 分页 -->
        <div class="q-pa-md row items-center justify-center no-wrap q-mt-lg">
          <div class="text-color-9 q-mr-md">
            共{{ total }}条,
            {{ pagination.rowsPerPage }}条/页
          </div>
          <q-pagination v-model="pagination.page" :max="pageTotal" ellipsess :direction-links="true"
            @update:modelValue="changePagination($event)" active-color="#fff" class="pagination">
          </q-pagination>
        </div>
      </div>

    </div>


  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { UserStore } from 'src/stores/user';
import { walletsOrderIndexAPI, walletsBillIndexAPI } from 'src/apis/wallets';
import { date } from 'quasar'

export default defineComponent({
  name: 'WalletsIndex',
  setup() {
    const $userStore = UserStore()

    let state = reactive({
      // 过滤类型
      typeList: [
        { name: '全部', value: '' },
        { name: '充值类型', value: 1 },
        { name: '提现类型', value: 11 },
        { name: '购买', value: 21 },
        { name: '收益', value: 51 },
        { name: '奖励', value: 61 },
      ],
      typeIndex: 0,

      //选择开始结束日期
      dates: {
        from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      },

      // 钱包余额
      money: $userStore.userInfo.money,

      // 表格切换
      tab: 'Transactions',

      // 是否显示余额
      moneyShow: true,

      // 分页
      pageTotal: 1, // 数据总页数
      toPage: 1, // 跳转至n页
      total: 1,//  共n条数据
      pagination: {
        rowsPerPage: Number(5), //  n条/一页
        page: Number(1), //  当前页数
        descending: true,
        sortBy: 'created_at',
      },

      // 账单
      walletsList: [] as any,
    });

    onMounted(() => {
      getOrder()
    })

    // 初始化page
    const initializationPage = () => {
      state.pagination = {
        rowsPerPage: 5, //  n条/一页
        page: 1, //  当前页数
        descending: true,
        sortBy: 'created_at',
      }
    }

    // 切换成获取钱包订单
    const switchOrder = () => {
      initializationPage()
      getOrder()
    }

    // 切换成获取账单
    const switchBill = () => {
      initializationPage()
      getBill()
    }

    // 筛选账单
    // const selectBill = (type: any, index: any) => {
    //   state.typeIndex = index
    //   getBill(type)
    // }

    // 获取钱包订单
    const getOrder = () => {
      const params = {
        types: [1, 11],
        pagination: state.pagination,
      }
      walletsOrderIndexAPI(params).then((res: any) => {
        console.log('钱包订单', res)
        state.total = res.count
        state.walletsList = res.items
        state.pageTotal = Math.ceil(state.total / state.pagination.rowsPerPage)
      })
    }

    // 获取用户账单列表
    const getBill = () => {
      state.tab = 'Bill Detail'
      const params = {
        createdAt: {
          from: date.formatDate(state.dates.from, 'x'),
          to: date.formatDate(state.dates.to, 'x'),
        },
        types: [],
        pagination: state.pagination,
      }
      walletsBillIndexAPI(params).then((res: any) => {
        console.log('账单列表', res)
        state.walletsList = res.items
        state.total = res.count
        state.pageTotal = Math.ceil(state.total / state.pagination.rowsPerPage)
      })
    }

    // 监听加减页
    const changePagination = (val: number) => {
      console.log(`changePagination: ${val}`)
      state.pagination.page = Number(val)

      state.tab == 'Transactions' ?
        getOrder() :
        getBill()
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
      changePagination,
      getBill,
      switchOrder,
      switchBill,
      // selectBill,
    }
  }
});
</script>
<style lang="scss" scoped>
// 分页样式
:deep .q-pagination .q-btn {
  width: 28px;
  height: 28px;
  padding: 0 !important;
  border: 1px solid #DDDDDD;
  margin-right: 3px;
  color: #333333 !important;

}

:deep .q-pagination .q-btn--standard:before {
  background: #fff;
  border: 1px solid #01AC66;
  box-shadow: none;

}
</style>
