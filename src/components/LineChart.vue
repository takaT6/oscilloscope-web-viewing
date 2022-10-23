<template>
  <div :id="Const.GRAPH_ID"></div>
</template>

<script setup lang="ts" >
import * as echarts from 'echarts';
import { onMounted, watch, toRefs, reactive } from "vue";
import { storeToRefs } from 'pinia';
import { Const } from '@/components/common';
import { useOscContorllerStore, useChartOptionStore } from '@/store/store';

const store = useOscContorllerStore();
const { getPlotlyData } = store;
const { isProcess } = storeToRefs(store);

const optionStore = useChartOptionStore();
const { getChartOption } = optionStore;
const chartOption = reactive(optionStore.chartOption);

let chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement;

let myChart = chartDom ? echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1}) : undefined;

onMounted(()=> {
  chartDom ?? (chartDom = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement);
  myChart = echarts.init(chartDom, undefined, {useDirtyRect:true, devicePixelRatio:1});
  myChart.setOption(optionStore.chartOption);
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

watch(isProcess, () => {
  console.log("wath isProcess", store.isProcess);
  newFrame();
});

watch(chartOption, () => {
  console.log("wath option");
  myChart?.setOption(getChartOption());
  newFrame();
});

</script>

<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}
</style>
