<template>
  <div id="connection-controller1"/>
  <div id="connection-controller2"/>
  <div class="chart">
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
import { ref, defineAsyncComponent, Ref } from "vue"

// Lazy loading
const WSController = defineAsyncComponent(
  () => import("./WSController.vue")
);

var plotlyData: Ref<number[][]> = ref([[1,2,3],[2,3,4]]);

</script>

<style scoped lang="scss">

</style>
