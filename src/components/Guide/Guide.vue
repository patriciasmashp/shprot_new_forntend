<template>
    <div class="guide-container" v-if="guideVisible">
        <component
            :is="guideComponent"
            ref="guideComponentRef"
            @close="onClose"
            :arrowTargetSelector="arrowTargetSelector"
        />
    </div>
</template>

<script setup lang="ts">
// import borderImage from '@/assets/images/GuideBorder.svg';

import useLocalStorage from '@/utils/composables/useLocalStograge';

import { computed, ref } from 'vue';
import Auction from './Auction.vue';
import { useRoute } from 'vue-router';
import { guideTypes, type userStorageDataType } from './types';
import { userStorageShown } from './data';
import NewAuction from './NewAuction.vue';

const route = useRoute();
const guideComponentRef = ref();

const userLocalStorageData = useLocalStorage<userStorageDataType>('guide-shown', userStorageShown);


const componentMap = {
    [guideTypes.Auction]: Auction,
    [guideTypes.NewAuction]: NewAuction,
}

const guideComponent = computed(() => componentMap[route.meta.guide as keyof typeof componentMap] || componentMap[guideTypes.Auction]);

const { arrowTargetSelector = '' } = defineProps<{ arrowTargetSelector?: string }>();

function onClose() {
    userLocalStorageData.value[route.meta.guide as keyof typeof userLocalStorageData.value] = true;
}

const guideVisible = computed(() => {
    if(!route.meta.guide) return false;
    return !userLocalStorageData.value[route.meta.guide as keyof typeof userLocalStorageData.value];
})
</script>


<style scoped>
.guide-container {
    flex-direction: column;
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(30px);

    pointer-events: none;
    z-index: 10;
}
</style>