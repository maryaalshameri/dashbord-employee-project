// src/data/employees.js
export const STORAGE_KEY = 'employees'

export const dummyEmployees = [
  {
    id: 1,
    name: "محمد أحمد",
    job: "محاسب",
    department: "المالية",
    phone: "0967770123456",
    email: "m.ahmed@example.com",
    salary: 450000,
    bonusPercentage: 10,
    deductionPercentage: 30,
    type: "full-time",
    address: "taiz",
    hireDate: "2022-04-10",
    avatar: "a.jfif",
    leaveBalance:30
  },
  {
    id: 2,
    name: "سارة خالد",
    job: "مديرة مشاريع",
    department: "المشاريع",
    phone: "0967735654321",
    email: "s.khaled@example.com",
    salary: 600000,
    bonusPercentage: 20,
    deductionPercentage: 5,
    type: "part-time",
    address: "taiz",
    hireDate: "2021-12-01",
    avatar: 's.jfif',
    leaveBalance: 30
  },
  {
    id: 3,
    name: "علي يوسف",
    job: "أخصائي موارد بشرية",
    department: "الموارد البشرية",
    phone: "0967771987654",
    email: "ali.y@example.com",
    salary: 500000,
    bonusPercentage: 15,
    deductionPercentage: 8,
    type: "freelance",
    address: "taiz",
    hireDate: "2023-01-20",
    avatar: "3.jfif",
    leaveBalance: 30
  }
]

// تصدير البيانات الرئيسية
export const employees = JSON.parse(localStorage.getItem(STORAGE_KEY)) || dummyEmployees

// دالة لحفظ الموظف الجديد
export function saveEmployee(newEmployee) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || dummyEmployees
  newEmployee.id = Date.now()
  data.push(newEmployee)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}