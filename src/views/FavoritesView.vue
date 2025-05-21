<template>
  <nav>
    <div class="nav-wrapper">
      <div class="d-flex mx-2 justify-content-between align-items-center">
        <div class="">
          <div class="d-flex">
            <ButtonItem @click="router.back()">
              <ArrowLeft class="fs-6" />
            </ButtonItem>
          </div>
        </div>
        <div></div>
        <h6 class="m-0 text-white">Избранное</h6>
        <div
          class="text-purple"
          style="font-size: 12px"
          @click="clearFavorites"
        >
          Очистить все
        </div>
      </div>
    </div>
  </nav>
  <div class="favorites__block" v-for="favoriteByDate in client.getFavorites()">
    <div class="text-center secondary-text mb-3 mt-4">
      <span>{{ dateFormat(favoriteByDate.date) }}</span>
    </div>
    <div class="favorites__list">
      <div
        class="d-flex favorites__element mt-2"
        v-for="master in favoriteByDate.masters"
      >
        <div class="col-2" @click="toMaster(master)">
          <div class="favorites__element-avatar">
            <img
              :src="imageParse(master.profile_image?.url)"
              class="rounded-circle"
            />
          </div>
        </div>

        <div class="col-7" @click="toMaster(master)">
          <div class="text-white">{{ master.name }}</div>
          <div class="d-flex secondary-text justify-content-between">
            <span>{{ master.city.name }}</span>
            <span class=""
              ><HeartOutline class="pe-1" style="font-size: 11px" />{{
                master.likes
              }}</span
            >
          </div>
        </div>

        <div
          class="col-3 d-flex secondary-text justify-content-center align-items-start"
        >
          <HeartSlashed
            style="font-size: 25px"
            @click="showModal({ master: master, date: favoriteByDate.date })"
          />
        </div>
      </div>
    </div>
  </div>

  <ModalItem v-model="askModalVisible">
    <div class="text-center text-white p-1" style="font-size: 12px">
      Вы уверены, что хотите удалить мастера?
    </div>
    <div class="d-flex mt-3">
      <ButtonItem
        :type="'outline'"
        style="height: 40px"
        class="mx-2"
        :full="true"
        @click="closeModal"
        >Нет</ButtonItem
      >
      <ButtonItem
        :type="'main'"
        style="height: 40px"
        :full="true"
        class="mx-2"
        @click="deleteFavorite"
      >
        Да
      </ButtonItem>
    </div>
  </ModalItem>
</template>
<script setup lang="ts">
import ButtonItem from "@/components/ButtonItem.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import router from "@/router";
import HeartOutline from "@/components/icons/HeartOutline.vue";
import HeartSlashed from "@/components/icons/HeartSlashed.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { dateFormat, imageParse } from "@/utils/functions";
import type { Master } from "@/types/Master";
import { master } from "@/store/modules/master";
import ModalItem from "@/components/ModalItem.vue";

const askModalVisible = ref(false);
const store = useStore();
const client = computed(() => store.getters.client);
const favorites = computed(() => client.value.getFavorites());
const toMaster = (master: Master) => {
  router.push({ name: "masterView", params: { id: master.documentId } });
};

const masterToDelete = ref();
const closeModal = () => {
  askModalVisible.value = false;
  masterToDelete.value = null;
};
const showModal = ({ master, date }) => {
  masterToDelete.value = { master, date };
  askModalVisible.value = true;
};

const deleteFavorite = () => {
  if (!masterToDelete.value) return;
  store.dispatch("DELETE_FAVORITE", masterToDelete.value);
  askModalVisible.value = false;
};
const clearFavorites = () => {
  store.dispatch("CLEAR_FAVORITES");
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.favorites__element-avatar img {
  height: 40px;
  width: auto;
}
.favorites__list {
  padding: 16px;
  background-color: #0d0d0d73;
}
</style>
