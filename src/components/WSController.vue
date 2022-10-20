<template>
  <teleport to="#connection-controller1">
    <div class="controller">
      <button
        class="btn" id="connect"
        @click="postMessage('connect')"
        :disabled="isConnect"
      >
        Connect
      </button>
      <button
        class="btn" id="disconnect"
        @click="postMessage('disconnect')"
        :disabled="!isConnect || isProcess"
      >
        Disconnect
      </button>
    </div>
  </teleport>
  <teleport to="#connection-controller2">
    <div class="controller">
      <button
        class="btn" id="run"
        @click="postMessage('run')"
        :disabled="!isConnect ||  isProcess"
      >
        run
      </button>
      <button
        class="btn" id="stop"
        @click="postMessage('stop')"
        :disabled="!isConnect || !isProcess"
      >
        stop
      </button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOscContorllerStore } from "@/store/store";

const store = useOscContorllerStore()
const { postMessage } = store;
const { isProcess, isConnect } = storeToRefs(store)

</script>

<style scoped lang="scss">
</style>
