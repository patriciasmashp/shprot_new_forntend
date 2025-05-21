<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
    <div class="mt-3">
        <div class="d-flex">
            <div class="col-4 cancel-btn" @click="router.push({name: 'auction'})">Отмена</div>
            <h6 class="col-8 text-white title">Новый аукцион</h6>
        </div>
    </div>
</template>

<style scoped>
    .cancel-btn{
        color: #BC2BFF;
        font-size: 12px;
        font-weight: 600;
    }
    .title{
        font-weight: 700;
    }
</style>