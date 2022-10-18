import { ref, Ref } from 'vue';
import { defineStore } from "pinia";
import { PlotData } from '@/components/common';
import Worker from "worker-loader!@/work/worker.ts";

export const useOscContorllerStore = defineStore('oscContorller', () => {

  const wsWorker = new Worker();
  
  const isConnect: Ref<boolean> = ref<boolean>(false);

  const isProcess: Ref<boolean> = ref<boolean>(false);

  // Datasets for LineChart.
  let plotData: PlotData = { x: [], y: [] };

  // getter
  const getIsConnect = (): boolean => isConnect.value;

  //getter
  const getIsProcess = (): boolean => isProcess.value;
  
  //getter
  const getPlotlyData = (): PlotData => plotData;

  const wwPostMessage = (mssg: string): void => {
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
    wwPostMessage,
    isProcess,
  }
})