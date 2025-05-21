<script setup lang="ts">
import AuctionNextStepButton from "@/blocks/auction/CreateAuctionStates/AuctionNextStepButton.vue";
import CreateAuctionHeader from "../CreateAuctionHeader.vue";
import AuctionStateProgres from "./AuctionStateProgres.vue";
import TextArea from "@/components/TextArea.vue";
import DownModal from "@/blocks/DownModal.vue";
import { statuses } from "@/types/Auction";
import { ref } from "vue";
import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";

const descriptionVisible = ref(false);
const bodyPart = ref<string>();
const emit = defineEmits<{ next: [] }>();
const { auctionBuilder } = defineProps<{ auctionBuilder: AuctionBuilder }>();
const setData = () => {
  if (!bodyPart.value) return;
  auctionBuilder.setBodyPart(bodyPart.value);
  emit("next");
};
</script>

<template>
  <CreateAuctionHeader class="mb-2" />
  <AuctionStateProgres class="mb-4" :status="statuses.bodyPart" />
  <h3 class="mb-4 text-white">Где даелаем тату?</h3>
  <TextArea class="mb-5" v-model="bodyPart" />

  <div>
    <span class="text-secondary">
      Часто размер и сложность играют ключевую роль в размещении татуировки:
      детальная портретная татуировка будет хорошо смотреться
    </span>
    <span class="text-purple" @click="descriptionVisible = true">
      подробнее...
    </span>
  </div>
  <DownModal
    :visible="descriptionVisible"
    @close="descriptionVisible = false"
    :color="'#0C445BB2'"
  >
    <span class="text-white">
      Часто размер и сложность играют ключевую роль в размещении татуировки:
      детальная портретн Occaecat dolor voluptate irure duis deserunt amet
      labore. Cillum elit sit voluptate reprehenderit. Commodo ipsum ad magna et
      consectetur non culpa duis elit esse sit. Culpa dolor amet eiusmod eiusmod
      ea aliqua sunt proident quis laborum consequat.
    </span>
  </DownModal>
  <AuctionNextStepButton @next="setData" />
</template>
