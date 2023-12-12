<template>
  <div class="row no-wrap">
    <menuBar></menuBar>
    <div class="calc">
      <!-- 通用header(app.scss) -->
      <div class="pageHeader">
        Assets
      </div>
      <div style="padding: 48px 100px;">
        <!-- 钱包余额 -->
        <q-scroll-area style="height: 208px;width: 100%;" :visible="false">
          <div class="row no-wrap">
            <div class="q-pa-lg radius-8 q-mr-lg"
              style="height: 208px;width: 287px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
              <div>
                <div class="row items-center" style="height: 49px;">
                  <div class="text-white text-h5">Total Assets</div>
                  <q-img @click="moneyShow = !moneyShow" src="page_bg/eyes.png" class="q-ml-xs cursor-pointer"
                    width="16px" height="16px" />
                </div>
                <!-- 点击显示、隐藏金额 -->
                <div v-if="moneyShow" class="text-white">
                  <div class="text-h5">$1200.00</div>
                  <div class="text-h6">≈￥69865,21 </div>
                </div>
                <div v-else class="text-white text-weight-bold " style="font-size: 22px;height: 54px;">**** </div>
                <div class="row justify-between q-mt-md">
                  <q-btn class="bg-white text-primary" rounded style="width: 110px;height: 34px;"
                    label="Deposit"></q-btn>
                  <q-btn class="bg-white text-primary" rounded style="width: 110px;height: 34px;"
                    label="Widrow"></q-btn>
                </div>
              </div>
            </div>
            <div v-for="(item,i) in assetList" :key="i" class="q-pa-lg radius-8 q-mr-lg border"
              style="height: 208px;width: 287px;background: linear-gradient(180deg, rgba(3,179,107,0.14) 0%, rgba(255,255,255,0) 100%);">
              <div>
                <div class="row justify-between" style="height: 49px;">
                  <div class=" text-h5">{{item.name}}</div>
                  <q-img :src="`/images/pc/assets/${item.icon}.png`" class="q-ml-xs" width="50px" height="50px" />
                </div>
                <!-- 点击显示、隐藏金额 -->
                <div v-if="moneyShow">
                  <div class="text-h5">{{item.money}}</div>
                  <div class="text-h6 text-color-9">{{item.approx}}</div>
                </div>
                <div v-else class="text-weight-bold text-color-9" style="font-size: 22px;height: 54px;">**** </div>
                <div class="row justify-between q-mt-md">
                  <q-btn @click="to(item.url)" class="text-primary" rounded no-caps
                    style="width: 110px;height: 34px;background: rgba(1,172,102,0.1);" label="More"></q-btn>
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>

        <!-- 折线图 -->
        <div class="radius-8 q-mt-lg q-pt-lg q-px-md border">
          <div class="row no-wrap justify-between">
            <div class="text-h5 text-weight-bold q-px-xl">
              Asset Allocation
            </div>
            <div class="row justify-end q-mb-md">
              <div class="bg-grey-1 q-pa-xs row" style="border-radius: 4px;">
                <div @click="switchDate(item.name)" v-for="(item, i) in lineDate" :key="i"
                  :class="['q-px-sm q-py-xs cursor-pointer',{'bg-white':item.name==lineType,'text-grey-8':item.name!=lineType,'bg-grey-1':item.name!=lineType, }]"
                  style="border-radius: 2px;">
                  {{item.name}}
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
        <q-table class="q-mt-lg no-shadow radius-8" bordered :rows="rows" :columns="columns" row-key="i" hide-header>
          <template v-slot:top>
            <div class="row justify-between full-width">
              <q-tabs v-model="tab" narrow-indicator class="q-mb-lg">
                <q-tab class="text-primary q-pa-none" style="justify-content: flex-start !important;"
                  name="Transactions" label="Transactions" />
                <q-tab class="text-primary q-pa-none" style="justify-content: flex-start !important;" name="Bill Detail"
                  label="Bill Detail" />
              </q-tabs>
              <div class="q-pr-md">
                <q-btn class="bg-grey-1 text-color-6" no-caps rounded style="border: 1px solid #DDDDDD">
                  <div class="q-mr-xs">全部</div>
                  <q-icon name="expand_more"></q-icon>
                </q-btn>
                <q-btn class="bg-grey-1 text-color-6 q-ml-md" no-caps rounded style="border: 1px solid #DDDDDD;width: auto;">
                  <div class="row items-center">
                    <div class="q-mr-xs">{{date.from}}</div>
                    <q-icon class="q-mx-sm" style="color: #DDDDDD;" size="16px" name="trending_flat"></q-icon>
                    <div class="q-mr-xs">{{date.to}}</div>
                    <q-icon class="text-color-9 q-ml-sm" size="15px" name="calendar_today"></q-icon>
                  </div>
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" range>
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
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
                {{ props.row.name }}
              </q-td>
              <q-td>
                {{ props.row.calories }}
              </q-td>
              <q-td>
                {{ props.row.fat }}
              </q-td>
              <q-td class="row justify-between items-center">
                <div :class="[{'text-primary':props.row.carbs=='examine'},{'text-red':props.row.carbs=='fail'}]">
                  {{ props.row.carbs }}
                </div>
                <div v-if="props.row.carbs=='fail'">
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
                共{{ pagination.rowsNumber }}条,
                {{ pagination.rowsPerPage }}条/页
              </div>
              <q-pagination v-model="pagination.page" :max="pages" :max-pages="5" ellipsess :direction-links="true"
                @input="changePagination($event)" active-color="#fff" class="pagination">
              </q-pagination>
              <div class="row nowrap">
                <div class="to">跳至</div>
                <q-input standout v-model="toPage" @keyup.enter="refreshTableData" suffix="页"
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
  import menuBar from 'src/layouts/pc/settingLayouts.vue';
  import { defineComponent, reactive, toRefs, ref, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import * as echarts from 'echarts'
  import { lineOption, lineThirty } from './ts/data';
  export default defineComponent({
    components: {
      menuBar,
    },
    name: 'assetsView',
    setup() {
      const router = useRouter();
      let store = reactive({
        //
        date: {
          from: '2023-10-11',
          to: '2023-10-16',
        },
        tab: 'Transactions',
        // 是否显示余额
        moneyShow: true,
        //
        content: '',
        imgUrl: '',
        // 分页
        pages: 1, // 数据总页数
        toPage: 1, // 跳转至
        pagination: {
          rowsPerPage: 2,
          rowsNumber: 2,
          page: 1,
        },
        // asset资产列表
        assetList: [
          {
            name: 'VTH',
            icon: 'btc',
            money: '$8,692.000',
            approx: '≈￥20,21',
            url: '/vth',
          },
          {
            name: 'My Wallet',
            icon: 'wallet',
            money: '$8,692.000',
            approx: '≈￥20,21',
            url: '/wallet',
          },
          {
            name: 'My Wallet',
            icon: 'wallet',
            money: '$8,692.000',
            approx: '≈￥20,21',
            url: '',
          },
        ],
        // 折线图
        lineDate: [
          { name: '近7日' },
          { name: '近30日' },
        ],
        lineType: '近7日',
        // 7日折线图echarts
        lineOption,
        // 30日折线图echarts
        // lineThirty,
      });
      const columns = [
        {
          name: 'name',
          required: true,
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'calories', align: 'center', field: 'calories', sortable: true },
        { name: 'fat', field: 'fat', sortable: true },
        { name: 'carbs', field: 'carbs' },
      ]

      const rows = [
        {
          name: '2023-11-08',
          calories: 'Recharge-VTH',
          fat: '+$26.623',
          carbs: 'fail',
          i: 0,
        },
        {
          name: '2023-11-08',
          calories: 'Recharge-VTH',
          fat: '+$26.623',
          carbs: 'fail',
          i: 1,
        },
      ];
      let ro = new ResizeObserver(entries => {
        for (let entry of entries) {
          entry
          // const { width, height } = entry.contentRect
          // console.log('窗口大小变化为：', width, height)
        }
      })

      onMounted(() => {
        ro.observe(document.body)
        // 生成7日折线图
        const lineChart = echarts.init(document.getElementById('lineChart'))
        lineChart.setOption(store.lineOption)
        // 生成30日折线图
        // const lineType = echarts.init(document.getElementById('lineThirty'))
        // lineType.setOption(store.lineThirty)
        window.addEventListener('resize', lineChart.resize) // 添加窗口自适应事件监听
        // window.addEventListener('resize', lineType.resize) // 添加窗口自适应事件监听
      })

      onUnmounted(() => {
        ro.unobserve(document.body)
      });
      return {
        ...toRefs(store),
        columns,
        rows,
        // 表格、分页
        changePagination(val : number) {
          console.log(`changePagination: ${val}`)
          store.pagination.page = val
        },
        refreshTableData() {
          console.log(store.toPage);
          if (store.toPage <= store.pagination.page) {
            store.pagination.page = parseInt(store.toPage)
          }
        },
        // 切换折线图
        switchDate(name : string) {
          store.lineType = name
          if (name == '近7日') {
            store.lineOption = lineOption
            const lineChart = echarts.init(document.getElementById('lineChart'))
            lineChart.setOption(store.lineOption)
            window.addEventListener('resize', lineChart.resize) // 添加窗口自适应事件监听
          } else {
            store.lineOption = lineThirty
            const lineChart = echarts.init(document.getElementById('lineChart'))
            lineChart.setOption(store.lineOption)
            window.addEventListener('resize', lineChart.resize) // 添加窗口自适应事件监听
          }

        },
        to(url : string) {
          if (url) {
            router.push(url)
          }
        }
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
