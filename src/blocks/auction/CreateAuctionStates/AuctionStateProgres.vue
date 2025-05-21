<script setup lang="ts">
import IconOk from "@/components/icons/IconOk.vue";
import OkCircled from "@/components/icons/OkCircled.vue";
import RoundenBage from "@/components/RoundenBage.vue";
import { statesComponents, statuses } from "@/types/Auction";
import { LinkedList, Node } from "@/utils/structs/LinkedList";

const props = defineProps<{
  status: statuses;
}>();

enum stateStatus {
  complite = "complite",
  uncomplite = "uncomplite",
  inProcess = "inProcess",
}

type StateItem = {
  state: statuses;
  name: string;
  checked: stateStatus;
  index: number;
};

const statesList = new LinkedList<StateItem>();

statesList.insertInBegin({
  state: statuses.city,
  name: "Город",
  checked: stateStatus.uncomplite,
  index: 1,
});
statesList.insertAtEnd({
  state: statuses.bodyPart,
  name: "Место",
  checked: stateStatus.uncomplite,
  index: 2,
});
statesList.insertAtEnd({
  state: statuses.size,
  name: "Размер",
  checked: stateStatus.uncomplite,
  index: 3,
});
statesList.insertAtEnd({
  state: statuses.idea,
  name: "Идея",
  checked: stateStatus.uncomplite,
  index: 4,
});
const currentState = statesList.search(
  (node) => node.state === props.status
) as Node<StateItem>;

const initPrevStates = () => {
  let prevState = currentState.prev;

  while (prevState) {
    prevState.data.checked = stateStatus.complite;
    prevState = prevState.prev;
  }
};

if (currentState) {
  initPrevStates();
  currentState.data.checked = stateStatus.inProcess;
}
const statesArray = statesList.traverse();
</script>

<template>
  <div class="d-flex px-4 mt-4">
    <div
      class="col-3 d-flex flex-column align-items-center"
      v-for="state in statesArray"
    >
      <RoundenBage
        v-if="state.checked == stateStatus.complite"
        :color="'#FFFFFF14'"
        class="my-2"
        ><span class="text-purple"><IconOk /></span
      ></RoundenBage>

      <RoundenBage
        v-if="state.checked == stateStatus.inProcess"
        :color="'#BC2BFF'"
        class="my-2"
        ><span class="text-white">{{ state.index }}</span></RoundenBage
      >
      <RoundenBage
        v-if="state.checked == stateStatus.uncomplite"
        :color="'#FFFFFF14'"
        class="my-2"
        ><span class="text-secondary">{{ state.index }}</span></RoundenBage
      >
      <span class="text-white">{{ state.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.icon-ok-circled-d {
  font-size: 1.4em;
}
</style>
