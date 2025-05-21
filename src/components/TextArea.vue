<template>
  <textarea name="" v-model="model" id=""></textarea>
</template>
<script setup lang="ts">
const model = defineModel<string>();
</script>
<style scoped>
textarea {
  width: 100%;
  height: 100px;
  color: white;
  padding: 12px 16px;
  left: 24px;
  top: 125px;
  background: #ffffff02;
  background-blend-mode: overlay;
  border: 1px solid #5f158266;
  border-radius: 16px;
}
textarea:focus,
textarea:active,
textarea:focus-within,
textarea:focus-visible{
    border:1px solid #BC2BFF !important;
    outline:#BC2BFF;
}
</style>
