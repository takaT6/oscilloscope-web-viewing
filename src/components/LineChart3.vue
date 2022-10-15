<template>
  <div id="main" style="width: 80vw;height: 40vh;"></div>
</template>

<script setup lang="ts" >
import * as echarts from 'echarts';
import { onMounted } from "vue";
import { useOscContorllerStore } from "@/store/store";
const {getPlotlyData} = useOscContorllerStore();
onMounted(()=> {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('main')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;
  option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line'
      }
    ]
  };
  setInterval(function () {
  option && myChart.setOption(option);
  let plotlyData = getPlotlyData();
  myChart.setOption({
    xAxis: [
      {
        data: plotlyData.x
      }
    ],
    series: [
      {
        data: plotlyData.y
      }
    ]
  });
  },10);
})

</script>

<style scoped lang="scss">
#my_canvas {
  width: 80vw;
  height: 40vh;
}
</style>
