<template>
  <h3 class="text-center text-white">Оставить заявку</h3>
  <div class="mt-5">
    <div class="text-center">
      <span class="secondary-text">Введите номер телефона</span>
      <InputPhone
        v-model="phoneToRequest"
        id="phoneInput"
        class="mt-3 w-100 mx-auto"
      />
    </div>
  </div>
  <div class="mt-5 text-center">
    <span class="secondary-text">Предпочтительный вариант связи</span>
    <RadioItem
      class="mt-3"
      :buttons="connectTypes"
      v-model:label="typeOfReq"
    ></RadioItem>
    <ButtonItem
      style="height: 56px; font-size: 12px"
      class="mt-4"
      :type="'main'"
      :size="'large'"
      :full="true"
      @click="request"
      >Отправить</ButtonItem
    >
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
import CallingIcon from "@/components/icons/CallingIcon.vue";
import TelegramIcon from "@/components/icons/TelegramIcon.vue";
import WhatsUp from "@/components/icons/WhatsUp.vue";
import InputPhone from "@/components/InputPhone.vue";
import ModalItem from "@/components/ModalItem.vue";
import RadioItem from "@/components/RadioItem.vue";
import type { Master } from "@/types/Master";
import { TypeOfRequest } from "@/types/Request";
import type { UserInteract } from "@/types/UserInteract";
import { computed, ref, useTemplateRef } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  master: Master;
}>();
const modalSuccessRequestVisible = ref<boolean>(false);
const store = useStore();
const emit = defineEmits(["created"]);
const connectTypes = {
  call: { label: TypeOfRequest.phone, icon: CallingIcon },
  whatsapp: { label: TypeOfRequest.WhatsUp, icon: WhatsUp },
  telegram: { label: TypeOfRequest.telegram, icon: TelegramIcon },
};
const phoneToRequest = ref("");
const typeOfReq = ref(TypeOfRequest.phone);
const client = computed<UserInteract>(() => store.getters.client);
const created = () =>{
  modalSuccessRequestVisible.value = false
  emit("created");
}
async function request() {
  if (!/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phoneToRequest.value)) return;
  
  client.value.request(props.master, typeOfReq.value, phoneToRequest.value);
  modalSuccessRequestVisible.value = true
  // emit("created");
}
</script>
