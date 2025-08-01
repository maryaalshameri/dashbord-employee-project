const STORAGE_KEY = 'leaveData';

// ✅ تحقق وتخزين البيانات الأولية مرة واحدة فقط
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([
    {
      id: 1,
      employeeName: "محمد أحمد",
      Startdate: "2025-08-01",
      Endtdate: "2025-09-05",
      status: "قيد المراجعة",
      reason: 'إجازة مرضية'
    },
    {
      id: 2,
      employeeName: "علي يوسف",
      Startdate: "2025-08-05",
      Endtdate: "2025-09-01",
      status: "مقبولة",
      reason: 'إجازة مرضية',
    },
    {
      id: 3,
      employeeName: "سارة خالد",
      Startdate: "2025-08-10",
      Endtdate: "2025-09-05",
      status: "مرفوضة",
      reason: 'إجازة مرضية',
    },
  ]));
}

export function getLeaveData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function updateLeaveStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addLeave(leave) {
  const currentData = getLeaveData();
  currentData.push(leave);
  updateLeaveStorage(currentData);
}

export function updateLeave(id, updatedLeave) {
  const data = getLeaveData();
  const index = data.findIndex((leave) => leave.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedLeave };
    updateLeaveStorage(data);
  }
}

export function deleteLeave(id) {
  const data = getLeaveData();
  const index = data.findIndex((leave) => leave.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    updateLeaveStorage(data);
  }
}
