<template>
  <div class="d-flex flex-wrap">
    <div
      v-for="file in model"
      class="input_wrapper me-2 mb-2"
      :style="{ backgroundImage: `url(${imagePreview(file)})` }"
      :class="{ 'input_wrapper-uploaded': file }"
    >
      <label class="image-preview" @click="removeImage(file)">
        <div class="input__open-img-container">
          <OkCircled style="color: #bc2bff" class="fs-3" />
        </div>
      </label>
    </div>

    <div
      class="input_wrapper input_wrapper-active"
      v-if="model.length < filesLimit"
    >
      <input
        @change="uploadFile"
        type="file"
        multiple
        :accept="mimeType"
        id="input__file-input"
      />
      <label for="input__file-input">
        <GallaryAdd />
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import GallaryAdd from "./icons/GallaryAdd.vue";
import OkCircled from "./icons/OkCircled.vue";
import { useStore } from "vuex";

const store = useStore()
const { mimeType = "image/*", filesLimit = 10 } = defineProps<{
  mimeType?: string;
  filesLimit?: number;
}>();
const emit = defineEmits(["change"]);

const model = defineModel<Array<File>>({ default: [] });

const removeImage = (imgToDel: File) =>{
  // model.value = model.value.filter((img) => img != imgToDel)
}
const imagePreview = (file: File) => URL.createObjectURL(file);

function uploadFile(event: Event) {
  const input = event.target as HTMLInputElement;
  store.dispatch("DEBUG", {event: event})
  if (!input.files) return;
  store.dispatch("DEBUG", {mime: input.files})
  for (let file of input.files) {
    if (model.value.length >= filesLimit) return;
    model.value.push(file);
  }
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

.icon-ok-circled{
  transition: 0.5s;
}
.image-preview:hover .icon-ok-circled{
  color: red !important;
  transition: 0.5s;
}
</style>
