<template>
  <div>
    <UplotVue
      :data="props.uplotData"
      :options="uplotOptions"
    />
  </div>
</template>

<script setup lang="ts" >
import "../../node_modules/uplot/dist/uPlot.min.css";
import UplotVue from 'uplot-vue';


const props = defineProps({
  uplotData: Array
});

const uplotOptions = {
  title: "mV",
  width: 1000,
  height: 300,
  series: [
    {
      label: "time",
    },
    {
      label: "mV",
      points: { show: false },
      stroke: "#00437a",
      // fill: "#00437a22",
    },
  ],
  scales: { x: { time: false } },
};


</script>