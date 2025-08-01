<!-- src/components/leave/EditLeaveModal.vue -->
<template>
  <div v-if="leave" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
      <button @click="$emit('close')" class="absolute top-2 left-2 text-red-500 text-2xl">&times;</button>
      <h3 class="titleform">تعديل الإجازة</h3>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="block mb-1 font-semibold">اسم الموظف:</label>
          <input v-model="leave.employeeName" class="input" disabled />
          <p v-if="errors.employeeName" class="errform">{{ errors.employeeName }}</p>
        </div>
        <div class="mb-3">
          <label class="block mb-1 font-semibold">تاريخ بداية الإجازة:</label>
          <input type="date" v-model="leave.Startdate" class="input" />
          <p v-if="errors.Startdate" class="errform">{{ errors.Startdate }}</p>
        </div>
        <div class="mb-3">
          <label class="block mb-1 font-semibold">تاريخ نهايه الإجازة:</label>
          <input type="date" v-model="leave.Endtdate" class="input" />
          <p v-if="errors.Endtdate" class="errform">{{ errors.Endtdate }}</p>
        </div>
        <div class="mb-3">
          <label class="block mb-1 font-semibold">الحالة:</label>
          <select v-model="leave.status" class="input">
            <option value="قيد المراجعة">قيد المراجعة</option>
            <option value="مقبولة">مقبولة</option>
            <option value="مرفوضة">مرفوضة</option>
          </select>
          <p v-if="errors.status" class="errform">{{ errors.status }}</p>
        </div>
        <button type="submit" class="btnsave">تعديل</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leave: Object,
    calculateDaysDifference: Function
  },
  data() {
    return {
      errors: {}
    }
  },
  methods: {
    handleSubmit() {
      this.errors = {};
      
      if (!this.leave.Startdate) this.errors.Startdate = "تاريخ بداية الإجازة مطلوب";
      if (!this.leave.Endtdate) this.errors.Endtdate = "تاريخ نهاية الإجازة مطلوب";
      if (!this.leave.status) this.errors.status = "الحالة مطلوبة";
      
      if (Object.keys(this.errors).length === 0) {
        this.$emit('save', this.leave);
      }
    }
  }
}
</script>

<style scoped>
/* نفس التنسيقات السابقة */
</style>