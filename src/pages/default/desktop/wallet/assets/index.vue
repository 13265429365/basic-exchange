<template>
  <div class="calc">
    <!-- 通用header(app.scss) -->
    <div class="pageHeader">
      {{ $t('myAssets') }}
    </div>
    <div style="padding: 48px 100px;">
      <!-- 钱包余额 -->
      <q-scroll-area style="height: 208px;width: 100%;" :visible="false">
        <div class="row no-wrap">
          <div class="q-pa-lg rounded-borders q-mr-lg"
            style="height: 208px;width: 287px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
            <div>
              <div class="row items-center" style="height: 49px;">
                <div class="text-white text-h5">{{ $t('totalAssets') }}</div>
                <q-icon color="white" @click="moneyShow = !moneyShow"
                  :name="moneyShow ? 'o_visibility' : 'o_visibility_off'" class="q-ml-xs cursor-pointer"
                  size="18px"></q-icon>
              </div>

              <!-- 点击显示、隐藏金额 -->
              <div style="height: 64px;">
                <div v-if="moneyShow" class="text-white">
                  <div class="text-h5">${{ form.moneySum }}</div>
                  <div class="text-h6">≈￥{{ form.moneyRateSum }} </div>
                </div>
                <div v-else class="text-white text-weight-bold " style="font-size: 22px;height: 54px;">**** </div>
              </div>

              <div class="row justify-between q-mt-md">
                <q-btn class="bg-white text-primary" rounded style="width: 110px;height: 34px;"
                  :label="$t('deposit')"></q-btn>
                <q-btn class="bg-white text-primary" rounded style="width: 110px;height: 34px;"
                  :label="$t('withdraw')"></q-btn>
              </div>
            </div>
          </div>
          <div v-for="(Assets, AssetsIndex) in form.userAssetsList" :key="AssetsIndex"
            class="q-pa-lg rounded-borders q-mr-lg border"
            style="height: 208px;width: 287px;background: linear-gradient(180deg, rgba(3,179,107,0.14) 0%, rgba(255,255,255,0) 100%);">
            <div>
              <div class="row justify-between" style="height: 49px;">
                <div class=" text-h5">{{ Assets.name }}</div>
                <q-img :src="imageSrc(Assets.icon)" class="q-ml-xs" width="50px" height="50px" />
              </div>

              <!-- 点击显示、隐藏金额 -->
              <div style="height: 64px;">
                <div v-if="moneyShow">
                  <div class="text-h5">${{ Assets.money }}</div>
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

      <!-- 折线图 -->
      <div class="rounded-borders q-mt-lg q-pt-lg q-px-md border">
        <div class="row no-wrap justify-between">
          <div class="text-h5 text-weight-bold q-px-xl">
            {{ $t('assetsBlock') }}
          </div>
          <div class="row justify-end q-mb-md">
            <div class="bg-grey-1 q-pa-xs row" style="border-radius: 4px;">
              <div @click="switchDate(item.name)" v-for="(item, i) in lineDate" :key="i"
                :class="['q-px-sm q-py-xs cursor-pointer', { 'bg-white': item.name == lineType, 'text-grey-8': item.name != lineType, 'bg-grey-1': item.name != lineType, }]"
                style="border-radius: 2px;">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center q-mb-sm">
          <div id="lineChart" style="height: 300px;width: 100%;"></div>
          <!-- <div v-show="lineType=='近30日'" id="lineThirty" style="height: 300px;width: 900px;"></div> -->
        </div>
      </div>

      <!-- 表格 horizontal -->
      <q-table class="q-mt-lg no-shadow rounded-borders" bordered :rows="rows" :columns="columns" row-key="id"
        hide-header>
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
                <div class="q-mr-xs">全部</div>
                <q-icon name="expand_more"></q-icon>
              </q-btn>

              <!-- 日期选择 -->
              <q-btn class="bg-grey-1 row no-wrap q-ml-md" no-caps rounded style="border: 1px solid #DDDDDD;width: auto;">
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
                'YYYY-MM-DD')
              }}
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
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { UserStore } from 'src/stores/user';
import * as echarts from 'echarts'
import { userGetAssets, userGetBill, userGetOrder } from 'src/apis/wallets';
import { imageSrc } from 'src/utils/index';
import { date } from 'quasar'

