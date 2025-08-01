<template>
  <div class="divform  mt-10">
    <h2 class="titleform">إضافة موظف جديد</h2>
    
    <form @submit.prevent="submitForm" class="space-y-5" dir="rtl">
      <!-- الاسم -->
      <div>
        <label class="label">الاسم الكامل</label>
        <input v-model="employee.name" @input="validateField('name')" type="text" class="form-input" placeholder="أدخل اسم الموظف" />
        <p v-if="errors.name" class="errform">{{ errors.name }}</p>
      </div>

      <!-- البريد -->
      <div>
        <label class="label">البريد الإلكتروني</label>
        <input v-model="employee.email" @input="validateField('email')" type="email" class="form-input" placeholder="example@example.com" />
        <p v-if="errors.email" class="errform">{{ errors.email }}</p>
      </div>

      <!-- الهاتف -->
      <div>
        <label class="label">رقم الهاتف</label>
        <input v-model="employee.phone" @input="validateField('phone')" type="text" class="form-input" />
        <p v-if="errors.phone" class="errform">{{ errors.phone }}</p>
      </div>

      <!-- العنوان -->
      <div>
        <label class="label">العنوان</label>
        <input v-model="employee.address" @input="validateField('address')" type="text" class="form-input" placeholder="مثال: تعز" />
              <p v-if="errors.address" class="errform">{{ errors.address }}</p>

    </div>

      <!-- القسم -->
      <div>
        <label class="label">القسم</label>
        <select v-model="employee.department" @blur="validateField('department')" class="form-input">
          <option disabled value="">اختر قسمًا</option>
          <option>الموارد البشرية</option>
          <option>المشاريع</option>
          <option>المالية</option>
          <option>developer</option>
        </select>
          <p v-if="errors.department" class="errform">{{ errors.department }}</p>

      </div>

       <div>
        <label class="label">الوظيفه</label>
        <input v-model="employee.job" @input="validateField('job')" type="text" class="form-input" placeholder="أدخل اسم الوظيفه" />
        <p v-if="errors.job" class="errform">{{ errors.job }}</p>
      </div>

      <!-- نوع الدوام -->
      <div>
        <label class="label">نوع الدوام</label>
        <select v-model="employee.type" @blur="validateField('type')" class="form-input">
          <option disabled value="">اختر نوع الدوام</option>
          <option>full-time</option>
          <option>part-time</option>
          <option>freelance</option>
        </select>
        <p v-if="errors.type" class="errform">{{ errors.type }}</p>
      </div>

      <!-- الراتب -->
      <div>
        <label class="label">الراتب</label>
        <input v-model.number="employee.salary" @input="validateField('salary')" type="number" class="form-input" />
        <p v-if="errors.salary" class="errform">{{ errors.salary }}</p>
      </div>

      <!-- المكافأة -->
      <div>
        <label class="label">نسبة المكافأة %</label>
        <input v-model.number="employee.bonusPercentage" @input="validateField('bonusPercentage')"  type="number" class="form-input" min="0"  max="100" placeholder="مثلاً: 10" />
         <p v-if="errors.bonusPercentage" class="errform">{{ errors.bonusPercentage }}</p>

    </div>

      <!-- الخصم -->
      <div>
        <label class="label">نسبة الخصم %</label>
        <input v-model.number="employee.deductionPercentage" @input="validateField('deductionPercentage')" type="number" class="form-input" min="0" max ="100" placeholder="مثلاً: 5" />
      <p v-if="errors.deductionPercentage" class="errform">{{ errors.deductionPercentage }}</p>

    </div>

    <div>
        <label class="label">التاريخ</label>
        <input v-model="employee.hireDate" @input="validateField('hireDate')" type="date" class="form-input" placeholder="أدخل اسم الموظف" />
        <p v-if="errors.hireDate" class="errform">{{ errors.hireDate }}</p>
      </div>
        <div>
        <label class="label">رصيد الاجازات</label>
        <input v-model.number="employee.leaveBalance" @input="validateField('leaveBalance')" type="number" class="form-input" min="0" max ="30" placeholder="مثلاً: 5" />
      <p v-if="errors.leaveBalance" class="errform">{{ errors.leaveBalance }}</p>

    </div>

      <!-- زر الإرسال -->
      <button type="submit" class="btnsave">
        حفظ الموظف
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { saveEmployee } from '@/data/employees'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()

const employee = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  department: '',
  job: '',
  type: '',
  salary: null,
  bonusPercentage: 0,
  deductionPercentage: 0,
  leaveBalance:0,
  hireDate:''
})

const errors = reactive({})

function validateField(field) {
  if (field === 'name' && !employee.name) {
    errors.name = 'الاسم مطلوب'
  } 
 
  else if (field === 'email' && !employee.email.includes('@')) {
    errors.email = 'البريد غير صحيح'
  } else if (field === 'phone' && !employee.phone.match(/^0[1-9][0-9]{7,13}$/)) {
    errors.phone = ' رقم غير صحيح، يجب أن يتكون من 13 أرقام مع مفتاح الدولة'
  } 
  else if (field === 'job' && !employee.job) {
    errors.job = 'الوظيفه مطلوب'
  }

  else if (field === 'address' && !employee.address) {
    errors.address = 'العنوان مطلوب'
  }
  else if (field === 'type' && !employee.type) {
  errors.type = 'نوع الدوام مطلوب'
} 
else if (field === 'department' && !employee.department) {
  errors.department = 'القسم مطلوب'
}
  
  else if (field === 'salary' && (employee.salary <= 0 || isNaN(employee.salary))) {
    errors.salary = 'الراتب يجب أن يكون رقمًا موجبًا'
  }
  else if (field === 'bonusPercentage' && ( isNaN(employee.bonusPercentage) || employee.bonusPercentage < 0 || employee.bonusPercentage > 100 )) {
    errors.bonusPercentage = ' المكافاءه يجب أن يكون رقمًا موجبًا واصغر من 100'
  }
 else if (field === 'deductionPercentage' && (isNaN(employee.deductionPercentage) || employee.deductionPercentage < 0 || employee.deductionPercentage > 100)) {
  errors.deductionPercentage = 'الخصم يجب أن يكون رقمًا أكبر من 0 وأقل من أو يساوي 100';
}

 else if (field === 'leaveBalance' && (isNaN(employee.leaveBalance) || employee.leaveBalance < 0 || employee.leaveBalance > 30)) {
  errors.leaveBalance = 'الخصم يجب أن يكون رقمًا أكبر من 0 وأقل من أو يساوي 100';
}
else if (field === 'hireDate' && !employee.hireDate) {
  errors.hireDate = 'التاريخ مطلوب'
}
  
  
  else {
    delete errors[field]
  }
}

function submitForm() {
  // التحقق من كل الحقول
  ['name', 'email', 'phone', 'salary','job','department','type','address','bonusPercentage','deductionPercentage','leaveBalance','hireDate'].forEach(validateField)
  if (Object.keys(errors).length > 0) return

  // حفظ الموظف
  saveEmployee(employee)
  toast.success('تمت إضافة الموظف بنجاح ✅')
  router.push('/employees')
}
</script>

<style scoped>
/*  */

</style>
