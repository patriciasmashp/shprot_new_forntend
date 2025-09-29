<template>
    <div class="guide" :style="{ position: 'fixed', top: guidePosition.top + 'px', left: guidePosition.left + 'px' }" >
        <div class="guide-border"  ref="windowElement">
            <div class="text">

                Рассчитаем стоимость татуировки за 5 минут от всех мастеров твоего города
            </div>
        </div>
        <div class="guide-arrow"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue';


const guidePosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });

onMounted(() => {
    window.addEventListener('click', withinBoundariesClick);
    const selector = '#auctionMenuButtom';
    nextTick(() => {
        const target = document.querySelector(selector);
        if (target) {
            const rect = target.getBoundingClientRect();
            guidePosition.value = {
                top: rect.top + window.scrollY - 135 - 195, // учитываем скролл
                left: rect.left + window.scrollX + rect.width / 2 - 210 // учитываем скролл
            };
        }
    });
});

onUnmounted(() => {
    window.removeEventListener('click', withinBoundariesClick);
});

const emit = defineEmits<{
    close: []
}>();
const windowElement = ref<HTMLElement | null>(null);

function withinBoundariesClick(e: MouseEvent) {
    console.log('withinBoundariesClick');
    
  const div = <HTMLElement>windowElement.value;
  const withinBoundaries = e.composedPath().includes(div);

  if (!withinBoundaries) {
    emitClose();
  }
}

function emitClose() {
    console.log('emitClose');
    
    emit('close');
}
</script>


<style scoped>
.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    z-index: 1002;
    pointer-events: all;
}

.guide {
    /* position: fixed; */
    display: flex;
    flex-direction: column;
    align-items: end;
    pointer-events: all;
    /* bottom: 157px; */
}

.guide .text {
     padding: 30px;
    font-family: Inter;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 17px;
    leading-trim: NONE;
    line-height: 100%;
    letter-spacing: 0.5%;
    text-align: center;
    color: #FFFFFF;
}

.guide-border {
    background-image: url('@/assets/images/GuideBorderCircle.svg');
    background-repeat: no-repeat;
    width: 260px;
    height: 135px;
    /* pointer-events: none; */
   
    z-index: 1001;
    position: relative;
    /* Центрирование обеспечивается flex-контейнером guide-container */
}

.guide-arrow {
    background-image: url('@/assets/images/GuideArrow2.svg');
    width: 25px;
    height: 195px;
    padding-right: 71px;
    background-size: contain;
    background-repeat: no-repeat;
}

#content {
    padding: 15px;
}
</style>