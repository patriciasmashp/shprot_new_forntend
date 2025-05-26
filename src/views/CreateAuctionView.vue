<template>
  <div class="loading-wrapper" v-if="loading">
    <div class="loading-blur"></div>
    <div class="loading">
      <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

  <component
    v-bind="{ auctionBuilder }"
    :is="currentState"
    @next="() => pushState()"
    @to="(state: statuses) => setState(state)"
  />
  <DownModal
    :visible="auctionCreated"
    @close="
      () => {
        auctionCreated = false;
        router.push({ name: 'auction' });
      }
    "
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
import {
  statesComponents,
  statuses,
  type CreateAuctionResponse,
} from "@/types/Auction";

import DownModal from "@/blocks/DownModal.vue";
import { AuctionInteractor } from "@/utils/classes/AuctionInteractor";
import { useStore } from "vuex";
import type { UserInteract } from "@/types/UserInteract";
import router from "@/router";
import IdeaStep from "@/blocks/auction/CreateAuctionStates/IdeaStep.vue";

const store = useStore();
const auctionBuilder = AuctionInteractor.getAuctionBuilder();
const auctionCreated = ref<boolean>(false);
const auctaionFailed = ref<boolean>(false);

const createError = ref<string>();
const client = computed<UserInteract>(() => store.getters.client);
const loading = ref<boolean>(false);
function finish() {
  loading.value = true;
  client.value
    .createAuction(auctionBuilder)
    .then((response: CreateAuctionResponse) => {
      loading.value = false;
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
const currentState = computed({
  get() {
    return stateKeys[currentStateIndex.value];
  },
  set(value: Component) {
    currentStateIndex.value = stateKeys.indexOf(value);
  },
});

const setState = (state: statuses) => {
  currentState.value = statesComponents[state];
};
// Функция для переключения на следующий компонент
const pushState = () => {
  if (currentStateIndex.value + 1 > stateKeys.length - 1) {
    finish();
  } else {
    currentStateIndex.value = currentStateIndex.value + 1;
  }
};
</script>

<style scoped>
.loading-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
}
.loading-blur {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  /* filter: blur(0px); */
  backdrop-filter: blur(10px);
  z-index: 100;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
}
.spinner-grow {
  background-color: rebeccapurple !important;
}
</style>
