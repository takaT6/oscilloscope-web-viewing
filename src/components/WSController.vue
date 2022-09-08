<template>
  <teleport to="#connection-controller"> 
    <div class="controller">
      <!-- コネクトボタン start -->
      <button 
        class="btn" id="connect"
        :disabled="user.status >= 1"
        @click="user.connect"
      >
        Connect
      </button>
      <!-- コネクトボタン end -->
      <!-- ディスコネクトボタン start -->
      <button 
        class="btn" id="disconnect" 
        :disabled="user.status == 0 || user.isProcess"
        @click="user.disconnect"
        >
          Disconnect
      </button>
      <!-- ディスコネクトボタン end -->
    </div>
  </teleport>
  <div class="controller">
    <button 
      class="btn" id="behost"
      :disabled="user.hostExists || user.status == 0 || user.isProcess"
      @click="user.beHost"
    >
      Host
    </button>
    <button 
      class="btn" id="beguest"
      :disabled="user.status == 0 || user.status == 3 || user.isProcess"
      @click="user.beGuest"
    >
      Guest
    </button>
  </div>
  <div class="controller">
    <button 
      class="btn" id="run"
      :disabled="user.status != 2 || user.isProcess"
      @click="user.run"
    >
      run
    </button>
    <button 
      class="btn" id="stop" 
      :disabled="user.status != 2 || !user.isProcess"
      @click="user.stop"
    >
      stop
    </button>
  </div>
</template>

<script setup lang="ts">
import {userClass} from "./common"

const user = new userClass();


</script>

<style scoped lang="scss">
</style>
