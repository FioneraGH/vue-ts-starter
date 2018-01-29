<style>

</style>

<template>
  <div>
    <button @click="test" >Home</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
  methods: {
    test() {
      window.alert('hello')
    }
  },
  mounted() {
    console.log('mounted')
  }
})
</script>
