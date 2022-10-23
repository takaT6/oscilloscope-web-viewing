export const Const = {
  WS_ADDRESS: 'ws://localhost:8088/echo',
  // WS_ADDRESS: "ws://192.168.11.2:8088/echo",

  GRAPH_ID: 'graph',
  BTN_ABLED: 'rounded-full bg-sky-500 px-4 py-2 hover:bg-sky-700',
  BTN_DISABLED: 'rounded-full bg-sky-500 px-4 py-2 hover:bg-sky-700 opacity-50 cursor-not-allowed'
}

export interface PlotData {
  x: Array<number>,
  y: Array<number>
}