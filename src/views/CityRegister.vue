<script setup lang="ts">

import CitySearch from "@/blocks/CitySearch.vue";
import ButtonItem from "@/components/ButtonItem.vue";
import DividerItem from "@/components/DividerItem.vue";

import router from "@/router";


import type {City} from "@/types/City";
import type { UserInteract } from "@/types/UserInteract";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch("FETCH_STYLES");

const client = computed<UserInteract>(() => {
  return store.getters.client;
});
const selectedCity = ref<City | null>(null);
const filtersVisible = ref(false);

function setClientCity() {
  if (!selectedCity.value) return;
  client.value.saveCity(selectedCity.value);
  router.push({ name: "home" });
}
</script>

<template>
  <Transition>
    <nav v-show="!filtersVisible">
      <div class="nav-wrapper">
        <div class="d-flex mx-2 justify-content-center align-items-center">
          <h6 class="m-0 text-white">Выберите Город</h6>
        </div>
      </div>
    </nav>
  </Transition>
  <CitySearch
    @focusin="filtersVisible = true"
    @focusout="filtersVisible = false"
    @select="(city: City) => selectedCity = city"
  />
  <Transition>
    <div v-show="!filtersVisible">
      <DividerItem style="opacity: 10%" />

      <ButtonItem
        @click="setClientCity"
        type="main"
        class="my-5"
        style="height: 56px"
        >Сохранить</ButtonItem
      >
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.input {
  transition: all 1s ease; /* Переход для всех свойств */
}
</style>
