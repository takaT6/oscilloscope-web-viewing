<template>
  <canvas id="my_canvas"></canvas>
</template>

<script setup lang="ts" >
import { WebglPlot, WebglLine, ColorRGBA } from "webgl-plot";
import { Const } from '@/components/common'
import { onMounted } from "vue";
import { useOscContorllerStore } from "@/store/store";

const {getPlotlyData} = useOscContorllerStore();

onMounted(()=> {
  const canvas = document.getElementById("my_canvas") as HTMLCanvasElement;
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;

  const numX = canvas.width;
  const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
  const line = new WebglLine(color, numX);
  const wglp = new WebglPlot(canvas);

  // line.arrangeX();
  line.lineSpaceX(-1, 2 / (numX*1));
  // line.scaleY(2)

  // wglp.gScaleX = 0.4
  // wglp.gScaleY = 0.1
  // wglp.gXYratio = 10
  wglp.addLine(line);
  // var cnt = 0;
  // for (let j = 0, len = 1; j < len; j++) {
  //   for (let i = 0, len = 2500; i < len; i++) {
    // line.setY(i,0);
  //   }
  // }
  wglp.update();
  console.log("finish init plot")

  const update = (): void => {
    let plotlyData = getPlotlyData();
    line.shiftAdd(new Float32Array(plotlyData.y));
  }

  const newFrame = (): void => {
    update();
    wglp.update();
    window.requestAnimationFrame(newFrame);
  }

  window.requestAnimationFrame(newFrame);
});

</script>

<style scoped lang="scss">
#my_canvas {
  width: 80vw;
  height: 40vh;
}
</style>
