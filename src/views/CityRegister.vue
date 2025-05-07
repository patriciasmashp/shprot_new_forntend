<script setup lang="ts">
import CityFilterRadio from "@/blocks/CityFilterRadio.vue";
import ButtonItem from "@/components/ButtonItem.vue";
import DividerItem from "@/components/DividerItem.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import InputItem from "@/components/InputItem.vue";
import router from "@/router";
import type { AbstractFilter } from "@/types/AbstractFilter";
import type City from "@/types/City";
import type { UserInteract } from "@/types/UserInteract";
import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.dispatch("FETCH_CITIES");
store.dispatch("FETCH_STYLES");

const cities = computed(() => {
  if (!store.getters.cities) return [];
  return store.getters.cities.map((el: City) => el.name);
});

const client = computed<UserInteract>(() => {
  return store.getters.client;
});

const filter = computed<AbstractFilter>(() => {
  return store.getters.filter;
});

const searchedCities: Ref<Array<string>> = ref([]);

const selectedCity: Ref<string | null> = ref(filter.value.cityName);

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

function setClientCity() {
  if(selectedCity.value){
    const city = store.getters.cities.find((el: City) => el.name === selectedCity.value);
    client.value.saveCity(city)
  }
  router.push({ name: "home", });
}
</script>

<template>
  <Transition>
    <nav v-show="filtersVisible">
      <div class="nav-wrapper">
        <div class="d-flex mx-2 justify-content-center align-items-center">
         
          <h6 class="m-0 text-white">Выберите Город</h6>
       
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
