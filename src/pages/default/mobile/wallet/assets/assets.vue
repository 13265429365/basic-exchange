<template>
  <div class="column full-width" style="min-height: 100vh;">
    <div class="col page_bg q-pa-md full-width">

      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between radius-8 q-mb-md">
        <div class="column justify-center">
          <div class="row items-center">
            <div class="text-white">Total Assets</div>
            <q-icon @click="moneyShow = !moneyShow" :name="!moneyShow ? 'o_visibility' : 'o_visibility_off'"
              class="q-ml-sm cursor-pointer text-white" size="18px"></q-icon>
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
      <div class="row justify-between q-mb-md btn">
        <q-btn @click="$router.push(quickMenu.route)" v-for="(quickMenu, quickMenuIndex) in quickMenuList"
          :key="quickMenuIndex" style="width: 47%;" class="bg-white q-py-sm radius-8" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc(quickMenu.icon)" width="42px" height="42px" />
            <div>{{ quickMenu.name }}</div>
          </div>
        </q-btn>
      </div>

      <!-- echarts -->
      <div class="bg-white q-pa-md radius-8">
        <div class="text-weight-bold q-mb-lg">资产分布</div>
        <div class="row justify-center q-mb-lg">
          <div @click="init(item.name)" v-for="(item, i) in typeList" :key="i"
            :class="['q-mx-xs q-px-md q-py-xs', { 'text-white': item.name == type, 'bg-primary': item.name == type, 'text-grey-8': item.name != type, 'page_bg': item.name != type, }]"
            style="border-radius: 18px;">
            {{ item.name }}
          </div>
        </div>
        <div v-show="type == '饼图'">

          <!-- 饼状图 -->
          <div class="row justify-center q-mb-sm">
            <div id="myChart" style="width: 140px;height: 140px;"></div>
          </div>

          <!-- 资产账户列表 -->
          <div v-for="(item, i) in list" :key="i">
            <div class="row justify-between items-center justify-start">
              <div class="row items-center">
                <div class="border" :style="item.back"></div>
                <div class="q-mr-md text-grey-7">{{ item.name }}</div>
                <div>{{ item.percentage }}</div>
              </div>
              <div class="text-weight-bold">{{ item.money }}</div>
            </div>
            <q-separator v-if="i < list.length - 1" class="q-my-xs" style="background: #F4F5FD" />
          </div>

        </div>

        <!-- 折线图 -->
        <div v-show="type == '折线图'">
          <div class="row justify-end q-mb-md">
            <div class="bg-grey-1 q-pa-xs row" style="border-radius: 4px;">
              <div @click="switchDate(item.name)" v-for="(item, i) in lineDate" :key="i"
                :class="['q-mx-xs q-px-sm q-py-xs', { 'bg-white': item.name == lineType, 'text-grey-8': item.name != lineType, 'bg-grey-1': item.name != lineType, }]"
                style="border-radius: 2px;">
                {{ item.name }}
              </div>
            </div>
          </div>

          <!-- 折线图 -->
          <div class="row justify-center q-mb-sm">
            <div id="lineChart" style="height: 230px;width: 288px;"></div>
          </div>
        </div>

      </div>

      <!--  -->
      <div class="q-mt-md q-mb-sm text-weight-bold">资产账户</div>
      <div v-for="(item, i) in accountList" :key="i"
        class="row justify-between items-center bg-white q-py-sm q-px-md q-mb-sm radius-8">
        <div class="row items-center">
          <q-img class="q-mr-sm" width="26px" height="26px" :src="imageSrc('')" />
          <div class="text-weight-bold">{{ item.name }}</div>
        </div>
        <div>
          <div class="text-weight-bold" style="font-size: 16px;">{{ item.money }}</div>
          <div class="text-right" style="font-size: 12px;">{{ item.percentage }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import * as echarts from 'echarts'
import { lineOption, lineThirty, option } from './ts/data';
import { imageSrc } from 'src/utils/index';
import { InitStore } from 'src/stores/init';


export default {
  name: 'myProperty',
  setup(props: any, context: any) {
    const $initStore = InitStore()

    const state = reactive({
      // 点击显示、隐藏金额 
      moneyShow: false,

      // 快捷菜单
      quickMenuList: [] as any,

      // 饼状图下的列表
      list: [] as any,

      //资产账户
      accountList: [] as any,

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

      // 折线图echarts
      lineOption,

      // 饼图echarts
      option,
    });

    context.emit('update', {
      title: 'MyAssets',
    })

    state.quickMenuList = $initStore.quickMenu;

    state.list = [{
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
    },]

    state.accountList = [{
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
    },]

    onMounted(() => {
      // 生成饼图
      const chart = echarts.init(document.getElementById('myChart'))
      chart.setOption(state.option)

      const lineChart = echarts.init(document.getElementById('lineChart'))
      lineChart.setOption(lineOption)
    })

    // 切换饼、折线图
    const init = (name: string) => {
      state.type = name
    }

    // 切换7、30天折线图
    const switchDate = (name: string) => {
      const lineChart = echarts.init(document.getElementById('lineChart'))
      if (name == '近7日') {
        lineChart.setOption(state.lineOption)
      } else {
        lineChart.setOption(state.lineThirty)
      }
      state.lineType = name
    }
    return {
      imageSrc,
      ...toRefs(state),
      init,
      switchDate,
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
