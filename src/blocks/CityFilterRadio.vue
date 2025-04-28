<template>
  <div class="d-flex flex-wrap">
    <div class="" v-for="item in props.data">
      <input
        :checked="model == item"
        type="radio"
        :id="item"
        :value="item"
        v-model="model"
      />
      <label :for="item" class="secondary-text">{{ item }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

const model = defineModel<string | null>({required: true });

const props = defineProps({
  data: {
    type: Array<any>,
  },
});
</script>

<style scoped>
input {
  display: none;
}
label {
  background-color: #ffffff17;
  padding: 8px 10px;
  margin: 4px;
  border-radius: 8px;
}
input[checked] + label {
  background-color: #bc2bff;
  color: white;
}
</style>
