<script setup lang="ts">
import { AuctionSizesEnum, statuses } from "@/types/Auction";
import CreateAuctionHeader from "../CreateAuctionHeader.vue";
import AuctionStateProgres from "./AuctionStateProgres.vue";
import RadioLargeItem from "@/components/RadioLargeItem.vue";
import { ref } from "vue";
import DownModal from "@/blocks/DownModal.vue";
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";

const emits = defineEmits<{ next: []; to: [string] }>();
const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();

const smallSizeEl = (document.createElement(
  "div"
).innerHTML = `<span class="text-white">Маленькая</span><span class="text-purple"> до 10 см</span>`);
const midlleEl = (document.createElement(
  "div"
).innerHTML = `<span class="text-white">Средняя</span><span class="text-purple"> 10 - 15 см</span>`);
const largeEl = (document.createElement(
  "div"
).innerHTML = `<span class="text-white">Большая</span><span class="text-purple"> 15 - 20 см </span>`);
const extraLargeEl = (document.createElement(
  "div"
).innerHTML = `<span class="text-white">Большой проект</span><span class="text-purple"> от 20 см</span>`);

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
const defaultSize = auctionBuilder.getSize() || smallSize.value;
const size = ref(defaultSize);

const descriptionVisible = ref(false);

const setData = () => {
  if (!size.value) return;
  auctionBuilder.setSize(size.value);

  emits("next");
};
</script>

<template>
  <CreateAuctionHeader class="mb-2" />
  <AuctionStateProgres
    @to="(state) => emits('to', state)"
    class="mb-4"
    :status="statuses.size"
  />
  <h3 class="mb-4 text-white">Размер татуировки</h3>
  <RadioLargeItem :items="sizes" v-model="size" />
  <div>
    <span class="text-secondary">
      Выбери размер будущей тату – и мы подберём мастеров, которые идеально
      работают в нужном масштабе!
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
      Выбери размер будущей тату – и мы подберём
      <b>мастеров, которые идеально работают в нужном масштабе!</b>
      <br />
      <b>🔹 Какой размер тебе подходит?</b>
      <ul>
        <li>Маленькая (до 10 см) – миниатюрные работы, надписи, символы</li>
        <li>Средняя (10-15 см) – компактные композиции, локальные рисунки</li>
        <li>Большая (15-20 см) – масштабные детализированные эскизы</li>
        <li>
          Большой проект (от 20 см) – рукава, спины, многосеансовые работы
        </li>
      </ul>
      <b>👉 Почему это важно?</b>
      <ul>
        <li>Мастера часто специализируются на определённых размерах</li>
        <li>Правильный подбор размера влияет на детализацию и стоимость работы</li>
        <li>Получишь более точную цену работы</li>
      </ul>
      <b>Укажи размер – а мы найдём тебе мастера!</b>
    </span>
  </DownModal>
</template>
