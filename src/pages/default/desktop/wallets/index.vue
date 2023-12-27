<template>
  <div style="padding: 48px 100px;">
    <!-- 钱包余额 -->
    <div class="background row items-center justify-between rounded-borders q-pa-lg q-pr-xl">
      <div class="row">
        <q-img class="q-mr-lg" :src="imageSrc('/assets/icon/menu/deposit.png')" width="66px" height="66px"></q-img>
        <div class="q-pt-sm">
          <div class="row items-center">
            <div class="text-white text-h6 q-mr-xs">{{ $t('balance') }}</div>
            <q-icon @click="moneyShow = !moneyShow" class="cursor-pointer" color="white" size="20px"
              :name="moneyShow ? 'o_visibility_off' : 'o_visibility'"></q-icon>
          </div>
          <div class="text-h5 text-white text-weight-bold">{{ moneyShow ? '$' + money : '****' }}
          </div>
        </div>
      </div>

      <!-- 充值、提现 -->
      <div class="row">
        <q-btn @click="$router.push({ name: 'WalletsDeposit' })" class="text-primary bg-white no-shadow" rounded no-caps
          :label="$t('deposit')"></q-btn>
        <q-btn @click="$router.push({ name: 'WalletsWithdraw' })" class="text-primary bg-white no-shadow q-ml-md" rounded
          no-caps :label="$t('withdraw')"></q-btn>
      </div>
    </div>

    <!-- 表格 horizontal -->
    <q-table class="q-mt-lg no-shadow" bordered :rows="rows" :columns="columns" row-key="id" hide-header>
      <template v-slot:top>
        <div class="row no-wrap justify-between full-width">
          <!-- 左侧tabs -->
          <q-tabs v-model="tab" narrow-indicator class="q-mb-lg">
            <q-tab @click="switchOrder" class="text-primary q-pa-none" name="Transactions" label="Transactions" />
            <q-tab @click="switchBill" class="text-primary q-pa-none" name="Bill Detail" label="Bill Detail" />
          </q-tabs>

          <!-- 右侧 -->
          <div v-if="tab == 'Bill Detail'" class="row q-pr-md">
            <!-- 选择 -->
            <q-btn class="bg-grey-1 row no-wrap" unelevated no-caps rounded
              style="border: 1px solid #DDDDDD;height: 32px;">
              <div class="q-mr-xs">{{ typeList[typeIndex].name }}</div>
              <q-icon name="expand_more"></q-icon>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item @click="typeIndex = index" clickable v-close-popup v-for="(type, index) in typeList"
                    :key="index">
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
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            {{ date.formatDate(Number(props.row.createdAt ? props.row.createdAt * 1000 : props.row.updatedAt * 1000),
              'YYYY-MM-DD') }}
          </q-td>
          <q-td>
            <div class="text-primary">
              {{ props.row.name }}
            </div>
          </q-td>
          <q-td>
            +${{ props.row.money }}
          </q-td>
          <q-td class="row justify-between items-center">
            <div>
              ${{ props.row.balance ? props.row.balance : props.row.fee }}
            </div>
            <div>
              <q-icon @click="props.expand = !props.expand" class="cursor-pointer"
                :name="props.expand ? 'expand_less' : 'expand_more'" />
            </div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left text-red">fail reasons，fail reasons fail reasons</div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:bottom>
        <div class="q-pa-md row items-center no-wrap">
          <div class="text-color-9 q-mr-md">
            共{{ total }}条,
            {{ pagination.rowsPerPage }}条/页
          </div>
          <q-pagination v-model="pagination.page" :max="pageTotal" ellipsess :direction-links="true"
            @update:modelValue="changePagination($event)" active-color="#fff" class="pagination">
          </q-pagination>
          <div class="row nowrap">
            <div class="to">跳至</div>
            <q-input :disable="pageTotal <= 1" standout v-model="toPage" @keyup.enter="refreshTableData" suffix="页"
              style="width: 50px;mi-height: 28px;"></q-input>
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils/index';
import { UserStore } from 'src/stores/user';
import { walletsOrderIndexAPI, walletsBillIndexAPI } from 'src/apis/wallets';
import { date } from 'quasar'

