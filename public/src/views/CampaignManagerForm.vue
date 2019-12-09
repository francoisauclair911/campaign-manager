<template>
    <div class="adra-plugin">

        <div class="flex" v-show="!selectFieldsReady">
            <SpinnerLoader/>
        </div>

        <form class="adra-campaign-manager-form"
              @submit.prevent="submitForm"
              id="adra-campaign-manager-form"
              v-if="showForm"
              v-show="selectFieldsReady"
        >

            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-2 l-box">
                    <input v-model="form.first_name"
                           name="first_name"
                           type="text" :placeholder="attributes.first_name || placeholders.first_name"
                           required>
                    <div class="error" v-text="serverResponseErrors.first_name"></div>

                </div>
                <div class="pure-u-1 pure-u-md-1-2 l-box">
                    <input v-model="form.last_name"
                           name="last_name"
                           type="text"
                           :placeholder="attributes.last_name || placeholders.last_name">
                    <div class="error" v-text="serverResponseErrors.last_name"></div>
                </div>
            </div>
            <!--<div class="pure-g">-->
                <!--<div class="flex-item">-->
                    <!--<input v-model="form.first_name"-->
                           <!--name="first_name"-->
                           <!--type="text" :placeholder="attributes.first_name || placeholders.first_name"-->
                           <!--required>-->
                    <!--<div class="error" v-text="serverResponseErrors.first_name"></div>-->


                <!--</div>-->
                <!--<div class="flex-item">-->
                    <!--<input v-model="form.last_name"-->
                           <!--name="last_name"-->
                           <!--type="text"-->
                           <!--:placeholder="attributes.last_name || placeholders.last_name">-->
                    <!--<div class="error" v-text="serverResponseErrors.last_name"></div>-->

                <!--</div>-->
            <!--</div>-->
            <div class="pure-g">
                <div class="pure-u-1 l-box">
                    <input v-model="form.email"
                           name="email"
                           type="text"
                           :placeholder="attributes.email || placeholders.email">
                    <div class="error" v-text="serverResponseErrors.email"></div>


                </div>

            </div>

            <div class="pure-g" v-if="attributes.enable_phone">
                <div class="pure-u-1 pure-u-md-1-2 l-box">

                    <vue-tel-input v-if="countriesList"
                                   inputId="tel-input"
                                   v-model="form.phone"
                                   class="input-phone"
                                   @blur="formatPhone"
                                   :disabledFormatting="true"
                                   name="phone"
                                   :dynamicPlaceholder="true"
                                   mode="international"
                                   :preferredCountries="[countriesList[0]['alpha2Code']]"
                    ></vue-tel-input>
                    <div class="error" v-text="serverResponseErrors.phone"></div>

                </div>
                <div class="pure-u-1 pure-u-md-1-2 l-box">
                    <v-select v-model="form.communication_preference"
                              :options="communication_preference_options"
                              :reduce="option => option.value"
                              label="text"
                              :placeholder="attributes.communication_preference || placeholders.communication_preference">
                    </v-select>
                    <div class="error" v-text="serverResponseErrors.communication_preference"></div>

                </div>
            </div>
            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-2 l-box">
                    <v-select v-if="countriesList"
                              :options="countriesList"
                              label="name"
                              :reduce="country => country.id"
                              v-model="form.country_id"
                              :placeholder="attributes.country || placeholders.country">
                    </v-select>
                    <div class="error" v-text="serverResponseErrors.country"></div>

                </div>
                <div class="pure-u-1 pure-u-md-1-2 l-box">

                    <input v-model="form.zip_code"
                           name="zip_code"
                           type="text"
                           :placeholder="attributes.zip_code || placeholders.zip_code"
                           style="min-height: 54px; !important;">
                    <div class="error" v-text="serverResponseErrors.zip_code"></div>

                </div>
            </div>
            <div class="pure-g">

                <div class="pure-u-1 l-box">

                    <v-select v-if="interestsList"
                              v-model="form.interest_id"
                              :options="interestsList"
                              name="interest"
                              label="label"
                              :reduce="interest => parseInt(interest.code)"
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
            <div class="pure-g" style="text-align: left">
                <div class="pure-u-1 l-box">
                    <input type="checkbox"
                           style="vertical-align: text-bottom;"
                           v-model.numeric="form.age_consent"
                           :true-value="1"
                           :false-value="0">

                    <span :class="{ error: serverResponseErrors.age_consent }">
                         {{ attributes.age_consent || placeholders.age_consent}}
                    </span>
                </div>


            </div>
            <div class="pure-g" style="text-align: left">
                <div class="pure-u-1 l-box">

                    <input type="checkbox"
                           style="vertical-align: text-bottom;"
                           v-model.numeric="form.communication_consent"
                           :true-value="1"
                           :false-value="0">

                    <span>{{ attributes.communication_consent || placeholders.communication_consent}}</span>
                    <div class="error" v-text="serverResponseErrors.communication_consent"></div>

                </div>

            </div>
            <div class="pure-g" style="margin-top: 1em; justify-content: center">
                <div class="pure-u-1 pure-u-md-1-4 l-box" style="flex: 0 1 250px; text-align: center;">
                    <button class="adra-form-submit"
                            :disabled="submitButtonDisabled"
                            @click.prevent="submitForm">
                        {{ attributes.submit_button || placeholders.submit_button }}
                    </button>
                </div>

            </div>
            <div class="pure-g">
                <div class="error" v-text="serverResponseErrors.organization_token"></div>
                <div class="error" v-text="serverResponseErrors.campaign_token"></div>
                <div class="error" v-text="serverResponseErrors.event_token"></div>
            </div>
        </form>
        <div v-if="showThankYou && serverResponse">
            <h1>{{ attributes.thank_you_heading || placeholders.thank_you_heading}}</h1>
            <h3>{{ attributes.thank_you_subheading || placeholders.thank_you_subheading}}</h3>
            <p>{{attributes.landing_url || currentURL }}?token={{serverResponse.token || null}}</p>

        </div>
    </div>
