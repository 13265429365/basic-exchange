//btc.vue
export const walletList = [
  {
    name: 'Recharge-BTC',
    date: '2023/10/12 12:20:36',
    money: '+236',
    type: 'examine'
  },
  {
    name: 'Recharge-BTC',
    date: '2023/10/12 13:26:06',
    money: '+236',
    type: 'fail'
  },
  {
    name: 'Recharge-BTC',
    date: '2023/10/12 08:20:36',
    money: '+236',
    type: 'success'
  },
  {
    name: 'Cash Out-Digital Currency',
    date: '2023/10/12 10:12:32',
    money: '+236',
    type: 'success'
  }
]

// myProperty.vue----------------------------------------------
// 饼状图echarts
export const option = {
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
}
// 7日折线图echarts
export const lineOption = {
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
// 30日折线图echarts
export const lineThirty = {
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
    data: ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6','9/7', '9/8', '9/9','9/10', '9/11', '9/12', '9/13', '9/14', '9/15', '9/16','9/17', '9/18', '9/19', '9/20', '9/21', '9/22', '9/23','9/24', '9/25', '9/26', '9/27', '9/28', '9/29', '9/30',],
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
      data: [0, 40, 80, 90, 40, 0, 90,0, 40, 80, 90, 40, 0, 90,0, 40, 80, 90, 40, 0, 90,0, 40, 80, 90, 40, 0, 90,0, 90],
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#3F82FE' // 设置线条颜色为红色
      },
    },
    {
      name: 'BTC',
      data: [30, 40, 20, 83, 42, 60, 100,30, 40, 20, 83, 42, 60, 100,30, 40, 20, 83, 42, 60, 100,30, 40, 20, 83, 42, 60, 100,60, 100],
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#01AC66' // 设置线条颜色为红色
      },
    },
  ]
}