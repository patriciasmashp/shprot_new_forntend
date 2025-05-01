<script setup lang="ts">
import ArrowDown from "./icons/ArrowDown.vue";
import ArrowLeft from "./icons/ArrowLeft.vue";

const model = defineModel();
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="select-wrapper">
    <select v-model="model"
      class="form-select form-select-sm select__main focus-ring focus-ring-dark"
    >
    <option :value="option" v-for="option in props.data">{{ option }}</option>
    </select>
  </div>
  <!-- <div class="select-wrapper">
    <select v-model="model" name="select" id="select" class="select__main">
      <option :value="option" v-for="option in props.data">{{ option }}</option>
    </select>
    <label for="select"><ArrowDown class="arrow ps-2" /></label>
  </div> -->
</template>
<style scoped>
.arrow {
  color: #ffffff66;
  transform: rotate(90deg);
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
}
select:focus {
  outline: none;
  box-shadow: none;
}
select::-ms-expand {
  display: none;
}
.select__main {
  border: 0;
  background-color: rgba(66, 66, 66, 0);
  /* background: url('assets/') no-repeat right; */
  color: #ffffff66;
}
option {
  background-color: rgb(0 0 0 / 96%);
  color: #ffffff87;
}
</style>
