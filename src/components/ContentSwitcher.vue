<template>
  <ul class="nav nav-pills justify-content-around">
    <li
      class="nav-item"
      :class="`col-${colToRow}`"
      v-for="tab in tabs"
      :key="tab"
    >
      <a
        class="nav-link text-center"
        :class="tab == model ? 'active' : ''"
        @click="changeTab(tab)"
        aria-current="page"
        >{{ tab }}</a
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Props = {
  tabs: Array<string>;
};

const model = defineModel({ type: String, required: true });
const props = defineProps<Props>();
const emits = defineEmits<{ change: [tab: String] }>();

const changeTab = (tab: string) => {
  model.value = tab;
  emits("change", tab);
};

const colToRow = computed(() => {
  return Math.ceil(12 / props.tabs.length);
});
</script>

<style scoped>
* {
  font-size: 12px;
  color: #ffffff99 !important;
}
.nav {
  background-color: #0d0d0d4d;
  border-radius: 16px;
}
.nav-item {
    height: 39px;
}

.nav-item .active {
  background-color: #0c445b !important;
  color: white !important;
}

.nav-link {
  margin: 4px;
    border-radius: 13px !important;
}
</style>
