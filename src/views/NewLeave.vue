<template>
  <div class="divform  mt-10">
    <h2 class="titleform">إضافة طلب إجازة جديد</h2>

    <form @submit.prevent="submitForm" class="space-y-5" dir="rtl" >
      <!-- اختيار الموظف -->
      <div>
        <label class="label">اسم الموظف</label>
        <select v-model="form.employeeName" class="form-input" @change="clearError('employeeName')">
          <option value="">-- اختر الموظف --</option>
          <option v-for="emp in employees" :key="emp.id" :value="emp.name">{{ emp.name }}</option>
        </select>
        <p v-if="errors.employeeName" class="errform">{{ errors.employeeName }}</p>
      </div>

      <!-- بداية الإجازة -->
      <div>
        <label class="label">تاريخ بداية الإجازة</label>
        <input 
          type="date" 
          v-model="form.Startdate" 
          class="form-input" 
          @change="clearError('Startdate'); calculateDays()" 
        />
        <p v-if="errors.Startdate" class="errform">{{ errors.Startdate }}</p>
      </div>

      <!-- نهاية الإجازة -->
      <div>
        <label class="label">تاريخ نهاية الإجازة</label>
        <input 
          type="date" 
          v-model="form.Endtdate" 
          class="form-input" 
          @change="clearError('Endtdate'); calculateDays()" 
        />
        <p v-if="errors.Endtdate" class="errform">{{ errors.Endtdate }}</p>
      </div>

      <!-- عدد أيام الإجازة (مضاف جديد) -->
      <div v-if="daysDifference > 0">
        <label class="label">عدد أيام الإجازة</label>
        <div class="form-input bg-border">{{ daysDifference }} يوم</div>
      </div>

      <!-- سبب الإجازة -->
      <div>
        <label class="label">سبب الإجازة</label>
        <textarea 
          v-model="form.reason" 
          class="form-input" 
          rows="3" 
          @input="clearError('reason')"
          placeholder="اكتب سبب الإجازة هنا"
        ></textarea>
        <p v-if="errors.reason" class="errform">{{ errors.reason }}</p>
      </div>

      <!-- زر الإرسال -->
      <button type="submit" class="btnsave">
        إرسال الطلب
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { employees } from '@/data/employees'
import { addLeave } from '@/data/leave'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()
const daysDifference = ref(0)

const form = reactive({
  employeeName: '',
  Startdate: '',
  Endtdate: '',
  reason: '',
  status: 'قيد المراجعة',
})

const errors = reactive({})

// حساب عدد الأيام
function calculateDays() {
  if (form.Startdate && form.Endtdate) {
    const start = new Date(form.Startdate)
    const end = new Date(form.Endtdate)
    const diffTime = end - start
    daysDifference.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }
}

function clearError(field) {
  errors[field] = ''
}

function validate() {
  let valid = true;

  // الطريقة الصحيحة لمسح الأخطاء مع الحفاظ على التفاعل
  Object.keys(errors).forEach(key => delete errors[key]);

  if (!form.employeeName) {
    errors.employeeName = 'يرجى اختيار اسم الموظف';
    valid = false;
  }
  if (!form.Startdate) {
    errors.Startdate = 'يرجى تحديد تاريخ بداية الإجازة';
    valid = false;
  }
  if (!form.Endtdate) {
    errors.Endtdate = 'يرجى تحديد تاريخ نهاية الإجازة';
    valid = false;
  }
  if (form.Startdate && form.Endtdate && new Date(form.Endtdate) < new Date(form.Startdate)) {
    errors.Endtdate = 'تاريخ نهاية الإجازة يجب أن يكون بعد البداية';
    valid = false;
  }
  if (!form.reason || form.reason.trim().length < 5) {
    errors.reason = 'يرجى كتابة سبب الإجازة (5 أحرف على الأقل)';
    valid = false;
  }

  return valid;
}


function submitForm() {
  if (!validate()) return;

  const newLeave = {
    id: Date.now(),
    employeeName: form.employeeName,
    date: `${form.Startdate} إلى ${form.Endtdate}`,
    reason: form.reason,
    status: form.status,
    Startdate: form.Startdate,
    Endtdate: form.Endtdate,
    days: daysDifference.value
  };
  

  // بدل ما تعملي updateLeaveStorage بنفسك
  addLeave(newLeave);
    toast.success("تمت إضافة طلب الإجازة بنجاح!");
  
      router.push("/employees");
  


  
}
</script>

<style scoped>

</style>