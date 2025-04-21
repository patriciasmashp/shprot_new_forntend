<template>
  <header>
    <nav>
      <div class="nav-wrapper">
        <div class="row mx-2">
          <div class="col-8">
            <div class="d-flex">
              <ButtonItem @click="router.push({ name: 'home' })">
                <ArrowLeft class="fs-6" />
              </ButtonItem>
            </div>
          </div>
          <div class="col-4 d-flex justify-content-end">
            <i class="icon-vector"></i>
            <ButtonItem class="me-1" @click="likeMaster(master, $event)">
              <HeartFilled />
            </ButtonItem>
            <ButtonItem @click="client.shareMaster(master)">
              <IconExport class="fs-6" />
            </ButtonItem>
          </div>
        </div>
        <div class="w-100 blur"></div>
      </div>
    </nav>
    <div
      style="
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0)
        );
        backdrop-filter: blur(10px);
      "
    ></div>
  </header>
  <div class="card" v-if="master">
    <div class="card-body w-100" style="padding: 4px">
      <SwiperItem
        class="w-100"
        :id_el="'m' + master.id.toString()"
        :images="getImages"
      />

      <div class="px-3">
        <div class="row mt-4 pe-3 align-items-center">
          <div class="col-3 master-avatar-container">
            <img
              :src="imageParse(master.profile_image?.url)"
              class="rounded-circle"
            />
          </div>
          <div class="col-6 ps-0">
            <div>
              <h6 class="text-white m-0">
                <b>{{ master.name }}</b>
              </h6>
            </div>
            <div class="d-flex">
              <span class="text-secondary">{{ master.city?.name }}</span>
              <span class="text-secondary"
                ><HeartFilled class="ms-3" />{{ master.likes }}</span
              >
            </div>
          </div>
        </div>
        <div class="mt-3">
          <span class="text-white fw-semibold">Стили татуировок:</span>
          <span
            class="text-purple fw-semibold ms-1"
            v-for="style in masterStyles"
            >{{ style }}</span
          >
        </div>
        <div class="mt-3">
          <span class="text-white fw-semibold">О себе:</span>
          <span class="text-secondary fw-semibold ms-1">{{
            master.about_master
          }}</span>
        </div>

        <DividerItem class="mt-5" style="opacity: 10%" />
        <ButtonItem
          :type="'dissmiss'"
          class="fw-semibold mb-5"
          :full="true"
          @click="report_visible = true"
          style="font-size: 11px"
          >Оставить жалобу</ButtonItem
        >
        <div class="d-flex mt-4 justify-content-center">
          <ButtonItem
            :type="'main'"
            :size="'large'"
            :full="true"
            @click="request_visible = true"
            style="height: 56px; font-size: 12px"
            >Оставить заявку</ButtonItem
          >
        </div>
      </div>
    </div>
  </div>
  <DownModal :visible="report_visible" @close="report_visible = false">
    <ReportBlock :master="master" @created="report_visible = false">

    </ReportBlock>
  </DownModal>
  <DownModal :visible="request_visible" @close="request_visible = false">
    <RequestBlock :master="master" @created="request_visible = false"></RequestBlock>
  </DownModal>
</template>
<script setup lang="ts">
import ButtonItem from "@/components/ButtonItem.vue";
import DividerItem from "@/components/DividerItem.vue";
import DownModal from "@/blocks/DownModal.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import HeartFilled from "@/components/icons/HeartFilled.vue";
import IconExport from "@/components/icons/IconExport.vue";
import SwiperItem from "@/components/SwiperItem.vue";
import router from "@/router";
import { computed, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import type { IStrapiImage } from "@/types/IStrapiResponse";
import type { Master } from "@/types/Master";
import { imageParse } from "@/utils/functions";
import RequestBlock from "@/blocks/RequestBlock.vue";
import ReportBlock from "@/blocks/ReportBlock.vue";
import type { UserInteract } from "@/types/UserInteract";

const report_visible = ref(false);
const request_visible = ref(false);
const store = useStore();
store.dispatch("FETCH_MASTER", router.currentRoute.value.params.id);
store.dispatch("FETCH_STYLES");
store.dispatch("FETCH_CLIENT");

const client = computed<UserInteract>(() => store.getters.client);
const allStyles = computed(() => store.getters.styles);
const master = computed<Master>(() => store.getters.master);

const masterStyles = computed(() => {
  // if (!master.value) return [];
  const style_names = store.getters.master.styles.map(
    (style) => style.style_name
  );
  console.log(allStyles);
  if (style_names.includes("Все стили")) {
    return allStyles.value.map((style) => style.style_name);
  }
  return style_names;
});

async function likeMaster(master: Master, event: PointerEvent) {
  const toDay = new Date().toISOString().split("T")[0];
  var target: HTMLElement = event.target as HTMLElement;
  store.dispatch("ADD_FAVORITE", {
    master: master,
    date: toDay,
  });

  target.classList.add("pulse");
}
const getImages = computed(() => {
  if (!master.value) return [];
  if (!master.value.photos) return [];
  const photos: Array<IStrapiImage> = master.value.photos;
  return photos.map<string>((el) => el.url);
});

onUnmounted(async () => {
  store.dispatch("RESET_MASTER");
});


</script>

<style scoped>
.master-avatar-container img {
  height: 50px;
  width: auto;
}
.card {
  background-color: unset;
  /* Card */
  margin: auto;
  box-sizing: border-box;
  border: 0;
  width: 343px;
  background-color: #000000;
  background-blend-mode: overlay;
  border-radius: 24px;
}
.card .card__button {
  padding: 0px 3px;
}
nav {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  backdrop-filter: blur(3px);
  mask-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(255, 255, 255, 1) 14%
  );
  padding-top: 20px;
  padding-bottom: 10px;
  z-index: 100;
}
nav .nav-wrapper {
  max-width: 343px;
  margin: auto;
}
</style>
