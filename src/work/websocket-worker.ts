import { Const, PlotData } from '@/components/common';

// WebWorker Instance
const worker: Worker = self as any;

const postMessage = (type: string, val: number | boolean | PlotData) => worker.postMessage({"type":type,"value":val});

// WebSocket Instance for publishing connection and running measurement.
let runnerConnection: WebSocket;

// WebSocket Instance for stopping measurement.
let stopperConnection: WebSocket;

// false: unconected, true: connected
const isConnect = (() => {
  let v = false;
  const change = (n: boolean) => {
    v = n;
    postMessage("isConnect", v);
  };
  const send = () => postMessage("isConnect", v);
  const value = () => v;
  return { value, change, send };
})();

// 0: unconnected, 1: connected
let stopperStatus = 0;

// false: unprocessing, true: processing
const isProcess = (() => {
  let v = false;
  const change = (n: boolean) => {
    v = n;
    postMessage("isProcess",v);
    if(v) newFrame();
  };
  const send = () => postMessage("isProcess",v);
  const value = () => v;
  return { value, change, send};
})();

let plotData: PlotData = {
  x: [],
  y: []
};

let count = 0;

const resetChartData = (): void => {
  plotData = {
    x: [...new Array(10000)].map((_, i) => 0),
    y: [...new Array(10000)].map((_, i) => 0)
  };
  
  // plotData = {x:[],y:[]};

  count = 0;
}

worker.onmessage = (event: MessageEvent): void => {
  const mssg = event.data;
  switch (mssg) {
    case 'connect':
      connectWss();
      break;
    case 'run':
      event.data.timer ? runMeasurement(event.data.timer) : runMeasurement(3000);
      break;
    case 'stop':
      stopMeasurement();
      break;
    case 'disconnect':
      disconnectWss();
      break;
  }
}

const newFrame = (): void => {
  // Send mssg to main thread.
  postMessage('plotData', plotData)
  if(isProcess.value()) requestAnimationFrame(newFrame);
};

/**
 * Connect with WebSocket server.
 */
const connectWss = (): boolean => {
  if (runnerConnection != undefined) disconnectWss();

  // Create a WebSocket Object
  runnerConnection = new WebSocket(Const.WS_ADDRESS);

  if(!stopperStatus) makeStopper();

  // Define WebSocket Open Event
  runnerConnection.onopen = (): void => {
    isConnect.change(true);
    checkServer();
  };

  // Define WebSocket Error Event
  runnerConnection.onerror = (): void => {/* do nothing */};

  // Define WebSocket Event for when catch messages
  runnerConnection.onmessage = (event: MessageEvent): void => {
    const jsonData = JSON.parse(event.data);
    switch (jsonData.type) {
      case "data":
        count++;
        plotData.x.shift();
        plotData.y.shift();
        plotData.x.push(jsonData.timestamp);
        plotData.y.push(jsonData.value);
        break;
      case "isProcess":
        isProcess.change(jsonData.value);
        postMessage('count', count)
        break;
    }
  };

  // Define WebSocket Close Event
  runnerConnection.onclose = (): void => {
    isConnect.change(false);
    if (isProcess.value()) stopMeasurement();
    stopperDisconnect();
  };
  return true;
}

/**
 * Disconnect from WebSocket server.
 */
const disconnectWss = (): void => {
  runnerConnection.close();
  stopperDisconnect();
}

/**
 * Send "run" message to WS server.
 * WS server will run measurement and return "isProcess" .
 */
const runMeasurement = (timer?: number): void => {
  if (isConnect.value() && !isProcess.value()) {
    resetChartData();

    runnerConnection.send('run');

    if(timer){
      setTimeout( () => {
        stopMeasurement();
      },timer)
    }

  }else {/*do something*/}
}

/**
 * Send "stop" message to WS server.
 * WS server will stop measurement and return "isProcess".
 */
const stopMeasurement = (): void => {
  if(isProcess.value()) {
    if (stopperStatus) {
      stopperConnection.send('stop');
    } else {
      makeStopper();
      stopperConnection.send('stop');
    }
  }
}

/**
 * Send "checkServer" message to WS server.
 * WS server will return server status of "isProcess".
 */
const checkServer = (): void => {
  if (isConnect.value()) runnerConnection.send('checkServer');
  else {/*do something*/}
}

/**
 * Make one more WebSocket connection for stoping measurement.
 */
const makeStopper = (): boolean => {
  stopperConnection = new WebSocket(Const.WS_ADDRESS);

  // Define WebSocket Open Event
  stopperConnection.onopen = () => stopperStatus = 1;

  // Define WebSocket Error Event
  stopperConnection.onerror = () => {/* do nothing */};

  // Define WebSocket Event when catch messages
  stopperConnection.onmessage = () => {/* do nothing */};

  // Define WebSocket Close Event
  stopperConnection.onclose = () => stopperStatus = 0;

  return true;
}

/**
 * Disconnect Stpper Connection from WebSocket server.
 */
const stopperDisconnect = (): void => {
  if (stopperConnection != undefined) stopperConnection.close();
}