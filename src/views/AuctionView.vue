<template>
  <div class="container">
    <ContentSwitcher v-model="activeTab" :tabs="tabs" />

    <AuctionBlock v-if="activeTab === 'Аукционы'" />
    <ArchiveBlock v-else />
  </div>
  <div class="button-add__wrapper">
    <div class="button-add">
      <ButtonItem
        :type="'main'"
        :size="'large'"
        :full="true"
        @click="router.push({ name: 'createAuction' })"
        style="height: 56px; font-size: 12px"
      >
        <div class="d-flex align-items-center">
          <div class="me-1">Начать новый аукцион</div>
          <AddSquare />
        </div>
      </ButtonItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArchiveBlock from "@/blocks/auction/ArchiveBlock.vue";
import AuctionBlock from "@/blocks/auction/AuctionBlock.vue";
import ButtonItem from "@/components/ButtonItem.vue";

import ContentSwitcher from "@/components/ContentSwitcher.vue";
import AddSquare from "@/components/icons/AddSquare.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("Аукционы");
const tabs = ["Аукционы", "Архив"];
</script>

<style scoped>
.container{
  margin-bottom: 100px;
}
.icon-add-square {
  font-size: 14px;
}
.button-add__wrapper {
  position: fixed;
  bottom: 63px;
  width: 100%;
  display: flex;
  justify-content: center;
  /* width: var(--window-width); */
  background: #000000;
  left: 0;
  padding: 15px 21px;
  /* transform: translateX(-18px);*/
}
.button-add {
  min-width: var(--window-width);
  max-width: var(--window-width);
  padding: 0 10px;
  /* transform: translateX(-18px); */
}
</style>
