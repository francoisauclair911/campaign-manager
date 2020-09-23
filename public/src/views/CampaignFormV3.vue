<template>
    <div class="w-full px-4 pb-4">
        <form @submit.prevent="postForm">
            <transition
                    enter-active-class="transition-all transition duration-300 ease-in"
                    leave-active-class="transition-all transition duration-300 ease-in"
                    enter-class="opacity-0 scale-70"
                    enter-to-class="scale-100 opacity-100"
                    leave-class="scale-100 opacity-100"
                    leave-to-class="opacity-0 scale-70"
            >
                <section v-if="isSelectFieldsReady && showForm">
                    <div class="flex flex-wrap -mx-3 ">
                        <div class="w-full h-20 px-2 sm:w-1/2">
                            <input v-model="form.first_name"
                                   class="input "
                                   :class="[serverResponseErrors.first_name !== undefined ? 'error-input' : '']"
                                   name="first_name"
                                   type="text"
                                   :placeholder="translatedPlaceholders.first_name || placeholders.first_name"
                                   required>
                            <div class="error" v-text="serverResponseErrors.first_name"></div>

                        </div>
                        <div class="w-full h-20 px-2 sm:w-1/2">
                            <input v-model="form.last_name"
                                   class="input"
                                   :class="[serverResponseErrors.last_name !== undefined ? 'error-input' : '']"
                                   name="last_name"
                                   type="text"
                                   :placeholder="translatedPlaceholders.last_name || placeholders.last_name">
                            <div class="error" v-text="serverResponseErrors.last_name"></div>
                        </div>

                        <div class="w-full h-20 px-2 sm:w-1/2">
                            <v-select v-if="countriesList"
                                      class="custom-select"
                                      :class="[serverResponseErrors.country_id !== undefined ? 'error-select' : '']"
                                      :options="countriesList"
                                      label="name"
                                      :reduce="country => country.id"
                                      v-model="form.country_id"
                                      :placeholder="translatedPlaceholders.country || placeholders.country">
                            </v-select>
                            <div class="error" v-text="serverResponseErrors.country_id"></div>

                        </div>
                        <div class="w-full h-20 px-2 sm:w-1/2">
                            <input v-model="form.zip_code"
                                   class="input"
                                   :class="[serverResponseErrors.zip_code !== undefined ? 'error-input' : '']"
                                   name="zip_code"
                                   type="text"
                                   :placeholder="translatedPlaceholders.zip_code || placeholders.zip_code"
                                   style="">
                            <div class="error" v-text="serverResponseErrors.zip_code"></div>

                        </div>

                        <div class="h-20 px-2"
                             :class="enablePhoneInput ? 'flex-initial sm:flex-1 w-full sm:w-auto' : 'w-full' ">
                            <input v-model="form.email"
                                   :class="[serverResponseErrors.email !== undefined ? 'error-input' : '']"
                                   class="input"
                                   name="email"
                                   type="text"
                                   :placeholder="translatedPlaceholders.email || placeholders.email">
                                <div class="error" v-if="serverResponseErrors.email"
                                     v-text="serverResponseErrors.email"></div>
                        </div>
                        <div class="self-center w-full mx-2 mt-4 font-bold text-center sm:w-auto" v-if="enablePhoneInput">
                           {{ translatedPlaceholders.or || placeholders.or }}
                        </div>

                        <div class="flex-initial w-full h-20 px-2 sm:flex-1 sm:w-auto" v-if="enablePhoneInput">

                            <vue-tel-input v-if="countriesList"
                                           inputId="tel-input"
                                           v-model="form.phone"
                                           :class="[serverResponseErrors.phone !== undefined ? 'error-input-phone' : '']"
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

                        <div class="flex items-center w-full px-2 mt-6 mb-3 text-left">

                            <label class="flex items-start justify-start leading-7">
                                <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 rounded border-adra focus-within:border-blue-500">
                                    <input type="checkbox"
                                           name="age_consent"
                                           id="age_consent"
                                           class="absolute opacity-0"
                                           v-model.number="form.age_consent"
                                           :true-value="1"
                                           :false-value="0">
                                    <svg class="w-4 h-4 transition-all duration-150 opacity-0 pointer-events-none fill-current text-adra"
                                         viewBox="0 0 20 20">
                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                                    </svg>
                                </div>
                                <div class="select-none"
                                     :class="[serverResponseErrors.age_consent !== undefined ? 'error-checkbox' : '' ]"
                                     v-text="translatedPlaceholders.age_consent || placeholders.age_consent"></div>
                            </label>
                        </div>
                        <div class="flex items-center w-full px-2 text-left">
                            <label class="flex items-start justify-start leading-7">
                                <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 rounded border-adra focus-within:border-blue-500">
                                    <input type="checkbox"
                                           name="communication_consent"
                                           id="communication_consent"
                                           class="absolute opacity-0"
                                           v-model.number="form.communication_consent"
                                           :true-value="1"
                                           :false-value="0">
                                    <svg class="w-4 h-4 transition-all duration-150 opacity-0 pointer-events-none fill-current text-adra"
                                         viewBox="0 0 20 20">
                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                                    </svg>
                                </div>
                                <div class="select-none"
                                     :class="[serverResponseErrors.communication_consent !== undefined ? 'error-checkbox' : '' ]"
                                     v-text="translatedPlaceholders.communication_consent || placeholders.communication_consent"></div>
                            </label>
                        </div>

                    </div>
                    <div class="flex mt-4">

                        <button class="flex items-center justify-center w-1/3 h-12 mx-auto btn btn-primary-invert"
                                :disabled="submitButtonDisabled"
                                @click.prevent="postForm">
                            <template v-if="this.states.formRequest !== 'posting'">
                                <div v-text="translatedPlaceholders.submit_button || placeholders.submit_button"></div>
                            </template>
                            <template v-else>
                                <div class="spinner"></div>
                            </template>
                        </button>

                    </div>
                    <div class="flex flex-col w-full p-4 mt-6 bg-white rounded"
                         v-if="hasInvalidTokens">
                        <ul>
                            <li class="error" v-text="serverResponseErrors.organization_token"></li>
                            <li class="error" v-text="serverResponseErrors.campaign_token"></li>
                            <li class="error" v-text="serverResponseErrors.event_token"></li>
                        </ul>
                    </div>
                </section>

            </transition>
            <transition
                    enter-active-class="transition-all transition duration-300 ease-in"
                    leave-active-class="transition-all transition duration-300 ease-in"
                    enter-class="opacity-0 scale-70"
                    enter-to-class="scale-100 opacity-100"
                    leave-class="scale-100 opacity-100"
                    leave-to-class="opacity-0 scale-70"
            >
                                <section v-if="showThankYou && serverResponse"
                        class="flex flex-col items-center justify-center w-full p-4 mt-6 rounded">

                    <h1
                            class="my-4 text-5xl text-center text-white whitespace-no-wrap font-display sm:text-8xl lg:text-8xl leading-negative sm:whitespace-normal"
                    >
                        {{ translatedPlaceholders.thank_you_heading || placeholders.thank_you_heading}}

                    </h1>
                    <p
                            class="w-full mb-8 text-base text-center text-gray-800 md:w-3/4 md:text-xl lg:text-2xl"
                    >
                        {{ translatedPlaceholders.thank_you_subheading || placeholders.thank_you_subheading}}
                    </p>

                    <div class="flex flex-col flex-wrap items-center justify-center w-full">
                        <div class="inline-flex flex-row justify-center w-full max-w-6xl">
                            <a
                                    class="outline-none btn-disabled  btn-primary bg-primary-30% text-black rounded rounded-tr-none rounded-br-none border-2 border-adra text-2xl font-light italic  px-2 py-1 border-r-0"

                            >
                                <svg
                                     xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     viewBox="0 0 38 38"
                                     width="39"
                                     height="39"
                                     class="pt-2 pl-2 text-white fill-current">
                                    <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/>                                </svg>
                            </a>
                            <input type="text"
                                   class="w-2/5 px-2 py-1 text-2xl italic font-light text-center border-2 border-l-0 border-r-0 outline-none cursor-pointer border-adra js-referrer-input"
                                   :value="generatedReferralLink"
                                   @click.prevent="copyReferrerURL"/>

                            <a @click="copyReferrerURL"
                                    class="inline-flex items-center px-2 py-1 mr-4 text-2xl bg-white border-2 rounded rounded-tl-none rounded-bl-none outline-none cursor-pointer btn-outline-primary text-primary border-adra js-referrer-input "
                            >
                                <svg v-if="!states.isReferralLinkCopied"
                                     xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     viewBox="0 0 38 38"
                                     width="39"
                                     height="39"
                                     class="pt-2 pl-2 fill-current text-adra">
                                    <path d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"></path>
                                </svg>
                                <svg v-if="states.isReferralLinkCopied"
                                     xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     viewBox="0 0 38 38"
                                     width="39"
                                     height="39"
                                     class="pt-2 pl-2 fill-current text-adra">
                                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                                </svg>
                            </a>
                        
                        </div>
                        <div>
                           <p class="w-full mt-4 text-center">
                                <a class="inline-flex items-center flex-shrink-0 px-2 py-2 mr-2 font-bold text-white btn btn-default btn-primary"
                                   :href="`https://www.facebook.com/sharer/sharer.php?u=${generatedReferralLink}`"
                                   target="_blank">
                                    <!--<svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">-->
                                    <!--<path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z"></path>-->

                                    <!--</svg>-->
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                         width="24" height="24"
                                         viewBox="0 0 24 24"
                                         class="fill-current">
                                        <path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z"></path>
                                    </svg>
                                </a>
                                <a class="inline-flex items-center flex-shrink-0 px-2 py-2 font-bold text-white btn btn-default btn-primary"
                                   :href="`https://twitter.com/intent/tweet?url=${generatedReferralLink}`"
                                   target="_blank">
                                    <!--<svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">-->
                                    <!--<path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z"></path>-->
                                    <!--</svg>-->
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                         width="25" height="25"
                                         viewBox="0 0 30 30"
                                         class="fill-current">
                                        <path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z"></path>
                                    </svg>

                                </a>

                            </p>
                        </div>
                    </div>
                </section>
            </transition>

        </form>

    </div>
