<template>
  <canvas :id="Const.GRAPH_ID" width="400" height="100"></canvas>
</template>

<script setup lang="ts" >
import { Const } from '@/components/common'
import { onMounted } from "vue";
import { useOscContorllerStore } from "@/store/store";

import { TimeSeries, SmoothieChart} from 'smoothie'
const {getPlotlyData} = useOscContorllerStore();

// Create a time series
var series = new TimeSeries();

onMounted(()=> {
  // Find the canvas
  var canvas = document.getElementById(Const.GRAPH_ID) as HTMLCanvasElement;

  // Create the chart 
  var chart = new SmoothieChart();
  chart.addTimeSeries(series, { strokeStyle: 'rgba(0, 255, 0, 1)' });
  chart.streamTo(canvas, 500);
  const newFrame =  () => {
    let plotlyData = getPlotlyData();
    for(var i=0, len = plotlyData.x.length; i < len; i++){
      series.append(Date.now(), plotlyData.y[i]);
    }
    requestAnimationFrame(newFrame);
  };
  requestAnimationFrame(newFrame);
});

</script>