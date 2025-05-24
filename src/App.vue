<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";

import { computed } from "vue";
import MobileLayout from "./layouts/MobileLayout.vue";
import { useStore } from "vuex";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout || MobileLayout;
});
</script>

<template>
  <component :is="layout">
    <RouterView /> 
  </component>
</template>
