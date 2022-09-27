<template>
  <div id="graph"></div>
</template>

<script setup lang="ts" >

import Plotly from 'plotly.js-dist-min'
import { onMounted } from "vue";
import { useOscContorllerStore } from "@/store/store";

const {getPlotlyData} = useOscContorllerStore();

var config = {
  // Hide the Plotly Logo on the Modebar
  displaylogo: false,
  // Making a Responsive Chart
  responsive: true
};

console.log(getPlotlyData()[0])

onMounted(()=> {
  let plotlyData = getPlotlyData();
  Plotly.newPlot(
    "graph",
    [{ 
      x: plotlyData[0],
      y: plotlyData[1],
      // mode: "lines",
    }],
    {
      showlegend: false
    },
    config
  );
  updateData()
});

var layout_update = {
    title: 'some new title', // updates the title
};

let intervalId = 0;
const updateData = () => {
  clearInterval(intervalId);
  intervalId = setInterval(()=> {
    let plotlyData = getPlotlyData();
    let newData = {
      x: [plotlyData[0]],
      y: [plotlyData[1]]
    }
    // let lastTimeStamp = plotlyData[0].slice(-1)[0];
    // let minuteView = {
    //   xaxis: {
    //     range: [lastTimeStamp-10, lastTimeStamp]
    //   }
    // };
    Plotly.update('graph', newData, layout_update);
    // Plotly.prependTraces('graph', newData, [0])
    // Plotly.relayout('graph', minuteView as Partial<Plotly.Layout>);
  },100);
  // requestAnimationFrame(updateData);
}
// updateData();

</script>