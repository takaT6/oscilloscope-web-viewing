import { Const, PlotData } from '@/components/common';

// WebWorker Instance
const worker: Worker = self as any;


const calcMax = (data: number[]) => {
  return Math.max(...data);
};

const calcMin = (data: number[]) => {
  return Math.min(...data);
};

const calcFreq = (data: number[]) => {
  const max = calcMax(data);
  const min = calcMin(data);
  const freq = data.length / ( max -min);
  return freq;
};