<template>
  <div class="bage-container">
    <span class="span" :style="spanStyle"></span>
    <div style="position: relative">
      <span class="text"><slot></slot></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ color: string }>();

const spanStyle = {
  backgroundColor: props.color,
};
</script>

<style scoped>
.bage-container {
  display: flex;
  position: relative;
  width: 25px;
  text-align: center;
  justify-content: center;
  align-items: baseline;
}

.span {
  display: inline-block;
  background: #ccc;
  color: #000;
  text-align: center;
  border-radius: 50%;
  padding: 50% 0px;
  width: 100%;
  left: 0;
  position: absolute;
  transform: translateY(0);
}

.text {
  /* position: relative; */
  top: 0;
  padding: 0em 0.55em;
}
</style>