export default defineComponent({
  name: 'assetsIndex',
  setup() {
    const router = useRouter();
    const $userStore = UserStore()
    let state = reactive({
      // 资产数据
      form: {
        moneySum: '',
        moneyRateSum: '',
      } as any,

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
      pagination: {
        rowsPerPage: 5, //  n条/一页
        page: 1, //  当前页数
        descending: true,
        sortBy: 'created_at',
      },

      // 折线图
      lineDate: [
        { name: '近7日' },
        { name: '近30日' },
      ],
      lineType: '近7日' as any,

      // 折线图echarts
      lineOption: {} as any,
      lineThirty: {} as any,

      // table数据
      columns: [
        {
          name: 'createdAt',
        },
        { name: 'name' },
        { name: 'money' },
        { name: 'balance' },
      ] as any,
      rows: [] as any,
    });

    onMounted(() => {
      // 预设查询时间
      state.dates.from = date.formatDate(Date.now() - 86400000, 'YYYY-MM-DD')

      state.dates.to = date.formatDate(Date.now(), 'YYYY-MM-DD')

      // 生成7日折线图
      const lineChart = echarts.init(document.getElementById('lineChart'))
      lineChart.setOption(state.lineOption)

      // 执行api
      getAssets()
      getOrder()
    })


    // 获取用户资产列表
    const getAssets = () => {
      userGetAssets({ id: Number($userStore.userInfo.id) }).then((res: any) => {
        console.log('资产列表', res)
        state.form = res
        console.log(state.form);

      })
    }


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

    // 获取钱包订单
    const getOrder = () => {
      state.tab = 'Transactions'
      state.rows = []
      const params = {
        // assetsId: {},
        types: [2, 12],
        pagination: {
          rowsPerPage: Number(state.pagination.rowsPerPage), //  n条/一页
          page: Number(state.pagination.page), //  当前页数
          descending: state.pagination.descending,
          sortBy: state.pagination.sortBy,
        },
      }
      userGetOrder(params).then((res: any) => {
        console.log('钱包订单', res)
        state.total = res.count
        state.pageTotal = Math.ceil(state.total / state.pagination.rowsPerPage)
        res.items.forEach((element: any) => {
          state.rows.push(element)
        })
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


    // 切换折线图
    const switchDate = (val: string) => {
      state.lineType = val
      if (val == '近7日') {
        const lineChart = echarts.init(document.getElementById('lineChart'))
        lineChart.setOption(state.lineOption)
      } else {
        const lineChart = echarts.init(document.getElementById('lineChart'))
        lineChart.setOption(state.lineThirty)
      }
    }

    state.lineOption = {
      grid: {
        show: false,
        left: '4%',
        top: '3%',
        right: '2%',
        // bottom: '0',
        // containLabel: true,
        // borderWidth: '1',
      },
      legend: {
        data: ['钻石', 'BTC'],
        // top: '0',
        bottom: '5%',
        itemStyle: {
          color: 'rgba(0,0,0,0)', // 设置图例背景色为灰色
          borderColor: 'rgba(0,0,0,0)', // 设置图例边框色为黑色
        },
      },
      xAxis: {
        type: 'category',
        data: ['9/10', '9/11', '9/12', '9/13', '9/14', '9/15', '9/16',],
      },
      yAxis: {
        type: 'value',
        interval: 20, // 设置y轴间隔为50
        axisLabel: {
          interval: 80 // 设置标签间隔为500
        },
        axisTick: {
          show: false // 设置为false即可取消y轴刻度线
        },
        splitLine: {
          lineStyle: {
            type: 'dashed' // 设置为'dashed'即可将x轴改为虚线
          }
        }
      },
      series: [
        {
          name: '钻石',
          data: [0, 40, 80, 90, 40, 0, 90],
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#3F82FE' // 设置线条颜色为红色
          },
        },
        {
          name: 'BTC',
          data: [30, 40, 20, 83, 42, 60, 100],
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#01AC66' // 设置线条颜色为红色
          },
        },
      ]
    }
    state.lineThirty = {}

    return {
      imageSrc,
      date,
      ...toRefs(state),
      changePagination,
      refreshTableData,
      switchDate,
      getBill,
      getOrder,
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

:deep(.q-scrollarea__thumb) {
  display: none !important;
}

.border {
  border: 1px solid #DDDDDD;
}

// echarts
// #lineThirty {
//   div {
//     width: 100%;
//     canvas {
//       width: 100%;
//     }
//   }
// }
:deep #lineThirty div {
  width: 100%;
}
</style>
