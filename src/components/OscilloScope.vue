<template>
  <div id="connection-controller1"/>
  <div id="connection-controller2"/>
  <div class="chart">
    oscilloscope
    <LineChart
      v-model:plotlyData="plotlyData"
    />
  </div>
  <div id="connection-controller3"/>
  <WSController
      v-model:plotlyData="plotlyData"
  />
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue'
import { ref, defineAsyncComponent } from "vue"

// Lazy loading
const WSController = defineAsyncComponent(
  () => import("./WSController.vue")
);

var plotlyData = ref({})
</script>

<style scoped lang="scss">

</style>
