<!-- src/components/leave/DeleteLeaveModal.vue -->
<template>
  <div v-if="leave" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-5 rounded shadow-md max-w-sm w-full">
      <h4 class="text-lg font-bold mb-4">هل أنت متأكد من حذف الإجازة؟</h4>
      <div class="flex justify-end gap-2">
        <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
        <button @click="$emit('confirm')" class="px-4 py-2 bg-red-500 text-white rounded">نعم، احذف</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leave: Object
  }
}
</script>