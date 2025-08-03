<script setup>
import { computed } from 'vue';

const props = defineProps({
  employee: Object,
  leaves: Array
});

const employeeLeaves = computed(() =>
  props.leaves.filter(
    leave => leave.employeeName.trim().toLowerCase() === props.employee.name.trim().toLowerCase()
  )
);

const calculateDaysDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

// تقييم النجوم
const ratingStars = computed(() => {
  return Array.from({ length: 5 }, (_, i) => ({
    filled: i < (props.employee.rating || 0)
  }));
});
</script>

<template>
  <div class="bg-primary rounded-xl shadow-lg overflow-hidden hover:shadow-xl shadow-border transition-shadow duration-300 border border-border hover:shadow-accent">
    <!-- Header with employee name and rating filter -->
    <div class="bg-gradient-to-r from-btn to-btnhover p-4 text-primary">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <i class="fas fa-user-tie text-xl"></i>
          <h2 class="text-xl font-bold">{{ employee.name }}</h2>
        </div>
        
        <!-- تقييم النجوم في الهيدر -->
        <div class="flex items-center space-x-1">
          <i
            v-for="(star, index) in ratingStars"
            :key="index"
            class="fas fa-star text-sm"
            :class="star.filled ? 'text-yellow-400' : 'text-border'"
          ></i>
          <span class="text-sm ml-1">({{ employee.rating || 0 }}/5)</span>
        </div>
      </div>
    </div>

    <!-- Employee details -->
    <div class="p-5 space-y-3">
      <!-- Contract Type -->
      <div class="flex items-center space-x-2 text-text">
        <i class="fas fa-file-contract w-5 text-btn"></i>
        <span><span class="font-semibold">نوع العقد:</span> {{ employee.type }}</span>
      </div>

      <!-- Department -->
      <div class="flex items-center space-x-2 text-text">
        <i class="fas fa-building w-5 text-btn"></i>
        <span><span class="font-semibold">القسم:</span> {{ employee.department }}</span>
      </div>

      <!-- Job -->
      <div class="flex items-center space-x-2 text-text">
        <i class="fas fa-briefcase w-5 text-btn"></i>
        <span><span class="font-semibold">الوظيفة:</span> {{ employee.job }}</span>
      </div>

      <!-- تاريخ التعيين  -->
      <div class="flex items-center space-x-2 text-text">
        <i class="fas fa-calendar-check w-5 text-btn"></i>
        <span><span class="font-semibold">تاريخ التعيين :</span> {{ employee.date }}</span>
      </div>

      <!-- Salary -->
      <div class="flex items-center space-x-2 text-text">
        <i class="fas fa-money-bill-wave w-5 text-btn"></i>
        <span><span class="font-semibold">الراتب:</span> {{ employee.salary.toLocaleString() }} ريال</span>
      </div>

      <!-- Deduction -->
      <div class="flex items-center space-x-2 text-text">
        <i class="fas fa-minus-circle w-5 text-red-500"></i>
        <span><span class="font-semibold">الخصم:</span> {{ employee.deductionPercentage }}%</span>
      </div>

      <!-- Bonus -->
      <div class="flex items-center space-x-2 text-text">
        <i class="fas fa-plus-circle w-5 text-btn"></i>
        <span><span class="font-semibold">المكافأة:</span> {{ employee.bonusPercentage }}%</span>
      </div>

        <div class="flex items-center space-x-2 text-text">
        <i class="fas fa-clock w-5 text-btn"></i>
        <span class="px-2 py-1 rounded-full text-white text-sm"
              :class="{
                'bg-red-200': employee.leaveBalance <= 10,
                'bg-yellow-200': employee.leaveBalance > 10 && employee.leaveBalance <= 20,
                'bg-green-200': employee.leaveBalance > 20 && employee.leaveBalance <= 30
              }"
            ><span class="font-semibold">رصيد الاجازات:</span>    {{ employee.leaveBalance }}</span>
      </div>

       

      <!-- Leaves section -->
      <div class="mt-4 pt-4 border-t border-gray-100">
        <div class="flex items-center space-x-2 text-accent font-semibold mb-2">
          <i class="fas fa-calendar-alt w-5 text-btn"></i>
          <h3>سجل الإجازات ({{ employeeLeaves.length }})</h3>
        </div>

        <div v-if="employeeLeaves.length" class="space-y-3">
          <div 
            v-for="leave in employeeLeaves" 
            :key="leave.id" 
            class="bg-gray-50 p-3 rounded-lg border border-border"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-2">
                <span class="px-2 py-1 text-xs rounded-full font-medium"
                      :class="{
                        'bg-yellow-100 text-yellow-800': leave.status === 'قيد المراجعة',
                        'bg-green-100 text-green-800': leave.status === 'مقبولة',
                        'bg-red-100 text-red-900': leave.status === 'مرفوضة'
                      }">
                  {{ leave.status }}
                </span>
                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                  {{ calculateDaysDifference(leave.Startdate, leave.Endtdate) }} أيام
                </span>
              </div>
              <i class="fas fa-info-circle w-5 text-btn"></i>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              <div>{{ leave.Startdate }} → {{ leave.Endtdate }}</div>
              <div class="text-gray-500 mt-1">{{ leave.reason }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text-sm text-text bg-accent p-3 rounded-lg text-center">
          لا توجد إجازات مسجلة
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .employee-card {
  transition: all 0.3s ease;
}

.employee-card:hover {
  transform: translateY(-2px);
}

.card-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-item {
  padding: 0.3rem 0;
}

.rating-stars i {
  transition: color 0.2s;
}

.leave-item {
  transition: all 0.2s ease;
}

.leave-item:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.status-badge, .days-count {
  transition: all 0.2s ease;
}

@media (max-width: 768px) {
  .card-body {
    padding: 1rem;
  }
  
  .detail-item {
    font-size: 0.9rem;
  }
} */
</style>