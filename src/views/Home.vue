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
      message: ''
    }
  },
  mounted () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      let test = ''
      this.message = 'hello vue，webpack.HotModuleReplaceMentPlugin is OK'
    }
  }
}
</script>
<style>
#app {
  background-color: red
}
</style>
