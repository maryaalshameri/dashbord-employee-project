<!-- src/components/EditEmployeeModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-primary text-text p-6 rounded-lg w-full max-w-lg relative shadow-lg max-h-screen overflow-y-auto">
    <button @click="$emit('close')" class="absolute top-3 left-3 text-gray-500 hover:text-red-500">
        <i class="fas fa-times"></i>
      </button>
      <h2 class="titleform">تعديل بيانات الموظف</h2>
      <form @submit.prevent="submitEdit" class="space-y-4 pb-6">
        <div>
          <label class="block mb-1">الاسم</label>
          <input v-model="formData.name"  class="input" />
        </div>

        <div>
          <label class="block mb-1">رقم الهاتف</label>
          <input v-model="formData.phone" class="input" />
        </div>

        <div>
          <label class="block mb-1">البريد الإلكتروني</label>
          <input v-model="formData.email" type="email" class="input" />
        </div>
          <div>
          <label class="block mb-1">العنوان</label>
          <input v-model="formData.address" required class="input" />
        </div>
<!-- القسم -->
<div>
  <label class="block mb-1">القسم</label>
  <select v-model="formData.department" class="input">
    <option value="">-- اختر القسم --</option>
    <option value="الموارد البشرية">الموارد البشرية</option>
    <option value="المشاريع">المشاريع</option>
    <option value="المالية">المالية</option>
    <option value="developer">Developer</option>
  </select>
</div>
<!-- نوع الدوام -->
<div>
  <label class="block mb-1">نوع الدوام</label>
  <select v-model="formData.type" class="input">
    <option value="">-- اختر نوع الدوام --</option>
    <option value="full-time">Full-time</option>
    <option value="part-time">Part-time</option>
    <option value="freelance">Freelance</option>
  </select>
</div>
        <div>
          <label class="block mb-1">الوظيفة</label>
          <input v-model="formData.job" required class="input" />
        </div>
        <div>
          <label class="block mb-1">الراتب</label>
          <input v-model.number="formData.salary" type="number" min="0" class="input" />
        </div>
        <!-- المكافأة -->
<div>
  <label class="block mb-1">المكافأة %</label>
  <input v-model.number="formData.bonusPercentage" type="number" min="0"  max="100" class="input" />
</div>

<!-- الخصم -->
<div>
  <label class="block mb-1">الخصم %</label>
  <input v-model.number="formData.deductionPercentage" type="number" min="0" max="100" class="input" />
</div>

<!-- <div>
  <label class="block mb-1"> رصيد الاجازات</label>
  <input v-model.number="formData.leaveBalance" type="number" min="0" max="30" class="input" />
</div> -->
        <div>
          <label class="block mb-1">تاريخ التعيين</label>
          <input v-model="formData.hireDate" type="date" class="input" />
        </div>

        <div class="flex justify-end gap-2">
          <button type="submit" class="btnsave">
            حفظ التعديل
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps(['employee'])
const emit  = defineEmits(['close', 'update'])
const toast = useToast()

const formData = reactive({ ...props.employee })

function submitEdit () {
  // 1. التحقق اليدوي
  if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(formData.name)) {
    toast.error('❌ الاسم يجب أن يحتوي حروفًا فقط'); return
  }
  if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)) {
    toast.error('❌ البريد الإلكتروني غير صالح'); return
  }
  if (!/^0[1-9][0-9]{7,13}$/.test(formData.phone)) {
    toast.error('❌ رقم الهاتف غير صالح'); return
  }
  if (formData.salary <= 0) {
    toast.error('❌ الراتب يجب أن يكون رقمًا موجبًا'); return
  }
  if (!formData.type) {
  toast.error('❌ يرجى اختيار نوع الدوام'); return
}
if (!formData.department) {
  toast.error('❌ يرجى اختيار القسم'); return
}
if (formData.bonusPercentage < 0 || formData.bonus > 100) {
  toast.error('❌ المكافأة لا يمكن أن يكونا سالبين'); return
}
if (formData.deductionPercentage < 0 || formData.deduction > 100) {
  toast.error('❌ الخصم لا يمكن أن يكون سالب'); return
}

// if (formData.leaveBalance < 0 || formData.leaveBalance > 30) {
//   toast.error('❌ رصيد الاجازات لا يمكن أن يكون سالب او اكبر من 30'); return
// }

  // 2. التحديث
  emit('update', { ...formData })
  toast.success('✅ تم حفظ التعديلات بنجاح')
  emit('close')
}
</script>

