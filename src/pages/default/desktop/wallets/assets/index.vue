<template>
  <div style="padding: 48px 100px;">
    <!-- 钱包余额 -->
    <q-scroll-area style="height: 208px;width: 100%;" :thumb-style="{ display: 'none' }" :visible="false">
      <div class="row no-wrap">
        <!-- 资产总和 -->
        <div class="q-pa-lg rounded-borders q-mr-lg"
          style="height: 208px;width: 287px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
          <div class="text-white">
            <div class="row items-center" style="height: 49px;">
              <div class="text-body2 q-mr-xs">{{ $t('totalAssets') }}</div>
              <q-icon color="white" @click="moneyShow = !moneyShow"
                :name="moneyShow ? 'o_visibility' : 'o_visibility_off'" class="q-ml-xs cursor-pointer"
                size="16px"></q-icon>
            </div>

            <!-- 点击显示、隐藏金额 -->
            <div style="height: 64px;">
              <div v-if="moneyShow" class="text-white">
                <div class="text-body1">
                  {{ assets.moneySum }}
                </div>
                <div class="row items-center text-body1">
                  ≈
                  <span class="q-ml-xs text-caption">{{ $t('currency') }}</span>
                  {{ assets.moneyRateSum }}
                </div>
              </div>
              <div v-else class="text-white text-weight-bold" style="height: 54px;">****** </div>
            </div>

            <div class="row justify-between q-mt-md">
              <q-btn @click="$router.push({ name: 'WalletsDeposit' })" unelevated class="bg-white text-primary" rounded
                style="width: 110px;height: 34px;" :label="$t('deposit')"></q-btn>
              <q-btn @click="$router.push({ name: 'WalletsWithdraw' })" unelevated class="bg-white text-primary" rounded
                style="width: 110px;height: 34px;" :label="$t('withdraw')"></q-btn>
            </div>
          </div>
        </div>

        <!-- 单个资产 -->
        <div v-for="(Assets, AssetsIndex) in assets.userAssetsList" :key="AssetsIndex"
          class="q-pa-lg rounded-borders q-mr-lg border"
          style="height: 208px;width: 287px;background: linear-gradient(180deg, rgba(3,179,107,0.14) 0%, rgba(255,255,255,0) 100%);">
          <div>
            <div class="row justify-between" style="height: 49px;">
              <div class=" text-h6">{{ Assets.name }}</div>
              <q-img :src="imageSrc(Assets.icon)" class="q-ml-xs" width="50px" height="50px" />
            </div>

            <!-- 点击显示、隐藏金额 -->
            <div style="height: 64px;">
              <div v-if="moneyShow">
                <div class="text-h6 text-weight-bold">${{ Assets.money }}</div>
                <div class="text-grey-6">≈￥{{ Assets.moneyRate }}</div>
              </div>
              <div v-else class="text-weight-bold text-color-9" style="font-size: 22px;height: 54px;">**** </div>
            </div>

            <div class="row justify-between q-mt-md">
              <q-btn @click="$router.push({ name: 'AssetsDetail', query: { id: Assets.id, icon: Assets.icon } })"
                :to="Assets.route" class="text-primary" rounded no-caps
                style="width: 110px;height: 34px;background: rgba(1,172,102,0.1);" :label="$t('more')"></q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>



    <!-- 账单、订单部分 -->
    <q-card flat bordered class="q-mt-lg">
      <q-card-section>
        <div class="row justify-between">
          <q-tabs v-model="tab" narrow-indicator class="q-mb-lg">
            <q-tab @click="switchOrder" class="text-primary" no-caps name="Transactions" :label="$t('transactions')" />
            <q-tab @click="switchBill" class="text-primary" no-caps name="Bill Detail" :label="$t('transactions')" />
          </q-tabs>
          <!-- 右侧 -->
          <div v-if="tab == 'Bill Detail'" class="row q-pr-md">
            <!-- 选择 -->
            <!-- <q-btn class="bg-grey-1 row no-wrap" unelevated no-caps rounded
              style="border: 1px solid #DDDDDD;height: 32px;">
              <div class="q-mr-xs">{{ typeList[typeIndex].name }}</div>
              <q-icon name="expand_more"></q-icon>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item @click="selectBill(index)" :active="typeIndex == index" clickable v-close-popup
                    v-for="(type, index) in typeList" :key="index">
                    <q-item-section>{{ type.name }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn> -->

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
      </q-card-section>
      <q-card-section>
        <!-- 表格 -->
        <div v-if="billList.length > 0">
          <div v-for="(bill, billIndex) in billList" :key="billIndex" class="q-px-md">
            <q-expansion-item :hide-expand-icon="bill.status != -1" :header-style="{ borderRadius: '4px' }">
              <template v-slot:header>
                <q-item-section>
                  <div class="col q-py-md">
                    {{ date.formatDate((bill.updatedAt ?? bill.createdAt) * 1000, 'YYYY/MM/DD HH:mm:SS') }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="col text-center q-py-md">
                    {{ bill.name }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="col text-right text-body1 q-py-md">
                    {{ (bill.type == 2 ? '+' : '-') }}{{ $t('currency') }}{{ bill.money }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div v-if="bill.status == -1" class="col text-right q-pr-md text-red q-py-md">
                    {{ $t('refuse') }}
                  </div>
                  <div v-if="bill.status == 10" class="col text-right q-pr-md text-primary q-py-md">
                    {{ $t('pending') }}
                  </div>
                  <div v-if="bill.status == 20" class="col text-right q-pr-md q-py-md">
                    {{ $t('complete') }}
                  </div>
                </q-item-section>
              </template>
              <div v-if="bill.status == -1" class="text-red q-py-md q-px-md bg-grey-1">
                {{ bill.data }}
              </div>
            </q-expansion-item>
            <q-separator />
          </div>

          <!-- 分页 -->
          <div class="q-pa-md row items-center justify-center no-wrap q-mt-lg">
            <div class="text-color-9 q-mr-md">
              共{{ total }}条,
              {{ params.pagination.rowsPerPage }}条/页
            </div>
            <q-pagination v-model="params.pagination.page" :max="pageTotal" ellipsess :direction-links="true"
              @update:modelValue="changePagination($event)" active-color="#fff" class="pagination">
            </q-pagination>
          </div>
        </div>

        <div v-if="billList == null || billList.length <= 0">
          <div class="text-center q-my-lg text-grey">
            {{ $t('noData') }}
          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { UserStore } from 'src/stores/user';
// import * as echarts from 'echarts'
import { walletsUserAssetsIndexAPI, walletsBillIndexAPI, walletsOrderIndexAPI } from 'src/apis/wallets';
import { imageSrc } from 'src/utils';
import { date } from 'quasar'

export default defineComponent({
  name: 'WalletsAssetsIndex',
  setup() {
    const router = useRouter();
    const $userStore = UserStore()
    let state = reactive({
      // 过滤类型
      // typeList: [
      //   { name: '全部', value: '' },
      //   { name: '充值类型', value: 1 },
      //   { name: '提现类型', value: 11 },
      //   { name: '购买', value: 21 },
      //   { name: '收益', value: 51 },
      //   { name: '奖励', value: 61 },
      // ],
      // typeIndex: 0,

      // 资产数据
      assets: {} as any,

      //选择开始结束日期
      dates: {
        from: '',
        to: '',
      },

      // 表格切换
      tab: 'Transactions',

      // 是否显示余额
      moneyShow: true,

      // 分页
      pageTotal: 1, // 数据总页数
      toPage: 1, // 跳转至n页
      total: 1,//  共n条数据

      params: {
        type: [] as any,
        pagination: {
          rowsPerPage: Number(5), //  n条/一页
          page: Number(1), //  当前页数
          descending: true,
          sortBy: 'created_at',
        },
      } as any,

      // 账单列表
      billList: [] as any,
    });

    onMounted(() => {
      // 预设查询时间
      state.dates.from = date.formatDate(Date.now() - 86400000, 'YYYY-MM-DD')
      state.dates.to = date.formatDate(Date.now(), 'YYYY-MM-DD')

      // 执行api
      getAssets()
      getOrder()
    })


    // 获取用户资产列表
    const getAssets = () => {
      walletsUserAssetsIndexAPI({ id: Number($userStore.userInfo.id) }).then((res: any) => {
        console.log('资产列表', res)
        state.assets = res
      })
    }

    // 初始化
    const initializationPage = () => {
      state.params.pagination = {
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
    // const selectBill = (index: any) => {
    //   state.typeIndex = index
    //   index != 0 ?
    //     state.params.type = [state.typeList[state.typeIndex].value] :
    //     state.params.type = []
    //   getBill()
    // }

    // 获取用户账单列表
    const getBill = () => {
      state.tab = 'Bill Detail'

      state.params.createdAt = {
        from: date.formatDate(state.dates.from, 'x'),
        to: date.formatDate(state.dates.to, 'x'),
      }
      walletsBillIndexAPI(state.params).then((res: any) => {
        console.log('账单列表', res)
        state.billList = res.items
        state.total = res.count
        state.pageTotal = Math.ceil(state.total / state.params.pagination.rowsPerPage)
      })
    }

    // 获取钱包订单
    const getOrder = () => {
      state.tab = 'Transactions'
      const params = {
        types: [2, 12],
        pagination: state.params.pagination,
      }
      walletsOrderIndexAPI(params).then((res: any) => {
        console.log('钱包订单', res)
        state.billList = res.items
        state.total = res.count
        state.pageTotal = Math.ceil(state.total / state.params.pagination.rowsPerPage)
      })
    }


    // 监听加减页
    const changePagination = (val: number) => {
      console.log(`changePagination: ${val}`)
      state.params.pagination.page = Number(val)

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
      getOrder,
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
