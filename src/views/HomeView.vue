<script setup lang="ts">
import { getMasters } from "@/api/masters";
import DownModal from "@/blocks/DownModal.vue";
import MasterCard from "@/blocks/MasterCard.vue";
import MenuHeader from "@/blocks/MenuHeader.vue";
import RequestBlock from "@/blocks/RequestBlock.vue";
import type { AbstractFilter } from "@/types/AbstractFilter";
import { DEFAULT_CITY_NAME } from "@/utils/consts";
import { parse } from "qs";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const requestVisible = ref(false);
const masters = ref();
const metaPages = ref();
const filter = computed<AbstractFilter>(() => store.getters.filter);
const client = computed(() => store.getters.client);

async function checkPosition(e: Event) {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  // Сколько пикселей уже проскроллили
  const scrolled = window.scrollY;

  // Порог
  const threshold = height - 2;

  // Низ экрана относительно страницы
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    if (metaPages.value.pageCount <= metaPages.value.page) return;
    metaPages.value.page++;
    const strapiData = await getMasters({
      page: metaPages.value.page,
      city: "Краснодар",
    });

    if (!strapiData.data) return;

    masters.value = masters.value.concat(strapiData.data);
    store.dispatch("UPDATE_MASTERS", masters.value);
  }
}

watch(
  () => store.getters.filter,
  async () => {
    // filter.value.citiyName = city
    const strapiData = await store.dispatch("FETCH_MASTERS", {
      // city: city ? city : client.value.city.name,
      filters: filter.value.filter,
    });

    masters.value = strapiData.data;
    metaPages.value = strapiData.meta.pagination;
  },
  { deep: true }
);

onMounted(async () => {
  let city = undefined;
  if (!filter.value.isActive || !filter.value.cityName) {
    if (client.value.city) {
      city = client.value.city.name;
    } else {
      city = DEFAULT_CITY_NAME;
    }
  }

  const strapiData = await store.dispatch("FETCH_MASTERS", {
    city: city,
    filters: filter.value.isActive ? filter.value.filter : {},
  });

  masters.value = strapiData.data;
  metaPages.value = strapiData.meta.pagination;
  window.addEventListener("scroll", checkPosition);
});
onUnmounted(() => {
  window.removeEventListener("scroll", checkPosition);
  store.dispatch("CLEAR_MASTERS");
});
</script>

<template>
  <main>
    <MenuHeader />
    <div class="d-flex justify-content-center masters__container">
      <div class="w-100">
        <MasterCard class="my-2" :master="master" v-for="master in masters" />
      </div>
    </div>
  </main>
  <DownModal :visible="requestVisible" @close="requestVisible = false">
    <RequestBlock
      :master="master"
      @created="requestVisible = false"
    ></RequestBlock>
  </DownModal>
</template>

<style scoped></style>
