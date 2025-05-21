<template>
  <div class="radio__wraper d-flex">
    <div class="radio__element" v-for="(button, index) in buttons" :key="index">
      <input
        type="radio"
        :checked="true ? model == button.label : false"
        v-model="model"
        :value="button.label"
        name="radioGroup"
        :id="index"
      />
      <transition>
        <label :for="index"
          ><component v-if="button.icon" :is="button.icon" class="ico" />
          <span class="pe-2">{{ button.label }}</span></label
        >
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref  } from "vue";

const props = defineProps({
  buttons: {
    type: Object,
    required: true,
  },
});

const buttons = computed(() => props.buttons);
const model = defineModel('label')

</script>
<style scoped>
.ico {
  padding-right: 2px;
  font-size: 20px;
  color: #ffffff99;
}
.radio__wraper {
  /* Frame 4573 */

  /* Auto layout */
  justify-content: space-between;
  padding-left: 3px;
  padding-right: 3px;
  align-items: center;
  gap: 6px;
  background-color: #0d0d0d4d;
  border-radius: 16px;
}
.radio__element:first-child {
  padding-left: 5px;
}
.radio__element:last-child {
  padding-right: 5px;
}
input[type="radio"] {
  display: none;
}
label {
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  display: flex;
  align-items: center;
  /* background-color: #BC2BFF; */
  border-radius: 17px;
}
input[type="radio"]:checked + label {
  background-color: #bc2bff;
  transition: all 0.5s;
}
</style>
