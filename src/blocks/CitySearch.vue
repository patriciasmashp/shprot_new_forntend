<script setup lang="ts">
import type { AbstractFilter } from "@/types/AbstractFilter";
import CityFilterRadio from "@/blocks/CityFilterRadio.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import InputItem from "@/components/InputItem.vue";
import type { City } from "@/types/City";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import type { Ref } from "vue";


const emit = defineEmits<{ select: [city: City]; focusin: []; focusout: [] }>();

const store = useStore();
store.dispatch("FETCH_CITIES");

const cities = computed(() => {
  if (!store.getters.cities) return [];
  return store.getters.cities.map((el: City) => el.name);
});

const filter = computed<AbstractFilter>(() => {
  return store.getters.filter;
});

const searchedCities: Ref<Array<string>> = ref([]);

const selectedCity: Ref<string | null> = ref(filter.value.cityName);

const selectedCityEmitter = computed({
  get: () => selectedCity.value,
  set: (value: string) => {
    selectedCity.value = value;
    setCity();
  },
});

const filtersVisible = ref(true);

function startSearch() {
  filtersVisible.value = false;
  emit("focusin");
}
function endSearch() {
  filtersVisible.value = true;
  emit("focusout");
}
function search(newValue: string) {
  const inputValue = newValue;
  searchedCities.value = cities.value.filter((el: string) =>
    el.startsWith(inputValue)
  );
}

function setCity() {
  if (selectedCity.value) {
    const city = store.getters.cities.find(
      (el: City) => el.name === selectedCity.value
    );

    emit("select", city);
  }
}
</script>

<template>
  <div class="mt-4 mb-3 d-flex align-items-center">
    <InputItem
      @input="search"
      @focusin="startSearch()"
      :placeholder="'Город'"
      class="input w-100"
      :icon="SearchIcon"
    />
    <div v-if="!filtersVisible" class="ms-3" @click="endSearch">
      <span class="text-purple cancel-btn">Отмена</span>
    </div>
  </div>
  <div class="checboxes" v-show="!filtersVisible && searchedCities">
    <CityFilterRadio
      @click.passive="endSearch()"
      :data="searchedCities"
      v-model="selectedCityEmitter"
    />
  </div>

  <Transition>
    <div class="filters-container" v-show="filtersVisible">
      <div class="filters-city my-4">
        <CityFilterRadio :data="cities" v-model="selectedCityEmitter" />
      </div>
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
.cancel-btn {
  font-size: 12px;
}
</style>
