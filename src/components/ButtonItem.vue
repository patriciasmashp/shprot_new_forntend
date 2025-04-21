<template>
  <div class="button" @click="emit('click', $event)" :class="[props.type,  props.full  ? 'full' : '']">
    <text :class="props.size" class="" :style="style"><slot></slot></text>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    // default: "medium",
  },
  full: {
    type: Boolean,
    default: false
  },
  fontSize: {
    type: String,
    default: "12px",
  },
});
const style = ref({
  fontSize: props.fontSize,
});
const emit = defineEmits(["click"]);

</script>
<style scoped>
.button {
  /* Button Primary */
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: 0.2s;
  border-radius: 12px;
  cursor: pointer;
  user-select: none
}
.small {
  /* padding: 10px 20px; */
  width: 94px;
  font-size: 10px;
}
.medium {
  /* padding: 10px 30px; */
  width: 130px;
  font-size: 10px;
}
.large {
  padding: 10px 40px;
  font-size: 12px;
}
.full {
  width: 100%;
}
.primary {
  background: rgba(255, 255, 255, 0.06);
}
.dismiss{
  background-color: black;
  color: red;
}
.outline {
  background: black;
  border: 1px solid #BC2BFF;

}
.outline text{
  color: #BC2BFF !important;
}
.main {
  background: #bc2bff;
  box-shadow: 0px 0px 8px rgba(188, 43, 255, 0.4);
}
.primary:hover {
  transition: 0.2s;
  background: rgba(255, 255, 255, 0.216);
}
text {
  padding: 0 10px;
  color: white;
}
.dissmiss text{
  color: red !important;
}
</style>
