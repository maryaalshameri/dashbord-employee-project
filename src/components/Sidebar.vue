<template>
  <!-- للشاشات الكبيرة والتابلت -->
  <aside 
    class="hidden md:flex md:w-16 lg:w-64 h-screen bg-btn fixed top-0 right-0 z-40 flex-col transition-all duration-300"
  >
    <div class="p-4 text-xl font-bold border-b border-border flex justify-center lg:justify-end">
      <img src="../assets/image/2.png" class="w-10 h-10 lg:w-auto lg:h-auto"/>
    </div>
    <nav class="flex-1 p-2 lg:p-4 space-y-2">
      <router-link
        v-for="item in menu"
        :key="item.name"
        :to="item.path"
        class="flex items-center justify-center lg:justify-end gap-3 px-2 py-3 rounded transition-colors text-right"
        :class="$route.path.startsWith(item.path) ? 'bg-text text-primary' : 'text-primary hover:bg-btnhover hover:text-text'"
      >
        <span class="hidden lg:inline-block">{{ item.name }}</span>
        <i :class="item.icon" class="text-lg"></i>
      </router-link>
    </nav>
  </aside>

  <!-- للشاشات الصغيرة (موبايل) -->
  <div class="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-btn z-40 flex items-center justify-around">
    <router-link
      v-for="item in menu"
      :key="item.name"
      :to="item.path"
      class="flex flex-col items-center justify-center p-2 text-primary"
      :class="$route.path.startsWith(item.path) ? 'text-white' : ''"
    >
      <i :class="item.icon" class="text-lg"></i>
      <span class="text-xs mt-1">{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script setup>
const menu = [
  { name: "لوحة التحكم الرئيسية", path: "/", icon: "fas fa-chart-line" },
  { name: "الموظفون", path: "/employees", icon: "fas fa-users" },
  { name: "إضافة", path: "/AddEmployee", icon: "fas fa-plus" },
  { name: "الإجازات", path: "/leave", icon: "fas fa-calendar-check" },
  { name: "الرواتب", path: "/SalarySummary", icon: "fas fa-money-check-alt" },
  { name: "المهملات", path: "/TrashList", icon: "fas fa-trash" },
];
</script>

<style scoped>
.router-link-active {
  background-color: #333333;
}

/* تنسيق خاص للتابلت */
@media (min-width: 768px) and (max-width: 1023px) {
  aside {
    width: 5rem;
  }
}
</style>