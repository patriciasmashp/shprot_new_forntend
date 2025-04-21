<template>
  <h3 class="text-white">Жалоба</h3>
  <span class="secondary-text">Опишите проблему с которой столкнулись</span>
  <TextArea class="mt-3" v-model="text"></TextArea>
  <div class="d-flex align-items-center">
    <FIleInput @change="(data) => (file = data)" class="mt-3" />
    <div class="ms-3 text-center">
      <span class="secondary-text">Прикрепите фото</span>
    </div>
  </div>
  <ButtonItem
    style="height: 56px; font-size: 12px"
    class="mt-4"
    :type="'main'"
    :size="'large'"
    :full="true"
    @click="report"
    >Отправить</ButtonItem
  >
</template>
<script setup lang="ts">
import ButtonItem from "@/components/ButtonItem.vue";
import FIleInput from "@/components/FIleInput.vue";
import TextArea from "@/components/TextArea.vue";
import type { Master } from "@/types/Master";
import type { UserInteract } from "@/types/UserInteract";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const props = defineProps<{
  master: Master;
}>();

const store = useStore();
const emit = defineEmits(["created"]);

const text = ref("");
const file = ref<File>();

const client = computed<UserInteract>(() => store.getters.client);
async function report() {
  if (!text) return;

  if (file.value) client.value.report(props.master, text.value, file.value);
  else client.value.report(props.master, text.value, null);

  emit("created");
  text.value = ""
  file.value = undefined
}
</script>
