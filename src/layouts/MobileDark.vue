<script setup lang="ts">
import MenuItem from "@/blocks/MenuItem.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
store.dispatch("FETCH_CLIENT");
const client = computed(() => {
  return store.getters.client;
});
</script>

<template>
  <main v-if="client">
    <div class="main-container">
      <slot></slot>
      <footer class="d-flex justify-content-center">
        <MenuItem class="menu" />
      </footer>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu {
  min-width: 376px;
  max-width: 450px;
}
footer {
  position: fixed;
  z-index: 999;
  background-color: black;
  bottom: 0px;
  left: 0;
  right: 0;
}
.main-container {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 56px;
  min-width: 376px;
  padding-bottom: 70px;
  position: relative;
  width: 100%;
  max-width: 375px;
  
  z-index: 1;
  background-color: black;
}
</style>
