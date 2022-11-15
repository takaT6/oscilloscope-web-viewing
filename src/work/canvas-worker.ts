
import * as d3 from 'd3'
// import * as fc from 'd3fc'
// import { onMounted, watch, toRefs, reactive } from "vue";
// import { useOscContorllerStore, useChartOptionStore } from '@/store/store';
// import { storeToRefs } from 'pinia';
import * as echarts from 'echarts';

// WebWorker Instance
const worker: Worker = self as any;

const drawData = {
  color: {},
  point : {
    solid: true,
    opencircle: false,
    alpha: false
  },
  buffers: {
    solid: {},
    opencircle: {},
    alpha: {}
  },
  alpha: 0.3
}

worker.onmessage = (event: MessageEvent) => {
  if(event.data.type == 'canvas'){
    const gl = event.data.value.getContext('webgl');
    gl.canvas.width = 200//event.data.width;
    gl.canvas.height = 300//event.data.height;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }
}

