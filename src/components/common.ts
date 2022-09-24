export const Const = {
  WS_ADDRESS: "ws://localhost:8088/echo",
  // WS_ADDRESS: "ws://192.168.11.2:8088/echo",
}

/**
 * UserClass
 */
import { ref, Ref } from 'vue';
export class userClass {

  // WebSocket Instance for publishing connection and running measurement.
  private _runConnection?: WebSocket;

  // Host dose exists.
  private _hostExists: Ref<boolean>;

  // WebSocket Instance for stopping measurement.
  private _stopperConnection?: WebSocket;
  
  // 0: unconected, 1: connected, 2: host, 3: guest 
  private _status: Ref<number>;

  // 0: unconnected, 1: connected 
  private _stopperStatus: number;

  // 0: unprocessing, 1: processing
  private _isProcess: Ref<boolean>;

  // Datasets for LineChart.
  private _uplotData: number[][];

  // Flag for noticing that data was updated.
  public isDataUpdated = ref({1:0});

  /**
   * Constructor.
   */
  constructor() {
    this._runConnection = undefined;
    this._stopperConnection = undefined;
    this._status = ref(0);
    this._stopperStatus = 0;
    this._hostExists = ref(true);
    this._isProcess = ref(false);
    this._uplotData = [[0], [0]];
  }

  public count = 0;
  private resetChartData = () => {
    this._uplotData = [[...new Array(10000)].map((_, i) => 0),[...new Array(10000)].map((_, i) => 0)];//[[0,0,0],[0,0,0]];
    this.count = 0;
  }

  // getter
  get hostExists(): boolean {
    return this._hostExists.value;
  }

  // getter
  get status(): number {
    return this._status.value;
  }

  //getter
  get isProcess(): boolean {
    return this._isProcess.value;
  }

  // getter
  get uplotData() :number[][] {
    return this._uplotData
  }

  /**
   * Connect with WebSocket server.
   * @public
   */
  public connect = (): boolean => {
    if ('WebSocket' in window) {
      if (this._runConnection != undefined) {
        this.disconnect();
      }

      // create a WebSocket Object
      this._runConnection = new WebSocket(Const.WS_ADDRESS);

      // define WebSocket Open Event
      this._runConnection.onopen = () => {
        this._status.value = 1; // コネ確立
        this.checkServer();
        console.log("Connection is published!!!");
      };
      
      // define WebSocket Error Event
      this._runConnection.onerror = () => {
        console.log('エラーが発生しました。');
      };

      // define WebSocket Event when catch messages
      this._runConnection.onmessage = (event) => {
        const jsonData = JSON.parse(event.data);
        this.count++;
        switch (jsonData.type) {
          case "data": {

            this._uplotData[0].shift(); //= this._uplotData[0].slice(this.length);
            this._uplotData[1].shift(); //= this._uplotData[1].slice(this.length);

            this._uplotData = [
              [...this._uplotData[0], jsonData.timestamp], 
              [...this._uplotData[1], jsonData.value]
            ]

            this.isDataUpdated.value = {1: 1}
            break;
          }

          // recieve "isHost"
          case "isHost": {
            this._status.value = jsonData.value ? 2 : 1; // 2:host or 1:connected
            this.makeStopper();
            break;
          }

          // recieve "isGuest"
          case "isGuest": {
            this._status.value = jsonData.value ? 3 : 1; // 3:guest or 1:connected
            break;
          }

          // recieve "hostExists"
          case "hostExists": {
            this._hostExists.value = jsonData.value; // T or F
            break;
          }

          // recieve "isProcess"
          case "isProcess": {
            this._isProcess.value = jsonData.value; // T or F
            console.log(this.count)
            break;
          }

          // recieve "notHost"
          case "notHost": {
            if (jsonData.value) {
              // alert("ホストを譲りました。")
              this._status.value = 1;
              this._hostExists.value = false;
              this._stopperConnection?.close();
              this._runConnection?.send('beGuest');
            } else {
                alert('再起動してください');
            }
            break;
          }
        }
      };

      // define WebSocket Close Event
      this._runConnection.onclose = () => {
        this._status.value = 0; // unconnected
        this.stopperDisconnect();
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
   * @public
   */
  public disconnect = (): void => {
    this._runConnection?.close();
    this.stopperDisconnect();
  }

  /**
   * Send "run" message to WS server.
   * WS server will run measurement and return "isProcess" .
   * @public
   */
  public run = () => {
    if ( this._status.value == 2) {
      this.resetChartData();

      this._runConnection?.send('run');
      
      setTimeout( () => {
        console.log("stop")
        this.stop()
      },3000)

    } else {
      console.log("コネクションが確立していません。");
      console.log(this._status.value);
    }
  }

  /**
   * Send "stop" message to WS server.
   * WS server will stop measurement and return "isProcess".
   * @public
   */
  public stop = (): void => {
    if (this._status.value == 2) {
      if (this._stopperStatus == 1) {
        this._stopperConnection?.send('stop');
      } else if (this._stopperStatus == 0) {
        this.makeStopper();
        this._stopperConnection?.send('stop');
      }
    }
  }

  /**
   * Send "checkServer" message to WS server.
   * WS server will return server status of "hostExists" and "isProcess". 
   * @public
   */
  public checkServer = () => {
    if ( this._status.value > 0) {
      console.log("サーバーの状態をテェック中");
      this._runConnection?.send('checkServer');
    } else {
      console.log("コネクションが確立していません。");
      console.log(this._status.value);
    }
  }

  /**
   * Send "beHost" message to WS server.
   * If there is no host, WS server will return "isHost"=ture and "hostExists"=true . 
   * @public
   */
  public beHost = (): void => {
    if ( (this._status.value == 1 || this._status.value == 3) && !this._hostExists.value) {// 1:connected, 3:guest 
      this._runConnection?.send('beHost');
    } else {
      console.log("コネクションが確立していません。");
      console.log(this._status.value);
    }
  }

  /**
   * Send "beGuest" message to WS server.
   * Whatever there is a host, WS server will return "isGuest"=true . 
   * @public
   */
  public beGuest = (): void => {
    if (this._status.value == 1) {// 1:connected
      this._runConnection?.send('beGuest');
    } else if (this._status.value == 2) {// 2:host
      this._runConnection?.send('resignHost');
      // this._runConnection?.send('beGuest');
      // setTimeout(() => this._runConnection?.send('beGuest'),1000);
        
    } else {
      console.log("コネクションが確立していません。");
      console.log(this._status.value);
    }
  }

  /**
   * Make one more WebSocket connection for stoping measurement.
   * @private
   */
  private makeStopper = (): boolean => {

    if ('WebSocket' in window) {
      this._stopperConnection = new WebSocket(Const.WS_ADDRESS);

      // define WebSocket Open Event
      this._stopperConnection.onopen = () => {
        this._stopperStatus = 1;
      };

      // define WebSocket Error Event
      this._stopperConnection.onerror = () => {
        // do nothing
      };

      // define WebSocket Event when catch messages
      this._stopperConnection.onmessage = () => {
        // do nothing
      };

      // define WebSocket Close Event
      this._stopperConnection.onclose = () => {
        this._stopperStatus = 0;
      };

      return true;
    } else {
      console.log('WebSocket NOT supported in this browser');
      return false;
    }
  }

  /**
   * Disconnect Stpper Connection from WebSocket server.
   * @private
   */
  private stopperDisconnect = () => {
    if (this._stopperConnection != undefined) {
      this._stopperConnection.close();
    }
  }
}