<!-- src/components/EmployeeCard.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-primary text-text p-6 rounded-xl w-full max-w-md relative shadow-lg">
      
      <!-- زر الإغلاق -->
      <button @click="$emit('close')" class="absolute top-3 left-3 text-btn hover:text-btnhover">
        <i class="fas fa-times text-xl"></i>
      </button>

      <div class="flex flex-col items-center text-center space-y-4">
        <h3 class="text-2xl font-bold">{{ employee.name }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-300">{{ employee.job }} - {{ employee.department }}</p>
        
        <!-- باقي التفاصيل -->
        <div class="text-right w-full space-y-2">
          <div><strong>رقم الهاتف:</strong> {{ employee.phone }}</div>
          <div><strong>البريد الإلكتروني:</strong> {{ employee.email }}</div>
          <div><strong>نوع العقد :</strong> {{ employee.type }}</div>
          <div><strong>الراتب:</strong> {{ employee.salary }}</div>
          <div><strong>المكافأء:</strong> {{ employee.bonusPercentage }}</div>
          <div><strong>الخصم:</strong> {{ employee.deductionPercentage }}</div>

          <div>
            <strong>رصيد الإجازات:</strong> 
            <span
              class="px-2 py-1 rounded-full text-white text-sm m-2"
              :class="{
                'bg-red-400': employee.leaveBalance <= 10,
                'bg-yellow-400': employee.leaveBalance > 10 && employee.leaveBalance <= 20,
                'bg-green-400': employee.leaveBalance > 20 && employee.leaveBalance <= 30
              }"
            >
              {{ employee.leaveBalance }}
            </span>
          </div>

          <div><strong>الراتب الكلي:</strong> 
            {{ (employee.salary + (employee.salary * employee.bonusPercentage) - (employee.salary * employee.deductionPercentage)).toLocaleString() }} ﷼
          </div>

          <div><strong>تاريخ التعيين:</strong> {{ employee.hireDate }}</div>
          <div><strong>العنوان:</strong> {{ employee.address }}</div>
        </div>

        <!-- تقييم النجوم -->
        <div class="mt-4">
          <strong>تقييم:</strong>
          <div class="flex justify-center gap-1 mt-1">
            <i
              v-for="star in 5"
              :key="star"
              class="fas"
              :class="star <= currentRating ? 'fa-star text-yellow-400' : 'fa-star text-gray-400'"
              @click="setRating(star)"
            ></i>
          </div>
        </div>

        <!-- زر إضافة إجازة -->
        <router-link
          to="/NewLeave"
          class="btnAdd"
          :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': employee.leaveBalance === 0 }"
        >
          <i class="fas fa-plus mr-2"></i> إضافة طلب إجازة
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['employee'])
const emit = defineEmits(['close'])
// const getAvatarPath = (filename) =>
//   new URL(`@/assets/image/${filename}`, import.meta.url).href

// نجلب التقييم الحالي أو صفر


const currentRating = ref(props.employee.rating || 0)

// تحديث التقييم عند الضغط
function setRating(star) {
  currentRating.value = star
  props.employee.rating = star
  localStorage.setItem('employees', JSON.stringify(JSON.parse(localStorage.getItem('employees')).map(emp => {
    return emp.id === props.employee.id ? { ...emp, rating: star } : emp
  })))
}
</script>
