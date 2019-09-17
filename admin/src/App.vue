<template>

    <div class="tw-mt-4 tw-w-full tw-flex tw-flex-wrap md:-tw-mx-5">
        <div class="tw-w-full">
            <h2 class="tw-mb-4  tw-font-thing tw-text-2xl md:tw-px-5">
               1-  Translate all the required fields
            </h2>
        </div>

        <div class="tw-w-full md:tw-px-5">
            <form @change="formChanged" @submit.prevent="submitForm"
                  class="tw-flex tw-flex-wrap tw-bg-white tw-shadow-md tw-rounded sm:tw-px-0 md:tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5">
                <div class="tw-flex tw-flex-wrap sm:tw-w-full md:tw-w-1/2 tw-px-5 tw-mb-4"
                     v-for="(input, key, index) in form" :key="index">
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
                            <span class="tw-font-thin">{{ form[key]['value'] || ''}}</span></div>

                    </div>

                    <input class=" tw-adra-input" :id="key" :name="key" v-model="form[key]['value']"
                           type="text"
                           :placeholder="input.placeholder || 'Enter your translation here'"
                           :required="form[key]['required']">
                </div>
                <div class="tw-w-full tw-mb-2 tw-text-center tw-justify-center">
                    <button class="button">Generate shortcode</button>
                </div>
            </form>
        </div>


        <div class="tw-mt-4 tw-w-full md:tw-px-5">

            <h2 class="tw-mb-2  tw-font-thing tw-text-2xl">
                2 - Use this shortcode when you have entered all the required text translations
            </h2>
            <p class="tw-text-xl tw-mb-2">
                Copy the code below in the page you are translating
            </p>
            <div class=" tw-flex tw-flex-wrap tw-justify-center tw-bg-white tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5 tw-text-center"
                 :class="{'tw-bg-green-200' : submittedForm}">
                <div class="tw-flex tw-flex-wrap tw-justify-center tw-w-full" v-if="submittedForm">
                    <code  class="tw-w-full tw-mb-4 ">{{generatedShortCode}}</code>
                    <button class="button" @click="copyShortcode">{{ isCopied ? 'Copied' : 'Copy' }}</button>
                </div>

            </div>
        </div>


        <div class="tw-mt-4 tw-w-full tw-px-5">
            <h2 class="tw-mb-2 tw-font-thing tw-text-2xl">
                Optional : Already have a shortcode ? Want to modify it ? Paste it below
            </h2>
            <p class="tw-mb-2 tw-text-center tw-text-xl">
                The fields will be populate with your shortcode info, you can then edit them and use the new generated
                shortcode above.
            </p>
            <div class="tw-flex tw-flex-wrap tw-bg-white tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 -tw-mx-5">
                <textarea class="tw-w-full"
                          name="existing_shortcode"
                          id="existing_shortcode"
                          v-model="existing_shortcode"
                          cols="30"></textarea>
            </div>
        </div>

    </div>
