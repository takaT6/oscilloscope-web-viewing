<template>
  <div id="connection-controller1"/>
  <div id="connection-controller2"/>
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
  <div id="connection-controller3"/>
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue'
import { ref, defineAsyncComponent } from "vue"

var chartData = ref({
  labels: [100],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [100]
    }
  ]
})
// Lazy loading
const WSController = defineAsyncComponent(
  () => import("./WSController.vue")
);

</script>

<style scoped lang="scss">

</style>
