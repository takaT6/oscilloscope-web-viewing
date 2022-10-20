import { ref, Ref } from 'vue';
import { defineStore } from "pinia";
import { PlotData } from '@/components/common';
import WebSocketWorker from "worker-loader?inline=fallback!@/work/websocket-worker.ts";

export const useOscContorllerStore = defineStore('oscContorller', () => {

  const wsWorker = new WebSocketWorker();
  
  const isConnect = ref(false);

  const isProcess = ref(false);

  // Datasets for LineChart.
  let plotData: PlotData = { x: [], y: [] };

  // getter
  const getIsConnect = (): boolean => isConnect.value;

  //getter
  const getIsProcess = (): boolean => isProcess.value;

  const getIsProcessRf = (): Ref<boolean> => isProcess;
  
  //getter
  const getPlotlyData = (): PlotData => plotData;

  const postMessage = (mssg: string): void => {
    wsWorker.postMessage(mssg);
    console.log('main:', mssg);
  }

  wsWorker.onmessage = (event: MessageEvent) => {
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
  };

  return {
    getIsConnect,
    getIsProcess,
    getPlotlyData,
    postMessage,
    isProcess,
    isConnect,
    getIsProcessRf
  }
})