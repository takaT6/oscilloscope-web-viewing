<template>
  <teleport to="#connection-controller"> 
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
  <div class="controller">
    <button 
      class="btn" id="run"
      @click="user.run"
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
</template>

<script setup lang="ts">
import {userClass} from "./common"
import {watch} from 'vue';
const user = new userClass();

const props = defineProps({data: Array, timestamp: Array});

const emit = defineEmits(['update:data','update:timestamp']);

watch(user.data, () => {
  // emit("data", user.data.value);
  emit('update:data', user.data);
  console.log("hoge")
});
watch(user.timestamp, () => {
  // emit("timestamp", user.timestamp.value);
  emit('update:timestamp', user.timestamp);
  console.log("hoge")
});

</script>

<style scoped lang="scss">
</style>
