<template>
    <div class="adra-plugin">

        <div class="flex" v-show="!selectFieldsReady">
            <div class="flex-item">
                <svg class="loader" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.1"/>
  </circle>
  <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.2"/>
  </circle>
  <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.3"/>
  </circle>
</svg>
            </div>
        </div>

        <form class="adra-campaign-manager-form"
              @submit.prevent="submitForm"
              id="adra-campaign-manager-form"
              v-if="showForm"
              v-show="selectFieldsReady"
        >

            <div class="flex">
                <div class="flex-item">
                        <input v-model="form.first_name"
                               name="first_name"
                               type="text" :placeholder="attributes.first_name || placeholders.first_name"
                        required>
                        <div class="error" v-text="serverResponseErrors.first_name"></div>


                </div>
                <div class="flex-item">
                        <input v-model="form.last_name"
                               name="last_name"
                               type="text"
                               :placeholder="attributes.last_name || placeholders.last_name">
                    <div class="error" v-text="serverResponseErrors.last_name"></div>

                </div>
            </div>
            <div class="flex">
                <div class="flex-item">
                        <input v-model="form.email"
                               name="email"
                               type="text"
                               :placeholder="attributes.email || placeholders.email">
                    <div class="error" v-text="serverResponseErrors.email"></div>


                </div>

            </div>

            <div class="flex" v-if="attributes.enable_phone">
                <div class="flex-item w-half">

                    <vue-tel-input v-model="form.phone"
                                   class="input-phone"
                                    name="phone"
                                   :dynamicPlaceholder="true"
                                   mode="international"
                    ></vue-tel-input>
                    <div class="error" v-text="serverResponseErrors.phone"></div>

                </div>
                <div class="flex-item w-half">
                        <v-select v-model="form.communication_preference"
                                  :options="communication_preference_options"
                                  :reduce="option => option.value"
                                  label="text"
                                  :placeholder="attributes.communication_preference || placeholders.communication_preference">
                        </v-select>
                    <div class="error" v-text="serverResponseErrors.communication_preference"></div>

                </div>
            </div>
            <div class="flex">
                <div class="flex-item w-half">
                    <v-select v-if="countriesList" v-model="form.country"
                              :options="countriesList"
                              label="country"
                              :placeholder="attributes.country || placeholders.country">
                    </v-select>
                    <div class="error" v-text="serverResponseErrors.country"></div>

                </div>
                <div class="flex-item w-half">

                    <input v-model="form.zip_code"
                           name="zip_code"
                           type="text"
                           :placeholder="attributes.zip_code || placeholders.zip_code"
                           style="min-height: 54px; !important;">
                    <div class="error" v-text="serverResponseErrors.zip_code"></div>

                </div>
            </div>
            <div class="flex">

                <div class="flex-item ">

                    <v-select v-if="interestsList"
                              v-model="form.interest"
                              :options="interestsList"
                              name="interest"
                              label="interest"
                              :placeholder="attributes.interest || placeholders.interest"
                    >
                        <template #search="{attributes, events}">
                            <input
                                    class="vs__search"
                                    :required="!form.interest"
                                    v-bind="attributes"
                                    v-on="events"
                            />
                        </template>
                    </v-select>
                    <div class="error" v-text="serverResponseErrors.interest"></div>

                </div>
            </div>
            <div class="flex age_consent">
                <div class="flex-item " style="max-width: 1.5em; margin: 0 1em 0 0;">

                    <input type="checkbox"
                           v-model.numeric="form.age_consent"
                           :true-value="1"
                           :false-value="0">
                </div>
                <div class="flex-item flex-3-quarter" style="align-self: center; height: 50px; text-align: left;">
                    <div :class="{ error: serverResponseErrors.age_consent }">
                    {{ attributes.age_consent || placeholders.age_consent}}
                    </div>

                </div>

            </div>
            <div class="flex">
                <div class="flex-item " style="max-width: 1.5em;margin: 0 1em 0 0;">

                    <input type="checkbox"
                           v-model.numeric="form.communication_consent"
                           :true-value="1"
                           :false-value="0">
                </div>
                <div class="flex-item flex-3-quarter" style="align-self: center; height: 50px; text-align: left;">
                        {{ attributes.communication_consent || placeholders.communication_consent}}
                    <div class="error" v-text="serverResponseErrors.communication_consent"></div>

                </div>
            </div>
            <div class="flex">
                <div class="flex-item" style="text-align: center;">
                    <button class="adra-form-submit" :disabled="submitButtonDisabled"
                            @click.prevent="submitForm">
                        {{ attributes.submit_button || placeholders.submit_button }}
                    </button>
                </div>
            </div>
        </form>
        <div v-if="showThankYou && serverResponse">
            <h1>{{ attributes.thank_you_heading || placeholders.thank_you_heading}}</h1>
            <h3>{{ attributes.thank_you_subheading || placeholders.thank_you_subheading}}</h3>
            <h3>{{attributes.landing_url || currentURL }}?token={{serverResponse.token || null}}</h3>

        </div>
    </div>
</template>

