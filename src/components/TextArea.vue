<template>
    <textarea name="" v-model="model" id=""></textarea>
</template>
<script setup lang="ts">
const model = defineModel()


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
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 16px;
}
</style>