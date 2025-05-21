<script setup lang="ts">
import { AuctionSizesEnum, statuses } from "@/types/Auction";
import CreateAuctionHeader from "../CreateAuctionHeader.vue";
import AuctionStateProgres from "./AuctionStateProgres.vue";
import RadioLargeItem from "@/components/RadioLargeItem.vue";
import { ref } from "vue";
import DownModal from "@/blocks/DownModal.vue";
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";

const emits = defineEmits<{ next: [] }>();
const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();

const smallSizeEl = (document.createElement(
  "div"
).innerHTML = `<span class="text-white">${AuctionSizesEnum.small}</span><span class="text-purple"> до 10 см</span>`);
const midlleEl = (document.createElement(
  "div"
).innerHTML = `<span class="text-white">${AuctionSizesEnum.medium}</span><span class="text-purple"> 10 - 15 см</span>`);
const largeEl = (document.createElement(
  "div"
).innerHTML = `<span class="text-white">${AuctionSizesEnum.large}</span><span class="text-purple"> 15 - 20 см </span>`);
const extraLargeEl = (document.createElement(
  "div"
).innerHTML = `<span class="text-white">${AuctionSizesEnum.extraLarge}</span><span class="text-purple"> от 20 см</span>`);

const smallSize = {
  item: smallSizeEl,
  value: AuctionSizesEnum.small,
};
const midlle = {
  item: midlleEl,
  value: AuctionSizesEnum.medium,
};
const large = {
  item: largeEl,
  value: AuctionSizesEnum.large,
};
const extraLarge = {
  item: extraLargeEl,
  value: AuctionSizesEnum.extraLarge,
};

const sizes = [smallSize, midlle, large, extraLarge];

const size = ref(smallSize.value);

const descriptionVisible = ref(false);

const setData = () => {
  if (!size.value) return;
  auctionBuilder.setSize(size.value);

  emits("next");
};
</script>

<template>
  <CreateAuctionHeader class="mb-2" />
  <AuctionStateProgres class="mb-4" :status="statuses.size" />
  <h3 class="mb-4 text-white">Размер татуировки</h3>
  <RadioLargeItem :items="sizes" v-model="size" />
  <div>
    <span class="text-secondary">
      Татуировки маленького размера лучше всего наносить на запястье, голень,
      шею. Чем меньше тату, тем проще должен быть рисунок
    </span>
    <span class="text-purple" @click="descriptionVisible = true">
      подробнее...
    </span>
  </div>
  <AuctionNextStepButton @next="setData" />
  <DownModal
    :visible="descriptionVisible"
    @close="descriptionVisible = false"
    :color="'#0C445BB2'"
  >
    <span class="text-white">
      Татуировки маленького размера лучше всего наносить на запястье, голень,
      шею. Чем меньше тату, тем проще должен быть рисунок
    </span>
  </DownModal>
</template>