</template>
<script>
  export default {
    name: 'AdminPanel',
    data () {
      return {
        isCopied: false,
        existing_shortcode: null,
        submittedForm: false,
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
            value: '',
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
            value: null
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
            label: 'Submit Button Text',
            value: ''
          },
          thank_you_heading: {
            label: 'Title for the "Thank You" banner after successfull registration',
            value: ''
          },
          thank_you_subheading: {
            label: 'Subtitle for the subheading after successfull registration',
            value: ''
          },
          country_code: {
            label: 'Your country code (3 letters), this allows your country to be on top of the select list',
            value: ''
          },
          landing_url: {
            label: 'The URL where the form (shortcode) is present, will be used to generate the new user referral link',
            value: '',
            required: true

          },
          campaign_token: {
            label: 'Campaign Token',
            placeholder: 'Enter your campaign token here',
            type: 'hidden',
            value: '',
            required: true
          },
          organization_token: {
            label: 'Organization Token',
            placeholder: 'Enter your organization token here',
            type: 'hidden',
            value: '',
            required: true

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
      copyShortcode() {
        navigator.clipboard.writeText(this.generatedShortCode)
        this.isCopied = true;
      },
      formChanged (e) {
        this.isCopied = false;
        localStorage.formChanged = true
        localStorage[e.target.name] = e.target.value
      },
      submitForm () {
        this.submittedForm = true
      },
      toSentence (string) {
        return lodash.startCase(string)
      },
      parseShortCode (shortCode) {
        let re = /(\s+|\W)|(\w+)/g
        let match
        let token
        let curAttribute = ''
        let quoteChar
        let mode = 'NOT STARTED'
        let parsedValue = {
          name: '',
          attributes: {},
          content: ''
        }
        let hasContent = (shortCode.match(/\]/g) || []).length
        if (hasContent > 2) {
          throw ('invalid shortCode: match more then 2 tokens "]". Use only shortcode with this function. Example "[name]teste[/name]" or "[name prop=value]"')
        } else if (hasContent === 1) {
          hasContent = false
        } else {
          hasContent = true
        }

        while ((match = re.exec(shortCode)) != null) {
          token = match[0]
          if (mode === 'COMPLETE') {
            break
          }

          switch (mode) {
            case 'NOT STARTED':
              if (token == '[') {
                mode = 'GETNAME'
              }
              break
            case 'GETNAME':
              if (!(/\s/.test(token))) {
                if (!(/\]/.test(token))) {
                  parsedValue.name += token
                } else {
                  mode = 'GETCONTENT'
                }
              } else if (parsedValue.name) {
                mode = 'PARSING'
              }
              break
            case 'GETCONTENT':
              if (!(/\[/.test(token))) {
                parsedValue.content += token
              } else if (parsedValue.name) {
                mode = 'COMPLETE'
              }
              break
            case 'PARSING':
              // if non text char throw it
              if (token == ']') {
                if (hasContent === 1) {
                  mode = 'COMPLETE'
                } else {
                  mode = 'GETCONTENT'
                }
              } else if (token == '=') {
                if (!curAttribute) throw ('invalid token: "' + token + '" encountered at ' + match.index)
                else mode = 'GET ATTRIBUTE VALUE'
              } else if (!/\s/.test(token)) {
                curAttribute += token
              } else if (curAttribute) {
                mode = 'SET ATTRIBUTE'
              }
              break
            case 'SET ATTRIBUTE':
              // these are always from match[1]
              if (/\s/.test(token)) { parsedValue.attributes[curAttribute] = null }
              else if (token == '=') { mode = 'GET ATTRIBUTE VALUE' }
              else { throw ('invalid token: "' + token + '" encountered at ' + match.index) }
              break
            case 'GET ATTRIBUTE VALUE':
              if (!(/\s/.test(token))) {
                if (/["']/.test(token)) {
                  quoteChar = token
                  parsedValue.attributes[curAttribute] = ''
                  mode = 'GET QUOTED ATTRIBUTE VALUE'
                } else {
                  parsedValue.attributes[curAttribute] = token
                  curAttribute = ''
                  mode = 'PARSING'
                }
              }
              break
            case 'GET QUOTED ATTRIBUTE VALUE':
              if (/\\/.test(token)) { mode = 'ESCAPE VALUE' }
              else if (token == quoteChar) {
                mode = 'PARSING'
                curAttribute = ''
              }
              else { parsedValue.attributes[curAttribute] += token }
              break
            case 'ESCAPE VALUE':
              if (/\\'"/.test(token)) { parsedValue.attributes[curAttribute] += token }
              else { parsedValue.attributes[curAttribute] += '\\' + token }
              mode = 'GET QUOTED ATTRIBUTE VALUE'
              break

          }
        }
        if (curAttribute && !parsedValue.attributes[curAttribute]) {
          parsedValue.attributes[curAttribute] = ''
        }

        return parsedValue
      }
    },
    mounted () {

      if (localStorage.formChanged) {
        lodash.map(this.form, (item, key) => {
          this.form[key]['value'] = localStorage[key]
        })
      }

    },
    watch: {
      // form: {
      //   handler: function (newValue) {
      //     localStorage.form = true
      //     lodash.map(newValue, (item, key) => {
      //       localStorage[key] = item.value
      //     })
      //   },
      //   deep: true
      // },

      existing_shortcode: function () {
        this.submittedForm = false;

        const data = this.parseShortCode(this.existing_shortcode)
        lodash.map(this.form, (item, key) => {
          return item.value = data.attributes[key]
        })
      }
    },

    computed: {
      generatedShortCode() {
        return `[campaign-manager ${this.shortcodeParameters}]`;
      },
      shortcodeParameters () {
        const param = lodash.map(this.form, (item, key) => {
          if (item.value) {
            return `${key}="${item.value}"`
          }
        })
        return param.join(' ')
      }
    },

  }
</script>

<style lang="scss">

</style>
