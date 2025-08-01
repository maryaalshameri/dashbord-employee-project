<!-- src/components/EmployeeCharts.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- حسب نوع الدوام -->
    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl shadow-border transition-shadow duration-300 border border-border hover:shadow-accent">
      <h2 class="text-2xl font-bold text-accent m-6">عدد الموظفين حسب نوع الدوام</h2>
      <BarChart :chart-data="contractChartData" />
    </div>

    <!-- حسب القسم -->
    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl shadow-border transition-shadow duration-300 border border-border hover:shadow-accent">
      <h2 class="text-2xl font-bold text-accent m-6">عدد الموظفين حسب القسم</h2>
      <PieChart :chart-data="departmentChartData" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BarChart from  '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import { defineProps } from 'vue'

const props = defineProps({
  employees: Array
})

//  تجهيز بيانات نوع الدوام
const contractTypes = ['full-time', 'part-time', 'freelance']
const contractChartData = computed(() => {
  const counts = contractTypes.map(type =>
    props.employees.filter(emp => emp.type === type).length
  )
  return {
    labels: ['دوام كامل', 'دوام جزئي', 'مستقل'],
    datasets: [
      {
        label: 'عدد الموظفين',
        data: counts,
        backgroundColor: ['#3b82f6', '#f97316', '#10b981']
      }
    ]
  }
})

//  تجهيز بيانات الأقسام
const departments = ['الموارد البشرية', 'المشاريع', 'المالية', 'developer']
const departmentChartData = computed(() => {
  const counts = departments.map(dep =>
    props.employees.filter(emp => emp.department === dep).length
  )
  return {
    labels: departments,
    datasets: [
      {
        label: 'عدد الموظفين',
        data: counts,
        backgroundColor: ['#facc15', '#ec4899', '#6366f1', '#14b8a6']
      }
    ]
  }
})
</script>
