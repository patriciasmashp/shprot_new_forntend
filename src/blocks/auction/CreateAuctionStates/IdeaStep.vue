<script setup lang="ts">
import { statuses } from "@/types/Auction";
import CreateAuctionHeader from "../CreateAuctionHeader.vue";
import AuctionStateProgres from "./AuctionStateProgres.vue";
import TextArea from "@/components/TextArea.vue";
import { ref } from "vue";
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";
import DownModal from "@/blocks/DownModal.vue";
import MultiFileInput from "@/components/MultiFile.vue";
import FIleInput from "@/components/FIleInput.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const emits = defineEmits<{ next: []; to: [string] }>();
const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();
const descriptionVisible = ref<boolean>(false);
const dataFiles = ref<File[]>([]);
const ideaText = ref<string | undefined>(auctionBuilder.getIdea());

const setImages = (image: File, index: number) =>{
dataFiles.value[index] = image
console.log(dataFiles.value);

}

const setData = () => {
  if (!ideaText.value) return;
  auctionBuilder.setIdea(ideaText.value);
  if (dataFiles.value) auctionBuilder.setFiles(dataFiles.value);
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
  <div class="d-flex mb-2">

    <FIleInput class="me-4" @change="(file) => setImages(file, index)" v-for="index in 3" />
  </div>

  <!-- <MultiFileInput  v-model:model-value="dataFiles"/> -->
  <span class="text-secondary mb-5"
    >Пару слов – и мастера уже присылают тебе варианты с ценой! </span
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
          🔹 Находишь художника, который чувствует твою задумку и готов её
          реализовать в ближайшее время
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
