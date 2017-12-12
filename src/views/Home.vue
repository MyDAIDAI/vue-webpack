<template>
  <div id="app">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      message: '',
    }
  },
  mounted () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      this.message = 'hello vue'
    }
  }
}
</script>
<style>
#app {
  background-color: red
}
</style>
