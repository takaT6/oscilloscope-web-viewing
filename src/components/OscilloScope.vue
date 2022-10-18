<template>
  <div id="connection-controller1"/>
  <div class="chart-area">
    <!-- <LineChart/> -->
  </div>
  <div id="connection-controller2"/>
  <WSController/>
  <br>
  <div id="chart-info">
    <div class="text-left">
      <SlidersView/>
      <div>Max= <span id="max-val"></span> V</div>
      <div>Min= <span id="min-val"></span> V</div>
      <div>Freq= <span id="freq-val"></span> S/s</div>
    </div>
  </div>
  <!-- <div class="chart-area">
    <LineChart2/>
  </div> -->
  <div class="chart-area">
    <LineChart3/>
  </div>
  <!-- <div class="chart-area">
    <LineChart4/>
  </div> -->
</template>

<script setup lang="ts">
// import autoanimate
import LineChart from './LineChart.vue'
import LineChart2 from './LineChart2.vue'
import LineChart3 from './LineChart3.vue'
import LineChart4 from './LineChart4.vue'
import SlidersView from './SlidersView.vue'
import { defineAsyncComponent} from "vue"

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
