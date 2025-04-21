<script setup lang="ts">
import SearchIcon from "./icons/SearchIcon.vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: Object,
  },
});

const emit = defineEmits(["focusin", "focusout", "input"]);
</script>

<template>
  <div class="input-wrapper">
    <component v-if="props.icon" :is="props.icon" class="ico" />
    <input
      :placeholder="props.placeholder"
      @input="(e) => emit('input', e)"
      @focusout="emit('focusout')"
      @focusin="emit('focusin')"
      type="text"
      name=""
      id=""
    />
  </div>
</template>

<style scoped>
.ico {
  color: rgba(255, 255, 255, 0.4);
}
.input-wrapper {
  display: flex;
  align-items: center;
  padding-left: 15px;
  border: 1px solid #bc2bff34;
  border-radius: 16px;
  background: #ffffff02;
}
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
  width: 100%;
  /* text-align: center; */
  color: white;
  background: #ffffff02;
  outline: none;
  background-blend-mode: overlay;
  border: none;
}
input:focus {
  border-color: #bc2bff !important;
}
</style>
