<template>
    <div class="adra-plugin">

        <div class="pure-g" v-show="!isSelectFieldsReady">
            <SpinnerLoader/>
        </div>

        <form class="adra-campaign-manager-form"
              @submit.prevent="postForm"
              id="adra-campaign-manager-form"
              v-if="isSelectFieldsReady && showForm"
        >

            <div class="pure-g" style="text-align: start">
                <div class="pure-u-1 pure-u-md-1-2 l-box">
                    <input v-model="form.first_name"
                           name="first_name"
                           type="text" :placeholder="translatedPlaceholders.first_name || placeholders.first_name"
                           required>
                    <div class="error" v-text="serverResponseErrors.first_name"></div>

                </div>
                <div class="pure-u-1 pure-u-md-1-2 l-box">
                    <input v-model="form.last_name"
                           name="last_name"
                           type="text"
                           :placeholder="translatedPlaceholders.last_name || placeholders.last_name">
                    <div class="error" v-text="serverResponseErrors.last_name"></div>
                </div>

                <div class="pure-u-1 pure-u-md-1-2 l-box p">
                    <v-select v-if="countriesList"
                              :options="countriesList"
                              label="name"
                              :reduce="country => country.id"
                              v-model="form.country_id"
                              :placeholder="translatedPlaceholders.country || placeholders.country">
                    </v-select>
                    <div class="error" v-text="serverResponseErrors.country_id"></div>

                </div>
                <div class="pure-u-1 pure-u-md-1-2 l-box">
                    <input v-model="form.zip_code"
                           name="zip_code"
                           type="text"
                           :placeholder="translatedPlaceholders.zip_code || placeholders.zip_code"
                           style="">
                    <div class="error" v-text="serverResponseErrors.zip_code"></div>

                </div>

                <div class="pure-u-1 l-box"
                     :class="enablePhoneInput ? 'pure-u-md-1-2' : '' ">
                    <input v-model="form.email"
                           name="email"
                           type="text"
                           :placeholder="translatedPlaceholders.email || placeholders.email">
                    <div class="error" v-text="serverResponseErrors.email"></div>
                </div>

                <div class="pure-u-1 pure-u-md-1-2 l-box" v-if="enablePhoneInput">

                    <vue-tel-input v-if="countriesList"
                                   inputId="tel-input"
                                   v-model="form.phone"
                                   class="input-phone"
                                   @blur="formatEnteredPhoneNumber"
                                   :disabledFormatting="true"
                                   name="phone"
                                   :dynamicPlaceholder="true"
                                   mode="international"
                                   :preferredCountries="[countriesList[0]['alpha2Code']]"
                    ></vue-tel-input>
                    <div class="error" v-text="serverResponseErrors.phone"></div>

                </div>

                <div class="pure-u-1 pure-u-md-2-5 l-box" v-if="enablePhoneInput">
                    <v-select v-model="form.communication_preference"

                              :options="communicationPreferenceOptions"
                              :reduce="option => option.value"
                              label="text"
                              :placeholder="translatedPlaceholders.communication_preference || placeholders.communication_preference">
                    </v-select>
                    <div class="error" v-text="serverResponseErrors.communication_preference"></div>

                </div>


                <div class="pure-u-1 l-box"
                     :class="enablePhoneInput ? 'pure-u-md-3-5' : '' ">
                    <v-select v-if="interestsList"
                              v-model="form.interest_id"
                              :options="interestsList"
                              name="interest"
                              label="label"
                              :reduce="interest => parseInt(interest.code)"
                              :placeholder="translatedPlaceholders.interest || placeholders.interest"
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
                    <div class="error" v-text="serverResponseErrors.interest_id"></div>

                </div>
                <div class="pure-u-1 l-box" style="text-align: left">
                    <input type="checkbox"
                           style="vertical-align: text-bottom;"
                           v-model.numeric="form.age_consent"
                           :true-value="1"
                           :false-value="0">

                    <span :class="{ error: serverResponseErrors.age_consent }">
                         {{ translatedPlaceholders.age_consent || placeholders.age_consent}}
                    </span>
                </div>

                <div class="pure-u-1 l-box" style="text-align: left">

                    <input type="checkbox"
                           style="vertical-align: text-bottom;"
                           v-model.numeric="form.communication_consent"
                           :true-value="1"
                           :false-value="0">

                    <span>{{ translatedPlaceholders.communication_consent || placeholders.communication_consent}}</span>
                    <div class="error" v-text="serverResponseErrors.communication_consent"></div>

                </div>

            </div>
            <div class="pure-g" style="margin-top: 1em; justify-content: center">
                <div class="pure-u-1 pure-u-md-1-4 l-box" style="flex: 0 1 250px; text-align: center;">
                    <button class="adra-form-submit"
                            :disabled="submitButtonDisabled"
                            @click.prevent="postForm">
                        {{ translatedPlaceholders.submit_button || placeholders.submit_button }}
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
        <h2>{{ translatedPlaceholders.thank_you_heading || placeholders.thank_you_heading}}</h2>
        <h4>{{ translatedPlaceholders.thank_you_subheading || placeholders.thank_you_subheading}}</h4>
        <p><a :href="generatedReferralLink">{{ generatedReferralLink }}</a></p>
            <AdraSocialSharer :generated-referral-link="generatedReferralLink"/>
        </div>
    </div>
</template>

