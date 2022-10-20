<template>
  <div :id="Const.GRAPH_ID"></div>
</template>

<script setup lang="ts" >
import * as echarts from 'echarts';
import { onMounted, watch } from "vue";
import { storeToRefs } from 'pinia'
import { Const } from '@/components/common'
import { useOscContorllerStore, useChartOptionStore } from "@/store/store";

const store = useOscContorllerStore();
const { getPlotlyData, getIsProcess } = store

const optionStore = useChartOptionStore();
const { chartOption, getChartOption } = optionStore;


let chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement;

let myChart = chartDom ? echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1}) : undefined;

onMounted(()=> {
  chartDom ?? (chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement);
  myChart = echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1});
  myChart.setOption(chartOption);
  newFrame();
});

const newFrame = (): void => {
  const plotlyData = getPlotlyData();
  myChart?.setOption({
    xAxis: { data: plotlyData.x },
    series:{ data: plotlyData.y }
  });
  if(store.isProcess)requestAnimationFrame(newFrame);
};

watch(() => store.isProcess, () => {
  console.log("wath");
  newFrame();
});

watch(() => optionStore.chartOption, () => {
  myChart?.setOption(getChartOption());
});

</script>

<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}
</style>
