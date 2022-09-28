<template>
  <div id="connection-controller1"/>
  <div id="connection-controller2"/>
  <div class="chart">
    <LineChart/>
  </div>
  <div id="connection-controller3"/>
  <WSController/>
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue'
import { defineAsyncComponent} from "vue"

// Lazy loading
const WSController = defineAsyncComponent(
  () => import("./WSController.vue")
);

</script>

<style scoped lang="scss">

</style>
