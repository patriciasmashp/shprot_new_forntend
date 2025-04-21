<template>
  <IMaskComponent
    v-model="value"
    mask="+{7}(000)000-00-00"
    radix="."
    :unmask="false"
    :lazy="false"
    placeholder="+7 (___) ___-__-__"
  />
</template>
<script setup lang="ts">
import { IMaskComponent } from "vue-imask";
import { ref } from "vue";

const value = ref("");

</script>
<style scoped>
input {
  /* Component */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  text-align: center;
  color: white;
  background: #ffffff02;
  outline: none;
  background-blend-mode: overlay;
  border: 1px solid #bc2bff34;
  border-radius: 16px;
}
input:focus{
  border-color: #BC2BFF !important;
}
</style>
