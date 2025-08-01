<!-- src/components/charts/PieChart.vue -->
<template>
  <Pie :data="chartData" :options="options" />
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

defineProps(['chartData'])

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#333'
      }
    }
  }
}
</script>
