<template>
  <div id="teleport-component"/>
  <div class="controller">
    <!-- <WSController/> -->
  </div>
  <div class="chart">
    oscilloscope
    <LineChart />
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import BarChart from './BarChart.vue'
import { defineAsyncComponent } from "vue";

// Lazy loading
const WSController = defineAsyncComponent(
  () => import("./WSController.vue")
);
=======
// import BarChart from './BarChart.vue'
// import WSController from './WSController.vue';
import LineChart from './LineChart.vue'
>>>>>>> 4dfd2a4a1159a41fa74b397406e76482f1f827ca

</script>

<style scoped lang="scss">

.chart {
  // height: auto;
  width: 50vw;
}
</style>
