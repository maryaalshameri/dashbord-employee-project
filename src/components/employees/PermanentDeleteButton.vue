<template>
  <button
    class="text-red-600 hover:text-red-800 font-semibold"
    @click="confirmDelete"
  >
    <i class="fas fa-trash-alt"></i> 
  </button>
</template>

<script setup>
const props = defineProps(['employeeId'])
const emit = defineEmits(['deleted'])
import { inject } from 'vue'
const showToast = inject('showToast')

function confirmDelete() {
  if (confirm('هل أنت متأكد من حذف هذا الموظف نهائيًا؟')) {
    emit('deleted', props.employeeId)
  }
    showToast('تمت حذف نهائيا الموظف بنجاح')
}
</script>
