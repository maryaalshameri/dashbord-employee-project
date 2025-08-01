<template>
  <section class="p-6 space-y-6  mt-10">
    <h2 class="text-2xl font-bold text-text">سلة المهملات</h2>

    <div v-if="trashList.length === 0" class="text-center text-text">لا يوجد موظفين في سلة المهملات</div>

    <div v-else class="overflow-x-auto shadow rounded-lg">
      <table class="min-w-full text-sm bg-primary  text-right">
        <thead class="bg-accent text-primary">
          <tr>
            <th class="px-4 py-2">الاسم</th>
            <th class="px-4 py-2">الوظيفة</th>
            <th class="px-4 py-2">القسم</th>
           
            <th class="px-4 py-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in trashList"
            :key="employee.id"
            class="border-b border-border hover:bg-btnhover"
          >
            <td class="px-4 py-2">{{ employee.name }}</td>
            <td class="px-4 py-2">{{ employee.job }}</td>
            <td class="px-4 py-2">{{ employee.department }}</td>
       
            <td class="px-4 py-2 flex gap-2 justify-start">
              <RestoreButton :employee="employee" @restored="restoreEmployee" />
              <FinalDeleteButton :employeeId="employee.id" @deleted="deletePermanently" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RestoreButton from '@/components/employees/RestoreButton.vue'
import FinalDeleteButton from '@/components/employees/PermanentDeleteButton.vue'

const trashList = ref([])

function loadTrash() {
  const data = localStorage.getItem('trashList')
  trashList.value = data ? JSON.parse(data) : []
}

function restoreEmployee(emp) {
  const employees = JSON.parse(localStorage.getItem('employees')) || []
  employees.push(emp)
  localStorage.setItem('employees', JSON.stringify(employees))

  trashList.value = trashList.value.filter(e => e.id !== emp.id)
  localStorage.setItem('trashList', JSON.stringify(trashList.value))
}

function deletePermanently(id) {
  trashList.value = trashList.value.filter(e => e.id !== id)
  localStorage.setItem('trashList', JSON.stringify(trashList.value))
}

onMounted(loadTrash)
</script>
<style scoped>
section{
  direction: rtl;
}
</style>