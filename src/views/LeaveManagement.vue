<template>
  <section class="p-6 space-y-6 mt-10 mr-10" dir="rtl">
    <div class="title">
     <h2 class="txthead">طلبات الإجازة</h2>

    <!-- الفلتر -->
    <div class="mb-4">
      <label class="ml-2 font-medium">فلترة حسب الحالة:</label>
      <select v-model="selectedStatus" class="selectfilter">
        <option class="" value="">الكل</option>
        <option value="قيد المراجعة">قيد المراجعة</option>
        <option value="مقبولة">مقبولة</option>
        <option value="مرفوضة">مرفوضة</option>
      </select>
    </div>

    <router-link
  to="/NewLeave"
  class="btnAdd"
>
    <i class="fas fa-plus mr-2"></i> إضافة طلب إجازة
</router-link>
    </div>
      <p class="mb-4">عدد الموظفين: {{ filteredLeaves.length }}</p>

<div class="overflow-x-auto shadow rounded-lg">
  <div class="min-w-[800px] md:min-w-0"> <!-- تحديد عرض أدنى للجدول -->
    <table class="tbl w-full"> <!-- إضافة w-full -->
      <thead class="hd">
        <tr>
          <th class="tr whitespace-nowrap">الموظف</th>
          <th class="tr whitespace-nowrap">تاريخ بداية الإجازة</th>
          <th class="tr whitespace-nowrap">تاريخ نهاية الإجازة</th>
          <th class="tr whitespace-nowrap">الأيام</th>
          <th class="tr whitespace-nowrap">السبب</th>
          <th class="tr whitespace-nowrap">الحالة</th>
          <th class="tr whitespace-nowrap">إجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="leave in filteredLeaves" 
          :key="leave.id" 
          class="border-b border-border hover:bg-btnhover cursor-pointer"
        >
          <td class="tr whitespace-nowrap">{{ leave.employeeName }}</td>
          <td class="tr whitespace-nowrap">{{ leave.Startdate }}</td>
          <td class="tr whitespace-nowrap">{{ leave.Endtdate }}</td>
          <td class="tr whitespace-nowrap">
            {{ calculateDaysDifference(leave.Startdate, leave.Endtdate) }}
          </td>
          <td class="tr whitespace-nowrap">{{ leave.reason }}</td>
          <td class="tr whitespace-nowrap">
            <span
              class="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold whitespace-nowrap"
              :class="{
                'bg-yellow-500': leave.status === 'قيد المراجعة',
                'bg-green-600': leave.status === 'مقبولة',
                'bg-red-600': leave.status === 'مرفوضة'
              }"
            >
              {{ leave.status }}
            </span>
          </td>
          <td class="tr whitespace-nowrap flex justify-center gap-2">
            <button @click="editLeave(leave)" class="btnuptate whitespace-nowrap">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="confirmDelete(leave)" class="btndalete whitespace-nowrap">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    <!-- مودال التعديل -->
    <div v-if="selectedLeave" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button @click="selectedLeave = null" class="absolute top-2 left-2 text-red-500 text-2xl">&times;</button>
        <h3 class="titleform">تعديل الإجازة</h3>
        <form @submit.prevent="saveEdit">
          <div class="mb-3">
            <label class="block mb-1 font-semibold">اسم الموظف:</label>
            <input v-model="selectedLeave.employeeName"class="input"  disabled  />
            <p v-if="errors.employeeName" class="errform">{{ errors.employeeName }}</p>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-semibold">تاريخ بداية الإجازة:</label>
            <input type="date" v-model="selectedLeave.Startdate" class="input" />
            <p v-if="errors.Startdate" class="errform">{{ errors.Startdate }}</p>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-semibold">تاريخ نهايه  الإجازة:</label>
            <input type="date" v-model="selectedLeave.Endtdate" class="input" />
            <p v-if="errors.Endtdate" class="errform">{{ errors.Endtdate }}</p>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-semibold">الحالة:</label>
            <select v-model="selectedLeave.status" class="input">
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

    <!-- مودال تأكيد الحذف -->
    <div v-if="leaveToDelete" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-primary p-5 rounded shadow-md max-w-sm w-full">
        <h4 class="text-lg font-bold mb-4">هل أنت متأكد من حذف الإجازة؟</h4>
        <div class="flex justify-end gap-2">
          <button @click="leaveToDelete = null" class="px-4 py-2 bg-border rounded">إلغاء</button>
          <button @click="deleteConfirmed" class="px-4 py-2 bg-red-500 text-primary rounded">نعم، احذف</button>
        </div>
      </div>
    </div>

     <!-- <DeleteLeaveModal
      v-if="leaveToDelete"
      :leave="leaveToDelete"
      @cancel="leaveToDelete = null"
      @confirm="deleteConfirmed"
    /> -->

    <!-- Toast -->
    <div v-if="toastMessage" class="fixed up-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
      {{ toastMessage }}
    </div>
  </section>
