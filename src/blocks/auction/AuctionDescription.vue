<template>
  <h3 class="text-white mb-4">Описание аукциона</h3>
  <h4 class="text-white mb-1">{{auction.bodyPart}}</h4>
  <span class="text-secondary">{{dateFormat(auction.createdAt)}}</span>
  <div class="description-price my-3" v-if="auction.type == AuctionTypesEnum.priceAuction">
    <span class="description-price__text">Стоимость до: </span>
    <span class="description-price__amount">{{auction.price}} ₽</span>
  </div>
  <div class="description-badges">
    <span class="badge">{{ auction.city.name }}</span>
    <span class="badge">{{auction.size}}</span>
  </div>
  <div class="description-place my-3">
    <span class="description-place__text">Место нанесения тату: </span>
    <span class="description-price__value">{{auction.bodyPart}}</span>
  </div>
  <div class="description-idea my-3">
    <span class="description-idea__text">Идея: </span>
    <span class="description-idea__value"
      >{{auction.idea}}</span
    >
  </div>
  <div
    v-if="auction.file"
    class="input_wrapper"
    :style="{ backgroundImage: `url(${imageParse(auction.file.url)})` }"
    :class="{ 'input_wrapper-uploaded': image_preview }"
  >
    <label for="input__file-input">
      <div class="input__open-img-container">
        <OkCircled style="color: #bc2bff" class="fs-3" />
        <!-- <img :src="image_preview" class="w-100" /> -->
      </div>
    </label>
  </div>
</template>
<script setup lang="ts">
import OkCircled from "@/components/icons/OkCircled.vue";
import { AuctionTypesEnum, type Auction } from "@/types/Auction";
import { dateFormat, imageParse } from "@/utils/functions";
import { ref } from "vue";
type Props = {
  auction: Auction;
};
const { auction } = defineProps<Props>();
const image_preview = ref(
  "http://localhost:1337/uploads/2c921e1a_2d0b_488c_b3fc_d08e68d86fa9_09678535f5.false"
);
</script>
<style scoped>
.badge {
  background-color: #79797926 !important;
  color: #44f641;
  border-radius: 8px;
  margin-left: 4px;
}
.badge:first-child {
  margin-left: 0;
}
.description-idea__text,
.description-place__text,
.description-price__text {
  color: #44f641;
}
.description-idea__value,
.description-price__value,
.description-price__amount {
  color: #ffffff;
  font-weight: 400;
}

.input_wrapper-uploaded {
  background-size: cover !important;
  backdrop-filter: brightness(39%);
  background-color: #0d0d0d9e !important;
}
label {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  border-radius: 25px;
  filter: brightness(40%);
}
.input_wrapper {
  display: flex;
  cursor: pointer;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 90px;
  width: 90px;
  background: rgba(255, 255, 255, 0.02);
  background-blend-mode: overlay;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
</style>
