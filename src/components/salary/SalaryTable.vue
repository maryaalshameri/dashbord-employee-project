<!-- src/components/SalaryTable.vue -->
<template>
  
<div class="overflow-x-auto shadow rounded-lg">
  <div class="min-w-[800px] md:min-w-0"> <!-- تحديد عرض أدنى للجدول -->
    <table class="tbl w-full"> 
        <thead class="hd">
      <tr>
        <th class="tr">#</th>
        <th class="tr">الاسم</th>
        <th class="tr">الأساسي</th>
        <th class="tr">المكافآت</th>
        <th class="tr">الخصم</th>
        <th class="tr">الإجمالي</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in salaries" :key="index" class="border-b border-border hover:bg-btnhover cursor-pointer">
        <td class="tr">{{ index + 1 }}</td>
        <td class="tr">{{ item.name }}</td>
        <td class="tr">{{ item.base }}</td>
        <td class="tr">{{ item.bonus }}</td>
        <td class="tr">{{ item.deduction }}</td>
        <td class="tr font-bold text-green-600 dark:text-green-400">{{ item.total }}</td>
      </tr>
    </tbody>
  </table>
    </div>
</div>
</template>

<script setup>
defineProps(['salaries'])
</script>
