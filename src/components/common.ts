export const Const = {
  WS_ADDRESS: "ws://localhost:8088/echo",
}
import {ref, Ref} from 'vue';
export class userClass {
  private _runConnection?: WebSocket; // WebSocket
  private _status: Ref<number>; // 0: 未コネ, 1: 接続済, 2: ホスト, 3: ゲスト 
  private _hostExists: Ref<boolean>; // ホストが存在するかどうか
  private _stopperConnection?: WebSocket; // 停止用WebSocket
  private _stopperStatus: number; // 0: 未コネ, 1: 接続済 
  private _isProcess: Ref<boolean>;
  
  // コンストラクタ
  constructor() {
    this._runConnection = undefined;
    this._stopperConnection = undefined;
    this._status = ref(0);
    this._stopperStatus = 0;
    this._hostExists = ref(true);
    this._isProcess = ref(false);
  }

  //getter
  get hostExists(): boolean {
    return this._hostExists.value;
  }

  //getter
  get status(): number {
    return this._status.value;
  }

  //getter
  get isProcess(): boolean {
    return this._isProcess.value;
  }

  // コネクションの確立
  public connect = (): boolean => {
    if ('WebSocket' in window) {
      if(this._runConnection != undefined){
        this.disconnect();
      }

      this._runConnection = new WebSocket(Const.WS_ADDRESS);
      this._runConnection.onopen = () => {
        this._status.value = 1; // コネ確立
        this.checkServer();
        console.log("Connection is published!!!");
      };
      
      this._runConnection.onerror = () => {
        console.log('エラーが発生しました。');
      };

      this._runConnection.onmessage = (event: any) => {
        const jsonData = JSON.parse(String(event.data));

        switch(jsonData.type){
          // ホストになったことを受信
          case "isHost": 
            this._status.value = jsonData.isHost ? 2 : 1; // 2:ホストor 1:接続済
            this.makeStopper();
            alert("あなたはホストになりました。");
            break;
          // ゲストになったことを受信
          case "isGuest": 
            this._status.value = jsonData.isGuest ? 3 : 1; // 3:ゲストor 1:接続済
            alert("あなたはゲストになりました。");
            break;
          // ホストがいるかどうかを受信
          case "hostExists":
            this._hostExists.value = jsonData.hostExists; // T or F
            this._hostExists.value ? alert("ホストは存在します。"): alert("ホストはまだいません。");
            break;
          // 計測中かどうか
          case "isProcess":
            this._isProcess.value = jsonData.isProcess; // T or F
            this._isProcess.value ? alert("計測中です。"): alert("計測中ではありません。");
            break;
          // ホストを譲った
          case "notHost":
            if(jsonData.notHost){
              alert("ホストを譲りました。")
              this._status.value = 1;
              this._hostExists.value = false;
              this._stopperConnection?.close();
              this._runConnection!.send('beGuest');
            }else{
                alert('再起動してください');
            }
            break;
        }
        console.log(jsonData);
      };

      this._runConnection.onclose = () => {
        this._status.value = 0; // 未コネ
        this.stopperDisconnect();
        console.log("Connection is down!!!");
      };
      return true;
    } else {
      console.log('WebSocket NOT supported in this browser');
      return false;
    }
  }

  // コネクション切断
  public disconnect = (): void => {
    this._runConnection!.close();
    this.stopperDisconnect();
  }

  // 計測実行
  public run = () => {
    if( this._status.value == 2){
      this._runConnection!.send('run');
    }else{
      console.log("コネクションが確立していません。");
      console.log(this._status.value);
    }
  }

  // プロセスの停止
  public stop = (): void => {
    if(this._status.value == 2){
      if(this._stopperStatus == 1){
        this._stopperConnection!.send('stop');
      }else if(this._stopperStatus == 0){
        this.makeStopper();
        this._stopperConnection!.send('stop');
      }
    }
  }


  // サーバーの状態を確認する
  public checkServer = () => {
    if( this._status.value > 0){
      console.log("サーバーの状態をテェック中");
      this._runConnection!.send('checkServer');
    }else{
      console.log("コネクションが確立していません。");
      console.log(this._status.value);
    }
  }

  // ホストをとる
  public beHost = (): void => {
    if( (this._status.value == 1 || this._status.value == 3) && !this._hostExists.value){// 1:接続済, 3:ゲスト 
      this._runConnection!.send('beHost');
    }else{
      console.log("コネクションが確立していません。");
      console.log(this._status.value);
    }
  }

  // ゲストになる
  public beGuest = (): void => {
    if(this._status.value == 1){// 1:接続済
      this._runConnection!.send('beGuest');
    }else if(this._status.value == 2){// 2:ホスト
      this._runConnection!.send('resignHost');
      // this._runConnection!.send('beGuest');
      // setTimeout(() => this._runConnection!.send('beGuest'),1000);
        
    }else{
      console.log("コネクションが確立していません。");
      console.log(this._status.value);
    }
  }

  //ストッパーの作成
  private makeStopper = (): boolean => {
    if ('WebSocket' in window) {
      this._stopperConnection = new WebSocket(Const.WS_ADDRESS);
      this._stopperConnection!.onopen = () => {
        this._stopperStatus = 1;
      };
      this._stopperConnection!.onerror = () => {
        //do nothing
      };
      this._stopperConnection!.onmessage = (event: any) => {
        //do nothing
      };
      this._stopperConnection!.onclose = () => {
        this._stopperStatus = 0;
      };
      return true;
    } else {
      console.log('WebSocket NOT supported in this browser');
      return false;
    }
  }

  private stopperDisconnect = () => {
    if(this._stopperConnection != undefined){
      this._stopperConnection.close();
    }
  }
}