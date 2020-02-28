<template>
    <div>
        <form @submit.prevent="postForm">
            <transition
                    enter-active-class="transition-all transition ease-in duration-300"
                    leave-active-class="transition-all transition ease-in duration-300"
                    enter-class="opacity-0 scale-70"
                    enter-to-class="opacity-100 scale-100"
                    leave-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-70"
            >
                <section v-if="isSelectFieldsReady && showForm">
                    <div class="flex flex-wrap -mx-3 ">
                        <div class="w-full sm:w-1/2 px-2 h-20">
                            <input v-model="form.first_name"
                                   class="input  "
                                   :class="[serverResponseErrors.first_name !== undefined ? 'error-input' : '']"
                                   name="first_name"
                                   type="text"
                                   :placeholder="translatedPlaceholders.first_name || placeholders.first_name"
                                   required>

                            <div class="error" v-text="serverResponseErrors.first_name"></div>

                        </div>
                        <div class="w-full sm:w-1/2 px-2 h-20">
                            <input v-model="form.last_name"
                                   class="input"
                                   :class="[serverResponseErrors.last_name !== undefined ? 'error-input' : '']"
                                   name="last_name"
                                   type="text"
                                   :placeholder="translatedPlaceholders.last_name || placeholders.last_name">
                            <div class="error" v-text="serverResponseErrors.last_name"></div>
                        </div>

                        <div class="w-full sm:w-1/2 px-2 h-20">
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
                        <div class="w-full sm:w-1/2 px-2 h-20">
                            <input v-model="form.zip_code"
                                   class="input"
                                   :class="[serverResponseErrors.zip_code !== undefined ? 'error-input' : '']"
                                   name="zip_code"
                                   type="text"
                                   :placeholder="translatedPlaceholders.zip_code || placeholders.zip_code"
                                   style="">
                            <div class="error" v-text="serverResponseErrors.zip_code"></div>

                        </div>

                        <div class="w-full px-2 h-20"
                             :class="enablePhoneInput ? 'sm:w-1/2' : '' ">
                            <input v-model="form.email"
                                   :class="[serverResponseErrors.email !== undefined ? 'error-input' : '']"
                                   class="input"
                                   name="email"
                                   type="text"
                                   :placeholder="translatedPlaceholders.email || placeholders.email">
                            <div class="error" v-text="serverResponseErrors.email"></div>
                        </div>

                        <div class="w-full sm:w-1/2 px-2 h-20" v-if="enablePhoneInput">

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

                        <!--                        <div class="w-full sm:w-2/5 px-2 h-20" v-if="enablePhoneInput">-->
                        <!--                            <v-select v-model="form.communication_preference"-->
                        <!--                                      class="custom-select"-->
                        <!--                                      :class="[serverResponseErrors.communication_preference !== undefined ? 'error-select' : '']"-->
                        <!--                                      :options="communicationPreferenceOptions"-->
                        <!--                                      :reduce="option => option.value"-->
                        <!--                                      label="text"-->
                        <!--                                      :placeholder="translatedPlaceholders.communication_preference || placeholders.communication_preference">-->
                        <!--                            </v-select>-->
                        <!--                            <div class="error" v-text="serverResponseErrors.communication_preference"></div>-->

                        <!--                        </div>-->


                        <!--                        <div class="w-full px-2 h-20"-->
                        <!--                             :class="enablePhoneInput ? 'sm:w-3/5' : '' ">-->
                        <!--                            <v-select v-if="interestsList"-->
                        <!--                                      class="custom-select interests-select"-->
                        <!--                                      :class="[serverResponseErrors.interest_id !== undefined ? 'error-select' : '']"-->
                        <!--                                      v-model="form.interest_id"-->
                        <!--                                      :options="interestsList"-->
                        <!--                                      name="interest"-->
                        <!--                                      label="label"-->
                        <!--                                      :reduce="interest => parseInt(interest.code)"-->
                        <!--                                      :placeholder="translatedPlaceholders.interest || placeholders.interest"-->
                        <!--                                      :required="!form.interest_id"-->
                        <!--                            >-->
                        <!--                            </v-select>-->
                        <!--                            <div class="error" v-text="serverResponseErrors.interest_id"></div>-->

                        <!--                        </div>-->
                        <div class="w-full px-2 text-left mt-6 mb-3 flex">
                            <div class="form-switch inline-block align-middle ">
                                <!--                            <input type="checkbox" name="1" id="1" class="form-switch-checkbox" />-->
                                <input type="checkbox"
                                       name="age_consent"
                                       id="age_consent"
                                       class="form-switch-checkbox"
                                       v-model.numeric="form.age_consent"
                                       :true-value="1"
                                       :false-value="0">
                                <label class="form-switch-label" for="age_consent"></label>
                            </div>
                            <label for="age_consent"
                                   :class="[serverResponseErrors.age_consent !== undefined ? 'error-checkbox' : '' ]"
                                   v-text="translatedPlaceholders.age_consent || placeholders.age_consent">
                                Default
                            </label>
                        </div>

                        <div class="w-full px-2 text-left flex">
                            <div class="form-switch inline-block align-middle">
                                <!--                            <input type="checkbox" name="1" id="1" class="form-switch-checkbox" />-->
                                <input type="checkbox"
                                       name="age_consent"
                                       id="communication_consent"
                                       class="form-switch-checkbox"
                                       v-model.numeric="form.communication_consent"
                                       :true-value="1"
                                       :false-value="0">
                                <label class="form-switch-label" for="communication_consent"></label>
                            </div>
                            <label for="age_consent"
                                   :class="[serverResponseErrors.communication_consent !== undefined ? 'error-checkbox' : '' ]"
                                   v-text="translatedPlaceholders.communication_consent || placeholders.communication_consent">
                                Default
                            </label>
                        </div>

                    </div>
                    <div class="flex mt-4">

                        <button class="btn btn-primary flex w-1/3 h-12 justify-center items-center mx-auto"
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
                    <div class="flex flex-col w-full bg-white rounded mt-6 p-4"
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
                    enter-active-class="transition-all transition ease-in duration-300"
                    leave-active-class="transition-all transition ease-in duration-300"
                    enter-class="opacity-0 scale-70"
                    enter-to-class="opacity-100 scale-100"
                    leave-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-70"
            >
                <section v-if="showThankYou && serverResponse"
                         class="flex flex-col justify-center items-center w-full  rounded mt-6 p-4 ">

                    <p
                            class="text-white text-center font-display my-4 text-3xl sm:text-5xl  leading-negative whitespace-no-wrap sm:whitespace-normal"
                    >
                        {{ translatedPlaceholders.thank_you_heading || placeholders.thank_you_heading}}

                    </p>
                    <p
                            class="text-white w-full md:w-3/4 text-center text-base md:text-xl lg:text-2xl mb-8"
                    >
                        {{ translatedPlaceholders.thank_you_subheading || placeholders.thank_you_subheading}}
                    </p>

                    <div class="w-full flex flex-wrap justify-center">
                        <div class="w-full flex flex-wrap items-center justify-center">
                            <button
                                    @click.prevent="copyReferrerURL"
                                    class="hidden sm:inline-block hover:bg-adra focus:bg-adra focus:outline-none outline-none leading-none btn-disabled hover:shadow-none focus:shadow-none btn-primary bg-primary-30% rounded rounded-tr-none rounded-br-none border-2 border-adra font-light italic  px-2 py-1 border-r-0 "
                            >
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="fill-current text-white pl-2 pt-2 w-10 h-10"
                                        viewBox="0 0 40 40">
                                    <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/>
                                </svg>
                            </button>
                            <button type="text"
                                    class="hover:bg-adra focus:bg-adra hover:text-white focus:outline-none outline-none text-center text-lg font-light italic cursor-pointer py-2 px-2 sm:px-10  border border-solid border-adra rounded-r-none  rounded-l sm:rounded-l-none border-l-1 sm:border-l-0 border-r-0 hover:bg-adra hover:text-white"
                                    @click.prevent="copyReferrerURL">
                                <span class="text-xl text-black">{{generatedReferralLink}}</span>
                            </button>

                            <button @click.prevent="copyReferrerURL"
                                    class="hover:bg-adra focus:bg-adra focus:outline-none  outline-none leading-none btn-disabled hover:shadow-none focus:shadow-none text-white btn-primary bg-primary-30% rounded rounded-l-none border-2 border-adra font-light italic  px-2 py-1 border-l-0"
                            >
                                <svg v-if="!states.isReferralLinkCopied"
                                     xmlns="http://www.w3.org/2000/svg"
                                     class="fill-current text-white pl-2 pt-2 w-10 h-10"
                                     viewBox="0 0 40 40">
                                    <path d="M4 2a2 2 0 00-2 2v14h2V4h14V2H4zm4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H8zm0 2h12v12H8V8z"/>
                                </svg>

                                <svg v-if="states.isReferralLinkCopied"
                                     xmlns="http://www.w3.org/2000/svg"
                                     class="fill-current text-white pl-2 pt-2 w-10 h-10"
                                     viewBox="0 0 40 40">
                                    <path d="M20.285 2L9 13.567 3.714 8.556 0 12.272 9 21 24 5.715z"/>
                                </svg>
                            </button>

                            <div class="w-full">
                                <social-sharing :url="generatedReferralLink" hashtags="EveryChildEverywhere"
                                                inline-template>
                                    <div class="mt-6 flex items-center justify-center">
                                        <network network="facebook">
                                            <div class="outline-none px-4 py-2 bg-adra text-white rounded mx-2 hover:opacity-75 focus:outline-none"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-current text-white w-6 h-6 mr-auto"><path d="M17.525 9H14V7c0-1.032.084-1.682 1.563-1.682h1.868v-3.18A26.065 26.065 0 0014.693 2C11.98 2 10 3.657 10 6.699V9H7v4l3-.001V22h4v-9.003l3.066-.001L17.525 9z"/></svg>
                                            </div>
                                        </network>
                                        <network network="twitter">
                                            <div class="outline-none px-4 py-2 bg-adra text-white rounded mx-2 hover:opacity-75 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" class="fill-current text-white w-6 h-6"><path d="M28 6.937c-.957.425-1.985.711-3.064.84a5.343 5.343 0 002.345-2.951 10.696 10.696 0 01-3.388 1.295 5.334 5.334 0 00-9.089 4.864A15.143 15.143 0 013.809 5.411a5.321 5.321 0 00-.721 2.683 5.33 5.33 0 002.372 4.439 5.323 5.323 0 01-2.416-.667v.067a5.335 5.335 0 004.279 5.23 5.336 5.336 0 01-2.409.092 5.34 5.34 0 004.983 3.705 10.699 10.699 0 01-6.625 2.284c-.43 0-.855-.025-1.273-.075a15.102 15.102 0 008.177 2.396c9.812 0 15.176-8.128 15.176-15.177 0-.231-.005-.461-.015-.69A10.855 10.855 0 0028 6.937z"/></svg>
                                            </div>
                                        </network>
                                        <network network="whatsapp">
                                            <div class="outline-none px-4 py-2 bg-adra text-white rounded mx-2 hover:opacity-75 focus:outline-none flex-inline-flex justify-center">

                                                <svg viewBox="0 0 24 24" class="fill-current text-white w-6 h-6"
                                                     xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                            </div>
                                        </network>
                                        <network network="email">
                                            <div class="outline-none px-4 py-2 bg-adra text-white rounded mx-2 hover:opacity-75 focus:outline-none flex-inline-flex justify-center">
                                                <svg viewBox="0 0 24 24" class="fill-current text-white w-6 h-6"><path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068A1.485 1.485 0 011.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"/></svg>
                                            </div>
                                        </network>
                                    </div>

                                </social-sharing>
                            </div>

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
  import SocialSharing from 'vue-social-sharing'

  export default {

    name: 'CampaignManagerFormV3',
    components: {
      vSelect,
      VueTelInput,
      SocialSharing
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
      console.log('mounted!')
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

        if (typeof (navigator.clipboard) == 'undefined') {
          const textArea = document.createElement('textarea')
          textArea.value = this.generatedReferralLink
          textArea.style.position = 'fixed'  //avoid scrolling to bottom
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          try {
            const successful = document.execCommand('copy')
            this.setState('isReferralLinkCopied', successful)
          } catch (err) {
            this.setState('isReferralLinkCopied', false)
          }
          document.body.removeChild(textArea)
          return
        }
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
        console.log(Object.keys(this.serverResponseErrors))
        console.log('includes', Object.keys(this.serverResponseErrors).includes('_token'))

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
    .v-select {
        position: relative;
        font-family: inherit
    }

    .v-select,
    .v-select * {
        box-sizing: border-box
    }

    @-webkit-keyframes vSelectSpinner {
        0% {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(1turn)
        }
    }

    @keyframes vSelectSpinner {
        0% {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(1turn)
        }
    }

    .vs__fade-enter-active,
    .vs__fade-leave-active {
        transition: opacity .15s cubic-bezier(1, .5, .8, 1)
    }

    .vs__fade-enter,
    .vs__fade-leave-to {
        opacity: 0
    }

    .vs--disabled .vs__clear,
    .vs--disabled .vs__dropdown-toggle,
    .vs--disabled .vs__open-indicator,
    .vs--disabled .vs__search,
    .vs--disabled .vs__selected {
        cursor: not-allowed;
        background-color: #f8f8f8
    }

    .v-select[dir=rtl] .vs__actions {
        padding: 0 3px 0 6px
    }

    .v-select[dir=rtl] .vs__clear {
        margin-left: 6px;
        margin-right: 0
    }

    .v-select[dir=rtl] .vs__deselect {
        margin-left: 0;
        margin-right: 2px
    }

    .v-select[dir=rtl] .vs__dropdown-menu {
        text-align: right
    }

    .vs__dropdown-toggle {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: flex;
        padding: 0 0 4px;
        background: none;
        border: 1px solid rgba(60, 60, 60, .26);
        border-radius: 4px;
        white-space: normal
    }

    .vs__selected-options {
        display: flex;
        flex-basis: 100%;
        flex-grow: 1;
        flex-wrap: wrap;
        padding: 0 2px;
        position: relative
    }

    .vs__actions {
        display: flex;
        align-items: center;
        padding: 4px 6px 0 3px
    }

    .vs--searchable .vs__dropdown-toggle {
        cursor: text
    }

    .vs--unsearchable .vs__dropdown-toggle {
        cursor: pointer
    }

    .vs--open .vs__dropdown-toggle {
        border-bottom-color: transparent;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0
    }

    .vs__open-indicator {
        fill: rgba(60, 60, 60, .5);
        transform: scale(1);
        transition: transform .15s cubic-bezier(1, -.115, .975, .855);
        transition-timing-function: cubic-bezier(1, -.115, .975, .855)
    }

    .vs--open .vs__open-indicator {
        transform: rotate(180deg) scale(1)
    }

    .vs--loading .vs__open-indicator {
        opacity: 0
    }

    .vs__clear {
        fill: rgba(60, 60, 60, .5);
        padding: 0;
        border: 0;
        background-color: transparent;
        cursor: pointer;
        margin-right: 8px
    }

    .vs__dropdown-menu {
        display: block;
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        z-index: 1000;
        padding: 5px 0;
        margin: 0;
        width: 100%;
        max-height: 350px;
        min-width: 160px;
        overflow-y: auto;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .15);
        border: 1px solid rgba(60, 60, 60, .26);
        border-top-style: none;
        border-radius: 0 0 4px 4px;
        text-align: left;
        list-style: none;
        background: #fff
    }

    .vs__no-options {
        text-align: center
    }

    .vs__dropdown-option {
        line-height: 1.42857143;
        display: block;
        padding: 3px 20px;
        clear: both;
        color: #333;
        white-space: nowrap
    }

    .vs__dropdown-option:hover {
        cursor: pointer
    }

    .vs__dropdown-option--highlight {
        background: #5897fb;
        color: #fff
    }

    .vs__dropdown-option--disabled {
        background: inherit;
        color: rgba(60, 60, 60, .5)
    }

    .vs__dropdown-option--disabled:hover {
        cursor: inherit
    }

    .vs__selected {
        display: flex;
        align-items: center;
        background-color: #f0f0f0;
        border: 1px solid rgba(60, 60, 60, .26);
        border-radius: 4px;
        color: #333;
        line-height: 1.4;
        margin: 4px 2px 0;
        padding: 0 .25em
    }

    .vs__deselect {
        display: inline-flex;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin-left: 4px;
        padding: 0;
        border: 0;
        cursor: pointer;
        background: none;
        fill: rgba(60, 60, 60, .5);
        text-shadow: 0 1px 0 #fff
    }

    .vs--single .vs__selected {
        background-color: transparent;
        border-color: transparent
    }

    .vs--single.vs--open .vs__selected {
        position: absolute;
        opacity: .4
    }

    .vs--single.vs--searching .vs__selected {
        display: none
    }

    .vs__search::-webkit-search-cancel-button {
        display: none
    }

    .vs__search::-ms-clear,
    .vs__search::-webkit-search-decoration,
    .vs__search::-webkit-search-results-button,
    .vs__search::-webkit-search-results-decoration {
        display: none
    }

    .vs__search,
    .vs__search:focus {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        line-height: 1.4;
        font-size: 1em;
        border: 1px solid transparent;
        border-left: none;
        outline: none;
        margin: 4px 0 0;
        padding: 0 7px;
        background: none;
        box-shadow: none;
        width: 0;
        max-width: 100%;
        flex-grow: 1
    }

    .vs__search::-webkit-input-placeholder {
        color: inherit
    }

    .vs__search::-moz-placeholder {
        color: inherit
    }

    .vs__search:-ms-input-placeholder {
        color: inherit
    }

    .vs__search::-ms-input-placeholder {
        color: inherit
    }

    .vs__search::placeholder {
        color: inherit
    }

    .vs--unsearchable .vs__search {
        opacity: 1
    }

    .vs--unsearchable .vs__search:hover {
        cursor: pointer
    }

    .vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {
        opacity: .2
    }

    .vs__spinner {
        align-self: center;
        opacity: 0;
        font-size: 5px;
        text-indent: -9999em;
        overflow: hidden;
        border: .9em solid hsla(0, 0%, 39.2%, .1);
        border-left-color: rgba(60, 60, 60, .45);
        transform: translateZ(0);
        -webkit-animation: vSelectSpinner 1.1s linear infinite;
        animation: vSelectSpinner 1.1s linear infinite;
        transition: opacity .1s
    }

    .vs__spinner,
    .vs__spinner:after {
        border-radius: 50%;
        width: 5em;
        height: 5em
    }

    .vs--loading .vs__spinner {
        opacity: 1
    }
</style>