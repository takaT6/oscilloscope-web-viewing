<template>
  <div id="connection-controller"/>
  <div class="controller">
    <WSController/>
  </div>
  <div class="chart">
    oscilloscope
    <LineChart />
  </div>
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue'
import { defineAsyncComponent } from "vue"

// Lazy loading
const WSController = defineAsyncComponent(
  () => import("./WSController.vue")
);

</script>

<style scoped lang="scss">

.chart {
  // height: auto;
  width: 50vw;
}
</style>
