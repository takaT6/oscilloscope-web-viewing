<template>
  <teleport to="#connection-controller1">
    <div class="controller">
      <button
        class="btn" id="connect"
        @click="connectWss"
        :disabled="getStatus() >= 1"
      >
        Connect
      </button>
      <button
        class="btn" id="disconnectWss"
        @click="disconnectWss"
        :disabled="getStatus() == 0 || getIsProcess()"
        >
          Disconnect
      </button>
    </div>
  </teleport>
  <teleport to="#connection-controller2">
    <div class="controller">
      <button
        class="btn" id="behost"
        @click="beHost"
        :disabled="getHostExists() || getStatus() == 0 || getIsProcess()"
      >
        Host
      </button>
      <button
        class="btn" id="beguest"
        @click="beGuest"
        :disabled="getStatus() == 0 || getStatus() == 3 || getIsProcess()"
      >
        Guest
      </button>
    </div>
  </teleport>
  <teleport to="#connection-controller3">
    <div class="controller">
      <button
        class="btn" id="run"
        @click="runMeasurement"
        :disabled="getStatus() != 2 || getIsProcess()"
      >
        run
      </button>
      <button
        class="btn" id="stop"
        @click="stopMeasurement"
        :disabled="getStatus() != 2 || !getIsProcess()"
      >
        stop
      </button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useOscContorllerStore } from "@/store/store";

const { getHostExists, getStatus, getIsProcess, getPlotlyData, 
    connectWss, disconnectWss, runMeasurement, stopMeasurement, beHost, beGuest} = useOscContorllerStore();

</script>

<style scoped lang="scss">
</style>
