<template>
  <div id="connection-controller"/>
  <div class="controller">
    <WSController
      v-model:chartData="chartData"
    />
  </div>
  <div class="chart">
    oscilloscope
    <LineChart
      v-model:chartData="chartData"
    />
  </div>
  <button id="debugger1" @click="debugger1">log timestamp</button>
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue'
import { ref, defineAsyncComponent } from "vue"

var chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: []
    }
  ]
})
// Lazy loading
const WSController = defineAsyncComponent(
  () => import("./WSController.vue")
);

const debugger1 = () => {
  console.log(chartData.value)
}
</script>

<style scoped lang="scss">

.chart {
  // height: auto;
  // width: 50vw;
}
</style>
