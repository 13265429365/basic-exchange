<template>
  <div class="">
    <div v-for="item in 100" :key="item">{{item}}</div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'homeIndex'
  }
</script>

<style>
</style>
