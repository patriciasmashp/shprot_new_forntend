<script setup lang="ts">
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import CreateAuctionHeader from "../CreateAuctionHeader.vue";
import AuctionStateProgres from "./AuctionStateProgres.vue";
import TextArea from "@/components/TextArea.vue";
import DownModal from "@/blocks/DownModal.vue";
import { statuses } from "@/types/Auction";
import { ref } from "vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";

const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();
const descriptionVisible = ref(false);
const emit = defineEmits<{ next: []; to: [string] }>();
const bodyPart = ref<string | undefined>(auctionBuilder.getBodyPart());
const setData = () => {
  if (!bodyPart.value) return;
  auctionBuilder.setBodyPart(bodyPart.value);
  emit("next");
};
</script>

<template>
  <CreateAuctionHeader class="mb-2" />
  <AuctionStateProgres
    @to="(state) => emit('to', state)"
    class="mb-4"
    :status="statuses.bodyPart"
  />
  <h3 class="mb-4 text-white">Где делаем тату?</h3>
  <TextArea class="mb-3" v-model="bodyPart" />

  <div>
    <span class="text-secondary">
      Укажи область, на которой хочешь набить тату
    </span>
    <span class="text-purple" @click="descriptionVisible = true">
      подробнее...
    </span>
  </div>
  <DownModal
    :visible="descriptionVisible"
    @close="descriptionVisible = false"
    :color="'#0C445BB2'"
  >
    <span class="text-white">
      Укажи область, на которой хочешь набить тату –<b>
        мастер сможет корректно оценить объем и сложность предстоящей работы</b
      >
      <br />
      <b>🔹 Почему это важно?</b>
      <ul>
        <li>
          Разные участки тела требуют разного подхода (ребра, кисти, шея и др.)
        </li>
        <li>
          Мастер может не иметь должного опыта работы на проблемных зонах (шея,
          ключицы, бока, рёбра, живот, логти/колени, кисти/стопы)
        </li>
      </ul>
      <b>Доступные варианты:</b>
      <ul class="description-body-parts">
        <li>Руки/запястья</li>
        <li>Ноги/стопы</li>
        <li>Спина/грудь</li>
        <li>Шея/голова</li>
        <li>Ребра/живот</li>
        <li>Другие нестандартные зоны</li>
      </ul>

      <b
        >👉 Найдём мастера, который сделает твою тату идеально на выбранном
        месте!
      </b>
    </span>
  </DownModal>
  <AuctionNextStepButton @next="setData" />
</template>

<style scoped>
.description-body-parts li {
  list-style: "✓ ";
}
</style>
