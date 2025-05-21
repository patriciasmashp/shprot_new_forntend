<script setup lang="ts">
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import CreateAuctionHeader from "@/blocks/auction/CreateAuctionHeader.vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";
import AuctionStateProgres from "./AuctionStateProgres.vue";
import CitySearch from "@/blocks/CitySearch.vue";
import { statuses } from "@/types/Auction";
import type { City } from "@/types/City";
import { ref } from "vue";

const emit = defineEmits<{ next: [] }>();
const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();

const selectedCity = ref<City>();
const searchActive = ref(false);

const setData = () => {
  if (!selectedCity.value) return;
  auctionBuilder.setCity(selectedCity.value);
  emit("next");
};
</script>

<template>
  <Transition>
    <div v-if="!searchActive">
      <CreateAuctionHeader class="mb-2" />
      <AuctionStateProgres class="mb-4" :status="statuses.city" />
      <h3 class="mt-5 text-white">Укажите город</h3>
    </div>
  </Transition>
  <CitySearch
    @focusin="searchActive = true"
    @focusout="searchActive = false"
    @select="(city: City) => selectedCity = city"
  />
  <Transition>
    <div v-if="!searchActive">
      <AuctionNextStepButton @next="setData" />
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
</style>
