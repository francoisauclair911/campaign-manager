<template>

    <div class="tw-mt-4 tw-w-full tw-flex tw-flex-wrap md:-tw-mx-5">
        <div class="tw-w-full">
            <h2 class="tw-mb-4 tw-text-center tw-font-thing tw-text-2xl">
                Translate all the required fields
            </h2>
        </div>

        <div class="tw-w-full md:tw-px-5">
            <form class="tw-flex tw-flex-wrap tw-bg-white tw-shadow-md tw-rounded sm:tw-px-0 md:tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5">
                <div class="tw-flex tw-flex-wrap sm:tw-w-full md:tw-w-1/2 tw-px-5 tw-mb-4" v-for="(input, key, index) in form" :key="index">
                    <label class="tw-full tw-adra-label tw-uppercase" :for="key">
                        {{ input.label || toSentence(key) + ' Field' }}
                    </label>
                    <div class="tw-w-full tw-mb-2" v-if="index === 11">
                        <a href="https://countrycode.org/"
                           target="_blank"
                        class="tw-underline">Link to find your country code (look for the 3 digit ISO )</a>
                    </div>
                    <div class="sm:tw-w-full tw-w-full tw-mb-2 ">
                       <span class="tw-font-bold"> English : </span><span class="tw-font-thin">{{ placeholders[key] || ''}}</span>

                    </div>
                    <div class="tw-w-full tw-mb-2">
                       <div class="tw-block tw-font-bold"> Your language :
                           <span class="tw-font-thin">{{ form[key]['value'] || ''}}</span> </div>

                    </div>

                    <input class=" tw-adra-input" :id="key" :name="key" v-model="form[key]['value']"
                           type="text"
                           :placeholder="input.placeholder || 'Enter your translation here'">
                </div>


            </form>
        </div>



        <div class="tw-w-full tw-px-5">

            <h1 class="tw-mb-4 tw-text-center tw-font-thing tw-text-2xl">
                Copy this code when you have entered all the required text translations
            </h1>
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
        placeholders: {
          first_name: 'First Name',
          last_name: 'Last Name',
          email: 'Email',
          communication_preference: 'Communication Preference',
          country: 'Choose a Country',
          zip_code: 'Zip Code',
          country_code: 'USA',
          age_consent: 'By signing this form I confirm I am over 13 years old.',
          communication_consent: 'I agree to receive communications from ADRA. ',
          interest: 'How would you describe your interest ?',
          submit_button: 'Submit',
          thank_you_heading: 'Thank you for your support!',
          thank_you_subheading: 'Make sure to save your advocate link below'
        },
        form: {
          first_name: {
            value: ''
          },
          last_name: {
            value: ''
          },
          email: {
            value: ''
          },
          country: {
            type: 'select',
            value: ''
          },
          zip_code: {
            value: ''
          },
          interest: {
            label: 'Interest Select Fields',
            type: 'select',
            value: ''
          },
          age_consent: {
            type: 'checkbox',
            value: ''
          },
          communication_consent: {
            type: 'checkbox',
            value: ''
          },
          // communication_preference: {
          //   type: 'select',
          //   value: ''
          // },


          submit_button: {
            label: 'Submit Button Text'
          },
          thank_you_heading: {
            label: 'Title for the "Thank You" banner after successfull registration',
          },
          thank_you_subheading: {
            label: 'Subtitle for the subheading after successfull registration',
          },
          country_code: {
            label: 'Your country code (3 letters), this allows your country to be on top of the select list',
          },
          landing_url: {
            label: 'The URL where the form (shortcode) is present, will be used to generate the new user referral link',
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
