// 7日折线图echarts
export const lineOption = {
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
// 30日折线图echarts
export const lineThirty = {
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
}
