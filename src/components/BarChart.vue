<template>
  <LineChart
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

<script setup lang="ts">
import {PropType, computed, ref} from 'vue'
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
  ChartData
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


interface Props {
  chartId: string;
  width: number;
  height: number;
  cssClasses: string;
  // styles: Object; //Object as PropType<Partial<CSSStyleDeclaration>>
  // plugins:  Array<Plugin<'line'>[]>; //Array as PropType<Plugin<'line'>[]>
  styles: PropType<Partial<CSSStyleDeclaration>>;
  plugins: PropType<Plugin<'line'>[]>;
  chartData: {
    labels: string[];
    datasets: Array<{
      label: string,
      backgroundColor: string,
      data:number[]
    }>;
  };
  chartOptions: {
    responsive: boolean,
    maintainAspectRatio: boolean
  }
}
const props =  withDefaults(defineProps<Props>(), {
  chartId: 'line-chart',
  width: 400,
  height: 400,
  cssClasses: '',
  styles: () => {return {}},
  plugins: () => [],
  // chartData: () => {return{
  //   labels: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: () => [{
  //     label: 'Data One',
  //     backgroundColor: '#f87979',
  //     data: [40, 39, 10, 40, 39, 80, 40]
  //   }]
  // }},
  // chartOptions: () => {return{
  //   responsive: true,
  //   maintainAspectRatio: false
  // }}
});
const dataValues = ref([40, 39, 10, 40, 39, 80, 40]);
const chartData = computed<ChartData<'doughnut'>>(() => ({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: dataValues.value
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
// const h = () => { return (Line, {
//         chartData,
//         chartOptions,
//         chartId: props.chartId,
//         width: props.width,
//         height: props.height,
//         cssClasses: props.cssClasses,
//         styles: props.styles,
//         plugins: props.plugins
//       })
// }
// interface Datasets = {
//     label: string,
//     backgroundColor: string,
//     data: Array<number>
// }
// interface Props2 {
//   labels: string[];
//   datasets: Array<{
//     label: string,
//     backgroundColor: string,
//     data: Array<number>
//   }>;
  // datasets: Array<Ob>
// }
// const chartData =  withDefaults(defineProps<Props2>(), {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'] as string[],
//   datasets: [{
//     label: 'Data One',
//     backgroundColor: '#f87979',
//     data: [40, 39, 10, 40, 39, 80, 40]
//   }]
// });

//   setup(props) {
//     const chartData = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//         {
//           label: 'Data One',
//           backgroundColor: '#f87979',
//           data: [40, 39, 10, 40, 39, 80, 40]
//         }
//       ]
//     }

//     const chartOptions = {
//       responsive: true,
//       maintainAspectRatio: false
//     }

//     return () =>
//       h(Line, {
//         chartData,
//         chartOptions,
//         chartId: props.chartId,
//         width: props.width,
//         height: props.height,
//         cssClasses: props.cssClasses,
//         styles: props.styles,
//         plugins: props.plugins
//       })
//   }
// })
</script>