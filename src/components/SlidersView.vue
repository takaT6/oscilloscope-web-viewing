<template>
  <div>
    <div class="box">
      <span>Offset= </span>
      <input v-model="value" @input="clearErrorMsg" />
      <span style="color: red; margin-left: 20px;">{{ errorMsg }}</span>
    </div>
    <!-- <vue-slider
      v-model="value"
      :min="min"
      :max="max"
      :tooltip="errorMsg ? 'none' : 'always'"
      :marks="[100, 1000]"
      @error="error"
      @change="clearErrorMsg"
    ></vue-slider> -->
  </div>
</template>

<script setup lang="ts">
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { ref} from "vue"
const ERROR_TYPE = {
  VALUE: 1,
  INTERVAL: 2,
  MIN: 3,
  MAX: 4,
  ORDER: 5,
}
let value = ref(100)
// let min = ref(100)
// let max = ref(1000)
let errorMsg = ref('')

const error = () => {
  // switch (type) {
  //   case ERROR_TYPE.MIN:
  //     break
  //   case ERROR_TYPE.MAX:
  //     break
  //   case ERROR_TYPE.VALUE:
  //     break
  // }
  errorMsg.value = "msg"
}
const clearErrorMsg = () => {
  errorMsg.value = ''
}
</script>

<style scoped lang="scss">

</style>
