<template>
  <WSController/>
  <div id="connection-controller1"/>
  <br>
  <div class="chart-area">
    <LineChart/>
  </div>
  <div class="">
    <!-- <LineChart4/> -->
  </div>
  <br>
  <div id="connection-controller2"/>
  <br>
  <div id="chart-info">
    <div class="text-left">
      <div>Max= <span id="max-val"></span> V</div>
      <div>Min= <span id="min-val"></span> V</div>
      <div>Freq= <span id="freq-val"></span> S/s</div>
    </div>
  </div>
  <ChartOptions/>
</template>

<script setup lang="ts">
// import autoanimate
import LineChart from './LineChart.vue';
import LineChart4 from './LineChartTest4.vue';
import ChartOptions from './ChartOptions.vue'
import { defineAsyncComponent} from 'vue';

// Lazy loading
const WSController = defineAsyncComponent(
  () => import("./WSController.vue")
);

</script>

<style scoped lang="scss">
#chart-info {
	margin: 16px auto;
	text-align: center;
	display: block;
}
.text-left {
  text-align: left;
	display: inline-block;
}
.chart-area {
  background-color: black;
  text-align: center;
}
</style>
