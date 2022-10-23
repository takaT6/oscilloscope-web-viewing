<template>
  <label for="show-xaxis" class="inline-flex relative items-center cursor-pointer">
    <input type="checkbox" value="" id="show-xaxis" class="sr-only peer" @click="showXaxis(show.xaxis = !show.xaxis)" checked>
    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">show X axis</span>
  </label>
  <br>
  <label for="show-yaxis" class="inline-flex relative items-center cursor-pointer">
    <input type="checkbox" value="" id="show-yaxis" class="sr-only peer" @click="showYaxis(show.yaxis = !show.yaxis)" checked>
    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">show Y axis</span>
  </label>
</template>

<script setup lang="ts">
import { Const } from '@/components/common'
import { useChartOptionStore } from '@/store/store';

const optionStore = useChartOptionStore();

const { showXaxis, showYaxis } = optionStore

const show = {
  xaxis: true,
  yaxis: true,
} 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
