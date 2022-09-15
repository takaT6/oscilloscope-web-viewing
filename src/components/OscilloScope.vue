<template>
  <div id="connection-controller"/>
  <div class="controller">
    <WSController 
      v-model:data="data" 
      v-model:timestamp="timestamp"
    />
  </div>
  <div class="chart">
    oscilloscope
    <LineChart 
      v-model:data="data" 
      v-model:timestamp="timestamp"
    />
  </div>
</template>

<script setup lang="ts">
import LineChart from './LineChart.vue'
import { ref, defineAsyncComponent } from "vue"

var data = ref([]);
var timestamp = ref([]);

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
