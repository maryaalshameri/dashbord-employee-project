<template>
  <button
    class="text-green-600 hover:text-green-800 font-semibold"
    @click="restore"
  >
    <i class="fas fa-undo"></i> 
  </button>
</template>

<script setup>
import { inject } from 'vue'
const showToast = inject('showToast')
const props = defineProps(['employee'])
const emit = defineEmits(['restored'])

function restore() {
  emit('restored', props.employee)
   showToast('تمت استعادة الموظف بنجاح')
}
</script>
