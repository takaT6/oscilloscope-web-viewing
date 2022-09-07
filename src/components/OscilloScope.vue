<template>
  <div class="controller">
    <!-- <WSController/> -->
  </div>
  <div class="chart">
    oscilloscope
    <LineChart />
  </div>
</template>

<script setup lang="ts">
// import BarChart from './BarChart.vue'
// import WSController from './WSController.vue';
import LineChart from './LineChart.vue'

</script>

<style scoped lang="scss">

.chart {
  // height: auto;
  width: 50vw;
}
</style>
