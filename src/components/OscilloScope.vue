<template>
  <div id="connection-controller1"/>
  <div id="connection-controller2"/>
  <div class="chart">
    <LineChart/>
  </div>
  <div id="connection-controller3"/>
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
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue'
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
</style>
