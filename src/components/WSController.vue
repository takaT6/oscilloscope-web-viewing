<template>
  <teleport to="#connection-controller1">
    <div class="controller">
      <button
        class="btn" id="connect"
        @click="wwPostMessage('connect')"
        :disabled="getIsConnect()"
      >
        Connect
      </button>
      <button
        class="btn" id="disconnect"
        @click="wwPostMessage('disconnect')"
        :disabled="!getIsConnect() || getIsProcess()"
      >
        Disconnect
      </button>
    </div>
  </teleport>
  <teleport to="#connection-controller2">
    <div class="controller">
      <button
        class="btn" id="run"
        @click="wwPostMessage('run')"
        :disabled="!getIsConnect() ||  getIsProcess()"
      >
        run
      </button>
      <button
        class="btn" id="stop"
        @click="wwPostMessage('stop')"
        :disabled="!getIsConnect() || !getIsProcess()"
      >
        stop
      </button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useWsContorllerStore } from "@/store/store";

const { getIsConnect, getIsProcess, wwPostMessage } = useWsContorllerStore();

</script>

<style scoped lang="scss">
</style>
