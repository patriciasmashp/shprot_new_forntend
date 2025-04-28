<script setup lang="ts">
import MenuItem from "@/blocks/MenuItem.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
store.dispatch("FETCH_CLIENT");
const client = computed(() => {
  return store.state.client;
});

</script>

<template>
  <main v-if="client">
    <div class="main-container">
      <div class="elips__blue"></div>
      <slot></slot>
      <div class="elips__purple"></div>
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
  width: 100%;
  max-width: 376px;
  z-index: 1;
}
.elips__blue {
  position: fixed;
  width: 428px;
  height: 428px;
  left: calc(50% - 428px / 2 - 4.5px);
  top: calc(50% - 428px / 2 - 340px);
  z-index: -1;
  background: #0c445b;
  border-radius: 50%;
  opacity: 0.6;
  filter: blur(100px);
}
.elips__purple {
  position: fixed;
  width: 428px;
  height: 428px;
  left: calc(50% - 428px / 2 - 4.5px);
  top: calc(50% - 428px / 2 + 221px);
  z-index: -1;
  border-radius: 50%;
  background: rgba(95, 21, 130, 0.4);
  filter: blur(80px);
}
</style>

