<template>
  <h3 class="text-center text-white">Оставить заявку</h3>
  <div class="mt-5 text-center">
    <span class="secondary-text">Предпочтительный вариант связи</span>
    <div class="connect-type d-flex mt-3" disabled="true">
      <div class="radio__element">
        <label for="telegram"><i class="icon-tg-plane ico"></i><span class="pe-2">Telegram</span></label>
      </div>
    </div>
    <ButtonItem style="height: 56px; font-size: 12px" class="mt-4" :type="'main'" :size="'large'" :full="true"
      @click="request">Отправить</ButtonItem>
  </div>
  <ModalItem v-model="modalSuccessRequestVisible">
    <div class="text-center">
      <h3 class="text-white">Заявка отправлена</h3>
    </div>
    <div class="buttons mt-4">
      <ButtonItem :type="'main'" @click="created">
        Закрыть
      </ButtonItem>
    </div>
  </ModalItem>
</template>

<script setup lang="ts">
import ButtonItem from "@/components/ButtonItem.vue";
import ModalItem from "@/components/ModalItem.vue";
import type { Master } from "@/types/Master";
import { TypeOfRequest } from "@/types/Request";
import type { UserInteract } from "@/types/UserInteract";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  master: Master;
}>();
const modalSuccessRequestVisible = ref<boolean>(false);
const store = useStore();
const emit = defineEmits(["created"]);

const phoneToRequest = ref("");
const typeOfReq = ref(TypeOfRequest.telegram);
const client = computed<UserInteract>(() => store.getters.client);
const created = () => {
  modalSuccessRequestVisible.value = false
  emit("created");
}
async function request() {
  const username = "https://t.me/"+client.value.client?.username as string;
  client.value.request(props.master, typeOfReq.value, username);
  modalSuccessRequestVisible.value = true
  // emit("created");
}
</script>


<style scoped>
.connect-type {
  justify-content: center;
  gap: 20px;
  /* justify-content: space-between; */
  padding-left: 3px;
  padding-right: 3px;
  align-items: center;
  gap: 6px;
  background-color: #0d0d0d4d;
  border-radius: 16px;
}

.connect-type label {
  color: white;
  font-size: 21px;
  font-weight: 600;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  display: flex;
  align-items: center;
}
</style>