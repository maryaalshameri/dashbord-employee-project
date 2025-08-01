<!-- src/App.vue -->
<template>
  <div class="flex flex-col md:flex-row bg-primary min-h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col md:mr-16 lg:mr-64">
      <Header />
      <main class="flex-1 p-4 md:p-6 mt-16 md:mt-0">
        <router-view />
        <BaseToast v-if="toast.show" :message="toast.message" :duration="toast.duration" />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import { reactive, provide } from 'vue'
import BaseToast from './components/BaseToast.vue'

const toast = reactive({
  show: false,
  message: '',
  duration: 3000
})

function showToast(msg, duration = 3000) {
  toast.message = msg
  toast.duration = duration
  toast.show = true
  setTimeout(() => toast.show = false, duration)
}

provide('showToast', showToast)
</script>

