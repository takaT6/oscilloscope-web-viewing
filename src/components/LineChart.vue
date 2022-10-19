<template>
  <div :id="Const.GRAPH_ID"></div>
</template>

<script setup lang="ts" >
import * as echarts from 'echarts';
import { onMounted, watch } from "vue";
import { Const } from '@/components/common'
import { useWsContorllerStore } from "@/store/store";

const { getPlotlyData, isProcess } = useWsContorllerStore();

type EChartsOption = echarts.EChartsOption;

const option: EChartsOption = {
  title: { text: 'Dynamic Data' },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  animation: false,
  xAxis: {
    data: [],
    axisLabel: {
      formatter: (d: any) => Number(d).toFixed(2),
      interval: 1000,
      align: 'center'
    }
  },
  yAxis: {
    name: "mV",
    nameLocation: "middle"
  },
  series: [{
    data: [],
    type: 'line',
    showSymbol: false,
    symbol: 'none',
    color: '#00FF00'
  }],
  backgroundColor: '#000000'
};

let chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement;

let myChart: echarts.ECharts
// let myChart: echarts.ECharts = echarts.init(chartDom, undefined, { useDirtyRect:true, devicePixelRatio:1 })

onMounted(()=> {
  chartDom ?? (chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement);
  myChart = echarts.init(chartDom, undefined, { useDirtyRect:true, devicePixelRatio:1 });
  myChart.setOption(option);
  const newFrame = () => {
    let plotlyData = getPlotlyData();
    myChart.setOption({
      xAxis: { data: plotlyData.x },
      series:{ data: plotlyData.y }
    });
    requestAnimationFrame(newFrame);
  };
  requestAnimationFrame(newFrame);
});

// watch(('$window.width') => {
//     chart.resize()
//   }
// })

// myChart.resize()
</script>

<style scoped lang="scss">
#graph {
  width: 80vw;
  height: 40vh;
}
</style>
