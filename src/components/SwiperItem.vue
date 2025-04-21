<template>
  <div class="swiper" :id="props.id_el">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div
        class="swiper-slide"
        :data-hash="generateRandomString(5)"
        v-for="imageUrl in props.images"
      >
        <img :src="baseUrl + imageUrl" class="w-100" alt="" srcset="" />
      </div>
    </div>

    <div class="swiper-custom-pagination"></div>
  </div>
</template>

<script lang="ts" setup>
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { onMounted } from "vue";
import { baseUrl } from "@/api/routes";

interface Props {
  id_el: string;
  images: Array<string>;
}

function generateRandomString(length) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}
const props = defineProps<Props>();
onMounted(() => {
  const swiper = new Swiper(`#${props.id_el}`, {
    speed: 400,
    spaceBetween: 100,
    modules: [Pagination],
    hashNavigation: {
      watchState: true,
    },
    pagination: {
      bulletClass: "swiper-pagination-planc",
      bulletActiveClass: "swiper-pagination-planc-acitve",
      clickable: true,
      enabled: true,
      el: ".swiper-custom-pagination",
    },
  });
});
</script>
<style scoped>
.swiper {
  border-radius: 20px;
}
.swiper-slide {
  text-align: center;
}
.swiper-slide img {
  height: 400px !important;
}
.swiper-custom-pagination {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
