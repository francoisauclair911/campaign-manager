<template>
    <div id="app">
        <campaign-manager-form-v3 :is-local="isLocal"></campaign-manager-form-v3>
    </div>
</template>
<script>

  import CampaignManagerFormV3 from './views/CampaignFormV3'
  export default {

    name: 'App',
    components: {
      CampaignManagerFormV3

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
<style>
</style>
