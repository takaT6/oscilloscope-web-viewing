<template>
  <div :id="Const.GRAPH_ID"></div>
</template>

<script setup lang="ts" >

import Plotly from 'plotly.js-dist-min'
import { Const } from '@/components/common'
import { onMounted } from "vue";
import { useOscContorllerStore } from "@/store/store";

const {getPlotlyData} = useOscContorllerStore();

let config = {
  // Hide the Plotly Logo on the Modebar
  displaylogo: false,
  // Making a Responsive Chart
  responsive: true
};

onMounted(()=> {
  let plotlyData = getPlotlyData();
  Plotly.newPlot(
    Const.GRAPH_ID,
    [{ 
      type: "scattergl",
      x: plotlyData.x,
      y: plotlyData.y,
      mode: "lines",
    }],
    {
      showlegend: false
    },
    config
  );
  updateData();
  updateChartInfo();
});

let layout_update = {
  title: 'hoge hoge title', // updates the title
};

let intervalId = 0;
const updateData = () => {
  clearInterval(intervalId);
  intervalId = setInterval(()=> {
    let plotlyData = getPlotlyData();
    let newData = {
      x: [plotlyData.x],
      y: [plotlyData.y]
    }
    let lastTimeStamp = newData.x[0].slice(-1)[0];
    let minuteView = {
      xaxis: {
        range: [lastTimeStamp-2, lastTimeStamp]
      }
    };
    Plotly.update('graph', newData, {});
    // Plotly.prependTraces('graph', newData, [0])
    // Plotly.relayout('graph', minuteView as Partial<Plotly.Layout>);
  },100);
  // requestAnimationFrame(updateData);
}


let intervalId2 = 0;
const updateChartInfo = () => {
  clearInterval(intervalId2);
  intervalId2 = setInterval(()=> {
    let plotlyData = getPlotlyData();
    let maxElm = document.getElementById('max-val');
    let minElm = document.getElementById('min-val');
    let freqElm = document.getElementById('freq-val');
    let max = Math.max(...plotlyData.y);
    let min = Math.min(...plotlyData.y);
    maxElm!.innerHTML = String(max);
    minElm!.innerHTML = String(min);
    const freq = () => {
      let maxX = Math.max(...plotlyData.x);
      let minX = Math.min(...plotlyData.x);
      let timeRange = maxX-minX;
      return plotlyData.x.length/timeRange
    }
    freqElm!.innerHTML = String(Math.floor(freq()))
    freqElm!.innerHTML = String(Math.floor(1/(plotlyData.x[1]-plotlyData.x[0])));
    // plotlyData.x.
  },100)
}
// updateData();

</script>