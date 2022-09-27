export const Const = {
  WS_ADDRESS: "ws://localhost:8088/echo",
  // WS_ADDRESS: "ws://192.168.11.2:8088/echo",
}

/**
 * UserClass
 */
import { ref, Ref } from 'vue';
import { defineStore } from "pinia";
export const useOscContorllerStore = defineStore('oscContorller', () => {

  // WebSocket Instance for publishing connection and running measurement.
  let runConnection: WebSocket;

  // WebSocket Instance for stopping measurement.
  let stopperConnection: WebSocket;

  // Host dose exists.
  const hostExists: Ref<boolean> = ref<boolean>(true);

  // 0: unconected, 1: connected, 2: host, 3: guest
  const status: Ref<number> = ref<number>(0);

  // 0: unconnected, 1: connected
  let stopperStatus = 0;

  // 0: unprocessing, 1: processing
  const isProcess: Ref<boolean> = ref<boolean>(false);

  // Datasets for LineChart.
  let plotlyData: number[][] = [[],[]];
  const refPlotlyData: Ref<number[][]> = ref<number[][]>([[1,2,3],[2,3,4]]);

  let count = 0;

  const resetChartData = () => {
    plotlyData = [
      [...new Array(5000)].map((_, i) => 0),
      [...new Array(5000)].map((_, i) => 0)
    ];
    // plotlyData = [[],[]];
    count = 0;
  }

  // getter
  const getHostExists = (): boolean => hostExists.value;

  // getter
  const getStatus = (): number => status.value;

  //getter
  const getIsProcess = (): boolean => isProcess.value;

  // getter
  const getPlotlyData = (): number[][] => plotlyData;

  /**
   * Connect with WebSocket server.
   */
  const connectWss = (): boolean => {
    console.log("makeWS")
    if ('WebSocket' in window) {
      if (runConnection != undefined) disconnectWss();

      // create a WebSocket Object
      runConnection = new WebSocket(Const.WS_ADDRESS);

      // define WebSocket Open Event
      runConnection.onopen = () => {
        status.value = 1; // コネ確立
        checkServer();
        console.log("Connection is published!!!");
      };

      // define WebSocket Error Event
      runConnection.onerror = () => {
        console.log('エラーが発生しました。');
      };

      // define WebSocket Event when catch messages
      runConnection.onmessage = (event) => {
        const jsonData = JSON.parse(event.data);
        count++;
        switch (jsonData.type) {
          case "data": {

            plotlyData[0].shift();
            plotlyData[1].shift();

            plotlyData = [
              [...plotlyData[0], jsonData.timestamp],
              [...plotlyData[1], jsonData.value]
            ]

            // refPlotlyData.value = plotlyData;

            break;
          }

          // recieve "isHost"
          case "isHost": {
            status.value = jsonData.value ? 2 : 1; // 2:host or 1:connected
            makeStopper();
            break;
          }

          // recieve "isGuest"
          case "isGuest": {
            status.value = jsonData.value ? 3 : 1; // 3:guest or 1:connected
            break;
          }

          // recieve "hostExists"
          case "hostExists": {
            hostExists.value = jsonData.value; // T or F
            break;
          }

          // recieve "isProcess"
          case "isProcess": {
            isProcess.value = jsonData.value; // T or F
            console.log(count)
            break;
          }

          // recieve "notHost"
          case "notHost": {
            if (jsonData.value) {
              // alert("ホストを譲りました。")
              status.value = 1;
              hostExists.value = false;
              stopperConnection.close();
              runConnection.send('beGuest');
            } else {
                alert('再起動してください');
            }
            break;
          }

          // default: // nothing to do.
        }
      };

      // define WebSocket Close Event
      runConnection.onclose = () => {
        status.value = 0; // unconnected
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
    runConnection.close();
    stopperDisconnect();
  }

  /**
   * Send "run" message to WS server.
   * WS server will run measurement and return "isProcess" .
   */
  const runMeasurement = (): void => {
    if ( status.value === 2) {
      resetChartData();

      runConnection.send('run');

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
    console.log("stopMeasurement")
    if (status.value === 2) {
      if (stopperStatus === 1) {
        stopperConnection.send('stop');
      } else if (stopperStatus === 0) {
        makeStopper();
        stopperConnection.send('stop');
      }
    }
  }

  /**
   * Send "checkServer" message to WS server.
   * WS server will return server status of "hostExists" and "isProcess".
   */
  const checkServer = (): void => {
    if ( status.value > 0) runConnection.send('checkServer');
    else {/*do something*/}
  }

  /**
   * Send "beHost" message to WS server.
   * If there is no host, WS server will return "isHost"=ture and "hostExists"=true .
   */
  const beHost = (): void => {
    if ( (status.value === 1 || status.value === 3) && !hostExists.value) runConnection.send('beHost');
    else {/*do something*/}
  }

  /**
   * Send "beGuest" message to WS server.
   * Whatever there is a host, WS server will return "isGuest"=true .
   */
  const beGuest = (): void => {
    if (status.value === 1) runConnection.send('beGuest');
    else if (status.value === 2) runConnection.send('resignHost');
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

  return {
    getHostExists,
    getStatus,
    getIsProcess,
    getPlotlyData,
    connectWss,
    disconnectWss,
    runMeasurement,
    stopMeasurement,
    beHost,
    beGuest
  }
})