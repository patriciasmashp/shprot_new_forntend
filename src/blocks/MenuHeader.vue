<script setup lang="ts">
import { getCityByName } from "@/api";
import HeartCircle from "@/components/icons/HeartCircle.vue";
import SettingAnactive from "@/components/icons/SettingAnactive.vue";
import SettingsCircle from "@/components/icons/SettingsCircle.vue";
import SelectItem from "@/components/SelectItem.vue";
import router from "@/router";
import type City from "@/types/City";
import type { UserInteract } from "@/types/UserInteract";
import { DEFAULT_CITY_NAME } from "@/utils/consts";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.dispatch("FETCH_CITIES");
const filter = computed(() => store.getters.filter);
const filterActive = computed(() => store.getters.filter.isActive);
const cities = computed(() =>
  store.getters.cities.map((city: City) => city.name)
);
const client = computed<UserInteract>(() => store.getters.client);

// const selectedCitiy = ref(client.value ? client.value.city.name : cities.value[0])

const selectedCitiy = computed({
  get() {
    if (filter.value.isActive && filter.value.cityName) {
      return filter.value.cityName;
    } else if (client.value.city) {
      return client.value.city.name;
    } else {
      return DEFAULT_CITY_NAME;
    }
  },
  set(v) {
    store.getters.filter.cityName = v;
    store.getters.filter.build();
    store.getters.filter.save();
  },
});
watch(
  () => selectedCitiy.value,
  async (v) => {
    const city = store.getters.cities.find((city) => city.name == v);
    if (client.value.client) client.value.client.city = city;
    await client.value.save();
  }
);
window.addEventListener("scroll", (e) => {
  const header = document.getElementById("header");
  if (!header) return;

  if (window.scrollY > 100) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
</script>

<template>
  <div class="header-wrapper" id="header">
    <div class="d-flex justify-content-between header-container">
      <div class="col-7">
        <SelectItem v-model="selectedCitiy" :data="cities" />
      </div>
      <div
        class="col-2 text-center link"
        @click="router.push({ name: 'favorites' })"
      >
        <HeartCircle />
      </div>
      <div
        class="col-2 text-center link"
        @click="router.push({ name: 'filters' })"
      >
        <SettingsCircle v-if="filterActive" /><SettingAnactive v-else />
      </div>
    </div>
  </div>
</template>
<style scoped>
.link {
  cursor: pointer;
}
.sticky {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  min-width: var(--window-width);
}
.sticky .header-container {
  backdrop-filter: blur(10px);
  padding-top: 10px;
  padding-bottom: 7px;
  padding-right: 10px;
  padding-left: 10px;
  background: linear-gradient(
    180deg,
    rgb(0 0 0 / 55%) 69%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
