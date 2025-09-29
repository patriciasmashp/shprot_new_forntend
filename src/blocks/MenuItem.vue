<script setup lang="ts">
import IconHome from "@/components/icons/IconHome.vue";
import IconJudge from "@/components//icons/IconJudge.vue";
import IconUsersearch from "@/components/icons/IconUsersearch.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  
  <div class="menu-wrapper">
    <div class="d-flex">
      <div class="menu-item col-4" @click="router.push({ name: 'feed' })">
        <IconHome
          class="ico"
          :class="[
            router.currentRoute.value.name ==
            router.resolve({ name: 'feed' }).name
              ? 'text-purple'
              : 'text-secondary',
          ]"
        />
        <div>
          <span
            :class="[
              router.currentRoute.value.name ==
              router.resolve({ name: 'feed' }).name
                ? 'text-purple'
                : 'text-secondary',
            ]"
            >Лента</span
          >
        </div>
      </div>
      <div class="menu-item col-4" @click="router.push({ name: 'home' })">
        <!-- <IconUsersearch  class="text-secondary"/> -->
        <IconUsersearch
          :class="[
            router.currentRoute.value.name ==
            router.resolve({ name: 'home' }).name
              ? 'text-purple'
              : 'text-secondary',
          ]"
        />
        <div>
          <span
            :class="[
              router.currentRoute.value.name ==
              router.resolve({ name: 'home' }).name
                ? 'text-purple'
                : 'text-secondary',
            ]"
            >Мастера</span
          >
        </div>
      </div>
      <div class="menu-item col-4" id="auctionMenuButtom" @click="router.push({ name: 'auction' })">
        <IconJudge
          :class="[
            router.currentRoute.value.name ==
            router.resolve({ name: 'auction' }).name
              ? 'text-purple'
              : 'text-secondary',
          ]"
        />
        <div>
          <span
            :class="[
              router.currentRoute.value.name ==
              router.resolve({ name: 'auction' }).name
                ? 'text-purple'
                : 'text-secondary',
            ]"
            >Тату</span
          >
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.ico {
  padding-bottom: 4px;
}
.menu-item {
  padding-top: 5px;
  padding-bottom: 10px;
  text-align: center;
}
.menu-wrapper {
  background-color: black;
  color: white;
}
</style>
