<template>
  <!-- <SizeStep @next="(d) => console.log(d)" /> -->
  <component
    v-bind="{ auctionBuilder }"
    :is="currentState"
    @next="() => pushState()"
  />
  <DownModal
    :visible="auctionCreated"
    @close="() => {auctionCreated = false; router.push({name:'auction'})}"
    :color="'#0C445BB2'"
    :height="'247px'"
  >
    <div class="text-center">
      <div class="mb-3">
        <span class="secondary-text">Ваш аукцион создан.</span>
      </div>
      <span class="secondary-text">
        Оценки мастеров будут размещаться в этом разделе по мере их поступления
      </span>
    </div>
  </DownModal>
  <DownModal
    :visible="auctaionFailed"
    @close="auctaionFailed = false"
    :color="'#0C445BB2'"
    :height="'247px'"
  >
    <div class="mb-3 text-center">
      <span class="text-danger">Аукцион не создан</span>
    </div>
    <div class="text-center">
      <h4 class="secondary-text">{{ createError }}</h4>
    </div>
  </DownModal>
</template>
<script setup lang="ts">
import { computed, ref, type Component } from "vue";
import { statesComponents, type CreateAuctionResponse } from "@/types/Auction";

import DownModal from "@/blocks/DownModal.vue";
import { AuctionInteractor } from "@/utils/classes/AuctionInteractor";
import { useStore } from "vuex";
import type { UserInteract } from "@/types/UserInteract";
import router from "@/router";

const store = useStore();
const auctionBuilder = AuctionInteractor.getAuctionBuilder();
const auctionCreated = ref<boolean>(false);
const auctaionFailed = ref<boolean>(false);

const createError = ref<string>();
const client = computed<UserInteract>(() => store.getters.client);

function finish() {
  client.value
    .createAuction(auctionBuilder)
    .then((response: CreateAuctionResponse) => {
      if (response.success) {
        auctionCreated.value = true;
      } else {
        auctaionFailed.value = true;
        createError.value = response.message;
      }
    });
}

// Создаём массив состояний
const stateKeys = Object.values(statesComponents);

// Создаём реактивное состояние индекса компонента
const currentStateIndex = ref(0);

// Получение текущего состояния
const currentState = computed(() => {
  return stateKeys[currentStateIndex.value];
});
// Функция для переключения на следующий компонент
const pushState = () => {
  if (currentStateIndex.value + 1 > stateKeys.length - 1) {
    finish();
  } else {
    currentStateIndex.value = currentStateIndex.value + 1;
  }
};
</script>
