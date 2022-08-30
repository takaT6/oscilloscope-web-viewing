<template>
  <div class="controller">
    <WSController/>
  </div>
  <div class="chart">
    oscilloscope
    <canvas id="myChart"></canvas>
  </div>
  <BarChart />
</template>

<script setup lang="ts">
import BarChart from './BarChart.vue'
import WSController from './WSController.vue';


</script>

<style scoped lang="scss">
</style>
