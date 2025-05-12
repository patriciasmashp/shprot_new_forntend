<script setup lang="ts">
import CityFilterRadio from "@/blocks/CityFilterRadio.vue";
import ButtonItem from "@/components/ButtonItem.vue";
import CheckItem from "@/components/CheckItem.vue";
import DividerItem from "@/components/DividerItem.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import InputItem from "@/components/InputItem.vue";
import RadioItem from "@/components/RadioItem.vue";
import router from "@/router";
import type { AbstractFilter } from "@/types/AbstractFilter";
import type City from "@/types/City";
import type Style from "@/types/Style";
import { computed, ref } from "vue";
import type {  Ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.dispatch("FETCH_CITIES");
store.dispatch("FETCH_STYLES");

const cities = computed(() => {
  if (!store.getters.cities) return [];
  return store.getters.cities.map((el: City) => el.name);
});
const styles = computed(() => {
  if (!store.getters.styles) return [];
  return store.getters.styles.map((el: Style) => el.style_name);
});

const filter = computed<AbstractFilter>(() => {
  return store.getters.filter;
});

const searchedCities: Ref<Array<string>> = ref([]);

const selectedCity: Ref<string | null> = ref(filter.value.cityName);

const selectedStyles: Ref<Array<string>> = ref(filter.value.styleNames);
const filtersVisible = ref(true);

function startSearch() {
  filtersVisible.value = false;
}
function endSearch() {
  filtersVisible.value = true;
}
function search(e: InputEvent) {
  const inputValue = (e.target as HTMLInputElement).value;
  searchedCities.value = cities.value.filter((el: string) => el.startsWith(inputValue));
}
function clearFilter() {
  filter.value.clear()
  router.push({ name: "home"});
}
function applyFilter() {
  filter.value.cityName = selectedCity.value;
  filter.value.styleNames = selectedStyles.value;
  filter.value.build()
  // filter.value.save()
  router.push({ name: "home", });
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
    <CityFilterRadio
      @click.passive="endSearch()"
      :data="searchedCities"
      v-model="selectedCity"
    />
  </div>

  <Transition>
    <div class="filters-container" v-show="filtersVisible">
      <div class="filters-city my-4">
        <CityFilterRadio :data="cities" v-model="selectedCity" />
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
