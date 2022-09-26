<template>
  <teleport to="#connection-controller1">
    <div class="controller">
      <button
        class="btn" id="connect"
        @click="user.connect"
        :disabled="user.status >= 1"
      >
        Connect
      </button>
      <button
        class="btn" id="disconnect"
        @click="user.disconnect"
        :disabled="user.status == 0 || user.isProcess"
        >
          Disconnect
      </button>
    </div>
  </teleport>
  <teleport to="#connection-controller2">
    <div class="controller">
      <button
        class="btn" id="behost"
        @click="user.beHost"
        :disabled="user.hostExists || user.status == 0 || user.isProcess"
      >
        Host
      </button>
      <button
        class="btn" id="beguest"
        @click="user.beGuest"
        :disabled="user.status == 0 || user.status == 3 || user.isProcess"
      >
        Guest
      </button>
    </div>
  </teleport>
  <teleport to="#connection-controller3">
    <div class="controller">
      <button
        class="btn" id="run"
        @click="user.run(); updateData()"
        :disabled="user.status != 2 || user.isProcess"
      >
        run
      </button>
      <button
        class="btn" id="stop"
        @click="user.stop"
        :disabled="user.status != 2 || !user.isProcess"
      >
        stop
      </button>
    </div>
  </teleport>

  <div id="graph"></div>
</template>

<script setup lang="ts">
import { userClass } from "./common"
import { watch } from 'vue'

import Plotly from 'plotly.js-dist-min'
import { onMounted } from "vue";

onMounted(()=> {
  Plotly.newPlot("graph",[{ 
    // x: [],
    y: [1,2,3],
    // "width": 600, "height": 400
  }])
});

let intervalId = 0;
const updateData = () => {
  // clearInterval(intervalId);
  // intervalId = setInterval(()=> {
    // Plotly.update('graph', props.plotlyData)
    // console.log(props.plotlyData)
    let newData = {
      x: [[...user.uplotData[0]]],
      y: [[...user.uplotData[1]]]
    }
    Plotly.update('graph', newData)
  // },100);
  requestAnimationFrame(updateData);
}

const user = new userClass();

const props = defineProps({
  uplotData: Array,
  plotlyData: Object
});

const emit = defineEmits(['update:uplotData', 'update:plotlyData']);

// watch(user.isDataUpdated, () => {
//   emit('update:uplotData', user.uplotData);
//   // console.log(data = user.uplotData[0].slice(0,3))
// });

const sliceData = (data: number[][]) => {
  let d = [];
  for (let i = 0; i < data.length; i++)
    d.push(data[i].slice(-5000));
    // d.push(data[i].slice(start, end));
  return d;
}

// let start1 = 0;
// let len1 = 3000;

// let intervalId = 0;
// let count = 0;  

// const setData = () => {
//   let data = [...user.uplotData];
//   let data1 = sliceData(data);
//   emit('update:uplotData', data1);
// }
// const updateData = () => {
//   clearInterval(intervalId);
//   intervalId = setInterval(()=> {
//     // // setData()
//     // emit('update:uplotData', user.uplotData);
//     let newData = {
//       x: [[...user.uplotData[0]]],
//       y: [[...user.uplotData[1]]]
//     }
//     emit('update:plotlyData', newData);
      
//   },100);
//   // count++;
//   // if(count < 1000) {
//   // count = 0;  
//   // setData();
//   // emit('update:uplotData', user.uplotData);
//   // requestAnimationFrame(updateData);
//   // }
// }
</script>

<style scoped lang="scss">
</style>
