<script setup lang="ts">
import MenuItem from "@/blocks/MenuItem.vue";
import type { UserInteract } from "@/types/UserInteract";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import bannedImage from "@/assets/images/you-are-banned.svg";

const store = useStore();
store.dispatch("FETCH_CLIENT");
const router = useRouter();
const client = computed(() => {
  return store.state.client;
});
</script>

<template>
  <main v-if="client">
    <div class="main-container" v-if="client.isBanned()">
      <div class="text-center">
        <h1 class="text-white">Вы забанены</h1>
        <img :src="bannedImage" alt="You are banned" />
      </div>
      <footer class="d-flex justify-content-center">
        <MenuItem class="menu" />
      </footer>
    </div>
    <div class="main-container" v-else>
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
  min-width: var(--window-width);
  max-width: var(--window-width);
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
  padding-top: 20px;
  max-width: var(--window-width);
  padding-bottom: 70px;
  width: 100%;
  max-width: var(--window-width);
  z-index: 1;
}

.elips__purple {
  position: fixed;
  width: 428px;
  height: 428px;
  left: calc(50% - 428px / 2 - 4.5px);
  top: calc(50% - 428px / 2 - 100px);
  z-index: -1;
  border-radius: 50%;
  background: rgba(95, 21, 130, 0.4);
  filter: blur(80px);
}
</style>
