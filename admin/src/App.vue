<template>

    <div class="tw-w-full tw-flex tw-flex-wrap -tw-mx-5">
        <div class="tw-w-1/2 tw-px-5">
            <form class="tw-flex tw-flex-wrap tw-bg-white tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5">
                <div class="tw-w-1/2 tw-px-5 tw-mb-4" v-for="(input, key, index) in form" :key="index">
                    <label class="tw-adra-label" for="key">
                        {{ toSentence(key) }}

                    </label>
                    <input class="tw-adra-input" id="key" v-model="form[key]['value']"
                           type="text"
                           :placeholder="input.placeholder || 'Enter your translation here'">
                </div>


            </form>
        </div>

        <div class="tw-w-1/2 tw-px-5">
            <form class="tw-flex tw-flex-wrap tw-bg-white tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5">
                <div class="tw-w-1/2">
                    <input type="text" >
                    <input type="text">
                </div>
            </form>
        </div>

        <div class="tw-w-full tw-px-5">
            <div class="tw-flex tw-flex-wrap tw-bg-white tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5">
                <code>[campaign-manager {{shortcodeParameters}}]</code>
            </div>
        </div>

    </div>
</template>
<script>
  export default {
    name: 'AdminPanel',
    data () {
      return {
        form: {
          first_name: {
            label: 'First Name',
            value: ''
          },
          last_name: {
            label: 'first',
            value: ''
          },
          email: {
            label: 'first',
            value: ''
          },
          country: {
            label: 'first',
            type: 'select',
            value: ''
          },
          zip_code: {
            label: 'first',
            value: ''
          },
          interest: {
            label: 'Placeholder text for "Interest" Select Fields',
            type: 'select',
            value: ''
          },
          age_consent: {
            label: 'first',
            type: 'checkbox',
            value: ''
          },
          communication_consent: {
            label: 'first',
            type: 'checkbox',
            value: ''
          },




          communication_preference: {
            label: 'First',
            type: 'select',
            value: ''
          },

          campaign_token: {
            label: 'Campaign Token',
            placeholder: 'Enter your campaign token here',
            type: 'hidden',
            value: ''
          },
          organization_token: {
            label: 'Organization Token',
            placeholder: 'Enter your organization token here',
            type: 'hidden',
            value: ''
          },
          event_token: {
            label: 'Event Token (if any)',
            placeholder: 'Enter your event token here',
            type: 'hidden',
            value: ''
          },
        },
      }
    },
    methods: {
      toSentence (string) {
        return _.startCase(string)
      }
    },

    computed: {

      shortcodeParameters () {
        const param = _.map(this.form, (item, key) => {
          return key + '="' + item.value + '"'
        })
        return param.join(' ')
      }
    },

  }
</script>

<style lang="scss">

</style>
