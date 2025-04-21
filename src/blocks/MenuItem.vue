<script setup lang="ts">
import IconHome from "@/components/icons/IconHome.vue";
import IconJudge from "@/components//icons/IconJudge.vue";
import IconUsersearch from "@/components/icons/IconUsersearch.vue";
</script>

<template>
  <div class="menu-wrapper">
    <div class="d-flex">
      <div class="menu-item col-4">
        <IconHome class="text-secondary ico"/>
        <div>
          <span>Лента</span>
        </div>
      </div>
      <div class="menu-item col-4">
        <!-- <IconUsersearch  class="text-secondary"/> -->
        <IconUsersearch  class="text-purple"/>
        <div>
          <span class="text-purple">Мастера</span>
        </div>
      </div>
      <div class="menu-item col-4">
        <IconJudge class="text-secondary"/>
        <div>
          <span>Аукцион</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ico{
  padding-bottom: 4px;
}
.menu-item {
  padding-top: 5px;
  text-align: center;
}
.menu-wrapper{
    background-color: black;
    color: white;
}
</style>
