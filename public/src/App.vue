<template>
  <div id="app">

    <campaign-manager-form :isLocal="isLocal"></campaign-manager-form>
  </div>
</template>
<script>
  import CampaignManagerForm from './views/CampaignManagerForm'
  export default {

    name: 'App',
    components: {
      CampaignManagerForm
    },
    mounted() {

    },
    computed: {
      isLocal() {
        const possibleLocalDomains = ['local', 'loc', 'test', 'dev'];
        const currentDomain = window.location.origin.split('.').pop();
        return possibleLocalDomains.includes(currentDomain);
      }
    }
  }
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
