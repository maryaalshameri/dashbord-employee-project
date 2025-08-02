// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Employees from '@/views/Employees.vue';
import TrashList from '@/components/TrashList.vue'
import AddEmployee from '@/views/AddEmployee.vue';
import SalarySummary from '@/views/SalarySummary.vue';
// import LeavePage from '@/views/LeavePage.vue';
import Login from '@/views/Login.vue';


const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
   { path: '/Login', name: 'Login', component: Login },
    //  { path: '/LeavePage', name: 'LeavePage', component: LeavePage },
  { path: '/employees', name: 'Employees', component: Employees },
  // نضيف لاحقًا باقي الصفحات مثل /employees و /salary...
    { path: '/TrashList', name: 'TrashList', component: TrashList },
    { path: '/SalarySummary', name: 'SalarySummary', component: SalarySummary },
     { path: '/AddEmployee', name: 'AddEmployee', component: AddEmployee },
     {
  path: '/leave',
  name: 'LeavePage',
  component: () => import('@/views/LeaveManagement.vue')
},
{
  path: '/NewLeave',
  name: 'NewLeave',
  component: () => import('../views/NewLeave.vue')
}
   
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  // إذا المستخدم غير مسجل دخول وحاول دخول أي صفحة غير login
  if (!isLoggedIn && to.name !== 'Login') {
    next({ name: 'Login' })
  } 
  // إذا المستخدم سجل دخول وحاول يفتح login
  else if (isLoggedIn && to.name === 'Login') {
    next({ name: 'Dashboard' })
  } 
  else {
    next()
  }
})

export default router;