<script>
  import vSelect from 'vue-select'
  import { VueTelInput } from 'vue-tel-input'


  export default {

    name: 'Home',
    components: {
      vSelect,
      VueTelInput
    },
    data () {
      return {
        // apiURL: '//beta.adra.org',
        apiURL: '',
        showForm: true,
        showThankYou: false,
        attributes: null,
        countriesList: null,
        interestsList: null,
        communication_preference_options: [
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Phone',
            value: 'phone'
          }
        ],
        placeholders: {
          first_name: 'First Name',
          last_name: 'Last Name',
          email: 'Email',
          communication_preference: 'Communication Preference',
          country: 'Choose a Country',
          zip_code: 'Zip Code',
          age_consent: 'By signing this form I confirm I am over 13 years old.',
          communication_consent: 'I agree to receive communications from ADRA. ',
          interest: 'How would you describe your interest ?',
          country_code: null,
          submit_button: 'Submit',
          thank_you_heading: 'Thank you for your support!',
          thank_you_subheading: 'Make sure to save your advocate link below'
        },
        form: {
          first_name: null,
          last_name: null,
          email: null,
          phone: null,
          country: null,
          zip_code: null,
          age_consent: 0,
          communication_consent: 0,
          communication_preference: null,
          interest: null,
          ref_token: null,
          campaign_token: null,
          organization_token: null,
          event_token: null,
        },
        serverResponse: null,
        serverResponseErrors: {},
        submitButtonDisabled: false,
      }

    },
    created () {
      this.attributes = this.$root.$data.shortcodeAttributes
    },
    methods: {
      submitForm () {
        this.submitButtonDisabled = true

        axios.post(`${this.apiURL}/api/subscriptions`, this.form).then(result => {
          this.serverResponse = result.data
          this.showForm = false
          this.showThankYou = true

        }).catch(error => {
          this.submitButtonDisabled = false
          this.serverResponseErrors = {}
          _.map(error.response.data.errors, function(item, key) {
            return this.serverResponseErrors[key] = item.join()
          }.bind(this))

        })
      },

      getParams (key) {
        const url = new URL(window.location.href)
        return url.searchParams.get(key)
      }
    },
    computed: {
      currentURL () {
        return `${location.protocol}//${location.host}${location.pathname}`
      },
      selectFieldsReady () {
        return !(_.isEmpty(this.countriesList) && _.isEmpty(this.interestsList))
      },
      pageHasReferrerToken () {
        return (!!(this.getParams('token')))
      }
    },
    mounted () {
      this.apiURL = (process.env.NODE_ENV === 'production') ?
        '//campaigns.adra.org' :
        '//adra-signup-api.test'

      axios.get(`${this.apiURL}/api/assets/countries?country_code=${this.attributes.country_code}`).then((result) => {
        this.countriesList = _.map(result.data, function (item) {
          return item.name
        })
      })

      axios.get(`${this.apiURL}/api/assets/interests`).then((result) => {
        this.interestsList = result.data
      })

      this.form.campaign_token = this.attributes.campaign_token || null
      this.form.event_token = this.attributes.event_token || null
      this.form.organization_token = this.attributes.organization_token || null;

      (this.pageHasReferrerToken) ? this.form.ref_token = this.getParams('token') : ''

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">

    div.adra-plugin form button.adra-form-submit {
        min-width: 200px;
    }

    div.adra-plugin form input {
        width: 100%;
        height: 54px;
        color: #000;
        outline: 0 !important;

    }

    div.adra-plugin input[type='checkbox'] {
        width:16px;
        height:16px;
        background:white;
        border-radius:3px;
        border:2px solid #555;
    }

    div.adra-plugin input::placeholder {
        color: #8a8a8a !important;
    }

    div.adra-plugin div.input-phone,
    div.adra-plugin div.vs__dropdown-toggle {
        max-height: 54px !important;
        height: 54px;
    }

    div.adra-plugin div.input-phone input[type="tel"] {
        height: auto !important;
        border: none;
    }
    div.adra-plugin input.vs__search,
    div.adra-plugin input.vs__search:focus{
        border: 1px solid transparent !important;
        border-left: none !important;
        width: 0 !important;
        padding: 0 7px !important;
        height: 44px !important;
        color: inherit !important;
    }

    div.adra-plugin div.flex {
        display: flex;
        flex-flow: row wrap;

        justify-content: start;
        align-items: start;
    }

    div.adra-plugin div.flex-item {
        flex: 1 0 auto;
        padding: 0.5em;
    }

    div.adra-plugin div.w-half {
        min-width: 50%;
    }

    div.adra-plugin div.flex-fullwidth {
        flex-basis: 100%
    }

    div.adra-plugin div.flex-quarter {
        /*flex-basis: 25%;*/
        flex-basis: auto;
    }

    div.adra-plugin div.flex-3-quarter {
        flex-basis: auto;

    }


    div.adra-plugin form#adra-campaign-manager input:not('vs__search') {
        border: 1px #B4B4B4 solid !important;
        height: 55px !important;
    }

    div.adra-plugin div.error {
        color: #ff5c52;
        text-align: left;
    }



    div.adra-plugin svg.loader {
        width: 100px;
        height: 100px;
        margin: 20px;
        display: inline-block;
    }
@import url('https://unpkg.com/vue-select@3.0.0/dist/vue-select.css');
</style>
