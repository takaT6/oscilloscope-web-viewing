import { Const, PlotData } from '@/components/common';
const WSWorker: Worker = self as any;

// WebSocket Instance for publishing connection and running measurement.
let runnerConnection: WebSocket;

// WebSocket Instance for stopping measurement.
let stopperConnection: WebSocket;

// 0: unconected, 1: connected
let status = 0;

// 0: unconnected, 1: connected
let stopperStatus = 0;

// 0: unprocessing, 1: processing
let isProcess = false;

let plotData: PlotData = {
  x: [],
  y: []
};

let count = 0;

const resetChartData = () => {
  // plotData = [
  //   [...new Array(5000)].map((_, i) => 0),
  //   [...new Array(5000)].map((_, i) => 0)
  // ];

  plotData = {
    x: [...new Array(10000)].map((_, i) => 0),
    y: [...new Array(10000)].map((_, i) => 0)
  };
  
  // plotData = {x:[],y:[]};

  count = 0;
}

WSWorker.onmessage = (event: MessageEvent) => {
  const mssg = event.data;
  switch (mssg) {
    case 'connect': {
      connectWss();
    }
  }
}

const newFrame = () => {
  // Send mssg to main thread.
  WSWorker.postMessage(plotData);
  requestAnimationFrame(newFrame);
};
requestAnimationFrame(newFrame);

/**
 * Connect with WebSocket server.
 */
const connectWss = (): boolean => {
  if ('WebSocket' in window) {
    if (runnerConnection != undefined) disconnectWss();

    // create a WebSocket Object
    runnerConnection = new WebSocket(Const.WS_ADDRESS);

    // define WebSocket Open Event
    runnerConnection.onopen = () => {
      status = 1; // コネ確立
      checkServer();
      console.log("Connection is published!!!");
    };

    // define WebSocket Error Event
    runnerConnection.onerror = () => {
      console.log('エラーが発生しました。');
    };

    // define WebSocket Event when catch messages
    runnerConnection.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      count++;
      switch (jsonData.type) {
        case "data": {
          // const newData = [{
          //   x:[[jsonData.timestamp]],
          //   y:[[jsonData]]
          // }]

          plotData.x.shift();
          plotData.y.shift();

          // plotData = {
          //   x: [...plotData.x, jsonData.timestamp],
          //   y: [...plotData.y, jsonData]
          // }
          plotData.x.push(jsonData.timestamp);
          plotData.y.push(jsonData);

          break;
        }

        // recieve "isProcess"
        case "isProcess": {
          isProcess = jsonData; // T or F
          console.log(count)
          break;
        }
        // default: // nothing to do.
      }
    };

    // define WebSocket Close Event
    runnerConnection.onclose = () => {
      status = 0; // unconnected
      stopperDisconnect();
      console.log("Connection is down!!!");
    };

    return true;
  } else {
    console.log('WebSocket NOT supported in this browser');
    return false;
  }
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
const runMeasurement = (): void => {
  if ( status === 2) {
    resetChartData();

    runnerConnection.send('run');

    setTimeout( () => {
      console.log("stop")
      stopMeasurement()
    },3000)

  }else {/*do something*/}
}

/**
 * Send "stop" message to WS server.
 * WS server will stop measurement and return "isProcess".
 */
const stopMeasurement = (): void => {
  console.log("stop measurement")
  if (stopperStatus === 1) {
    stopperConnection.send('stop');
  } else if (stopperStatus === 0) {
    makeStopper();
    stopperConnection.send('stop');
  }
}

/**
 * Send "checkServer" message to WS server.
 * WS server will return server status of "isProcess".
 */
const checkServer = (): void => {
  if ( status === 1) runnerConnection.send('checkServer');
  else {/*do something*/}
}

/**
 * Make one more WebSocket connection for stoping measurement.
 */
const makeStopper = (): boolean => {
  if ('WebSocket' in window) {
    stopperConnection = new WebSocket(Const.WS_ADDRESS);

    // define WebSocket Open Event
    stopperConnection.onopen = () => stopperStatus = 1;

    // define WebSocket Error Event
    stopperConnection.onerror = () => {/* do nothing */};

    // define WebSocket Event when catch messages
    stopperConnection.onmessage = () => {/* do nothing */};

    // define WebSocket Close Event
    stopperConnection.onclose = () => stopperStatus = 0;

    return true;
  } else {
    console.log('WebSocket NOT supported in this browser');
    return false;
  }
}

/**
 * Disconnect Stpper Connection from WebSocket server.
 */
const stopperDisconnect = () => {
  if (stopperConnection != undefined) stopperConnection.close();
}

export default WSWorker