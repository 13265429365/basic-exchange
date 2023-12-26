<template>
  <div class="calc">
    <!-- 通用header(app.scss) -->
    <div class="pageHeader">
      {{ $t('myWallet') }}
    </div>

    <div class="maxWidth1200">
      <div>
        <!-- 钱包余额 -->
        <div class="background row items-center justify-between rounded-borders q-pa-lg q-pr-xl">
          <div class="row">
            <q-img class="q-mr-lg" :src="imageSrc('/assets/icon/menu/deposit.png')" width="66px" height="66px"></q-img>
            <div class="q-pt-sm">
              <div class="row items-center">
                <div class="text-white text-h6 q-mr-xs">{{ $t('balance') }}</div>
                <q-img @click="moneyShow = !moneyShow" class="cursor-pointer"
                  :src="`/images/pc/wallet/${moneyShow ? 'show' : 'noShow'}.png`" width="14px" height="14px"></q-img>
              </div>
              <div class="text-h5 text-white text-weight-bold">{{ moneyShow ? '$' + money : '****' }}
              </div>
            </div>
          </div>

          <!-- btn -->
          <div class="row">
            <q-btn @click="$router.push({ name: 'Deposit' })" class="text-primary bg-white no-shadow" rounded no-caps
              :label="$t('deposit')"></q-btn>
            <q-btn @click="$router.push({ name: 'Withdraw' })" class="text-primary bg-white no-shadow q-ml-md" rounded
              no-caps :label="$t('withdraw')"></q-btn>
          </div>
        </div>

        <!-- 表格 horizontal -->
        <q-table class="q-mt-lg no-shadow" bordered :rows="rows" :columns="columns" row-key="id" hide-header>
          <template v-slot:top>
            <div class="row no-wrap justify-between full-width">
              <!-- 左侧tabs -->
              <q-tabs v-model="tab" narrow-indicator class="q-mb-lg">
                <q-tab @click="switchOrder" class="text-primary q-pa-none" style="justify-content: flex-start !important;"
                  name="Transactions" label="Transactions" />
                <q-tab @click="switchBill" class="text-primary q-pa-none" style="justify-content: flex-start !important;"
                  name="Bill Detail" label="Bill Detail" />
              </q-tabs>

              <!-- 右侧 -->
              <div v-if="tab == 'Bill Detail'" class="row no-wrap q-pr-md">
                <!-- 选择 -->
                <q-btn class="bg-grey-1 row no-wrap" no-caps rounded style="border: 1px solid #DDDDDD">
                  <div class="q-mr-xs">all</div>
                  <q-icon name="expand_more"></q-icon>
                </q-btn>

                <!-- 日期选择 -->
                <q-btn class="bg-grey-1 row no-wrap q-ml-md" no-caps rounded
                  style="border: 1px solid #DDDDDD;width: auto;">
                  <div class="row items-center">
                    <div class="q-mr-xs">{{ dates.from }}</div>
                    <q-icon class="q-mx-sm" style="color: #DDDDDD;" size="16px" name="trending_flat"></q-icon>
                    <div class="q-mr-xs">{{ dates.to }}</div>
                    <q-icon class="text-color-9 q-ml-sm" size="15px" name="calendar_today"></q-icon>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils/index';
import { UserStore } from 'src/stores/user';
import { userGetOrder, userGetBill } from 'src/apis/wallets';
import { date } from 'quasar'

export default defineComponent({
  name: 'walletIndex',
  setup() {
    const $userStore = UserStore()

    let state = reactive({
      //选择开始结束日期
      dates: {
        from: '',
        to: '',
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
      userGetOrder(params).then((res: any) => {
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
      userGetBill(params).then((res: any) => {
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

.q-btn {
  width: 100px;
  height: 34px;
}

.q-btn::before {
  box-shadow: none;
}

.background {
  background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);
}

// pc版input样式
:deep .q-field--standout .q-field__native {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep .q-field--standout .q-field__suffix {
  color: #DDDDDD;
  line-height: 28px;
  flex-wrap: nowrap;
}

:deep .q-field--standout .q-field__control {
  padding: 0 6px;
  background: #fff !important;
  height: 28px !important;
  min-height: 28px !important;
  outline: none !important;
  border: 1px solid #DDDDDD;
  box-shadow: none !important;
  border-radius: 0 4px 4px 0;
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
