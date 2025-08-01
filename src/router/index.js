// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Employees from '@/views/Employees.vue';
import TrashList from '@/components/TrashList.vue'
import AddEmployee from '@/views/AddEmployee.vue';
import SalarySummary from '@/views/SalarySummary.vue';
// import LeavePage from '@/views/LeavePage.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
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

export default router;