</template>

<script>
import {
  getLeaveData,
  updateLeave,
  deleteLeave,
} from "@/data/leave";
import { employees as allEmployees, STORAGE_KEY as EMP_STORAGE_KEY } from '@/data/employees';
// import DeleteLeaveModal from "@/components/leaves/DeleteLeaveModal.vue";
// import EditLeave from "@/components/leaves/EditLeave.vue";


export default {
  data() {
    return {
      leaves: [],
      selectedLeave: null,
      toastMessage: "",
      errors: {},
      leaveToDelete: null,
      selectedStatus: ""
    };
  },
  computed: {
    filteredLeaves() {
      if (!this.selectedStatus) return this.leaves;
      return this.leaves.filter((l) => l.status === this.selectedStatus);
    },
  },
  mounted() {
    this.leaves = getLeaveData();
  },
  methods: {
    calculateDaysDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays + 1; // +1 لتضمين اليوم الأول في الحساب
  },
    confirmDelete(leave) {
      this.leaveToDelete = leave;
    },
    deleteConfirmed() {
      deleteLeave(this.leaveToDelete.id);
      this.leaves = getLeaveData();
      this.leaveToDelete = null;
      this.showToast("تم حذف الإجازة بنجاح");
    },
    editLeave(leave) {
      this.selectedLeave = { ...leave };
    },
saveEdit() {
  this.errors = {};

  if (!this.selectedLeave.Startdate) {
    this.errors.Startdate = "تاريخ بداية الإجازة مطلوب";
  }

  if (!this.selectedLeave.Endtdate) {
    this.errors.Endtdate = "تاريخ نهاية الإجازة مطلوب";
  }
  if (this.selectedLeave.Startdate && this.selectedLeave.Endtdate && new Date(this.selectedLeave.Endtdate) < new Date(this.selectedLeave.Startdate)) {
    this.errors.Endtdate = 'تاريخ نهاية الإجازة يجب أن يكون بعد البداية';
  
  }
  if (!this.selectedLeave.status) {
    this.errors.status = "الحالة مطلوبة";
  }


  if (Object.keys(this.errors).length > 0) return;

  const daysRequested = this.calculateDaysDifference(
    this.selectedLeave.Startdate,
    this.selectedLeave.Endtdate
  );

  const oldLeave = this.leaves.find(l => l.id === this.selectedLeave.id);
  const wasAcceptedBefore = oldLeave.status === 'مقبولة';

  // فقط إذا تم تعديل الحالة من غير "مقبولة" إلى "مقبولة"
  if (!wasAcceptedBefore && this.selectedLeave.status === 'مقبولة') {
    const employeesData = JSON.parse(localStorage.getItem(EMP_STORAGE_KEY)) || allEmployees;

    const employeeIndex = employeesData.findIndex(
      emp => emp.name === this.selectedLeave.employeeName
    );

    if (employeeIndex === -1) {
      this.showToast("الموظف غير موجود");
      return;
    }

    const employee = employeesData[employeeIndex];

    if (typeof employee.leaveBalance !== 'number') {
      this.showToast("رصيد الإجازات غير متوفر لهذا الموظف");
      return;
    }

    if (employee.leaveBalance < daysRequested) {
      this.showToast(`رصيد الإجازات (${employee.leaveBalance}) لا يكفي لعدد الأيام المطلوبة (${daysRequested})`);
      return;
    }

    // خصم الرصيد
    employee.leaveBalance -= daysRequested;
    localStorage.setItem(EMP_STORAGE_KEY, JSON.stringify(employeesData));
  }

  // التعديل
  updateLeave(this.selectedLeave.id, this.selectedLeave);
  this.leaves = getLeaveData();
  this.selectedLeave = null;
  this.showToast("تم تعديل الإجازة بنجاح");
}
,
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => (this.toastMessage = ""), 3000);
    },
  },
};




</script>

<style scoped>

section {

direction: rtl;
}
</style>  