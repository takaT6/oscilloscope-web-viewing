<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts" >
import { defineComponent, h, PropType } from 'vue'

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

const chartId = 'line-chart';
const width = 400;
const height = 400;
const cssClasses = '';
const styles: PropType<Partial<CSSStyleDeclaration>> = () => {return {}};//Object as PropType<Partial<CSSStyleDeclaration>>,
const plugins: PropType<Plugin<'line'>[]> = () => {return []};
const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
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