<script setup lang="ts">
import { uploadVideoToStrapi } from "@/api";
import FIleInput from "@/components/FIleInput.vue";
import { ref } from "vue";
import { useMiniApp, usePopup, useMainButton } from "vue-tg";

const miniApp = useMiniApp();
const mainButton = useMainButton();
const progressPercent = ref(0);
const fileToSave = ref<File>();
const loading = ref(false);
const popUp = usePopup();
const fileValid = ref<boolean>(false);

mainButton.setParams({
  color: "#BC2BFF",
  text: "Загрузить",
});
mainButton.onClick(async () => {
  if (fileToSave.value) {
    console.log(fileToSave.value);
    const videoUrl = URL.createObjectURL(fileToSave.value);
    const videoElement = document.createElement("video");

    videoElement.src = videoUrl;

    videoElement.addEventListener("loadedmetadata", async () => {
      const videoDuration = videoElement.duration;
      if (videoDuration < 15 || videoDuration > 60)
        await popUp.showAlert(
          "Выберите видео длинной от 15 секунд до 1 минуты"
        );
      else {
        loading.value = true;
        if (!fileToSave.value) return;
        const key = await uploadVideoToStrapi(fileToSave.value, (progress) => {
          console.log(progress, "progressssssss");
          progressPercent.value = progress;
          if (progress === 100) return true;
          return false;
        });
        console.log(key);

        if (key) {
          miniApp.sendData(key);
        }
      }
      URL.revokeObjectURL(videoUrl); // Освобождаем объект URL
    });

    // Загрузка метаданных
    videoElement.load();

    return;
  }
});
mainButton.show();
</script>

<template>
  <div class="form">
    <div class="me-3">
      <FIleInput
        @change="(file) => (fileToSave = file)"
        id="uploadForm"
        :mime-type="'video/*'"
      />
    </div>
    <label for="uploadForm">
      <h3>Выберите видео для загрузки</h3>
      <span class="text-secondary"
        >добавь видео длинной от 15 секунд до 1 минуты. Внимание, 1 пост = 1
        работе, ассорти из разных работ не пройдёт модерацию и не будет
        опубликовано. Требование к видео: Размеры 1080 на 1350 или 1080 на
        566</span
      >
    </label>
  </div>

  <div class="progress-wrapper" v-if="loading">
    <div class="progress" style="height: 1px">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: progressPercent + '%' }"
        :aria-valuenow="progressPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  color: white;
}
.progress-wrapper {
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #ffffff0f;
}
.progress-bar {
  background-color: #bc2bff;
}
</style>
