<template>
  <canvas id="chart"/>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

////////////////////////////////////////////////////////////////////////////////
// data
////////////////////////////////////////////////////////////////////////////////
let chart = {}; // チャートオブジェクト
const chart_height = 400; // チャートの高さ
let chart_options = { // チャートのオプション
    scales: {
        y: {
            beginAtZero: true
        }
    },
};
let chart_data = { // チャートのデータ
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
    }]
};

////////////////////////////////////////////////////////////////////////////////
// onMountedライフサイクルフック
////////////////////////////////////////////////////////////////////////////////
onMounted(() => {
    renderChart();
});

////////////////////////////////////////////////////////////////////////////////
// チャートを描画する
////////////////////////////////////////////////////////////////////////////////
const renderChart = () => {
  const canvas = document.getElementById('chart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  chart = new Chart(ctx, {
      type: "bar",
      data: chart_data,
      options: chart_options,
  });
};
</script>