<template>
  <div class="column full-width" style="min-height: 100vh;">
    <div class="col page_bg q-pa-md full-width">

      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between radius-8 q-mb-md">
        <div class="column justify-center">
          <div class="row items-center">
            <div class="text-white">{{ $t('totalAssets') }}</div>
            <q-icon @click="moneyShow = !moneyShow" :name="!moneyShow ? 'o_visibility' : 'o_visibility_off'"
              class="q-ml-sm cursor-pointer text-white" size="18px"></q-icon>
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div v-if="moneyShow" class="text-white row items-center">
            <span class="q-mr-sm text-weight-bold" style="font-size: 22px;">${{ form.moneySum }}</span>
            <span>≈￥{{ form.moneyRateSum }} </span>
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
            <div>{{ $t(quickMenu.name) }}</div>
          </div>
        </q-btn>
      </div>

      <!-- echarts -->
      <div class="bg-white q-pa-md radius-8">
        <div class="text-weight-bold q-mb-lg">{{ $t('assetsBlock') }} </div>
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
      <div @click="$router.push('/wallets/detail')" v-for="(item, i) in form.userAssetsList" :key="i"
        class="row justify-between items-center bg-white q-py-sm q-px-md q-mb-sm radius-8">
        <div class="row items-center">
          <q-img class="q-mr-sm" width="26px" height="26px" :src="imageSrc(item.icon)" />
          <div class="text-weight-bold">{{ item.name }}</div>
        </div>
        <div>
          <div class="text-weight-bold text-right" style="font-size: 16px;">{{ '$' + item.money }}</div>
          <div class="text-right text-grey-5" style="font-size: 12px;">{{ '≈￥' + item.moneyRate }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { UserStore } from 'src/stores/user';
import { InitStore } from 'src/stores/init';
import * as echarts from 'echarts'
import { userGetAssets } from 'src/apis/wallets';
import { imageSrc } from 'src/utils/index';
import { lineOption, lineThirty, option } from './ts/data';
import { useI18n } from 'vue-i18n';


export default defineComponent({
  name: 'myProperty',
  setup(props: any, context: any) {
    const { t } = useI18n()
    const $initStore = InitStore()
    const $userStore = UserStore()

    const state = reactive({
      // 资产数据
      form: {
        moneySum: '',
        moneyRateSum: '',
      } as any,

      // 点击显示、隐藏金额 
      moneyShow: true,

      // 快捷菜单
      quickMenuList: [] as any,

      // 饼状图下的列表
      list: [] as any,

      //资产账户
      rows: [] as any,

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
      lineOption: {} as any,
      lineThirty: {} as any,

      // 饼图echarts
      option: {} as any,
    });

    context.emit('update', {
      title: t('myAssets'),
    })

    onMounted(() => {
      state.quickMenuList = $initStore.quickMenu;

      // 生成饼图
      const chart = echarts.init(document.getElementById('myChart'))
      chart.setOption(state.option)

      const lineChart = echarts.init(document.getElementById('lineChart'))
      lineChart.setOption(state.lineOption)

      // 执行api
      getAssets()
    })

    // 获取用户资产列表
    const getAssets = () => {
      userGetAssets({ id: Number($userStore.userInfo.id) }).then((res: any) => {
        console.log('资产列表', res)
        state.form = res.data
      })
    }


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
    state.lineOption = {
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
    };
    state.lineThirty = {
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
        data: ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13', '9/14', '9/15', '9/16', '9/17', '9/18', '9/19', '9/20', '9/21', '9/22', '9/23', '9/24', '9/25', '9/26', '9/27', '9/28', '9/29', '9/30',],
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
          data: [0, 40, 80, 90, 40, 0, 90, 0, 40, 80, 90, 40, 0, 90, 0, 40, 80, 90, 40, 0, 90, 0, 40, 80, 90, 40, 0, 90, 0, 90],
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#3F82FE' // 设置线条颜色为红色
          },
        },
        {
          name: 'BTC',
          data: [30, 40, 20, 83, 42, 60, 100, 30, 40, 20, 83, 42, 60, 100, 30, 40, 20, 83, 42, 60, 100, 30, 40, 20, 83, 42, 60, 100, 60, 100],
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#01AC66' // 设置线条颜色为红色
          },
        },
      ]
    };

    // 饼图echarts
    state.option = {
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
    }


    return {
      imageSrc,
      ...toRefs(state),
      init,
      switchDate,
    }
  },
});
</script>
<style scoped>
.border {
  width: 2px;
  height: 12px;
  border-radius: 2px;
  margin-right: 4px;
}

/* :deep .btn>.q-btn .q-btn__content {
  justify-content: start !important;
} */

:deep .q-btn:before {
  box-shadow: 0 0 0 !important;
}

.manage {
  width: 42px;
  height: 42px;
  margin-right: 10px;
}
</style>
