<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapse-${id}`"
        aria-expanded="false"
      >
        <slot name="title" class="item-title"></slot>
      </button>
    </h2>
    <div
      :id="`collapse-${id}`"
      class="accordion-collapse collapse"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateRandomString } from "@/utils/functions";

const id = generateRandomString(4);
</script>

<style scoped>
.accordion-button {
  background-color: #0d0d0d4d !important;
  color: #ffffff !important;
  padding: 11px 10px;
}

.accordion-item {
  background-color: #0d0d0d4d !important;
  border-radius: 16px !important;
  border: none !important;
  margin: 4px 0;
}
.accordion-button:not(.collapsed) {
  box-shadow: inset 0 calc(-2 * var(--bs-accordion-border-width)) 0 #ffffff10;
}
.accordion-body {
  margin-bottom: 24px;
}
</style>
