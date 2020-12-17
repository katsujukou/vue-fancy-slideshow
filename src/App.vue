<template>
  <div id="app">
    <presentation />
  </div>
</template>

<script>
import Presentation from "@/presentation/Presentation";

export default {
  name: 'App',
  components: {
    Presentation
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
