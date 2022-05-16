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

  line.arrangeX();
  wglp.addLine(line);
  var cnt = 0;
  const update = (): void => {
    const freq = 0.001;
    const amp = 0.5;
    const noise = 0.1;
    if (cnt > line.numPoints){
      line.shiftAdd(new Float32Array([Math.PI * Math.random()*10 * freq * Math.PI * 2]));
    } else {
      for (let i = 0, len = line.numPoints; i < len; i++) {
        const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
        const yNoise = Math.random() - 0.5;
        line.setY(i, ySin * amp + yNoise * noise);
      }
    }
    cnt++;
  }
  var intervalId = 0
  const intervalUpdate = () => {
    clearInterval(intervalId);
    intervalId = setInterval(()=>{
      update()
    },5)
  }
  
  intervalUpdate();

  const newFrame = (): void => {
    // update();
    wglp.update();
    window.requestAnimationFrame(newFrame);
  }

  window.requestAnimationFrame(newFrame);
});

</script>

<style scoped lang="scss">
#my_canvas {
  width: 80vw;
}
</style>
