
// import * as d3 from 'd3'
// import * as fc from 'd3fc'
// import { onMounted, watch, toRefs, reactive } from "vue";
// import { useOscContorllerStore, useChartOptionStore } from '@/store/store';
// import { storeToRefs } from 'pinia';
import * as echarts from 'echarts';

// WebWorker Instance
const worker: Worker = self as any;

// worker.onmessage = (evt: MessageEvent) => {
// 	const canvas = event.data.canvas;
// 	const myChart = echarts.init(canvas);
//   myChart.setOption(chartOption);
// }
let myChart: echarts.ECharts | undefined  = undefined
worker.onmessage = (event: MessageEvent): void => {
  const mssg = event.data;
  switch (mssg.type) {
    case 'canvas': {
      const canvas = event.data.value;
      myChart = echarts.init(canvas);
      myChart.setOption(chartOption);
      break;
    }
    case 'data':
      myChart?.setOption({
        xAxis: { data: event.data.value.x },
        series:{ data: event.data.value.y }
      });
      break;
    // case 'stop':
    //   stopMeasurement();
    //   break;
    // case 'disconnect':
    //   disconnectWss();
    //   break;
  }
}

// const newFrame = (): void => {
//   const plotlyData = getPlotlyData();
//   myChart?.setOption({
//     xAxis: { data: plotlyData.x },
//     series:{ data: plotlyData.y }
//   });
//   if(store.isProcess)requestAnimationFrame(newFrame);
// };

const chartOption = {
  title: { 
    text: 'Web Osillo',
    textStyle:{
      color: '#ffffff'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
    iconStyle: {
      borderColor: '#ffffff'
    },
    showTitle: false
  },
  animation: false,
  xAxis: {
    data: [],
    axisLabel: {
      formatter: (d: any) => Number(d).toFixed(2),
      interval: 1000,
      align: 'center',
      color: '#ffffff',
      show: true
    },
  },
  yAxis: {
    name: "mV",
    nameLocation: "middle",
    axisLabel: {
      color: '#ffffff',
      show: true
    },
  },
  series: [{
    data: [],
    type: 'line',
    showSymbol: false,
    symbol: 'none',
    color: '#00FF00',
    markLine: {
      symbol: 'none',
      data: [{name: '', yAxis: 0.301}],
    }
  }],
  backgroundColor: '#000000',
};
// worker.onmessage = (event: MessageEvent): void => {
//   worker.postMessage({"data.canvas":"hoge"});
//   // メインスレッドからOffscreenCanvasを受け取る
//   const offscreenCanvas = event.data.canvas as OffscreenCanvas;
//   plot(offscreenCanvas);
// };

// const plot = (offscreenCanvas: OffscreenCanvas) => {
//   // offscreenCanvas.getContext('webgl');
//   const gl = offscreenCanvas.getContext('webgl');
//   // webglLine.context(gl);
//   // webglLine(data);
// }

// const width = 500, height = 250;
// const data = d3.range(0, 50).map(d => Math.random());

// const xScale = d3.scaleLinear()
//   .domain([0, 50])
//   .range([0, width]);

// const yScale = d3.scaleLinear()
//   .domain([0, 1])
//   .range([height, 0]);

// const webglLine = fc.seriesWebglLine()
//   .xScale(xScale)
//   .yScale(yScale)
//   .crossValue((_: any, i: any) => i)
//   .mainValue((d: any) => d)
//   // .context(gl);