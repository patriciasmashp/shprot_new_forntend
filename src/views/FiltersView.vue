<script setup lang="ts">
import ButtonItem from "@/components/ButtonItem.vue";
import CheckItem from "@/components/CheckItem.vue";
import DividerItem from "@/components/DividerItem.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import InputItem from "@/components/InputItem.vue";
import router from "@/router";
import { computed, ref } from "vue";
import type { Ref } from "vue";
import { useStore } from "vuex";

// const cities = [
//   "Ершово",
//   "Екатеринбург",
//   "Краснодар",
//   "Тюмень",
//   "Пермь",
//   "Новосибирск",
//   "Казань",
// ];
const store = useStore();
store.dispatch("FETCH_CITIES");
store.dispatch("FETCH_STYLES");

const cities = computed(() => {
  if (!store.getters.cities) return [];
  return store.getters.cities.map((el) => el.name);
});
const styles = computed(() => {
  if (!store.getters.styles) return [];
  return store.getters.styles.map((el) => el.style_name);
});

const searchedCities: Ref<Array<string>> = ref([]);

const selectedCities: Ref<Array<string>> = ref([]);
const selectedStyles: Ref<Array<string>> = ref([]);
const filtersVisible = ref(true);

function startSearch() {
  filtersVisible.value = false;
}
function endSearch() {
  filtersVisible.value = true;
}
function search(e: InputEvent) {
  const inputValue = (e.target as HTMLInputElement).value;
  searchedCities.value = cities.filter((el) => el.startsWith(inputValue));
}
function clearFilter() {
  selectedCities.value = [];
  selectedStyles.value = [];
  searchedCities.value = [];
  filtersVisible.value = true;
}
function applyFilter() {
  const filter = {};

  store.dispatch("SET_FILTER", {
    city: {
      name: { $in: selectedCities.value },
    },
    styles: {
      style_name: { $in: selectedStyles.value },
    },
  });
  router.push({ name: "home" });
}
</script>

<template>
  <Transition>
    <nav v-show="filtersVisible">
      <div class="nav-wrapper">
        <div class="d-flex mx-2 justify-content-between align-items-center">
          <div
            class="text-purple"
            style="font-size: 12px; font-weight: 600"
            @click="router.back()"
          >
            Отмена
          </div>

          <h6 class="m-0 text-white">Фильтр</h6>
          <div
            class="text-purple"
            style="font-size: 12px; font-weight: 600"
            @click="clearFilter"
          >
            Очистить
          </div>
        </div>
      </div>
    </nav>
  </Transition>
  <div class="mt-4 mb-3">
    <InputItem
      @input="search"
      @focusin="startSearch()"
      :placeholder="'Город'"
      class="input"
      :icon="SearchIcon"
    />
  </div>
  <div class="checboxes" v-show="!filtersVisible && searchedCities">
    <CheckItem
      @click.passive="endSearch()"
      :data="searchedCities"
      v-model="selectedCities"
    />
  </div>

  <Transition>
    <div class="filters-container" v-show="filtersVisible">
      <div class="filters-city my-4">
        <CheckItem :data="cities" v-model="selectedCities" />
      </div>
      <DividerItem style="opacity: 10%" />
      <div class="filters-styles">
        <h6 class="text-white mx-2 mt-5">Стиль татуировки</h6>
        <CheckItem :data="styles" v-model="selectedStyles" />
      </div>
      <ButtonItem
        @click="applyFilter"
        type="main"
        class="my-5"
        style="height: 56px"
        >Применить Фильтр</ButtonItem
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
