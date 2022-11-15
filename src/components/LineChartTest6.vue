<template>
  <div id="my_dataviz"></div>
</template>

<script setup>

import { onMounted, watch, toRefs, reactive } from "vue";
import * as PIXI from 'pixi.js'

onMounted(()=> {
  //hoge
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
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
path { 
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
}
</style>