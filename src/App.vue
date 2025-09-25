<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";

import { computed } from "vue";
import MobileLayout from "./layouts/MobileLayout.vue";
import { useStore } from "vuex";
import { logFrontendError } from "./api";

const route = useRoute();
const layout = computed(() => {
  
  return route.meta.layout || MobileLayout;
});

window.addEventListener('error', async(e:ErrorEvent) => {
  console.log(e.error.stack)
  const data = {
    stack: e.error.stack,
    message: e.message
  }
  await logFrontendError(data)
  throw e
  })
</script>

<template>
  <component :is="layout">
    <RouterView /> 
  </component>
</template>
