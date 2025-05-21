<template>
  <div
    class="date-responces"
    v-for="(auctions, date) in groupByCreatedAt(auctions)"
  >
    <div class="text-center secondary-text mb-3 mt-4">
      <span> 14 мая</span>
    </div>

    <AccordionBlock>
      <AccordionItem class="accordion-item" v-for="auction in auctions">
        <template #title>
          <div class="d-flex justify-content-between w-100 pe-2">
            <div>
              <span>{{ auction.bodyPart }}</span>
            </div>
            <div>
              <RoundenBage
                color="#FFFFFF99"
                v-if="auction.masterResponses.length"
              >
                {{ auction.masterResponses.length }}
              </RoundenBage>
            </div>
          </div>
        </template>
        <template #content>
          <div
            class="description-trigger"
            @click="showAuctionDescription(auction)"
          >
            <span>Описание аукциона</span>
          </div>
          <div v-for="response in auction.masterResponses">
            <MasterAuction
              v-if="response"
              :response="response"
              :auction="auction"
            />
          </div>
        </template>
      </AccordionItem>
    </AccordionBlock>
  </div>

  <DownModal
    :visible="descriptionVisible"
    :color="'#0C445BB2'"
    @close="descriptionVisible = false"
  >
    <AuctionDescription
      v-if="auctionDescription"
      :auction="auctionDescription"
    />
  </DownModal>
</template>

<script setup lang="ts">
import AccordionItem from "@/components/AccordionItem.vue";
import MasterAuction from "@/components/MasterAuction.vue";
import AuctionDescription from "./AuctionDescription.vue";
import AccordionBlock from "@/blocks/AccordionBlock.vue";
import { groupByCreatedAt } from "@/utils/functions";
import RoundenBage from "@/components/RoundenBage.vue";
import DownModal from "@/blocks/DownModal.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import type { Auction } from "@/types/Auction";

const store = useStore();
store.dispatch("FETCH_INACTIVE_AUCTIONS");

const auctionDescription = ref<Auction>();
const showAuctionDescription = (auction: Auction) => {
  auctionDescription.value = auction;
  descriptionVisible.value = true;
};
const master = computed(() => {
  return store.getters.master;
});

const auctions = computed<Auction[]>(() => {
  const auctions = store.getters.inactiveAuctions;

  return auctions;
});

const descriptionVisible = ref(false);
</script>

<style scoped>
.icon-judge {
  color: #0c445bb2;
  font-size: 45px;
}

.auction-state {
  z-index: -1;
  position: absolute;
  text-align: center;
  bottom: 210px;
  left: 50%;
  transform: translate(-50%);
  width: calc(var(--window-width) - 135px);
}
.auction-state span {
  color: #ffffff66;
  font-size: 11px;
}

.accordion-item span {
  font-size: 12px;
}

.description-trigger {
  text-align: center;
  cursor: pointer;
}
.description-trigger span {
  color: #bc2bff;
}

.badge {
  background-color: #ffffff99 !important;
  font-size: 8px;
  letter-spacing: 3%;
  font-weight: 700;
  color: #0d0d0db2;
}
</style>
