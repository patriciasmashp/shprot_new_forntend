<script setup lang="ts">
import DownModal from "@/blocks/DownModal.vue";
import AuctionResponseHeader from "@/blocks/master/headers/AuctionResponseHeader.vue";
import MasterPage from "@/blocks/master/MasterPage.vue";
import ReportBlock from "@/blocks/ReportBlock.vue";
import ButtonItem from "@/components/ButtonItem.vue";
import DividerItem from "@/components/DividerItem.vue";
import type { Master } from "@/types/Master";
import type { UserInteract } from "@/types/UserInteract";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const modalSuccessReportVisible = ref(false);
const report_visible = ref(false);
const contactSentedWindowVisible = ref(false);
store.dispatch("FETCH_MASTER", router.currentRoute.value.params.masterId);
const master = computed<Master>(() => store.getters.master);
const auctionDocumentId = computed<string>(
  () => router.currentRoute.value.params.auctionId as string
);
const price = computed<string>(() => {
  return router.currentRoute.value.query.price as string;
});
const client = computed<UserInteract>(() => store.getters.client);
const afterReport = () => {
  report_visible.value = false;
  modalSuccessReportVisible.value = true;
};

const selectMaster = () => {
  client.value.selectMasterAuction(
    master.value.documentId,
    auctionDocumentId.value
  );
  contactSentedWindowVisible.value = true;
};
</script>

<template>
  <AuctionResponseHeader :price="price" :master="master" />

  <MasterPage :master="master" />
  <DividerItem class="mt-5" style="opacity: 10%" />

  <ButtonItem
    :type="'dissmiss'"
    class="fw-semibold mb-5"
    :full="true"
    @click="report_visible = true"
    style="font-size: 11px"
    >Оставить жалобу</ButtonItem
  >
  <div class="d-flex mt-4 justify-content-center">
    <ButtonItem
      :type="'main'"
      :size="'large'"
      :full="true"
      @click="selectMaster"
      style="height: 56px; font-size: 12px"
      >Оставить заявку</ButtonItem
    >
  </div>

  <DownModal :visible="report_visible" @close="report_visible = false">
    <ReportBlock :master="master" @created="afterReport"> </ReportBlock>
  </DownModal>
  <DownModal :height="'230px'" :color="'#0C445BB2'" :visible="contactSentedWindowVisible" @close="() => {contactSentedWindowVisible = false}">
    <div class="text-center">
      <div class="mb-3">
        <span class="secondary-text">Заявка отправлена</span>
      </div>
      <span class="secondary-text">
        Мы отправили ваши контакты мастеру для связи с вами
      </span>
    </div>
  </DownModal>
</template>
