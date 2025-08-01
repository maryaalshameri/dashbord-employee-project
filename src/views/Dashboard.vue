<template>
  <div class="space-y-6 p-6 mt-10" dir="rtl">

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div
        v-for="card in cards"
        :key="card.title"
        class="p-4 flex items-center justify-between rounded-xl shadow-lg hover:shadow-xl shadow-border transition-shadow duration-300 border border-border hover:shadow-accent"
        >
      
        <div>
          <h2 class="text-text text-sm">{{ card.title }}</h2>
          <p class="text-xl font-semibold text-text">{{ card.value }}</p>
        </div>
        <div :class="card.color">
          <i :class="card.icon"></i>
        </div>
      </div>
    </div>
    
   
   
      <select 
        v-model="ratingFilter"
        class="selectfilter md:w-1/5"
      >
        <option value="0">كل الموظفين</option>
        <option value="5">5 نجوم</option>
        <option value="4">4 نجوم فما فوق</option>
        <option value="3">3 نجوم فما فوق</option>
        <option value="2">2 نجوم فما فوق</option>
        <option value="1">1 نجمة فما فوق</option>
      </select>


    <!-- قسم كروت الموظفين -->
    <div>
      <h1 class="text-2xl font-bold mb-6 text-accent">معلومات الموظفين</h1>
      <div v-if="filteredEmployees.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EmployeeCard 
          v-for="emp in filteredEmployees" 
          :key="emp.id" 
          :employee="emp" 
          :leaves="filteredLeaves(emp.id)" 
        />
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        لا يوجد موظفين مطابقين للفلترة المحددة
      </div>
    </div>
    <h1 class="text-2xl font-bold text-accent">أخر الاحصائيات</h1>
    
    <div class="flex flex-col gap-6 mb-6 xl:flex-row">
      <LeaveChart :leaves="leaves" />
      <EmployeeCharts :employees="employees" />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import EmployeeCard from '@/components/DashCard.vue'
import LeaveChart from '@/components/charts/LeaveChart.vue'
import EmployeeCharts from '@/components/charts/EmployeeCharts.vue'

const ratingFilter = ref('0')
const employees = ref([])
const leaves = ref([])

// تحميل البيانات
function loadData() {
  const storedEmployees = localStorage.getItem('employees')
  const storedLeaves = localStorage.getItem('leaveData')
  
  if (storedEmployees) {
    try {
      employees.value = JSON.parse(storedEmployees).map(emp => ({
        ...emp,
        rating: emp.rating || 0 // تأكيد وجود التقييم
      }))
    } catch (error) {
      console.error('Error loading employees:', error)
    }
  }
  
  if (storedLeaves) {
    try {
      leaves.value = JSON.parse(storedLeaves)
    } catch (error) {
      console.error('Error loading leaves:', error)
    }
  }
}

// فلترة الموظفين حسب التقييم
const filteredEmployees = computed(() => {
  if (ratingFilter.value === '0') return employees.value
  return employees.value.filter(emp => 
    emp.rating >= parseInt(ratingFilter.value)
  )
})

// فلترة الإجازات حسب الموظف
const filteredLeaves = (employeeId) => {
  return leaves.value.filter(leave => 
    leave.employeeId === employeeId || 
    leave.employeeName?.trim() === employees.value.find(e => e.id === employeeId)?.name?.trim()
  )
}

// الكروت الإحصائية
const cards = computed(() => [
  { 
    title: "عدد الموظفين", 
    value: employees.value.length, 
    icon: "fas fa-users",
    color: "text-blue-400 text-3xl" 
  },
  { 
    title: "طلبات الإجازة", 
    value: leaves.value.length, 
    icon: "fas fa-calendar-check",
    color: "text-purple-500 text-3xl" 
  },
  { 
    title: "الرواتب هذا الشهر", 
    value: calculateTotalSalary(), 
    icon: "fas fa-money-bill-wave",
    color: "text-green-500 text-3xl" 
  },
  { 
    title: "قيد المراجعه ", 
    value: countPendingLeaves(), 
    icon: "fas fa-exclamation-circle",
    color: "text-amber-500 text-3xl" 
  },
])

// دالة حساب إجمالي الرواتب
function calculateTotalSalary() {
  const total = employees.value.reduce((sum, emp) => {
    const salary = emp.salary || 0
    const bonus = (emp.bonusPercentage || 0) / 100 * salary
    const deduction = (emp.deductionPercentage || 0) / 100 * salary
    return sum + salary + bonus - deduction
  }, 0)
  
  return total.toLocaleString() + '﷼'
}

// دالة حساب المتأخرات
function countPendingLeaves() {
  return leaves.value.filter(leave => leave.status === 'قيد المراجعة').length
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* يمكنك إضافة أي تخصيصات إضافية هنا */
</style>