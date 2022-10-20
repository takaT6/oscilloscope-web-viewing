<template>
  <div :id="Const.GRAPH_ID"></div>
</template>

<script setup lang="ts" >
import * as echarts from 'echarts';
import { onMounted, watch } from "vue";
import { storeToRefs } from 'pinia'
import { Const } from '@/components/common'
import { useOscContorllerStore } from "@/store/store";

const store = useOscContorllerStore();
const { getPlotlyData, getIsProcess } = store
type EChartsOption = echarts.EChartsOption

const option: EChartsOption = {
  title: { 
    text: 'Web Osillo',
    textStyle:{
      color: '#ffffff'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
    iconStyle: {
      borderColor: '#ffffff'
    },
  },
  animation: false,
  xAxis: {
    data: [],
    axisLabel: {
      formatter: (d: any) => Number(d).toFixed(2),
      interval: 1000,
      align: 'center',
      color: '#ffffff',
    },
  },
  yAxis: {
    name: "mV",
    nameLocation: "middle",
    axisLabel: {
      color: '#ffffff'
    },
  },
  series: [{
    data: [],
    type: 'line',
    showSymbol: false,
    symbol: 'none',
    color: '#00FF00',
  }],
  backgroundColor: '#000000',
};


let chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement;

let myChart = chartDom ? echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1}) : undefined;

onMounted(()=> {
  chartDom ?? (chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement);
  myChart = echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1});
  myChart.setOption(option);
  // newFrame();
})

const newFrame = (): void => {
  const plotlyData = getPlotlyData();
  myChart?.setOption({
    xAxis: { data: plotlyData.x },
    series:{ data: plotlyData.y }
  });
  if(getIsProcess())requestAnimationFrame(newFrame);
}

watch(() => store.isProcess, () => {
  console.log("wath");
  newFrame();
})

</script>

<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}
</style>
