<template>
  <div class="modal-wrapper" v-if="modalVisible">
    <div class="modal-wrapper-blur" >
      <div class="modal-window">
        <div class="modal-body m-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const modalVisible = defineModel({ default: false });
const emit = defineEmits(["closeModal"]);
console.log(modalVisible);

const closeModal = () => {
  modalVisible.value = false;
  emit("closeModal");
};
</script>

<style scoped>
.modal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 800;
}
.modal-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 140px;
  background-color: black;
  border-radius: 31px;
  z-index: 100;
}
.modal-wrapper-blur {
  backdrop-filter: blur(30px);
  background-color: #0e0e0e4a;
  height: 100%;
}
</style>
