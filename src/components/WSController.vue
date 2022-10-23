<template>
  <teleport to="#connection-controller1">
    <div class="controller">
      <button
        :class="[isConnect ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
        id="connect"
        @click="postMessage('connect')"
      >
        Connect
      </button>
      <button
        :class="[(!isConnect || isProcess) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
        id="disconnect"
        @click="postMessage('disconnect')"
      >
        Disconnect
      </button>
    </div>
  </teleport>
  <teleport to="#connection-controller2">
    <div class="controller">
      <button
        :class="[(!isConnect ||  isProcess) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
        id="run"
        @click="postMessage('run')"
      >
        run
      </button>
      <button
      :class="[(!isConnect || !isProcess) ? Const.BTN_DISABLED : Const.BTN_ABLED]" 
        id="stop"
        @click="postMessage('stop')"
      >
        stop
      </button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOscContorllerStore } from "@/store/store";
import { Const } from '@/components/common';

const store = useOscContorllerStore()
const { postMessage } = store;
const { isProcess, isConnect } = storeToRefs(store)

</script>

<style scoped lang="scss">
</style>
