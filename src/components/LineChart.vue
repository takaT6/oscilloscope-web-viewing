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


const props = defineProps({chartData: Object});
const chartId = 'line-chart';
const width = 400;
const height = 400;
const cssClasses = '';

// const styles: PropType<Partial<CSSStyleDeclaration>> = [];//Object as PropType<Partial<CSSStyleDeclaration>>
// const plugins: PropType<Plugin<'line'>[]> = [];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  // Legend: {
  //   display: false
  // }
  options: {
  scales: {
    yAxes: [{
        ticks: {
          max: 200
        }
    }],
    xAxes: [{
      ticks: {
        maxTicksLimit: 20
      }
    }]
  }
  }
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