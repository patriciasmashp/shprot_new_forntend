<template>
  <div class="date-responces"  v-for="auctions, date in groupByCreatedAt(auctions)">
    <div class="text-center secondary-text mb-3 mt-4">
      <span> {{date}}</span>
    </div>

    <AccordionBlock>
      <AccordionItem class="accordion-item" v-for="auction in auctions">
        <template #title>
          
          <div class="d-flex justify-content-between w-100 pe-2">
            <div>
              <span>{{auction.bodyPart}}</span>
            </div>
            <div>
              <RoundenBage color="#44F64199" v-if="auction.masterResponses.length"> {{auction.masterResponses.length}} </RoundenBage>
            </div>
          </div>
        </template>
        <template #content>
          <div class="description-trigger" @click="showAuctionDescription(auction)">
            <span>Описание аукциона</span>
          </div>
         
          <div v-for="response in auction.masterResponses" >

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

  <div class="auction-state">
    <IconJudge class="judge-icon" />
    <div>
      <span class="">{{ auctionStateText }}</span>
    </div>
  </div>

  <DownModal
    :visible="descriptionVisible"
    :color="'#0C445BB2'"
    @close="descriptionVisible = false"
  >
    <AuctionDescription v-if="auctionDescription" :auction="auctionDescription" />
  </DownModal>
</template>

<script setup lang="ts">
import AccordionBlock from "@/blocks/AccordionBlock.vue";
import AccordionItem from "@/components/AccordionItem.vue";
import IconJudge from "@/components/icons/IconJudge.vue";
import MasterAuction from "@/components/MasterAuction.vue";
import RoundenBage from "@/components/RoundenBage.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import DownModal from "../DownModal.vue";
import AuctionDescription from "./AuctionDescription.vue";
import type { UserInteract } from "@/types/UserInteract";
import type { Auction } from "@/types/Auction";
import { groupByCreatedAt } from "@/utils/functions";

const store = useStore();

const client = computed<UserInteract>(() => store.getters.client);
store.dispatch("FETCH_ACTIVE_AUCTIONS");
const auctionDescription = ref<Auction>();
const auctions = computed<Auction[]>(() => {
  const auctions = store.getters.activeAuctions;
  
  return auctions;
});

const descriptionVisible = ref(false);
const showAuctionDescription = (auction: Auction) => {
  auctionDescription.value = auction;
  descriptionVisible.value = true;
};

const auctionStateText = computed(() => {
  const hasResponces = auctions.value.some((auction: Auction) => {

    auction.masterResponses.length > 0;
  });
  if (auctions.value.length === 0) {
    return "Тут будут размещены ваши активные аукционы";
  } else if (hasResponces) {
    return "Новые аукционы будут действительны в течении 7 дней с начала создания. После чего их можно будет найти в архиве";
  } else {
    return "Мастера проводят оценку...";
  }
});
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
  background-color: #44f64199 !important;
  font-size: 8px;
  letter-spacing: 3%;
  font-weight: 700;
  color: #0d0d0db2;
}
</style>
