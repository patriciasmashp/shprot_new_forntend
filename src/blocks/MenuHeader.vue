<script setup lang="ts">
import HeartCircle from "@/components/icons/HeartCircle.vue";
import SettingAnactive from "@/components/icons/SettingAnactive.vue";
import SettingsCircle from "@/components/icons/SettingsCircle.vue";
import SelectItem from "@/components/SelectItem.vue";
import router from "@/router";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.dispatch("FETCH_CITIES")
const filterActive = computed(() =>  store.getters.filter ? true : false);
const cities = computed(() =>  store.getters.cities.map(city => city.name));
const client = computed(() =>  store.getters.client);

console.log(client.value);

const selectedCitiy = ref(client.value ? client.value.city.name : cities.value[0])

watch(selectedCitiy, (newValue) => {
  store.dispatch("SET_CITY", newValue)  
})
</script>

<template>
  <div class="d-flex justify-content-between">
    <div class="col-7">
      <SelectItem v-model="selectedCitiy" :data="cities" />
    </div>
    <div class="col-2 text-center link" @click="router.push({name:'favorites'})"><HeartCircle /></div>
    <div class="col-2 text-center link" @click="router.push({name:'filters'})"><SettingsCircle v-if="filterActive"/><SettingAnactive v-else/></div>
  </div>
</template>
<style scoped>
.link {
  cursor: pointer;
}
</style>