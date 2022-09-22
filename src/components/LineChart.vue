<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="(props.chartData as ChartData<'line'>)"
    :chart-id="chartId"
    :css-classes="cssClasses"
    :width="width"
    :height="height"
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
        // min: -10,
        max: 1,
      },
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