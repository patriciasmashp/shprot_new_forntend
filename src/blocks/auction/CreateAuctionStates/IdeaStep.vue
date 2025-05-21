<script setup lang="ts">
import { statuses } from "@/types/Auction";
import CreateAuctionHeader from "../CreateAuctionHeader.vue";
import AuctionStateProgres from "./AuctionStateProgres.vue";
import TextArea from "@/components/TextArea.vue";
import { ref } from "vue";
import FIleInput from "@/components/FIleInput.vue";
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";

const emits = defineEmits<{ next: [] }>();
const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();

const dataFile = ref<File>();
const ideaText = ref<string>("");

const setData = () => {
  if (!ideaText.value) return;
  auctionBuilder.setIdea(ideaText.value);
  if (dataFile.value) auctionBuilder.setFile(dataFile.value);
  emits("next");
};
</script>

<template>
  <CreateAuctionHeader class="mb-2" />
  <AuctionStateProgres class="mb-4" :status="statuses.idea" />
  <h3 class="mb-4 text-white">Кратко опишите идею тату</h3>
  <TextArea
    class="mb-3"
    v-model="ideaText"
    placeholder="Татуировка (разг. тату, наколка) – это процесс нанесения рисунка на тело путем введения красящего пигмента в дерму, создающий постоянный (перманентный) образ"
  />
  <h3 class="mb-4 text-white">Прикрепите фото</h3>
  <FIleInput class="mb-2" @change="(file) => (dataFile = file)" />
  <span class="text-secondary mb-5"
    >Чем яснее вы сможете объяснить своему татуировщику, какую татуировку вы
    хотите, тем легче ему будет превратить ваше подробнее...</span
  >
  <AuctionNextStepButton @next="setData" />
</template>
<style scoped>
textarea {
  height: 120px;
}
textarea::placeholder {
  font-size: 12px;
  line-height: 20px;
}
</style>
