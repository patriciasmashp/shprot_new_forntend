<script setup lang="ts">
import { onMounted } from "vue";
import SearchIcon from "./icons/SearchIcon.vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: Object,
  },
  postfix: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  centred: {
    type: Boolean,
    default: false,
  },
});

function addFormatter(
  input: HTMLInputElement,
  formatFn: CallableFunction,
  callback: CallableFunction
) {
  let oldValue = input.value;

  const handleInput = (event: Event) => {
    const result = formatFn(input.value, oldValue, event);
    if (typeof result === "string") {
      input.value = result;
    }

    oldValue = input.value;

    if (callback !== undefined) {
      callback(input, result);
    }
  };

  input.addEventListener("input", handleInput);
}

function createRegexFormatter(regex: RegExp, defaultValue: string) {
  return (newValue: string, oldValue: string) =>
    regex.test(newValue)
      ? newValue
      : oldValue
      ? oldValue
      : newValue + defaultValue;
}

onMounted(() => {
  if (props.postfix) {
    const inputElement = document.querySelector(
      'input[data-input-name="input-component"]'
    ) as HTMLInputElement;
    const regex = new RegExp(`\\${props.postfix}$`);
    console.log(regex);

    addFormatter(
      inputElement,
      createRegexFormatter(regex, props.postfix),
      (input: HTMLInputElement) => {
        // input.focus();
        const pos = Math.max(0, input.value.length - props.postfix.length);
        input.setSelectionRange(pos, pos);
      }
    );
  }
});

function getValue() {
  const inputElement = document.querySelector(
    'input[data-input-name="input-component"]'
  ) as HTMLInputElement;
  if (props.postfix) {
    const regex = new RegExp(`\\${props.postfix}$`);
    const value = inputElement.value.replace(regex, "");

    return value;
  }
  return inputElement.value;
}

const onInput = (e: Event) => {
  emit("input", getValue());
};
const emit = defineEmits(["focusin", "focusout", "input"]);
</script>

<template>
  <div class="input-wrapper">
    <component v-if="props.icon" :is="props.icon" class="ico" />
    <input
      :placeholder="props.placeholder"
      @input="onInput"
      @focusout="emit('focusout')"
      @focusin="emit('focusin')"
      :type="props.type"
      :style="{ textAlign: props.centred ? 'center' : 'left' }"
      data-input-name="input-component"
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
