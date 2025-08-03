<template>
  <section class="p-6 space-y-6 mt-10 mr-10" dir="rtl">
    <div class="title">
      <h2 class="txthead">إدارة الموظفين</h2>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="ابحث عن موظف بالاسم أو القسم..."
        class="selectfilter md:w-1/5"
      />  
      <select v-model="selectedDepartment" class="selectfilter md:w-1/5">
        <option value="">الكل</option>
        <option value="الموارد البشرية">الموارد البشرية</option>
        <option value="المشاريع">المشاريع</option>
        <option value="المالية">المالية</option>
        <option value="developer">Developer</option>
      </select>
      
      <select v-model="selectType" class="selectfilter md:w-1/5">
        <option value="">الكل</option>
        <option value="full-time">دوام كامل</option>
        <option value="part-time">دوام جزئي</option>
        <option value="freelance">Freelance</option>
      </select>

      <!-- إضافة فلترة التقييم -->
      <!-- <select v-model="selectedRating" class="selectfilter md:w-1/5">
        <option value="0">كل التقييمات</option>
        <option value="1">1 نجمة</option>
        <option value="2">2 نجوم</option>
        <option value="3">3 نجوم</option>
        <option value="4">4 نجوم</option>
        <option value="5">5 نجوم</option>
      </select> -->

      <button
        @click="resetFilters"
        class="btnAdd"
      >
       <i class="fas fa-trash"></i> مسح الفلاتر
      </button>
      <router-link to="/AddEmployee" class="btnAdd">
        <i class="fas fa-plus mr-2"></i> إضافة موظف
      </router-link>
    </div>
  
    <p class="mb-4">عدد الموظفين: {{ filteredEmployees.length }}</p>
    
    <div v-if="filteredEmployees.length > 0" class="overflow-x-auto shadow rounded-lg">
      <table class="tbl">
        <thead class="hd">
          <tr>
            <th class="tr">الاسم</th>
            <th class="tr">القسم</th>
            <th class="tr">المسمى الوظيفي</th>
            <th class="tr">نوع العقد</th>
            <th class="tr"> الراتب </th>
            <th class="tr"> المكافاة </th>
            <th class="tr"> الخصم </th>
            <!-- <th class="tr"> اجمالي الراتب </th> -->
            <th class="tr">التقييم</th>
            <th class="tr">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="employee in filteredEmployees"
            :key="employee.id"
            class="border-b border-border hover:bg-btnhover cursor-pointer"
            @click="openCard(employee)"
          >
            <td class="tr">{{ employee.name }}</td>
            <td class="tr">{{ employee.department }}</td>
            <td class="tr">{{ employee.job }}</td>
            <td class="tr">{{ employee.type }}</td>
            <td class="tr">{{ employee.salary }}</td>
            <td class="tr">{{ employee.bonusPercentage }}</td>
            <td class="tr">{{ employee.deductionPercentage }}</td>
            <!-- <td class="tr">{{
              (
                employee.salary +(employee.salary *employee.bonusPercentage/100) -
                (employee.salary * employee.deductionPercentage/100)
              ).toLocaleString()
              }} ﷼
            </td> -->
            <td class="tr">
              <i
                v-for="star in 5"
                :key="star"
                class="fas fa-star"
                :class="star <= (employee.rating || 0) ? 'text-yellow-400' : 'text-gray-400'"
              ></i>
            </td>
            <td class="tr flex justify-center gap-2">
              <button
                class="btnuptate"
                @click.stop="editEmployee(employee)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <DeleteButton
                :employeeId="employee.id"
                @deleteConfirmed="moveToTrash"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EditEmployeeModal
      v-if="showEditModal"
      :employee="selectedEmployee"
      @close="showEditModal = false"
      @update="updateEmployee"  
    />

    <RouterLink to="/TrashList">
      <i class="fas fa-trash text-xl text-accent hover:text-red-600"></i>
    </RouterLink>

    <EmployeeCard
      v-if="selectedEmployee"
      :employee="selectedEmployee"
      @close="closeCard"
    />
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { dummyEmployees, STORAGE_KEY } from '@/data/employees'
import EmployeeCard from '@/components/employees/EmployeeCard.vue'
import DeleteButton from '@/components/employees/DeleteButton.vue'
import EditEmployeeModal from '@/components/employees/EditEmployeeModal.vue'

const employees = reactive({ list: [] })
const selectedEmployee = ref(null)
const showEditModal = ref(false);
const searchQuery = ref('')
const selectedDepartment = ref("")
const selectType = ref("")
const selectedRating = ref("0") // قيمة افتراضية لفلترة التقييم

function loadEmployees() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    employees.list = JSON.parse(data)
    // التأكد من وجود حقل التقييم لكل موظف
    employees.list.forEach(emp => {
      if (!emp.rating) {
        emp.rating = 0 // قيمة افتراضية إذا لم يكن هناك تقييم
      }
    })
  } else {
    // إضافة التقييم للبيانات الأولية
    const employeesWithRating = dummyEmployees.map(emp => ({
      ...emp,
      rating: emp.rating || 0
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employeesWithRating))
    employees.list = employeesWithRating
  }
}

function editEmployee(emp) {
  selectedEmployee.value = { ...emp };
  showEditModal.value = true;
}

function openCard(employee) {
  selectedEmployee.value = employee
}

function closeCard() {
  selectedEmployee.value = null
}

function moveToTrash(id) {
  const index = employees.list.findIndex(emp => emp.id === id)
  if (index !== -1) {
    const removed = employees.list.splice(index, 1)[0]

    const trash = JSON.parse(localStorage.getItem('trashList')) || []
    trash.push(removed)

    localStorage.setItem('trashList', JSON.stringify(trash))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees.list))
  }
}

function updateEmployee(updatedEmp) {
  const idx = employees.list.findIndex(e => e.id === updatedEmp.id)
  if (idx !== -1) {
    employees.list[idx] = updatedEmp
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees.list))
  }
}

const filteredEmployees = computed(() => {
  return employees.list.filter(emp => {
    const keyword = searchQuery.value.toLowerCase()
    const matchesSearch =
      emp.name.toLowerCase().includes(keyword) ||
      emp.address.toLowerCase().includes(keyword) ||
      emp.job.toLowerCase().includes(keyword) ||
      emp.email.includes(keyword) ||
      emp.phone.includes(keyword) ||
      emp.hireDate.includes(keyword)

    const matchesDepartment = selectedDepartment.value
      ? emp.department === selectedDepartment.value
      : true

    const matchesType = selectType.value
      ? emp.type === selectType.value
      : true
      
    const matchesRating = selectedRating.value !== "0"
      ? emp.rating >= parseInt(selectedRating.value)
      : true

    return matchesSearch && matchesDepartment && matchesType && matchesRating
  })
})

function resetFilters() {
  searchQuery.value = ""
  selectedDepartment.value = ""
  selectType.value = ""
  selectedRating.value = "0"
}

onMounted(() => {
  loadEmployees()
})
</script>

<style scoped>

</style>