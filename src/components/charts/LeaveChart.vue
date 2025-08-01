<!-- src/components/LeaveChart.vue -->
<template>
    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl shadow-border transition-shadow duration-300 border border-border hover:shadow-accent">
    <h1 class="text-2xl font-bold m-6 text-accent">إحصائيات حالة الإجازات</h1>
    <div class="chart-container">
      <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
} from 'chart.js'

// تسجيل مكونات Chart.js المطلوبة
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
)

const props = defineProps({
  leaves: {
    type: Array,
    required: true,
    default: () => []
  }
})

// حساب عدد كل حالة (مصحح لاستخدام status بدلاً من type)
const statusCounts = computed(() => {
  return props.leaves.reduce((acc, leave) => {
    if (leave.status) {
      acc[leave.status] = (acc[leave.status] || 0) + 1
    }
    return acc
  }, {
    'مقبولة': 0,
    'مرفوضة': 0,
    'قيد المراجعة': 0
  })
})

// إعداد بيانات الرسم البياني
const chartData = computed(() => {
  return {
    labels: Object.keys(statusCounts.value),
    datasets: [
      {
        data: Object.values(statusCounts.value),
        backgroundColor: [
          '#10B981', // أخضر للمقبولة
          '#EF4444', // أحمر للمرفوضة
          '#F59E0B'  // أصفر لقيد المراجعة
        ],
        borderWidth: 1
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      rtl: true,
      labels: {
        font: {
          family: 'Tajawal, sans-serif'
        },
        padding: 20

      }
    },
    tooltip: {
      rtl: true,
      bodyFont: {
        family: 'Tajawal, sans-serif'
      }
    }
  },
  cutout: '70%'
}
</script>