<template>
  <div id="graph"></div>
</template>

<script setup lang="ts" >

import Plotly from 'plotly.js-dist-min'
import { onMounted } from "vue";

const props = defineProps<{
  plotlyData: number[][]
}>();

var config = {
  // Hide the Plotly Logo on the Modebar
  displaylogo: false,
  // Making a Responsive Chart
  responsive: true
};
console.log(props.plotlyData[0])
onMounted(()=> {
  Plotly.newPlot(
    "graph",
    [{ 
      x: props.plotlyData[0],
      y: props.plotlyData[1],
      mode: "lines",
    }],
    {
      showlegend: false
    },
    config
  );
});

var layout_update = {
    title: 'some new title', // updates the title
};

let intervalId = 0;
const updateData = () => {
  clearInterval(intervalId);
  intervalId = setInterval(()=> {
    let rowData = [...props.plotlyData]
    let newData = {
      x: [rowData[0]],
      y: [rowData[1]]
    }
    let lastTimeStamp = rowData[0].slice(-1)[0];
    let minuteView = {
      xaxis: {
        range: [lastTimeStamp-10, lastTimeStamp]
      }
    };

    Plotly.update('graph', newData, layout_update);
    // Plotly.prependTraces('graph', newData, [0])
    // Plotly.relayout('graph', minuteView as Partial<Plotly.Layout>);
  },100);
  // requestAnimationFrame(updateData);
}

</script>