</template>

<script>
  import vSelect from 'vue-select'
  import { VueTelInput } from 'vue-tel-input'
  import SpinnerLoader from './SpinnerLoader'

  export default {

    name: 'CampaignManagerForm',
    components: {
      SpinnerLoader,
      vSelect,
      VueTelInput
    },
    props: {
      isLocal: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
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
          country_id: null,
          zip_code: null,
          age_consent: 0,
          communication_consent: 0,
          communication_preference: null,
          interest_id: null,
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
    mounted () {
      this.setData()
      this.getCountriesList()
      this.getInterestsList()
    },

    methods: {
      setData () {
        this.apiURL = (this.isLocal) ?
          'https://campaign-manager.loc' :
          'https://campaigns.adra.cloud'
        this.form.campaign_token = this.getParams('campaign_token') || this.attributes.campaign_token || null
        this.form.event_token = this.getParams('event_token') || this.attributes.event_token || null
        this.form.organization_token = this.getParams('organization_token') || this.attributes.organization_token || null
        this.form.ref_token = this.getParams('token')
      },

      getCountriesList () {
        const cacheName = `countries-lists-${this.attributes.country_code || 'default'}`
        if (localStorage.getItem(cacheName)) {
          return this.countriesList = JSON.parse(localStorage.getItem(cacheName))
        }

        axios.get(`${this.apiURL}/api/assets/countries/${this.attributes.country_code || '' }`)
          .then((result) => {
            this.countriesList = result.data
            return localStorage.setItem(cacheName, JSON.stringify(result.data))

          })
      },

      getInterestsList () {
        const cacheName = `interests-lists-${this.attributes.language_code || 'default'}`
        if (localStorage.getItem(cacheName)) {
          return this.interestsList = JSON.parse(localStorage.getItem(cacheName))
        }

        axios.get(`${this.apiURL}/api/assets/interests/${ this.attributes.language_code || '' }`)
          .then((result) => {
            this.interestsList = lodash.map(result.data, (interest, key) => {
              return {label: interest, code: key}
            })
            return localStorage.setItem(cacheName, JSON.stringify(this.interestsList))
          })
      },

      submitForm () {
        this.submitButtonDisabled = true
        axios.post(`${this.apiURL}/api/subscriptions`, this.form).then(result => {
          this.serverResponse = result.data
          this.showForm = false
          this.showThankYou = true
        }).catch(error => {
          this.submitButtonDisabled = false
          this.serverResponseErrors = {}
          lodash.map(error.response.data.errors, function (item, key) {
            return this.serverResponseErrors[key] = item.join()
          }.bind(this))

        })
      },

      getParams (key) {
        const url = new URL(window.location.href)
        return url.searchParams.get(key)
      },

      formatPhone () {
        if (!this.form.phone) {
          return
        }
        this.form.phone = this.form.phone.replace(/-|\s/g, '')
      },
    },

    computed: {
      currentURL () {
        return `${location.protocol}//${location.host}${location.pathname}`
      },

      selectFieldsReady () {
        return !(lodash.isEmpty(this.countriesList) && lodash.isEmpty(this.interestsList))
      },

      pageHasReferrerToken () {
        return (!!(this.getParams('token')))
      }

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
    .adra-campaign-manager-form input[type="text"] {
        border-radius: 4px;
    }
    .pure-g > div {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .l-box {
        padding: 0.5em;
    }
    @media only screen and (max-width: 600px)  {
        #tel-input {
            width: 70%;
        }
    }
    div.adra-plugin form button.adra-form-submit {
        width: 100%;
        text-align: center;
        display: inline-block;
        border: none;
        background-color: #7FBC42;
        color: white;
        font-weight: 700;
        font-size: 1.3rem;
        padding: 10px 10px;
        box-shadow: #00000061 1px 1px 8px;
        text-transform: uppercase;
        text-decoration: none;
    }

    div.adra-plugin input[type='checkbox'] {
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 3px;
        border: 2px solid #555;
        margin-right: 0.5em;
    }

    div.adra-plugin input::placeholder {
        color: #8a8a8a !important;
    }

    div.adra-plugin div.input-phone,
    div.adra-plugin div.vs__dropdown-toggle {
        max-height: 54px !important;
        height: 54px;
        background: white !important;
    }

    div.adra-plugin div.input-phone input[type="tel"] {
        height: auto !important;
        border: none;
    }

    div.adra-plugin input.vs__search,
    div.adra-plugin input.vs__search:focus {
        cursor: pointer;
        border: 1px solid transparent !important;
        background: transparent;
        border-left: none !important;
        width: 0 !important;
        /*padding: 16px 7px !important;*/
        height: 1em !important;
        color: inherit !important;
        text-decoration: none;
        outline: none;
    }

    div.adra-plugin form#adra-campaign-manager input:not('vs__search') {
        border: 1px #B4B4B4 solid !important;
        height: 55px !important;
    }

    div.adra-plugin .error {
        color: #ff5c52;
        text-align: left;
    }

    /*@import url('https://unpkg.com/vue-select@3.0.0/dist/vue-select.css');*/
</style>
