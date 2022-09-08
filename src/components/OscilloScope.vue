<template>
  <div id="teleport-component"/>
  <div class="controller">
    <WSController/>
  </div>
  <div class="chart">
    oscilloscope
    <BarChart />
  </div>
</template>

<script setup lang="ts">
import BarChart from './BarChart.vue'
import { defineAsyncComponent } from "vue";

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
