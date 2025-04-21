<template>
  <div
    v-if="props.visible"
    class="down-modal__container"
    @click="withinBounadiresClick"
  >
    <Transition name="fade">
      <div
        ref="down-modal__window"
        class="down-modal__window"
        :style="{
          transform: `translate(${posX}px, ${posY}px)`,
          zIndex: 9999,
          bottom: 0,
        }"
      >
        <div
          class="d-flex justify-content-center mt-3"
          @touchstart="onMouseDown"
          @mousedown="onMouseDown"
        >
          <div class="down-modal__line"></div>
        </div>
        <div class="elips__purple"></div>
        <div class="down-modal__body mt-4">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps(["visible", "color"]);
const posX = ref(0);
const posY = ref(0);
const startPos = ref({ y: 0, curentPos: 0 });
const windowElement = useTemplateRef("down-modal__window");
watch(
  () => props.visible,
  (v) => {
    if (v) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }
);

function withinBounadiresClick(e: MouseEvent) {
  const div = <HTMLElement>windowElement.value;
  const withinBoundaries = e.composedPath().includes(div);

  if (!withinBoundaries) {
    console.log("Asd");
    emit("close"); // скрываем элемент т к клик был за его пределами
  }
}

const onMouseDown = (e) => {
  startPos.value.y = e.touches ? e.touches[0].clientY : e.clientY;

  const onMove = (e) => {
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startPos.value.y;

    if (deltaY > 0) {
      posY.value = deltaY;
      startPos.value.curentPos = deltaY;
    }
  };

  const onUp = () => {
    const limitToClose = <number>windowElement.value?.clientHeight / 2;

    if (startPos.value.curentPos >= limitToClose) {
      emit("close");
      posY.value = 0;
    } else {
      posY.value = 0;
    }

    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onUp);
  };

  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
  document.addEventListener("touchmove", onMove);
  document.addEventListener("touchend", onUp);
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.down-modal__container {
  position: fixed;
  backdrop-filter: blur(25px);
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  width: 100%;
  max-width: 375px;
  min-width: 375px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 101;
}
.down-modal__window {
  position: fixed;
  width: 100%;
  min-height: 428px;
  border-radius: 32px 32px 0 0;
  bottom: 48px;
  background-color: #0d0d0d;
  transition: 0.01s;
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
}

.elips__purple {
  position: fixed;
  width: 100%;
  height: 428px;
  /* left: calc(50% - 300px / 2 - 4.5px); */
  /* top: calc(50% - 428px / 2 + 221px); */
  z-index: 102;
  background: #601582a7;
  filter: blur(150px);
}

.down-modal__line {
  width: 48px;
  right: 50%;
  left: 50%;
  height: 5px;
  border-radius: 24px;
  z-index: 103;
  top: 20px;
  background-color: #e5e6eb;
}
.down-modal__body {
  padding: 24px;
  position: relative;
  z-index: 103;
}
</style>
