<template>
  <swiper-container :id="props.id_el" spaceBetween="100" init="false">
    <swiper-slide v-for="imageUrl in props.images">
      <img :src="baseUrl + imageUrl" class="" alt="" srcset=""
    /></swiper-slide>
  </swiper-container>
  <div
    class="swiper-custom-pagination"
    :class="`swiper-pag-${props.id_el}`"
  ></div>
</template>

<script lang="ts" setup>
import { register } from "swiper/element/bundle";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { onMounted,  ref } from "vue";
import { baseUrl } from "@/api/routes";

interface Props {
  id_el: string;
  images: Array<string>;
}
register();
const swiper = ref();

const props = defineProps<Props>();
onMounted(() => {
  console.log("asd");
  swiper.value = document.querySelector(`#${props.id_el}`);
  if (!swiper.value) return;
  const params = {
    pagination: {
      spaceBetween: 100,
      modules: [Pagination],
      bulletClass: "swiper-pagination-planc",
      bulletActiveClass: "swiper-pagination-planc-acitve",
      clickable: true,
      enabled: true,
      el: `.swiper-pag-${props.id_el}`,
    },

    injectStylesUrls: ["swiper/css/pagination"],
  };
  Object.assign(swiper.value, params);
  swiper.value.initialize();
});
</script>
<style scoped>
swiper-container {
  border-radius: 20px;
  overflow: hidden;
}
swiper-slide {
  text-align: center;
  overflow: hidden;
}
swiper-slide img {
  height: 400px !important;
}
.swiper-custom-pagination {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
