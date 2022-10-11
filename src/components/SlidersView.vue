<template>
  <div>
    <div class="box">
      <input v-model="value" @input="clearErrorMsg" />
      <span style="color: red; margin-left: 20px;">{{ errorMsg }}</span>
    </div>
    <VueSlider
      v-model="value"
      :min="min"
      :max="max"
      :tooltip="errorMsg ? 'none' : 'always'"
      :marks="[100, 1000]"
      @error="error"
      @change="clearErrorMsg"
    ></VueSlider>
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
var value = ref(100)
var min = ref(100)
var max = ref(1000)
var errorMsg = ref('')

const error = (type: any, msg: any) => {
  switch (type) {
    case ERROR_TYPE.MIN:
      break
    case ERROR_TYPE.MAX:
      break
    case ERROR_TYPE.VALUE:
      break
  }
  errorMsg.value = msg
}
const clearErrorMsg = () => {
  errorMsg.value = ''
}
</script>

<style scoped lang="scss">

</style>
