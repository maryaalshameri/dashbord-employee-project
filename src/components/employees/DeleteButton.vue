<!-- components/DeleteButton.vue -->
<template>
  <button
    class="btndalete"
    @click.stop="confirmDelete"
  >
    <i class="fas fa-trash"></i>
  </button>
</template>

<script setup>
import { inject } from 'vue'
const showToast = inject('showToast')
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['deleteConfirmed'])
const props = defineProps({
  employeeId: Number
})

function confirmDelete() {
  const confirmed = window.confirm('هل أنت متأكد أنك تريد نقل هذا الموظف إلى سلة المهملات؟')
  if (confirmed) {
    emit('deleteConfirmed', props.employeeId)
  }
  showToast('تمت نقل  الموظف الى سله المهملات بنجاح')
}
</script>
