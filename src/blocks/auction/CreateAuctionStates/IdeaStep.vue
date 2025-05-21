<script setup lang="ts">
import { statuses } from "@/types/Auction";
import CreateAuctionHeader from "../CreateAuctionHeader.vue";
import AuctionStateProgres from "./AuctionStateProgres.vue";
import TextArea from "@/components/TextArea.vue";
import { ref } from "vue";
import FIleInput from "@/components/FIleInput.vue";
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";
import DownModal from "@/blocks/DownModal.vue";
const emits = defineEmits<{ next: []; to: [string] }>();
const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();
const descriptionVisible = ref<boolean>(false);
const dataFile = ref<File | undefined>(auctionBuilder.getFile());
const ideaText = ref<string | undefined>(auctionBuilder.getIdea());

const setData = () => {
  if (!ideaText.value) return;
  auctionBuilder.setIdea(ideaText.value);
  if (dataFile.value) auctionBuilder.setFile(dataFile.value);
  emits("next");
};
</script>

<template>
  <CreateAuctionHeader class="mb-2" />
  <AuctionStateProgres
    @to="(state) => emits('to', state)"
    class="mb-4"
    :status="statuses.idea"
  />
  <h3 class="mb-4 text-white">Кратко опишите идею тату</h3>
  <TextArea class="mb-3" v-model="ideaText" />
  <h3 class="mb-4 text-white">Прикрепите фото</h3>
  <FIleInput class="mb-2" @change="(file) => (dataFile = file)" />
  <span class="text-secondary mb-5"
    >Чем яснее вы сможете объяснить своему татуировщику, какую татуировку вы
    хотите, тем легче ему будет превратить ваше </span
  ><span class="text-purple" @click="descriptionVisible = true"
    >подробнее...</span
  >
  <AuctionNextStepButton @next="setData" />
  <DownModal
    :visible="descriptionVisible"
    @close="descriptionVisible = false"
    :color="'#0C445BB2'"
  >
    <span class="text-white">
      Пару слов – и мастера уже присылают тебе варианты с ценой!
      <br />
      <b>Как это работает?</b>
      <ul>
        <li>
          Напиши ключевые детали: "Хочу лису в геометрии", "Лев с короной в
          реализме", "Волк на фоне леса в графике"
        </li>
        <li>Прикрепи готовый эскиз или пример работы</li>
        <li>
          Мы отправим информацию всем мастерам и будем передавать их ответы в
          нашем приложении
        </li>
      </ul>
      <b>Зачем?</b>
      <ul>
        <li>
          🔹 Экономишь время – не нужно объяснять идею каждому мастеру отдельно
        </li>
        <li>
         🔹 Находишь художника, который чувствует твою задумку и готов её реализовать в ближайшее время
        </li>

      </ul>
      <b>👉 Чем точнее опишешь – тем корректнее будет цена!</b>
    </span>
  </DownModal>
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
