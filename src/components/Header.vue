<template>
  <header class="bg-white shadow-md px-6 py-4 flex items-center justify-between fixed top-0 right-0 left-0 md:left-0 md:right-16 lg:right-64 z-30">    <div class="flex items-center gap-3 animate-fade-in">
      <i class="fas fa-users text-accent text-2xl"></i>
      <!-- <h1 class="text-xl sm:text-2xl font-bold text-blue-900 dark:text-white">اداره الموظفين</h1> -->
    </div>

    <!-- الأدوات -->
    <div class="flex items-center gap-4">
      <!-- شريط البحث -->
     
      <!-- الوضع الليلي -->
      <button @click="toggleTheme" class="text-accent hover:text-btn">
        <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" class="text-xl"></i>
      </button>

      <!-- الإشعارات -->
      <div class="relative cursor-pointer">
        <i class="fas fa-bell text-xl text-accent"></i>
        <span class="absolute -top-1 -right-1 bg-btn rounded-full w-2.5 h-2.5"></span>
      </div>

      <!-- صورة المستخدم والقائمة المنسدلة -->
      <div class="relative">
        <img
          src="../assets/image/profile.jfif"
          @click="toggleDropdown"
          class="w-9 h-9 rounded-full border-2 border-border cursor-pointer"
          alt="User"
        />
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-40 bg-border shadow-lg rounded-md z-50"
        >
          <ul class="py-2 text-sm text-text">
            <li>
              <a href="#" class="block px-4 py-2 hover:text-btn">
                <i class="fas fa-cog mr-2 text-accent"></i> الإعدادات
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:text-btn">
                <i class="fas fa-sign-out-alt mr-2  text-accent"></i> تسجيل الخروج
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);
const dropdownOpen = ref(false);

// تفعيل الوضع بناءً على localStorage
onMounted(() => {
  const theme = localStorage.getItem('theme');
  isDark.value = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark.value);

  window.addEventListener('click', (e) => {
    if (!e.target.closest('img') && !e.target.closest('ul')) {
      dropdownOpen.value = false;
    }
  });
});

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-in-out;
}
  input::placeholder,
textarea::placeholder,
select::placeholder {
  text-align: right;
  direction: rtl;
}

input, textarea, select {
  direction: rtl;
  text-align: right;
}
</style>
