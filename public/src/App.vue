<template>
    <div id="app">

        <campaign-manager-form v-if="!isFormTokenPresent" :isLocal="isLocal"></campaign-manager-form>
        <campaign-manager-form-v2 v-if="isFormTokenPresent" :isLocal="isLocal"></campaign-manager-form-v2>
    </div>
</template>
<script>
  import CampaignManagerForm from './views/CampaignManagerForm'
  import CampaignManagerFormV2 from './views/CampaignManagerFormV2'

  export default {

    name: 'App',
    components: {
      CampaignManagerForm,
      CampaignManagerFormV2

    },
    mounted () {
      const att = this.$root.$data.shortcodeAttributes
    },
    computed: {
      isFormTokenPresent() {
        return this.$root.$data.shortcodeAttributes.form_token !== undefined
      },
      isLocal () {
        const possibleLocalDomains = ['local', 'loc', 'test', 'dev']
        const currentDomain = window.location.origin.split('.').pop()
        return possibleLocalDomains.includes(currentDomain)
      }
    }
  }
</script>
<style lang="scss">
    @import url('https://unpkg.com/vue-select@3.0.0/dist/vue-select.css');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/pure/1.0.1/base-min.css');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/pure/1.0.1/grids-responsive-min.css');

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
