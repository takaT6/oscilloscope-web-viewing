<template>
  <canvas id="canvas" width="400" height="400"></canvas>
  <div id="chart"></div>

  <!-- <d3fc-group auto-resize> -->
    <d3fc-canvas></d3fc-canvas>
    <div id="loading">
      <h2>Loading...</h2>
      <p>Creating dataset </p>
    </div>
  <!-- </d3fc-group> -->
</template>

<script setup lang="ts">
import { onMounted, watch, toRefs, reactive } from "vue";
import * as d3 from 'd3'
import * as fc from 'd3fc'
import { createNoise2D } from 'simplex-noise';

import CanvasWorker from 'worker-loader?inline=fallback!@/work/canvas-worker.ts';
import { HtmlAttributes } from "csstype";
onMounted(()=>{

  // // const offscreen = new OffscreenCanvas(256, 256);
  // // const gl = offscreen.getContext('webgl');
  // const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  // const width = 500, height = 250;
  // canvas.width = width;
  // canvas.height = height;
  // const offscreenCanvas = canvas.transferControlToOffscreen() as OffscreenCanvas;
  // // WebWorker  Instance
  const cWorker = new CanvasWorker();
  // cWorker.postMessage({ canvas: offscreenCanvas },[offscreenCanvas]);
  // cWorker.onmessage = (event: MessageEvent): void => {
  //   console.log('get data: ', event.data);
  // }


  const canvasContainer = document.querySelector('d3fc-canvas');
  // const canvas = canvasContainer!.querySelector('canvas');
  canvasContainer!.addEventListener('measure', () => {
        const canvas = canvasContainer!
            .querySelector('canvas');
        if (canvas!.transferControlToOffscreen == null) {
            alert(`It looks like OffscreenCanvas isn't supported by your browser`);
        }
        const offscreenCanvas = canvas!.transferControlToOffscreen();
        cWorker.postMessage({ offscreenCanvas }, [offscreenCanvas]);
        cWorker.addEventListener('message', ({ data }) => {
            if (data !== 'frame') {
                // document.querySelector('#loading>p').innerText = data;
            } else {
                // document.querySelector('#loading').style.display = 'none';
            }
        });
    const width = 500, height = 250;
    cWorker.postMessage({ width, height });
});
  // const width = 500, height = 250;
  // const data = d3.range(0, 50).map(d => Math.random());

  // const xScale = d3.scaleLinear()
  //   .domain([0, 50])
  //   .range([0, width]);

  // const yScale = d3.scaleLinear()
  //   .domain([0, 1])
  //   .range([height, 0]);

  // const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  // canvas.width = width;
  // canvas.height = height;
  // const gl = canvas.getContext('webgl');

  // // the webgl series component that renders data, transformed
  // // using D3 scales, onto a WebGL context
  // const webglLine = fc.seriesWebglLine()
  //   .xScale(xScale)
  //   .yScale(yScale)
  //   .crossValue((_: any, i: any) => i)
  //   .mainValue((d: any) => d)
  //   .context(gl);

  // webglLine(data);

//   const data = fc.randomFinancial()(100);

// const xScale = d3
//     .scaleTime()
//     .domain(fc.extentTime().accessors([(d:any) => d.date])(data));

// const yScale = d3
//     .scaleLinear()
//     .domain(fc.extentLinear().accessors([(d:any) => d.high, (d:any) => d.low])(data));

// const candlestick = fc.seriesWebglCandlestick();

// const gridline = fc.annotationCanvasGridline();

// const lowLine = fc
//     .seriesSvgLine()
//     .crossValue((d:any) => d.date)
//     .mainValue((d:any) => d.low);

// const chart = fc
//     .chartCartesian(xScale, yScale)
//     .webglPlotArea(candlestick)
//     .canvasPlotArea(gridline)
//     .svgPlotArea(lowLine);

// d3.select('#chart')
//     .datum(data)
//     .call(chart);
  
})
</script>