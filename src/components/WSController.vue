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
</template>

<script setup lang="ts">
import { userClass } from "./common"
import Plotly from 'plotly.js-dist-min'
import { onMounted, watch } from "vue";

onMounted(()=> {
  Plotly.newPlot("graph",[{ 
    // x: [],
    // y: [1,2,3]
  }])
});

var layout_update = {
    title: 'some new title', // updates the title
};

let intervalId = 0;
const updateData = () => {
  clearInterval(intervalId);
  intervalId = setInterval(()=> {
    let rowData = [...user.plotlyData]
    let newData = {
      x: [rowData[0]],
      y: [rowData[1]]
    }
    let lastTimeStamp = rowData[0].slice(-1)[0];
    let minuteView = {
      xaxis: {
        range: [lastTimeStamp-10, lastTimeStamp]
      }
    };

    Plotly.update('graph', newData, minuteView);
    // Plotly.relayout('graph', minuteView as Partial<Plotly.Layout>);
  },100);
  // requestAnimationFrame(updateData);
}

const user = new userClass();

const props = defineProps({
  plotlyData: Object
});

const emit = defineEmits(['update:plotlyData']);

// watch(user.isDataUpdated, () => {
//   emit('update:plotlyData', user.plotlyData);
// });

const sliceData = (data: number[][]) => {
  let d = [];
  for (let i = 0; i < data.length; i++)
    d.push(data[i].slice(-5000));
    // d.push(data[i].slice(start, end));
  return d;
}

</script>

<style scoped lang="scss">
</style>
