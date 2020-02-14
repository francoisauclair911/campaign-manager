<template>

    <div class="tw-mt-4 tw-w-full tw-flex tw-flex-wrap md:-tw-mx-5">
        <div class="tw-w-full">
            <h2 class="tw-mb-4  tw-font-thing tw-text-2xl md:tw-px-5">
                First Step
            </h2>
        </div>

        <div class="tw-w-full md:tw-px-5">

            <div class="tw-flex tw-flex-wrap tw-bg-white tw-shadow-md tw-rounded sm:tw-px-0 md:tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5">


                <div class="tw-w-full tw-mb-4">
                    <label for="org_token" class="tw-block tw-mb-2">Enter your organization token</label>

                    <input type="text" @input="formsList = []" class="input tw-mr-2 tw-w-full md:tw-w-1/2" name="org_token" id="org_token" v-model="organization_token">

                    <button @click="fetchForms" class="button">List all forms</button>

                </div>


             <div class="tw-border-r">
                 <SpinnerLoader v-if="state.fetchForm === 'fetching'"/>
                 <p v-if="state.fetchForm === 'failed'" class="tw-text-red-900">
                     Error fetching, verify your organization token
                 </p>
             </div>



                <div class="tw-w-full md:tw-w-1/2">
                    <v-select v-if="isFormListReady"
                              class="tw-w-full"
                              v-model="selectedForm"
                              placeholder="Choose your form"
                              :options="formsListsFormatted"
                              :reduce="(form) => form.value"></v-select>
                </div>
            </div>
        </div>


        <div class="tw-mt-4 tw-w-full md:tw-px-5">

            <h2 class="tw-mb-2  tw-font-thing tw-text-2xl">
                Second Step
            </h2>
            <p class="tw-text-xl tw-mb-2">
                Copy the code below in the page you are translating
            </p>
            <div class=" tw-flex tw-flex-wrap tw-justify-center tw-bg-white tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5 tw-text-center"
                 :class="{'tw-bg-green-200' : selectedForm}">
                <div class="tw-flex tw-flex-wrap tw-justify-center tw-w-full" v-if="selectedForm">
                    <code class="tw-w-full tw-mb-4 ">{{generatedShortCode}}</code>
                    <button class="button" @click="copyShortcode">{{ isCopied ? 'Copied' : 'Copy' }}</button>
                </div>

            </div>
        </div>


    </div>
</template>
<script>
  import vSelect from 'vue-select'
  import 'vue-select/dist/vue-select.css'

  import SpinnerLoader from '../../public/src/views/SpinnerLoader'

  export default {
    name: 'AdminPanel',
    components: {
      vSelect,
      SpinnerLoader
    },
    data () {

      return {
        state: {
          fetchForm: 'idle'
        },
        isCopied: false,
        existing_shortcode: null,
        submittedForm: false,
        organization_token: null,
        selectedForm: null,
        formsList: [],
        form: {
          form_token: {
            label: 'Form Token',
            placeholder: 'Enter your form token here',
            type: 'hidden',
            value: '',
            required: true
          },
        },
      }
    },
    methods: {
      fetchForms () {
        this.state.fetchForm = 'fetching'
        fetch(this.apiURL + '/api/organizations/' + this.organization_token + '/forms')
          .then(result => {
            return result.json()
          }).then(data => {
          this.formsList = data.forms
          this.state.fetchForm = 'fetched'

        }).catch((err) => {
          this.state.fetchForm = 'failed'
        })
      },
      copyShortcode () {
        navigator.clipboard.writeText(this.generatedShortCode)
        this.isCopied = true
      },
    },
    computed: {
      isLocal () {
        const possibleLocalDomains = ['local', 'loc', 'test', 'dev']
        const currentDomain = window.location.origin.split('.').pop()
        return possibleLocalDomains.includes(currentDomain)
      },
      apiURL() {
        if ((this.isLocal)) {
          return 'https://adra-signup-api.loc';
        }
        return 'https://campaigns.adra.cloud';
      },
      formsListsFormatted () {
        return lodash.map(this.formsList, (token, name) => {
          return {
            label: name,
            value: token
          }
        })
      },
      isFormListReady () {
        return !lodash.isEmpty(this.formsList)
      },
      generatedShortCode () {
        return `[campaign-manager form_token="${this.selectedForm}"]`
      },

    },

  }
</script>

<style>
    /*.v-select {*/
    /*    width: 100%;*/
    /*}*/

    input.vs__search,
    input.vs__search:focus {
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
</style>
