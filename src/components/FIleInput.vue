<template>
  <div
    class="input_wrapper"
    :style="{ backgroundImage: image_preview }"
    :class="{ 'input_wrapper-uploaded': image_preview }"
  >
    <input @change="uploadFile" type="file" id="input__file-input" />
    <label for="input__file-input">
      <GallaryAdd v-if="!image_preview" />
      <div v-else class="input__open-img-container">
        <OkCircled style="color: #bc2bff" class="fs-3" />
        <!-- <img :src="image_preview" class="w-100" /> -->
      </div>
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import GallaryAdd from "./icons/GallaryAdd.vue";
import OkCircled from "./icons/OkCircled.vue";
const emit = defineEmits(['change'])
const image_preview = ref("");
function uploadFile(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;
  image_preview.value = `url(${URL.createObjectURL(input.files[0])})`;
  emit("change", input.files[0])
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.input_wrapper-uploaded {
  background-size: cover !important;
  backdrop-filter: brightness(39%);
  background-color: #0d0d0d9e !important;
}
label {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  border-radius: 25px;
  filter: brightness(40%);
}
.input_wrapper {
  display: flex;
  cursor: pointer;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 90px;
  width: 90px;
  background: rgba(255, 255, 255, 0.02);
  background-blend-mode: overlay;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}
</style>
