<template>
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
            <img :src="masterAvatar" class="rounded-circle" />
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
        <div class="mt-3 d-flex flex-wrap">
          <div class="text-white fw-semibold style-item">Стили татуировок:</div>
          <div
            class="text-purple m-0 style-item fw-semibold ms-1"
            v-for="style in masterStyles"
          >
            {{ style }}
          </div>
        </div>
        <div class="mt-3">
          <span class="text-white fw-semibold">О себе:</span>
          <span class="text-secondary fw-semibold ms-1">{{
            master.about_master
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatar from "@/assets/images/avatar_placheholder.png";
import type { IStrapiImage } from "@/types/IStrapiResponse";
import SwiperItem from "@/components/SwiperItem.vue";
import { imageParse } from "@/utils/functions";
import type { Master } from "@/types/Master";
import { computed } from "vue";
import { useStore } from "vuex";
import HeartFilled from "@/components/icons/HeartFilled.vue";

const store = useStore();
type Props = {
  master: Master;
};
const props = defineProps<Props>();
const allStyles = computed(() => store.getters.styles);
const getImages = computed(() => {
  if (!props.master) return [];
  if (!props.master.photos) return [];
  const photos: Array<IStrapiImage> = props.master.photos;
  return photos.map<string>((el) => el.url);
});
const masterStyles = computed(() => {
  // if (!props.master) return [];
  const style_names = store.getters.master.styles.map(
    (style: any) => style.style_name
  );
  if (style_names.includes("Все стили")) {
    return allStyles.value.map((style: any) => style.style_name);
  }
  return style_names;
});

const masterAvatar = computed(() => {
  if (!props.master.profile_image) return avatar;
  if (
    !props.master.profile_image.url ||
    props.master.profile_image.url == undefined
  )
    return avatar;
  return imageParse(props.master.profile_image.url);
});
</script>
<style scoped>
.master-avatar-container img {
  height: 50px;
  width: 100%;
  object-fit: cover;
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
.style-item {
  font-size: 11px;
}
</style>
