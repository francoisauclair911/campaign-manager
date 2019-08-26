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
                           type="text" :placeholder="attributes.first_name || placeholders.first_name">

                </div>
                <div class="flex-item">
                    <input v-model="form.last_name"
                           name="last_name"
                           type="text"
                           :placeholder="attributes.last_name || placeholders.last_name">

                </div>
            </div>
            <div class="flex">
                <div class="flex-item">
                    <input v-model="form.email"
                           name="email"
                           type="text"
                           :placeholder="attributes.email || placeholders.email">
                </div>

                <div class="flex-item" v-if="attributes.enable_phone">
                    <input v-model="form.phone"
                           name="phone"
                           type="tel"
                           :placeholder="attributes.phone || placeholders.phone">
                </div>

            </div>
            <div class="flex">
                <div class="flex-item country-field">
                    <v-select v-if="countriesList" v-model="form.country"
                              :options="countriesList"
                              label="country"
                              :placeholder="attributes.country || placeholders.country">
                    </v-select>
                </div>
                <div class="flex-item zip-field">
                    <input v-model="form.zip_code" type="text"
                           :placeholder="attributes.zip_code || placeholders.zip_code"
                           style="min-height: 54px; !important;">
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
                </div>
            </div>
            <div class="flex age_consent">
                <div class="flex-item " style="max-width: 1.5em">
                    <input type="checkbox"
                           v-model.numeric="form.age_consent"
                           :true-value="1"
                           :false-value="0">
                </div>
                <div class="flex-item flex-3-quarter" style="align-self: center; height: 43px;">
                    {{ attributes.age_consent || placeholders.age_consent}}

                </div>
            </div>
            <div class="flex">
                <div class="flex-item " style="max-width: 1.5em">
                    <input type="checkbox"
                           v-model.numeric="form.communication_consent"
                           :true-value="1"
                           :false-value="0">
                </div>
                <div class="flex-item flex-3-quarter" style="align-self: center; height: 43px;">
                    {{ attributes.communication_consent || placeholders.communication_consent}}
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

            <div class="flex" v-if="serverResponse">
                <div class="flex-item" v-if="serverResponse.errors">
                    <div class="adra-form-error" v-for="error in serverResponse.errors">
                        {{ error }}
                    </div>

                </div>
            </div>

        </form>
        <div v-if="showThankYou && serverResponse">
            <h1>Thanks for submitting</h1>
            <h3>your link is</h3>
            <h3>{{attributes.landing_url || currentURL }}?token={{serverResponse.token || null}}</h3>

        </div>
    </div>
</template>

<script>
  import vSelect from 'vue-select'

  export default {

    name: 'Home',
    components: {
      vSelect,
    },
    data () {
      return {
        // apiURl: '//beta.adra.org',
        apiURl: '//adra-signup-api.test/',
        showForm: true,
        showThankYou: false,
        attributes: null,
        countriesList: null,
        interestsList: null,
        placeholders: {
          first_name: 'First Name',
          last_name: 'Last Name',
          email: 'Email',
          phone: 'Phone Number',
          country: 'Choose a Country',
          zip_code: 'Zip Code',
          age_consent: 'By signing this form I confirm I am over 13 years old.',
          communication_consent: 'I agree to receive communications from ADRA. ',
          interest: 'How would you describe your interest',
          country_code: null,
          submit_button: 'Submit'
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
          interest: null,
          ref_token: null,
          campaign_token: null,
          organization_token: null,
          event_token: null,
        },
        serverResponse: null,
        submitButtonDisabled: false,
      }

    },
    created () {

      // const att = document.querySelector('[data-pk-atts]');
      // this.attributes = shortcodeAttributes

      this.attributes = this.$root.$data.shortcodeAttributes
      // this.attributes = "LOL"

    },
    methods: {
      submitForm () {
        this.submitButtonDisabled = true
        axios.post(`${this.apiURl}/api/subscriptions`, this.form).then(result => {
          //success handling
          console.log(result.data)
          this.serverResponse = result.data
          this.showForm = false
          this.showThankYou = true

        }).catch(error => {
          //error handling
          this.submitButtonDisabled = false
          console.log(error.response)
          this.serverResponse = error.response.data

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
      axios.get(`${this.apiURl}/api/assets/countries?country_code=${this.attributes.country_code}`).then((result) => {
        this.countriesList = _.map(result.data, function (item) {
          return item.name
        })
      })

      axios.get(`${this.apiURl}/api/assets/interests`).then((result) => {
        this.interestsList = result.data
      })

      this.form.campaign_token = this.attributes.campaign_token || null
      this.form.event_token = this.attributes.event_token || null
      this.form.organization_token = this.attributes.organization_token || null;

      (this.pageHasReferrerToken) ? this.form.ref_token = this.getParams('token') : ''

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">

    div.adra-plugin form button.adra-form-submit {
        min-width: 200px;
    }

    div.adra-plugin input:not('vs__search'){
        width: 100%;
        height: 54.8px;
    }
    div.adra-plugin input[type="search"].vs__search,
    div.adra-plugin input[type="search"].vs__search:focus{
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
    div.adra-plugin div.country-field{
        min-width : 50%;
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

    div.adra-plugin form#adra-campaign-manager input,
    div.adra-plugin form#adra-campaign-manager  input::placeholder {
        color: #707070c2 !important;
    }

    div.adra-plugin form#adra-campaign-manager input:not('vs__search') {
        border: 1px #B4B4B4 solid !important;
        height: 55px !important;
    }



    div.adra-plugin form#adra-campaign-manager span.error {
        color: red;
    }

    div.adra-plugin form#adra-campaign-manager input[type="checkbox"] {
        height: 43px !important;
        width: 21px;
    }

    div.adra-plugin svg.loader {
        width: 100px;
        height: 100px;
        margin: 20px;
        display: inline-block;
    }

    @import url('https://unpkg.com/vue-select@latest/dist/vue-select.css');

</style>
