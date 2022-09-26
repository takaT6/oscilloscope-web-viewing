<template>
  <div>
    <!-- <UplotVue
      :data="props.uplotData"
      :options="uplotOptions"
    /> -->
  </div>
  <!-- <div id="graph"></div> -->
</template>

<script setup lang="ts" >
import "../../node_modules/uplot/dist/uPlot.min.css";
import UplotVue from 'uplot-vue';

// import Plotly from 'plotly.js-dist-min'
// import { onMounted } from "vue";

// onMounted(()=> {
//   Plotly.newPlot("graph",[{ 
//     // x: [],
//     y: [1,2,3],
//     // "width": 600, "height": 400
//   }])
// });

// let intervalId = 0;
// const updateData = () => {
//   clearInterval(intervalId);
//   intervalId = setInterval(()=> {
//     Plotly.update('graph', props.plotlyData)
//     console.log(props.plotlyData)
//   },100);
// }
// updateData()

const props = defineProps({
  uplotData: Array,
  plotlyData: Object
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