</template>

<script>

  import vSelect from 'vue-select'
  import { VueTelInput } from 'vue-tel-input'

  export default {

    name: 'CampaignManagerForm',
    components: {
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
        states: {
          countriesList: 'empty',
          interestsList: 'empty',
          formRequest: 'idle',
          isReferralLinkCopied: false
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
          interest_id: 9,
          ref_token: null,
          campaign_token: null,
          organization_token: null,
          event_token: null,
        },
        serverResponse: null,
        serverResponseErrors: {},
        submitButtonDisabled: false,
        noDashMapInterest: null,
      }
    },
    created () {
      this.attributes = this.$root.$data.shortcodeAttributes
    },
    mounted () {
      this.setApiURL()
      this.fetchForm()

    },

    methods: {
      fetchForm () {
        const formToken = this.getParams('form_token') || this.attributes.form_token || 'LbWiQjmIIRgshiEdgpVX'
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
        this.interestsList = Object.keys(this.serverForm.interestsList).map((interestId) => {
          return {label: this.serverForm.interestsList[interestId], code: interestId}
        })
        this.setState('interestsList', 'fetched')

      },

      postForm () {
        const stateName = 'formRequest'
        const previousSubmitButtonText = this.translatedPlaceholders.submit_button || this.placeholders.submit_button
        this.translatedPlaceholders.submit_button = '. . .'
        this.submitButtonDisabled = true

        this.setState(stateName, 'posting')

        axios.post(`${this.apiURL}/api/subscriptions`, this.form)
          .then(result => {
            this.serverResponse = result.data
            this.showForm = false
            this.showThankYou = true
            this.setState(stateName, 'success')

          }).catch(error => {
          this.translatedPlaceholders.submit_button = previousSubmitButtonText
          this.submitButtonDisabled = false
          if (error.response) {
            this.setState(stateName, 'failed-' + error.response.status)
            this.serverResponseErrors = {}
            const errors = error.response.data.errors
            Object.keys(errors).map((key) => {
              return this.serverResponseErrors[key] = errors[key].join()
            })

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
      },
      copyReferrerURL: function () {

        navigator.clipboard.writeText(this.generatedReferralLink)

          .then(() => {
            this.setState('isReferralLinkCopied', true)
          }, () => {
            this.setState('isReferralLinkCopied', false)
          })
      },
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

      hasInvalidTokens () {
        if (Object.keys(this.serverResponseErrors).length === 0 && this.serverResponseErrors.constructor === Object) {
          return false
        }
        const matches = ['event_token', 'campaign_token', 'organization_token']
        return Object.keys(this.serverResponseErrors).some(v => matches.indexOf(v) !== -1)

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
        const formattedParameters = finalURLParameters.map(p => {
          return p.name + '=' + p.value
        }).join('&')

        return (this.translatedPlaceholders.landing_url || this.strippedCurrentURL) + '?' + formattedParameters
      }
    },

  }
</script>
<style>
   
    input:checked + svg {
        @apply opacity-100;
    }
</style>
