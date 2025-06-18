<script setup lang="ts">
import { MasterInteractor } from "@/utils/classes/MasterInteractor";
import HeartFilled from "@/components/icons/HeartFilled.vue";
import HeartOutline from "@/components/icons/HeartOutline.vue";
import avatar from "@/assets/images/avatar_placheholder.png";
import type { IStrapiImage } from "@/types/IStrapiResponse";
import IconExport from "@/components/icons/IconExport.vue";
import type { UserInteract } from "@/types/UserInteract";
import ButtonItem from "@/components/ButtonItem.vue";
import RequestBlock from "@/blocks/RequestBlock.vue";
import SwiperItem from "@/components/SwiperItem.vue";
import { imageParse } from "@/utils/functions";
import DownModal from "@/blocks/DownModal.vue";
import type { Master } from "@/types/Master";
import { computed, ref } from "vue";
import { store } from "@/store";
import router from "@/router";

interface Props {
  master: Master;
}
const client = computed<UserInteract>(() => store.getters.client);
const props = defineProps<Props>();
const requestVisible = ref<boolean>(false);
const getImages = computed(() => {
  if (!props.master.photos) return [];

  const photos: Array<IStrapiImage> = props.master.photos;
  return photos.map<string>((el) => el.url);
});

const masterAvatar = computed(() => {
  if (!props.master.profile_image) return avatar;
  console.log(props.master.profile_image.url);
  
  if (!props.master.profile_image.url || props.master.profile_image.url == undefined) return avatar;
  return imageParse(props.master.profile_image.url);
});
const animateHeart = (target: HTMLElement) => {
  const svg = target.querySelector("svg");
  if (!svg) {
    target.parentElement?.classList.add("pulse");
  } else svg.classList.add("pulse");
};
async function likeMaster(master: Master, event: PointerEvent) {
  const toDay = new Date().toISOString().split("T")[0];
  var target: HTMLElement = event.target as HTMLElement;
  await client.value.likeMaster(master);
  store.dispatch("ADD_FAVORITE", {
    master: master,
    date: toDay,
  });

  animateHeart(target);
}
async function aboutMaster(master: Master) {
  router.push({ name: "masterView", params: { id: master.documentId } });
  const interactor = new MasterInteractor()
  await interactor.updateStatistic(master, {aboutRequestCount: 1})
}
</script>

<template>
  <div class="card">
    <div class="card-body w-100" style="padding: 4px">
      <SwiperItem
        class="w-100"
        :id_el="'m' + props.master.id.toString()"
        :images="getImages"
      />

      <div class="d-flex mt-2 pe-3 align-items-center">
        <div class="col-2 text-center me-3 pe-0 avatar-container">
          <!-- <pre>

            {{ props.master.profile_image }}
          </pre> -->
          <img
            :src="masterAvatar"
            class="rounded-circle"
          />
        </div>
        <div class="col-9">
          <div>
            <h6 class="text-white m-0">
              <b>{{ master.name }}</b>
            </h6>
          </div>
          <div class="d-flex justify-content-between">
            <span class="text-secondary">{{ master.city.name }}</span>
            <span class="text-secondary"
              ><HeartOutline /> {{ master.likes }}</span
            >
          </div>
        </div>
      </div>

      <div class="d-flex mt-4 justify-content-center">
        <div class="card__button">
          <ButtonItem
            font-size="10px"
            @click="
              aboutMaster(props.master);
            "
            :size="'small'"
            >О мастере</ButtonItem
          >
        </div>
        <div class="card__button">
          <ButtonItem
            @click="requestVisible = true"
            font-size="10px"
            :type="'main'"
            :size="'medium'"
            >Оставить заявку</ButtonItem
          >
        </div>
        <div class="card__button">
          <ButtonItem @click="client.shareMaster(master)"
            ><IconExport class="fs-6"
          /></ButtonItem>
        </div>
        <div class="card__button">
          <ButtonItem @click="(event) => likeMaster(master, event)"
            ><HeartFilled ref="heartIco"
          /></ButtonItem>
        </div>
      </div>
    </div>
    <DownModal :visible="requestVisible" @close="requestVisible = false">
      <RequestBlock
        :master="master"
        @created="requestVisible = false"
      ></RequestBlock>
    </DownModal>
  </div>
</template>
<style scoped>
.avatar-container img {
  height: 48px;
  width: 100%;
   object-fit: cover;
}
.card {
  background-color: unset;
  /* Card */

  box-sizing: border-box;
  border: 0;
  width: 100%;
  height: 564px;
  background-color: #ffffff05;
  background-blend-mode: overlay;
  border-radius: 24px;
}
.card .card__button {
  padding: 0px 3px;
}
/* .slider{
    height: 455px;
} */
</style>
