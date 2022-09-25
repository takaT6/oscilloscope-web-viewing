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
  cursor: {
    drag: {
      setScale: false,
    }
  },
  series: [
    {
      label: "時間(m)",
    },
    {
      label: "mV",
      points: { show: false },
      stroke: "green",
      // fill: "#00437a22",
    },
  ],
  scales: {
    x: {
      time: false,
    },
    y: {
      auto: false,
      range: [-5, 5],
    }
  },
  axes:[
    {
      grid: {show: true},
      space: 300,
      // show: false
    },
    {
      show: true
    }
  ],
};


</script>