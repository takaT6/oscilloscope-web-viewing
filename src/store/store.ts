import { ref, reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
import { PlotData } from '@/components/common';
import WebSocketWorker from 'worker-loader?inline=fallback!@/work/websocket-worker.ts';
import * as echarts from 'echarts';

export const useOscContorllerStore = defineStore('oscContorller', () => {
  // WebWorker  Instance
  const wsWorker = new WebSocketWorker();
  
  const isConnect = ref(false);

  const isProcess = ref(false);

  // Datasets for LineChart.
  // let plotData: PlotData = { x: [], y: [] };
  let plotData = {
    x: [...new Array(10000)].map((_, i) => 0),
    y: [...new Array(10000)].map((_, i) => 0)
  };

  // getter
  const getIsConnect = (): boolean => isConnect.value;

  //getter
  const getIsProcess = (): boolean => isProcess.value;
  
  //getter
  const getPlotlyData = (): PlotData => plotData;

  const postMessage = (mssg: string): void => {
    wsWorker.postMessage(mssg);
    console.log('main:', mssg);
  }

  wsWorker.onmessage = (event: MessageEvent): void => {
    switch (event.data.type) {
      case 'plotData':
        plotData = event.data.value;
        break
      case 'isConnect':
        isConnect.value = event.data.value;
        break;
      case 'isProcess':
        isProcess.value = event.data.value;
        break;
      case 'count': 
        console.log(event.data.value);
        break;
    }
  }

  return {
    getIsConnect,
    getIsProcess,
    getPlotlyData,
    postMessage,
    isProcess,
    isConnect,
  }
});

export const useChartOptionStore = defineStore('chartOption', () => {
  type EChartsOption = echarts.EChartsOption
  const chartOption = reactive({
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
  });

  const showXaxis = (show: boolean): void => {
    chartOption.xAxis.axisLabel.show = show;
  }

  const showYaxis = (show: boolean): void => {
    chartOption.yAxis.axisLabel.show = show;
  }

  //getter
  const getChartOption = () => chartOption;

  return { 
    chartOption, 
    getChartOption,
    showXaxis,
    showYaxis,
  }
});