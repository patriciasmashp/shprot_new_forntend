<script setup lang="ts">
import { getMasters } from "@/api/masters";
import DownModal from "@/blocks/DownModal.vue";
import MasterCard from "@/blocks/MasterCard.vue";
import MenuHeader from "@/blocks/MenuHeader.vue";
import RequestBlock from "@/blocks/RequestBlock.vue";
import { Master } from "@/types/Master";
import { computed, onMounted, ref, watch } from "vue";
import type { Ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const masters = ref();
const metaPages = ref();
const filter = computed(() =>
  store.getters.filter ? store.getters.filter : {}
);
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

  // console.log(position >= threshold);
  // console.log(threshold, 'threshold');
  // console.log(position, 'position');
  if (position >= threshold) {
    if (metaPages.value.pageCount <= metaPages.value.page) return;
    const strapiData = await getMasters({
      page: metaPages.value.page++,
      city: "Краснодар",
    });

    if (!strapiData.data) return;
    
    masters.value = masters.value.concat(strapiData.data);
    store.dispatch("UPDATE_MASTERS", masters.value);
  }
}

watch(
  () => store.getters.city,
  async (city) => {
    store.dispatch("CLEAR_FILTER");
    const strapiData = await store.dispatch("FETCH_MASTERS", {
      city: city ? city : client.value.city.name,
      filters: filter.value,
    });

    masters.value = strapiData.data;
    metaPages.value = strapiData.meta.pagination;
  }
);

onMounted(async () => {
  const city = store.getters.city;
  const strapiData = await store.dispatch("FETCH_MASTERS", {
    city: city ? city : client.value.city.name,
    filters: filter.value,
  });

  masters.value = strapiData.data;
  metaPages.value = strapiData.meta.pagination;
  window.addEventListener("scroll", checkPosition);
});
</script>

<template>
  <main>
    <MenuHeader />
    <div class="d-flex justify-content-center masters__container">
      <div class="w-100">
        <MasterCard
          class="my-2"
          :master="master"
          v-for="master in masters"
        />
      </div>
    </div>
  </main>
  <DownModal :visible="requestVisible" @close="requestVisible = false">
    <RequestBlock :master="master" @created="request_visible = false"></RequestBlock>
  </DownModal>
</template>

<style scoped></style>
