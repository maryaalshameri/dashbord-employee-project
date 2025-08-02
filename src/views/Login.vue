<!-- src/views/Login.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-border" dir="rtl">
    <form @submit.prevent="handleLogin" class="bg-primary shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
      <h2 class="titleform">تسجيل الدخول</h2>

      <div class="mb-4">
        <label class="label">البريد الإلكتروني</label>
        <input type="email" v-model="email" class="input w-full" />
      </div>

      <div class="mb-6">
        <label class="label">كلمة المرور</label>
        <input type="password" v-model="password" class="input w-full"  />
      </div>

      <div class="flex items-center justify-between">
        <button type="submit" class="btnsave">
          دخول
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref} from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()


function handleLogin() {
  if (email.value === 'mary@gmail.com' && password.value === '123456') {
    localStorage.setItem('isLoggedIn', 'true')
    alert('تم تسجيل الدخول بنجاح!')
    router.push('/')
  } else {
    alert('بيانات الدخول غير صحيحة')
  }
}

</script>

<style scoped>
/* .input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline;
} */
</style>
