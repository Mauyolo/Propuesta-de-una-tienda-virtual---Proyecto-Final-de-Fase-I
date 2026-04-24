<template>
  <Navbar />
  <router-view />
  <CartToast />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import CartToast from './components/CartToast.vue'
</script>