/**
 * UserClass
 */
import { ref, Ref } from 'vue';
import { defineStore } from "pinia";
import { Const, PlotData } from '@/components/common';
import WSWorker from "../work/WSWorker";
export const useOscContorllerStore = defineStore('oscContorller', () => {

  const worker = WSWorker;
  worker.onmessage = (event: MessageEvent) => {
    console.log(event.data);
  };
  
  // WebSocket Instance for publishing connection and running measurement.
  let runConnection: WebSocket;

  // WebSocket Instance for stopping measurement.
  let stopperConnection: WebSocket;

  // 0: unconected, 1: connected
  const status: Ref<number> = ref<number>(0);

  // 0: unprocessing, 1: processing
  const isProcess: Ref<boolean> = ref<boolean>(false);

  // Datasets for LineChart.
  // let plotData: number[][] = [[1,2,3],[4,5,6]];
  // let plotData: PlotlyData = {
  //   x: [1,2,3],
  //   y: [4,5,6]
  // };
  
  const plotData: PlotData = {
    x: [],
    y: []
  };

  // getter
  const getStatus = (): number => status.value;

  //getter
  const getIsProcess = (): boolean => isProcess.value;

  // getter
  // const getPlotlyData = (): number[][] => plotData;
  
  const getPlotlyData = (): PlotData => {
    // const copyPlotData = plotData;
    // resetChartData();
    // return copyPlotData;
    return plotData
  }

  return {
    getStatus,
    getIsProcess,
    getPlotlyData,
    isProcess,
  }
})