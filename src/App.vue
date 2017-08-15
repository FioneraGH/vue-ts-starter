<style lang="less">
body {
  background-color: lightgreen;
  overflow-x: hidden;
}
</style>

<template>
  <div style="height:100%;">
    <router-view style="width: 100%; overflow-x: hidden;"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {

  }
})
</script>
