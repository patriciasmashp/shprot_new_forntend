<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <div class="row mx-2">
          <div class="col-4">
            <div class="d-flex">
              <ButtonItem @click="router.push({ name: 'auction' })">
                <ArrowLeft class="fs-6" />
              </ButtonItem>
            </div>
          </div>
          <div class="col-4 text-center d-flex flex-column" v-if="price">
            <span class="reponse-price"> {{price}} ₽ </span>
            <span class="text-white"> Мастер оценил </span>
          </div>
          <div class="col-4 text-center d-flex flex-column" v-else> </div>
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
  </div>
</template>
<script setup lang="ts">
import ButtonItem from "@/components/ButtonItem.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import HeartFilled from "@/components/icons/HeartFilled.vue";
import IconExport from "@/components/icons/IconExport.vue";
import type { Master } from "@/types/Master";
import type { UserInteract } from "@/types/UserInteract";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const client = computed<UserInteract>(() => store.getters.client);

async function likeMaster(master: Master, event: PointerEvent) {
  const toDay = new Date().toISOString().split("T")[0];
  var target: HTMLElement = event.target as HTMLElement;
  client.value.likeMaster(master);
  store.dispatch("ADD_FAVORITE", {
    master: master,
    date: toDay,
  });

  target.classList.add("pulse");
}

const props = defineProps<{
  master: Master;
  price: string;
}>();
</script>
<style scoped>
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
.reponse-price {
  color: #44f641;
  font-size: 15px;
}
</style>
