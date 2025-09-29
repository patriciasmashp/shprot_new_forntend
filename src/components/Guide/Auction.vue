<template>
    <div class="guide">

        <div class="text">
            Мы бесплатно разошлём твою идею татуировки мастерам, получим от них цены и покажем портфолио готовых к
            работе мастеров
        </div>
        <div class="guide-border">
            <img :src="closeButton" class="close-button" @click="close" />
            <div id="content">
                <div class="d-flex user-row align-items-center justify-content-between" v-for="user in users"
                    :key="user.name">
                    <div class="avatar col-3">
                        <img :src="user.avatar" alt="" srcset="">
                    </div>
                    <div class="col-4 name">
                        {{ user.name }}
                    </div>
                    <div class="col-4 price">
                        {{ user.price }}
                    </div>
                </div>

            </div>
        </div>
        <div class="guide-arrow">

        </div>
    </div>
</template>

<script setup lang="ts">
import avatar1 from '@/assets/images/avatar.png';
import avatar2 from '@/assets/images/avatar2.png';
import avatar3 from '@/assets/images/avatar3.png';
import closeButton from '@/assets/images/guide_close.svg';
import useLocalStorage from '@/utils/composables/useLocalStograge';
import { computed, ref } from 'vue';
import type { userStorageDataType } from './types';
import { userStorageShown } from './data';




const users = [
    { name: 'Анастасия', price: '5 400 ₽', avatar: avatar1 },
    { name: 'Алексей', price: '3 200 ₽', avatar: avatar2 },
    { name: 'Игорь', price: '8 000 ₽', avatar: avatar3 },
];

const emit = defineEmits<{
    close: []
}>();

function close() {
   
    emit('close');
}

const userLocalStorageData = useLocalStorage<userStorageDataType>('guide-shown', userStorageShown);

const guideVisible = computed(() => {
    if (userLocalStorageData.value === null) {
        userLocalStorageData.value = userStorageShown;
    }
    return userLocalStorageData.value.Auction;
});

function closeGuide() {
    userLocalStorageData.value = { ...userLocalStorageData.value, Auction: true };
}

defineExpose({
    guideVisible,
    closeGuide
})
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
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
    bottom: 157px;
}

.guide .text {
    font-family: Inter;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 17px;
    color: #FFFFFF;
    line-height: 100%;
    letter-spacing: 0.5%;
    text-align: center;
    width: 225px;
    padding-bottom: 25px;
}

.guide-border {
    background-image: url('@/assets/images/GuideBorder.svg');
    background-repeat: no-repeat;
    width: 205px;
    height: 160px;
    /* pointer-events: none; */
    z-index: 1001;
    position: relative;
    /* Центрирование обеспечивается flex-контейнером guide-container */
}

.guide-arrow {
    background-image: url('@/assets/images/GuideArrow.svg');
    width: 31px;
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
}

#content {
    padding: 15px;
}

.user-row {
    padding: 1px 0px;
}

.user-row img {
    height: 40px;
    width: auto;
}

.user-row .price,
.user-row .name {
    font-family: Inter;
    font-weight: 700;
    font-style: Bold;
    font-size: 9px;
    line-height: 15px;
    letter-spacing: 3%;
    vertical-align: bottom;
}

.user-row .name {
    color: #FFFFFF;
}

.user-row .price {

    color: #44F641;

}
</style>