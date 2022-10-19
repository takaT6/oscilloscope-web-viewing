// WebWorker Instance
const worker: Worker = self as any;

worker.onmessage = (event: MessageEvent) => {
  const mssg = event.data;
  console.log('worker:', mssg);
  switch (mssg.type) {
    case 'max':
      
  }
}

const calMax = (data: number[]): number => {
  return Math.max(...data);
}

const calMin = (data: number[]): number => {
  return Math.min(...data);
}

const freq = (data: number[]): number => {
  let maxX = Math.max(...data);
  let minX = Math.min(...data);
  let timeRange = maxX-minX;
  return data.length/timeRange
}