<template>
  <DefaultHeader :master="master" />
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
      @click="request_visible = true"
      style="height: 56px; font-size: 12px"
      >Оставить заявку</ButtonItem
    >
  </div>
  <DownModal :visible="report_visible" @close="report_visible = false">
    <ReportBlock :master="master" @created="afterReport"> </ReportBlock>
  </DownModal>
  <DownModal :visible="request_visible" @close="request_visible = false" >
    <RequestBlock :master="master" @created="afterREquest"></RequestBlock>
  </DownModal>
</template>
<script setup lang="ts">
import ButtonItem from "@/components/ButtonItem.vue";
import DividerItem from "@/components/DividerItem.vue";
import DownModal from "@/blocks/DownModal.vue";


import router from "@/router";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import type { Master } from "@/types/Master";
import { sendMetrik } from "@/utils/functions";
import RequestBlock from "@/blocks/RequestBlock.vue";
import ReportBlock from "@/blocks/ReportBlock.vue";
import { useYandexMetrika } from "yandex-metrika-vue3";
import MasterPage from "@/blocks/master/MasterPage.vue";
import DefaultHeader from "@/blocks/master/headers/defaultHeader.vue";

// initMetrik()
const yandexMetrika = useYandexMetrika();
const report_visible = ref(false);
const request_visible = ref(false);
const modalSuccessReportVisible = ref(false);
const modalSuccessRequestVisible = ref(false);
const store = useStore();
store.dispatch("FETCH_MASTER", router.currentRoute.value.params.id);
store.dispatch("FETCH_STYLES");
store.dispatch("FETCH_CLIENT");

const master = computed<Master>(() => store.getters.master);

const afterReport = () => {
  report_visible.value = false;
  modalSuccessReportVisible.value = true;
};
const afterREquest = () => {
  request_visible.value = false;
  modalSuccessRequestVisible.value = true;
};

watch(
  () => master.value,
  () => {
    console.log(master.value);
    sendMetrik(`master_${master.value.documentId}`);
    yandexMetrika.reachGoal(`master_${master.value.id}`, {}, () =>
      console.log("sended")
    );
  },
  { deep: true, once: true }
);


onMounted(() => {
  yandexMetrika.hit(router.currentRoute.value.path);
  console.log(master.value);
});
onUnmounted(async () => {
  store.dispatch("RESET_MASTER");
});
</script>

<style scoped>



</style>
