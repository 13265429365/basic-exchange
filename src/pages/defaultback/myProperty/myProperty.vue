<template>
  <div class="column full-width" style="min-height: 100vh;">
    <navBar title="My Property"></navBar>
    <div class="col page_bg q-pa-md full-width">
      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between radius-8">
        <div class="column justify-center">
          <div class="row items-center">
            <div class="text-white">Total Assets</div>
            <q-img @click="moneyShow = !moneyShow" src="/images/mobile/wallet/eyes.png" class="q-ml-sm" width="18px" height="18px" />
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div v-if="moneyShow" class="text-white row items-center">
            <span class="q-mr-sm text-weight-bold" style="font-size: 22px;">$1200.00</span>
            <span>≈￥69865,21 </span>
          </div>
          <div v-else class="text-white text-weight-bold " style="font-size: 22px;">**** </div>
        </div>
      </div>
      <!-- 充值提现 -->
      <div class="row q-my-sm btn">
        <q-btn @click="to('recharge')" no-caps style="padding: 9px 15px;border-radius: 8px"
          class="bg-white col q-mr-md justify-start">
          <q-img class="manage" src="/images/mobile/wallet/shop.png" />
          <div>Recharge</div>
        </q-btn>
        <q-btn @click="to('withdrawal')" no-caps style="padding: 9px 15px;border-radius: 8px" class="bg-white col">
          <q-img class="manage" src="/images/mobile/wallet/cashOut.png" />
          <div>Cash Out</div>
        </q-btn>
      </div>
      <!-- echarts -->
      <div class="bg-white q-pa-md radius-8">
        <div class="text-weight-bold q-mb-lg">资产分布</div>
        <div class="row justify-center q-mb-lg">
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
          <!-- 资产账户列表 -->
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
          <div class="row justify-end q-mb-md">
            <div class="bg-grey-1 q-pa-xs row" style="border-radius: 4px;">
              <div @click="switchDate(item.name)" v-for="(item, i) in lineDate" :key="i"
                :class="['q-mx-xs q-px-sm q-py-xs',{'bg-white':item.name==lineType,'text-grey-8':item.name!=lineType,'bg-grey-1':item.name!=lineType, }]"
                style="border-radius: 2px;">
                {{item.name}}
              </div>
            </div>

          </div>
          <!-- 折线图 -->
          <div class="row justify-center q-mb-sm">
            <div v-show="lineType=='近7日'" id="lineChart" style="height: 230px;width: 288px;"></div>
            <div v-show="lineType=='近30日'" id="lineThirty" style="height: 230px;width: 288px;"></div>
          </div>
        </div>
      </div>
      <div class="q-mt-md q-mb-sm text-weight-bold">资产账户</div>
      <div v-for="(item, i) in accountList" :key="i"
        class="row justify-between items-center bg-white q-py-sm q-px-md q-mb-sm radius-8">
        <div class="row items-center">
          <q-img class="q-mr-sm" width="26px" height="26px" :src="`/images/mobile/property/${item.icon}.png`" />
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
  import navBar from 'src/layouts/mobile/header.vue';
  import { useRouter } from 'vue-router';
  import * as echarts from 'echarts'
import { lineOption, lineThirty, option } from './ts/data';
  export default {
    name: 'myProperty',
    components: { navBar },
    setup() {
      const router = useRouter();
      const state = reactive({
        // 点击显示、隐藏金额
        moneyShow: false,

        // 饼状图下的列表
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
        //资产账户
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
        // 饼、折线图button
        typeList: [
          { name: '饼图' },
          { name: '折线图' },
        ],
        type: '饼图',
        // 饼、折线图button
        lineDate: [
          { name: '近7日' },
          { name: '近30日' },
        ],
        lineType: '近7日',
        // 7日折线图echarts
        lineOption,
        // 30日折线图echarts
        lineThirty,
        // 饼图echarts
        option,
      });
      onMounted(() => {
        // 生成饼图
        const chart = echarts.init(document.getElementById('myChart'))
        chart.setOption(state.option)
        // 生成7日折线图
        const lineChart = echarts.init(document.getElementById('lineChart'))
        lineChart.setOption(state.lineOption)
        // 生成30日折线图
        const lineType = echarts.init(document.getElementById('lineThirty'))
        lineType.setOption(state.lineThirty)
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
        },
        switchDate(name : string) {
          state.lineType = name
        },
      }
    },
  };
</script>
<style scoped>
@import url("../../../css/mobileCss.css");
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
