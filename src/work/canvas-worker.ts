
import * as d3 from 'd3'
import * as fc from 'd3fc'
import '@babel/polyfill'
// WebWorker Instance
const worker: Worker = self as any;

worker.onmessage = (event: MessageEvent): void => {
  worker.postMessage({"data.canvas":"hoge"});
  // メインスレッドからOffscreenCanvasを受け取る
  const offscreenCanvas = event.data.canvas as OffscreenCanvas;
  plot(offscreenCanvas);
};

const plot = (offscreenCanvas: OffscreenCanvas) => {
  // offscreenCanvas.getContext('webgl');
  const gl = offscreenCanvas.getContext('webgl');
  // webglLine.context(gl);
  // webglLine(data);
}

const width = 500, height = 250;
const data = d3.range(0, 50).map(d => Math.random());

const xScale = d3.scaleLinear()
  .domain([0, 50])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, 1])
  .range([height, 0]);

const webglLine = fc.seriesWebglLine()
  .xScale(xScale)
  .yScale(yScale)
  .crossValue((_: any, i: any) => i)
  .mainValue((d: any) => d)
  // .context(gl);