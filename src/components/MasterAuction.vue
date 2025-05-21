<template>
  <div class="d-flex favorites__element mt-2" v-if="masterData">
    <div class="master-avatar-container col-2 me-2" @click="toMaster">
      <img :src="masterAvatar" class="rounded-circle" />
    </div>

    <div class="col-7" @click="toMaster">
      <div class="text-white">{{ masterData.name }}</div>
      <div class="d-flex secondary-text justify-content-between">
        <span>{{ masterData.city?.name }}</span>
      </div>
    </div>

    <div class="col-3  secondary-text text-end">
      <div v-if="response.price">
        <span class="" :class="auction.finished ? '' : 'responce-price'"> {{response.price}} ₽ </span>
      </div>
      <div>
        <span> <HeartOutline /> {{ masterData.likes }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Master } from "@/types/Master";
import { imageParse } from "@/utils/functions";
import HeartOutline from "./icons/HeartOutline.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import avatar from "@/assets/images/avatar_placheholder.png";
import type { Auction, AuctionResponse } from "@/types/Auction";
const store = useStore();
const router = useRouter();


type Props = {
  response: AuctionResponse;
  auction: Auction;
};
const props = defineProps<Props>();

// store.dispatch("FETCH_MASTER", props.response.master.documentId);

const masterData = computed<Master>(() => {
  return props.response.master;
});

const toMaster = () => {

  router.push({
    name: "auctionMasterResponse",
    query: {price: props.response.price,},
    params: { masterId: props.response.master.documentId, auctionId: props.auction.documentId},
  });
};
const masterAvatar = computed(() => {
  if (!masterData.value.profile_image) return avatar;
  if (
    !masterData.value.profile_image.url ||
    masterData.value.profile_image.url == undefined
  )
    return avatar;
  return imageParse(masterData.value.profile_image.url);
});
</script>

<style scoped>
.master-avatar-container img {
  height: 40px;
  width: 100%;
}

.favorites__list {
  padding: 16px;
  background-color: #0d0d0d73;
}
.responce-price {
  color: #44f641;
}
</style>
