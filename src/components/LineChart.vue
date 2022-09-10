<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :css-classes="cssClasses"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts" >
import { PropType } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)
const props = defineProps({data: Array, timestamp: Array});
const chartId = 'line-chart';
const width = 400;
const height = 400;
const cssClasses = '';
// const styles: PropType<Partial<CSSStyleDeclaration>> = [];//Object as PropType<Partial<CSSStyleDeclaration>>
// const plugins: PropType<Plugin<'line'>[]> = [];
const chartData = {
  labels: [],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: []
    }
  ]
}
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
    // return () =>
    //   h(Line, {
    //     chartData,
    //     chartOptions,
    //     chartId: props.chartId,
    //     width: props.width,
    //     height: props.height,
    //     cssClasses: props.cssClasses,
    //     styles: props.styles,
    //     plugins: props.plugins
    //   })


</script>