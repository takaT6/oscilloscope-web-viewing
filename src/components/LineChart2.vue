<template>
  <canvas id="my_canvas"></canvas>
</template>

<script setup lang="ts" >
import { WebglPlot, WebglLine, ColorRGBA } from "webgl-plot";
import { onMounted } from "vue";
onMounted(()=> {
const canvas = document.getElementById("my_canvas") as HTMLCanvasElement;
const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;

const numX = canvas.width;
const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
const line = new WebglLine(color, numX);
const wglp = new WebglPlot(canvas);

line.arrangeX();
wglp.addLine(line);

function update(): void {
  const freq = 0.001;
  const amp = 0.5;
  const noise = 0.1;

  for (let i = 0; i < line.numPoints; i++) {
    const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
    const yNoise = Math.random() - 0.5;
    line.setY(i, ySin * amp + yNoise * noise);
  }
}

function newFrame(): void {
  update();
  wglp.update();
  window.requestAnimationFrame(newFrame);
}
window.requestAnimationFrame(newFrame);
})
</script>

<style scoped lang="scss">
#my_canvas {
  width: 80vw;
}
</style>
