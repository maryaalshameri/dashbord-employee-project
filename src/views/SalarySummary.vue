<template>
  <section class="p-6 space-y-6  mt-10" dir="rtl">
    <div class="title">
      <h2 class="txthead">ملخص الرواتب</h2>
      
      <!-- فلترة حسب القسم -->
      <select v-model="selectedDepartment" class="selectfilter md:w-1/5">
        <option value="">كل الأقسام</option>
        <option value="الموارد البشرية">الموارد البشرية</option>
        <option value="المشاريع">المشاريع</option>
        <option value="المالية">المالية</option>
        <option value="developer">Developer</option>
      </select>

      <!-- فلترة حسب نوع العقد -->
      <select v-model="selectedType" class="selectfilter md:w-1/5">
        <option value="">كل أنواع العقد</option>
        <option value="full-time">دوام كامل</option>
        <option value="part-time">دوام جزئي</option>
        <option value="freelance">Freelance</option>
      </select>

      <!-- أزرار الترتيب -->
      <button @click="sortAscending" class="btnAdd p-2">
        ترتيب <i class="fas fa-sort-amount-up-alt"></i>
      </button>
      <button @click="sortDescending" class="btnAdd p-2">
        ترتيب <i class="fas fa-sort-amount-down-alt"></i>
      </button>
    </div>
    
    <p class="mb-2">عدد الموظفين: {{ filteredSalaries.length }}</p>
   
    <SalaryTable :salaries="filteredSalaries" />
    
    <!-- أزرار التصدير -->
    <div class="flex gap-4 mb-8">
      <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" @click="exportToPDF">
        تصدير PDF
      </button>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="exportToJSON">
        تصدير JSON
      </button>
    </div>
    <!-- جدول الرواتب -->
  
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SalaryTable from '@/components/salary/SalaryTable.vue'
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
import amiriFont from '@/assets/fonts/Amiri-Regular-normal.js'

const employees = ref([])
const selectedDepartment = ref("")
const selectedType = ref("")
const sortDirection = ref(null) // 'asc' أو 'desc'

// حساب الملخص مع الفلترة
const filteredSalaries = computed(() => {
  let result = employees.value.map(emp => {
    const base = emp.salary || 0
    const bonus = base * (emp.bonusPercentage || 0) / 100
    const deduction = base * (emp.deductionPercentage || 0) / 100
    return {
      id: emp.id,
      name: emp.name,
      department: emp.department,
      type: emp.type,
      base,
      bonus,
      deduction,
      total: base + bonus - deduction
    }
  })

  // تطبيق الفلترة حسب القسم
  if (selectedDepartment.value) {
    result = result.filter(emp => emp.department === selectedDepartment.value)
  }

  // تطبيق الفلترة حسب نوع العقد
  if (selectedType.value) {
    result = result.filter(emp => emp.type === selectedType.value)
  }

  // تطبيق الترتيب
  if (sortDirection.value === 'asc') {
    result.sort((a, b) => a.total - b.total)
  } else if (sortDirection.value === 'desc') {
    result.sort((a, b) => b.total - a.total)
  }

  return result
})

// عند تحميل الصفحة
onMounted(() => {
  const stored = localStorage.getItem('employees')
  if (stored) {
    employees.value = JSON.parse(stored)
  }
})

// دوال الترتيب
function sortAscending() {
  sortDirection.value = 'asc'
}

function sortDescending() {
  sortDirection.value = 'desc'
}

// التصدير JSON
function exportToPDF() {
  const doc = new jsPDF()
  doc.addFileToVFS('Amiri-Regular-normal.ttf', amiriFont)
  doc.addFont('Amiri-Regular-normal.ttf', 'Amiri', 'normal')
  doc.setFont('Amiri')
  doc.setFontSize(14)
  doc.text('تقرير الرواتب', 105, 15, { align: 'center' })

  const headers = [['الاسم', 'الراتب الأساسي', 'المكافأة', 'الخصم', 'الصافي', 'القسم', 'نوع الدوام']]

  const data = sortedSalaries.value.map(emp => [
    emp.name,
    emp.base.toFixed(2),
    emp.bonus.toFixed(2),
    emp.deduction.toFixed(2),
    emp.total.toFixed(2),
    emp.department,
    emp.type,
  ])

  autoTable(doc, {
    startY: 25,
    head: headers,
    body: data,
    styles: { font: 'Amiri', fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], halign: 'center' },
    bodyStyles: { halign: 'center' },
  })

  doc.save('salaries.pdf')
}
</script>