<script>
  import vSelect from 'vue-select'
  import { VueTelInput } from 'vue-tel-input'
  import SpinnerLoader from './SpinnerLoader'
  import AdraSocialSharer from './AdraSocialSharer'

  export default {

    name: 'CampaignManagerFormV2',
    components: {
      AdraSocialSharer,
      SpinnerLoader,
      vSelect,
      VueTelInput},
    props: {
      isLocal: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        states: {
          countriesList: 'empty',
          interestsList: 'empty',
          formRequest: 'idle'
        },
        apiURL: '',
        showForm: true,
        showThankYou: false,
        attributes: null,
        countriesList: null,
        interestsList: null,
        serverForm: null,
        translatedPlaceholders: null,
        placeholders: null,
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
      console.log('mounted!')
      this.setApiURL()
      this.fetchForm()

    },

    methods: {
      fetchForm () {
        const formToken = this.getParams('form_token') || this.attributes.form_token

        axios.get(this.apiURL + '/api/forms/' + formToken)
          .then((result) => {
            this.serverForm = result.data
            this.setData()
          }).catch((e) => console.log(e))
      },

      setApiURL () {
        this.apiURL = (this.isLocal) ?
          'https://adra-signup-api.loc' :
          'https://campaigns.adra.cloud'
      },
      setData () {

        this.translatedPlaceholders = this.serverForm.translated_fields
        this.form.campaign_token = this.getParams('campaign_token') || this.serverForm.tokens.campaign_token || null
        this.form.event_token = this.getParams('event_token') || this.serverForm.tokens.event_token || null
        this.form.organization_token = this.getParams('organization_token') || this.serverForm.tokens.organization_token || null
        this.form.ref_token = this.getParams('token')
        this.placeholders = this.serverForm.default_fields
        this.countriesList = this.serverForm.countriesList
        this.setState('countriesList', 'fetched')
        this.interestsList = lodash.map(this.serverForm.interestsList, (interest, key) => {
          return {label: interest, code: key}
        })
        this.setState('interestsList', 'fetched')

      },

      postForm () {
        const stateName = 'formRequest'
        const previousSubmitButtonText = this.attributes.submit_button || this.placeholders.submit_button
        this.attributes.submit_button = '. . .'
        this.submitButtonDisabled = true

        this.setState(stateName, 'requesting')

        axios.post(`${this.apiURL}/api/subscriptions`, this.form)
          .then(result => {
            this.serverResponse = result.data
            this.showForm = false
            this.showThankYou = true
            this.setState(stateName, 'success')

          }).catch(error => {
          this.attributes.submit_button = previousSubmitButtonText
          this.submitButtonDisabled = false
          if (error.response) {
            this.setState(stateName, 'failed-' + error.response.status)
            console.log(error.response.status)
            this.serverResponseErrors = {}
            lodash.map(error.response.data.errors, function (item, key) {
              return this.serverResponseErrors[key] = item.join()
            }.bind(this))
          }
        })
      },
      getParams (key) {
        return this.fullCurrentURL.searchParams.get(key)
      },

      hasParams (key) {
        return this.fullCurrentURL.searchParams.has(key)
      },

      formatEnteredPhoneNumber () {
        if (!this.form.phone) {
          return
        }
        this.form.phone = this.form.phone.replace(/-|\s/g, '')
      },

      setState (state, value) {
        return this.states[state] = value
      }
    },

    computed: {
      communicationPreferenceOptions () {
        return [
          {
            text: this.translatedPlaceholders.communication_preference_option_email ||
            this.placeholders.communication_preference_option_email,
            value: 'email'
          },
          {
            text: this.translatedPlaceholders.communication_preference_option_phone ||
            this.placeholders.communication_preference_option_phone,
            value: 'phone'
          }
        ]
      },
      enablePhoneInput () {
        return this.translatedPlaceholders.is_enabled_phone
      },
      strippedCurrentURL () {
        // stripped from query parameters
        return `${location.protocol}//${location.host}${location.pathname}`
      },

      fullCurrentURL () {
        return new URL(window.location.href)
      },

      isSelectFieldsReady () {
        return (this.states.countriesList === 'fetched' && this.states.interestsList === 'fetched')
      },

      isReferrerTokenParamPresent () {
        return (!!(this.getParams('token')))
      },

      generatedReferralLink () {
        let finalURLParameters = []
        if (this.serverResponse && this.serverResponse.token) {
          finalURLParameters.push({name: 'token', value: this.serverResponse.token})
        }
        if (this.hasParams('organization_token')) {
          finalURLParameters.push({name: 'organization_token', value: this.getParams('organization_token')})
        }
        if (this.hasParams('campaign_token')) {
          finalURLParameters.push({name: 'campaign_token', value: this.getParams('campaign_token')})
        }
        if (this.hasParams('event_token')) {
          finalURLParameters.push({name: 'event_token', value: this.getParams('event_token')})
        }
        const formattedParameters = lodash.chain(finalURLParameters).map(p => {
          return p.name + '=' + p.value
        }).join('&')
          .value()

        return (this.translatedPlaceholders.landing_url || this.strippedCurrentURL) + '?' + formattedParameters
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
    .adra-campaign-manager-form input[type="text"],
    div.adra-plugin div.input-phone input[type="tel"] {
        border-radius: 4px;
        width: 100%;
    }

    .adra-campaign-manager-form input[type="text"] {
        min-height: 42px;
    }

    div.adra-plugin div.input-phone {
        border-color: #e3e3e3;
    }

    .pure-g > div {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .l-box {
        padding: 0.5em;
    }

    @media only screen and (max-width: 600px) {
        #tel-input {
            /*width: 70%;*/
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
        outline: none;

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
        max-height: 42px !important;
        height: 42px;
        background: #fdfdfd !important;
    }

    div.adra-plugin div.input-phone input[type="tel"] {
        height: auto !important;
        border: none;
        width: 0;
        flex: auto;
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

</style>
