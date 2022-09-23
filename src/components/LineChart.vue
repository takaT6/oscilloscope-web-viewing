<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="(props.chartData as ChartData<'line'>)"
    :chart-id="chartId"
    :css-classes="cssClasses"
    :width="width"
    :height="height"
  />
  <UplotVue
        :data="data"
        :options="options"
        :target="target"
        @create="onCreate"
        @delete="onDelete"
    />
</template>

<script setup lang="ts" >
import { ref } from 'vue'
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
  Plugin,
  ChartData,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
)


const props = defineProps({chartData: Object});
const chartId = 'line-chart';
const width = 400;
const height = 400;
const cssClasses = '';

// const styles: PropType<Partial<CSSStyleDeclaration>> = [];//Object as PropType<Partial<CSSStyleDeclaration>>
// const plugins: PropType<Plugin<'line'>[]> = [];

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  // options: {
    scales: {
      // xAxes: [{
      //   type: 'linear',
      //         display: true,
      //         gridLines: {
      //           display: false,
      //         }
          
      // }]
      y: {
        min: -2,
        max: 2,
      },
      // x: {
      //   min: 50,
      //   max: 100,
      // }

    },
  // },
  plugins: {
    legend: {
        display: true,
        labels: {
            color: 'rgb(255, 99, 132)'
        }
      }
    },
}

import uPlot from 'uplot';
import UplotVue from 'uplot-vue';

</script>