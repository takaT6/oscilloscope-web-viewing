<template>
  <div :id="Const.GRAPH_ID"></div>
  <canvas id="canvas"></canvas>
</template>


<script setup lang="ts" >
import * as echarts from 'echarts';
import { onMounted, watch, toRefs, reactive } from "vue";
import { storeToRefs } from 'pinia';
import { Const } from '@/components/common';
import { useOscContorllerStore, useChartOptionStore } from '@/store/store';
import CanvasWorker from 'worker-loader?inline=fallback!@/work/canvas-worker.ts';

const cWorker = new CanvasWorker();

onMounted(()=> {
  const canvasEl = document.querySelector("canvas") as HTMLCanvasElement;
  const offscreenCanvas = canvasEl.transferControlToOffscreen();
  cWorker.postMessage({ type: 'canvas', value: offscreenCanvas}, [offscreenCanvas]);
  // const canvas = canvasContainer!.querySelector('canvas');
});

</script>

<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}
#canvas {
  width: auto;
  height: 40vh;
}
</style>