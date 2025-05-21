<template>
  <div class="radio-wrapper">
    <label :for="item.value" v-for="item in items">
      <input
        type="radio"
        v-model="model"
        :value="item.value"
        :id="item.value"
      />
      <div class="radio-check__container">
        <div class="radio-check"></div>
      </div>

      <span v-html="item.item"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
type Props = {
  items: Array<Item>;
};
type Item = {
  item: string | HTMLElement;
  value: string;
};
const { items } = defineProps<Props>();
const model = defineModel<string>();
</script>

<style scoped>
label {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #bc2bff;
  background-color: #d5a0ed1f;
  border-radius: 16px;
  margin: 8px 0px;
}
input[type="radio"] {
  display: none;
}
.radio-check__container {
  display: flex;
  width: 16px;
  align-items: center;
  justify-content: center;
  height: 16px;
  margin: 20px 16px;
  /* padding: 0.03em 0.03em; */
  background: #bc2bff;
  border-radius: 24px;
  transition: 500ms;
  -webkit-box-shadow: 0px 0px 10px -3px #bc2bff;
  -moz-box-shadow: 0px 0px 10px -3px #bc2bff;
  box-shadow: 0px 0px 10px -3px #bc2bff;
}
.radio-check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #0d0d0de3;
  transition: 100ms;
}
input[type="radio"]:checked + .radio-check__container .radio-check {
  border-radius: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #0d0d0de3;
  transform: translate(0.2px, 0px);
  transition: 100ms;
}

/* input[type="radio"]:checked{
    background: #010001;
} */
</style>
