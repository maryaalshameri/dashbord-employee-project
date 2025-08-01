<template>
  <div class="flex gap-4 items-center mb-4">
    <select v-model="filters.department" class="border p-2 rounded">
      <option value="">كل الأقسام</option>
      <option value="الموارد البشرية">الموارد البشرية</option>
      <option value="المشاريع">المشاريع</option>
      <option value="المالية">المالية</option>
      <option value="developer">المطورين</option>
    </select>

    <select v-model="filters.jobTitle" class="border p-2 rounded">
      <option value="">كل الوظائف</option>
      <option value="مدير">مدير</option>
      <option value="محاسب">محاسب</option>
      <option value="مبرمج">مبرمج</option>
      <option value="مصمم">مصمم</option>
    </select>

    <button
      @click="clearFilters"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      مسح الفلاتر
    </button>
  </div>
</template>

<script setup>
defineProps(['filters'])

function clearFilters() {
  filters.department = ''
  filters.jobTitle = ''
}
</script>
