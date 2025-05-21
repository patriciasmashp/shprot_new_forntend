<script setup lang="ts">
import ButtonItem from "@/components/ButtonItem.vue";
const emits = defineEmits<{
  next: [];
}>();
</script>

<template>
  <div class="button-add__wrapper">
    <div class="button-add">
      <ButtonItem
        :type="'main'"
        :size="'large'"
        :full="true"
        @click="emits('next')"
        style="height: 56px; font-size: 12px"
      >
        <div class="d-flex align-items-center">
          <div class="me-1">Далее</div>
        </div>
      </ButtonItem>
    </div>
  </div>
</template>

<style scoped>
.button-add__wrapper {
  position: fixed;
  bottom: 63px;
  width: 100%;
  display: flex;
  justify-content: center;
  /* width: var(--window-width); */
  background: #000000;
  left: 0;
  padding: 15px 21px;
  /* transform: translateX(-18px);*/
}
.button-add {
  min-width: var(--window-width);
  max-width: var(--window-width);
  padding: 0 10px;
  /* transform: translateX(-18px); */
}
</style>
