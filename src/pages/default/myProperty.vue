<template>
  <div class="column full-width" style="min-height: 100vh;">
    <navBar title="My Property"></navBar>
    <div class="col page_bg q-pa-md full-width">
      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between radius-8">
        <div class="column justify-center">
          <div class="row items-center">
            <div class="text-white">Total Assets</div>
            <q-img src="/images/default/eyes.png" class="q-ml-sm" width="18px" height="18px" />
          </div>
          <div class="text-white row items-center">
            <span class="q-mr-sm text-weight-bold" style="font-size: 22px;">$1200.00</span>
            <span>≈￥69865,21 </span>
          </div>
        </div>
      </div>
      <!-- 充值提现 -->
      <div class="row q-my-sm btn">
        <q-btn @click="to('recharge')" no-caps style="padding: 9px 15px;border-radius: 8px"
          class="bg-white col q-mr-md justify-start">
          <q-img class="manage" src="/images/default/shop.png" />
          <div>Recharge</div>
        </q-btn>
        <q-btn @click="to('withdrawal')" no-caps style="padding: 9px 15px;border-radius: 8px" class="bg-white col">
          <q-img class="manage" src="/images/default/transaction.png" />
          <div>Cash Out</div>
        </q-btn>
      </div>
      <!-- echarts -->
      <div class="bg-white q-pa-md radius-8">
        <div class="text-weight-bold q-mb-lg">资产分布</div>
        <div class="row justify-center q-mb-md">
          <div @click="init(item.name)" v-for="(item, i) in typeList" :key="i"
            :class="['q-mx-xs q-px-md q-py-xs',{'text-white':item.name==type,'bg-primary':item.name==type,'text-grey-8':item.name!=type,'page_bg':item.name!=type, }]"
            style="border-radius: 18px;">
            {{item.name}}
          </div>
        </div>
        <div v-show="type=='饼图'">
          <!-- 饼状图 -->
          <div class="row justify-center q-mb-sm">
            <div id="myChart" style="width: 140px;height: 140px;"></div>
          </div>
          <!-- 列表 -->
          <div v-for="(item,i) in list" :key="i">
            <div class="row justify-between items-center justify-start">
              <div class="row items-center">
                <div class="border" :style="item.back"></div>
                <div class="q-mr-md text-grey-7">{{item.name}}</div>
                <div>{{item.percentage}}</div>
              </div>
              <div class="text-weight-bold">{{item.money}}</div>
            </div>
            <q-separator v-if="i<list.length-1" class="q-my-xs" style="background: #F4F5FD" />
          </div>
        </div>
        <div v-show="type=='折线图'">
          <!-- 饼状图 -->
          <div class="row justify-center q-mb-sm">
            <div id="lineChart" style="height: 230px;width: 288px;"></div>
          </div>
        </div>
      </div>
      <div class="q-mt-md q-mb-sm text-weight-bold">资产账户</div>
      <div v-for="(item, i) in accountList" :key="i"
        class="row justify-between items-center bg-white q-py-sm q-px-md q-mb-sm radius-8">
        <div class="row items-center">
          <q-img class="q-mr-sm" width="26px" height="26px" :src="`/images/delete/${item.icon}.png`" />
          <div class="text-weight-bold">{{item.name}}</div>
        </div>
        <div>
          <div class="text-weight-bold" style="font-size: 16px;">{{item.money}}</div>
          <div class="text-right" style="font-size: 12px;">{{item.percentage}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive, toRefs, onMounted } from 'vue';
  import navBar from 'src/components/navBar.vue';
  import { useRouter } from 'vue-router';
  import * as echarts from 'echarts'

  export default {
    name: 'myProperty',
    components: { navBar },
    setup() {
      const router = useRouter();
      const state = reactive({
        list: [
          {
            name: '积分',
            percentage: '-40%',
            money: '169.05',
            back: 'background: #165DFF;'
          },
          {
            name: 'BTC',
            percentage: '-30%',
            money: '126.78',
            back: 'background: #14C9C9;'
          },
          {
            name: '钻石',
            percentage: '-40%',
            money: '126.78',
            back: 'background: #F7BA1E;'
          },
        ],
        //
        accountList: [
          {
            name: 'BTC',
            percentage: '≈￥20,21',
            money: '$2650,21',
            icon: 'btcIcon'
          },
          {
            name: 'My Wallet',
            percentage: '≈￥20,21',
            money: '$6932',
            icon: 'wallet'
          },
          {
            name: 'Integral',
            percentage: '≈￥20,21',
            money: '$50,21',
            icon: 'species'
          },
          {
            name: 'TRC',
            percentage: '≈￥20,21',
            money: '$50,21',
            icon: 'trc'
          },
        ],
        typeList: [
          { name: '饼图' },
          { name: '折线图' },
        ],
        type: '饼图',
        // 饼状图
        option: {
          // tooltip: {
          //   trigger: 'item'
          // },
          title: {
            text: '总资产',
            subtext: '422.61',
            left: 'center', // 标题居中
            top: '32%',
            textStyle: { // 标题样式
              color: '#4E5969', // 标题颜色
              fontSize: '12px',
              textDecoration: 'underline' // 标题装饰
            },
            subtextStyle: { // 子标题样式
              color: '#1D2129', // 子标题颜色
              fontStyle: 'bold', // 子标题字体样式
              fontSize: '12px',
            },
            padding: [10, 10], // 标题与内容间距
            itemGap: 8 // 同一级标签间距
          },
          series: [
            {
              type: 'pie',
              radius: ['55%', '90%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
              },
              emphasis: {
                label: { show: false },
              },
              data: [
                { value: 1048, name: '积分', itemStyle: { color: '#3F82FE' } },
                { value: 735, name: 'BTC', itemStyle: { color: '#14C9C9' } },
                { value: 580, name: '钻石', itemStyle: { color: '#F7BA1E' } },
              ]
            }
          ]
        },
        // 折线图
        lineOption: {
          grid: {
            show: false,
            // left: '0',
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
      });
      onMounted(() => {
        const chart = echarts.init(document.getElementById('myChart'))
        const lineChart = echarts.init(document.getElementById('lineChart'))
        chart.setOption(state.option)
        lineChart.setOption(state.lineOption)
      })
      return {
        ...toRefs(state),
        to(url : string) {
          if (url) {
            router.push(url)
          }
        },
        init(name : string) {
          console.log(name)
          state.type = name
          // if (name=='饼图') {
          //   const chart = echarts.init(document.getElementById('myChart'))
          //   chart.setOption(state.option)
          // } else {
          //   const lineChart = echarts.init(document.getElementById('lineChart'))
          //   lineChart.setOption(state.option)
          // }
        },
      }
    },
  };
</script>
<style scoped>
  .border {
    width: 2px;
    height: 12px;
    border-radius: 2px;
    margin-right: 4px;
  }

  :deep .btn>.q-btn .q-btn__content {
    justify-content: start !important;
  }

  :deep .q-btn:before {
    box-shadow: 0 0 0 !important;
  }

  .manage {
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }
</style>
