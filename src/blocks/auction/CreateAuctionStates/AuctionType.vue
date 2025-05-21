<template>
  <CreateAuctionHeader class="mb-4" />
  <div class="wrapper wrapper__sketch">
    <div class="d-flex large-checkbox">
      <div class="col-3">
        <div class="radio-box position-relative">
          <input
            name="type"
            type="radio"
            v-model="type"
            :value="'sketchAuction'"
            :id="`input-${clientSketchAuctionId}`"
          />
          <label :for="`input-${clientSketchAuctionId}`"
            ><OkCircled class="w-100"
          /></label>
        </div>
      </div>
      <div class="col-9">
        <h4 class="text-white title">
          Узнать стоимость татуировки по эскизу, описанию
        </h4>
        <span class="secondary-text description"
          >Хочешь набить тату, но не знаешь, во сколько это обойдётся?</span
        >
        <span
          class="text-green"
          @click="sketchAuctionDescriptionVisible = true"
        >
          подробнее...</span
        >
      </div>
    </div>
  </div>
  <div class="wrapper wrapper__price">
    <div class="d-flex large-checkbox">
      <div class="col-3">
        <div class="radio-box position-relative">
          <input
            name="type"
            type="radio"
            v-model="type"
            :value="'priceAuction'"
            :id="`input-${clientPriceAuctionId}`"
          />
          <label :for="`input-${clientPriceAuctionId}`"
            ><OkCircled class="w-100"
          /></label>
        </div>
      </div>
      <div class="col-9">
        <h4 class="text-white title">Найти мастера под мой бюджет</h4>
        <span class="secondary-text description"
          >Мечтаешь о крутой тату, но бюджет ограничен?
        </span>
        <span
          class="text-purple"
          @click="priceAuctionDescriptionVisible = true"
        >
          подробнее...</span
        >
      </div>
    </div>
    <div class="price mt-3 text-center" v-if="type == AuctionTypesEnum.priceAuction">
      <span class="secondary-text"> Введите значение в рублях </span>
      <div >
        <InputItem
          class="mt-3 price-input text-center"
          :postfix="' ₽'"
          :centred="true"
          @input="setPrice"
        />
      </div>
    </div>
  </div>
  <AuctionNextStepButton @next="setData" />
  <DownModal
    :visible="sketchAuctionDescriptionVisible"
    @close="sketchAuctionDescriptionVisible = false"
    :color="'#0C445BB2'"
  >
    <div>
      <span class="text-white">
        Хочешь набить тату, но не знаешь, во сколько это обойдётся? Загрузи фото
        или опиши идею – и получи
        <b>предложения от десятков мастеров с ценами. </b> Никаких догадок,
        только реальные расценки!</span
      >
    </div>
    <div>
      <span class="text-white">
        <b>🔹 Как это работает?</b><br />
        <ul>
          <li>
            Выбери город, укажи место, выбери размер, опиши идею или отправь
            эскиз либо пример работы
          </li>
          <li>Мастера оценивают твою заявку и называют цену</li>
          <li>
            Выбираешь лучшее предложение и договариваешься напрямую с мастером о
            деталях
          </li>
        </ul>
        👉 Больше не нужно писать каждому мастеру отдельно – цены придут к тебе
        прямо сюда!
      </span>
    </div>
  </DownModal>
  <DownModal
    :visible="priceAuctionDescriptionVisible"
    @close="priceAuctionDescriptionVisible = false"
    :color="'#0C445BB2'"
  >
    <span class="text-white">
      Мечтаешь о крутой тату, но бюджет ограничен? Укажи сумму, которую готов
      потратить, и <b>найди профессионала в своей ценовой категории.</b> <br />
      🔹 Почему это
      <ul>
        <li>Фильтруешь мастеров по своим финансовым возможностям</li>
        <li>Видишь уровень мастеров именно в твоём бюджете</li>
        <li>
          Экономия времени – не тратишь его на мастеров, чьи цены тебе не
          подойдут
        </li>
      </ul>
      👉 Тату мечты – без переплат!
    </span>
  </DownModal>
</template>

<script setup lang="ts">
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import { generateRandomString } from "@/utils/functions";
import OkCircled from "@/components/icons/OkCircled.vue";
import InputItem from "@/components/InputItem.vue";
import DownModal from "@/blocks/DownModal.vue";
import { ref } from "vue";
import CreateAuctionHeader from "../CreateAuctionHeader.vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";
import { AuctionTypesEnum } from "@/types/Auction";

const emits = defineEmits<{ next: [] }>();
const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();

const sketchAuctionDescriptionVisible = ref(false);
const priceAuctionDescriptionVisible = ref(false);
const price = ref<number>(0);
const type = ref<AuctionTypesEnum>(AuctionTypesEnum.sketchAuction);

const setPrice = (amount: Number | String) => {
  if (typeof amount === "string") {
    amount = Number(amount);
    if (Number.isNaN(amount)) return;
  }

  price.value = amount as number;
};

const setData = () => {
  auctionBuilder.setType(type.value);
  if (type.value === AuctionTypesEnum.priceAuction && price.value !== 0) {
    if (!price.value) return;
    auctionBuilder.setPrice(price.value);
  }
  emits("next");
};

const clientSketchAuctionId = generateRandomString(3);
const clientPriceAuctionId = generateRandomString(3);
</script>

<style scoped>
.large-checkbox .title {
  max-width: 200px;
}
.wrapper {
  background-color: #0d0d0d4d;
  padding: 24px;
  border-radius: 24px;
  margin: 5px 0;
}
.wrapper .description {
  line-height: 160%;
  font-size: 11px;
  letter-spacing: 2%;
}
.wrapper__price {
  margin-bottom: 70px;
}
.radio-box {
  width: 32px;
  height: 32px;
}

.price-input {
  border: 1px solid #bc2bff;
}

input[type="radio"] {
  appearance: none;
  position: relative;
  width: 32px;
  height: 32px;
  background: #0d0d0db2;
  border-radius: 24px;
  border: 3.5px solid #0c445bb2;
  transition: 500ms;
}

label {
  position: absolute;
  text-align: center;
  top: -8.3px;
  left: 0;
  font-size: 2em;
  display: none;
}

input[type="radio"]:checked + label {
  display: inline-block;
}

.wrapper__sketch input[type="radio"]:checked + label {
  color: #44f64199;
}

.wrapper__price input[type="radio"]:checked + label {
  color: #bc2bff;
}

.wrapper__sketch:has(input[type="radio"]:checked) {
  border: 1px solid #44f64199; /* Задайте нужный стиль границы */
}

.wrapper__price:has(input[type="radio"]:checked) {
  border: 1px solid #bc2bff; /* Задайте нужный стиль границы */
}

input[data-input-name="input-component"] {
  text-align: center;
}
</style>