export default defineComponent({
  name: 'walletIndex',
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

      money: 0,

      // 钱包订单数据
      form: {} as any,

      // 表格切换
      tab: 'Transactions',

      // 是否显示余额
      moneyShow: true,

      // 分页
      pageTotal: 1, // 数据总页数
      toPage: 1, // 跳转至n页
      total: 1,//  共n条数据
      pagination: {
        rowsPerPage: 5, //  n条/一页
        page: 1, //  当前页数
        descending: true,
        sortBy: 'created_at',
      },

      // 账单
      columns: [
        { name: 'updatedAt' },
        { name: 'name' },
        { name: 'money' },
        { name: 'fee' },
      ] as any,
      rows: [] as any,
    });

    onMounted(() => {
      state.money = $userStore.userInfo.money;
      getOrder()
    })

    // 切换成获取钱包订单
    const switchOrder = () => {
      state.pagination = {
        rowsPerPage: 5, //  n条/一页
        page: 1, //  当前页数
        descending: true,
        sortBy: 'created_at',
      }
      getOrder()
    }

    // 切换成获取钱包订单
    const switchBill = () => {
      state.pagination = {
        rowsPerPage: 5, //  n条/一页
        page: 1, //  当前页数
        descending: true,
        sortBy: 'created_at',
      }
      getBill()
    }

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
        // state.form = res
        state.total = res.count
        state.pageTotal = Math.ceil(state.total / state.pagination.rowsPerPage)
        res.items.forEach((element: any) => {
          state.rows.push(element)
        })
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
        pagination: {
          rowsPerPage: Number(state.pagination.rowsPerPage), //  n条/一页
          page: Number(state.pagination.page), //  当前页数
          descending: state.pagination.descending,
          sortBy: state.pagination.sortBy,
        },
      }
      walletsBillIndexAPI(params).then((res: any) => {
        state.rows = []
        console.log('账单列表', res)
        state.total = res.count
        state.pageTotal = Math.ceil(state.total / state.pagination.rowsPerPage)
        res.items.forEach((element: any) => {
          state.rows.push(element)
        });
      })
    }

    // 监听加减页
    const changePagination = (val: number) => {
      console.log(`changePagination: ${val}`)
      state.pagination.page = val

      state.tab == 'Transactions' ?
        getOrder() :
        getBill()
    }

    // input输入页数回车
    const refreshTableData = () => {
      console.log(state.pagination.page);

      if (state.toPage <= (state.total / state.rows.length)) {
        state.pagination.page = Number(state.toPage)

        state.tab == 'Transactions' ?
          getOrder() :
          getBill()
      }
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
      changePagination,
      refreshTableData,
      getBill,
      switchOrder,
      switchBill,
    }
  }
});
</script>
<style lang="scss" scoped>
:deep .q-table {
  padding-left: 39px;
}

:deep .q-table td {
  font-size: 16px;
}

:deep .q-table__card .q-table__bottom {
  justify-content: center;
  border-top: 0;
}

.q-tab {
  text-transform: capitalize;
  flex: 0 1 auto !important;
  margin-right: 40px;
  padding: 0 10px;
  border-radius: 8px;
}

:deep .q-tab .q-tab__label {
  color: #666;
  font-size: 20px;
}

:deep .q-tab--active .q-tab__label {
  color: #333 !important;
  font-weight: bold;
}

:deep .q-tab .q-tab__indicator {
  width: 47px;
  height: 4px;
  border-radius: 3px;
  left: 50%;
  transform: translateX(-50%) !important;
}

.background {
  background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);
}

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

.to {
  height: 28px;
  padding: 6px 11px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #DDDDDD;
}
</style>
