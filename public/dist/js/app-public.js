(function(e){function t(t){for(var s,a,i=t[0],l=t[1],c=t[2],d=0,m=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&m.push(r[a][0]),r[a]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(m.length)m.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],s=!0,i=1;i<n.length;i++){var l=n[i];0!==r[l]&&(s=!1)}s&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var s={},r={app:0},o=[];function a(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=s,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(n,s,function(t){return e[t]}.bind(null,s));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/wp-content/plugins/adra-network-campaign-manager/public/dist/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"557b":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var s=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("campaign-manager-form-v3",{attrs:{"is-local":e.isLocal}})],1)},o=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("form",{on:{submit:function(t){return t.preventDefault(),e.postForm(t)}}},[n("transition",{attrs:{"enter-active-class":"transition-all transition ease-in duration-300","leave-active-class":"transition-all transition ease-in duration-300","enter-class":"opacity-0 scale-70","enter-to-class":"opacity-100 scale-100","leave-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-70"}},[e.isSelectFieldsReady&&e.showForm?n("section",[n("div",{staticClass:"flex flex-wrap -mx-3 "},[n("div",{staticClass:"w-full sm:w-1/2 px-2 h-20"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.first_name,expression:"form.first_name"}],staticClass:"input  ",class:[void 0!==e.serverResponseErrors.first_name?"error-input":""],attrs:{name:"first_name",type:"text",placeholder:e.translatedPlaceholders.first_name||e.placeholders.first_name,required:""},domProps:{value:e.form.first_name},on:{input:function(t){t.target.composing||e.$set(e.form,"first_name",t.target.value)}}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.first_name)}})]),n("div",{staticClass:"w-full sm:w-1/2 px-2 h-20"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.last_name,expression:"form.last_name"}],staticClass:"input",class:[void 0!==e.serverResponseErrors.last_name?"error-input":""],attrs:{name:"last_name",type:"text",placeholder:e.translatedPlaceholders.last_name||e.placeholders.last_name},domProps:{value:e.form.last_name},on:{input:function(t){t.target.composing||e.$set(e.form,"last_name",t.target.value)}}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.last_name)}})]),n("div",{staticClass:"w-full sm:w-1/2 px-2 h-20"},[e.countriesList?n("v-select",{staticClass:"custom-select",class:[void 0!==e.serverResponseErrors.country_id?"error-select":""],attrs:{options:e.countriesList,label:"name",reduce:function(e){return e.id},placeholder:e.translatedPlaceholders.country||e.placeholders.country},model:{value:e.form.country_id,callback:function(t){e.$set(e.form,"country_id",t)},expression:"form.country_id"}}):e._e(),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.country_id)}})],1),n("div",{staticClass:"w-full sm:w-1/2 px-2 h-20"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.zip_code,expression:"form.zip_code"}],staticClass:"input",class:[void 0!==e.serverResponseErrors.zip_code?"error-input":""],attrs:{name:"zip_code",type:"text",placeholder:e.translatedPlaceholders.zip_code||e.placeholders.zip_code},domProps:{value:e.form.zip_code},on:{input:function(t){t.target.composing||e.$set(e.form,"zip_code",t.target.value)}}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.zip_code)}})]),n("div",{staticClass:"w-full px-2 h-20",class:e.enablePhoneInput?"sm:w-1/2":""},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.email,expression:"form.email"}],staticClass:"input",class:[void 0!==e.serverResponseErrors.email?"error-input":""],attrs:{name:"email",type:"text",placeholder:e.translatedPlaceholders.email||e.placeholders.email},domProps:{value:e.form.email},on:{input:function(t){t.target.composing||e.$set(e.form,"email",t.target.value)}}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.email)}})]),e.enablePhoneInput?n("div",{staticClass:"w-full sm:w-1/2 px-2 h-20"},[e.countriesList?n("vue-tel-input",{staticClass:"input-phone",class:[void 0!==e.serverResponseErrors.phone?"error-input-phone":""],attrs:{inputId:"tel-input",disabledFormatting:!0,name:"phone",dynamicPlaceholder:!0,mode:"international",preferredCountries:[e.countriesList[0]["alpha2Code"]]},on:{blur:e.formatEnteredPhoneNumber},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}}):e._e(),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.phone)}})],1):e._e(),n("div",{staticClass:"w-full px-2 text-left mt-6 mb-3 flex items-center"},[n("div",{staticClass:"form-switch inline-block align-middle "},[n("input",{directives:[{name:"model",rawName:"v-model.numeric",value:e.form.age_consent,expression:"form.age_consent",modifiers:{numeric:!0}}],staticClass:"form-switch-checkbox",attrs:{type:"checkbox",name:"age_consent",id:"age_consent","true-value":1,"false-value":0},domProps:{checked:Array.isArray(e.form.age_consent)?e._i(e.form.age_consent,null)>-1:e._q(e.form.age_consent,1)},on:{change:function(t){var n=e.form.age_consent,s=t.target,r=s.checked?1:0;if(Array.isArray(n)){var o=null,a=e._i(n,o);s.checked?a<0&&e.$set(e.form,"age_consent",n.concat([o])):a>-1&&e.$set(e.form,"age_consent",n.slice(0,a).concat(n.slice(a+1)))}else e.$set(e.form,"age_consent",r)}}}),n("label",{staticClass:"form-switch-label",attrs:{for:"age_consent"}})]),n("label",{class:[void 0!==e.serverResponseErrors.age_consent?"error-checkbox":""],attrs:{for:"age_consent"},domProps:{textContent:e._s(e.translatedPlaceholders.age_consent||e.placeholders.age_consent)}},[e._v("\n                                Default\n                            ")])]),n("div",{staticClass:"w-full px-2 text-left flex items-center"},[n("div",{staticClass:"form-switch inline-block align-middle"},[n("input",{directives:[{name:"model",rawName:"v-model.numeric",value:e.form.communication_consent,expression:"form.communication_consent",modifiers:{numeric:!0}}],staticClass:"form-switch-checkbox",attrs:{type:"checkbox",name:"age_consent",id:"communication_consent","true-value":1,"false-value":0},domProps:{checked:Array.isArray(e.form.communication_consent)?e._i(e.form.communication_consent,null)>-1:e._q(e.form.communication_consent,1)},on:{change:function(t){var n=e.form.communication_consent,s=t.target,r=s.checked?1:0;if(Array.isArray(n)){var o=null,a=e._i(n,o);s.checked?a<0&&e.$set(e.form,"communication_consent",n.concat([o])):a>-1&&e.$set(e.form,"communication_consent",n.slice(0,a).concat(n.slice(a+1)))}else e.$set(e.form,"communication_consent",r)}}}),n("label",{staticClass:"form-switch-label",attrs:{for:"communication_consent"}})]),n("label",{class:[void 0!==e.serverResponseErrors.communication_consent?"error-checkbox":""],attrs:{for:"age_consent"},domProps:{textContent:e._s(e.translatedPlaceholders.communication_consent||e.placeholders.communication_consent)}},[e._v("\n                                Default\n                            ")])])]),n("div",{staticClass:"flex mt-4"},[n("button",{staticClass:"btn btn-primary flex w-1/3 h-12 justify-center items-center mx-auto",attrs:{disabled:e.submitButtonDisabled},on:{click:function(t){return t.preventDefault(),e.postForm(t)}}},["posting"!==this.states.formRequest?[n("div",{domProps:{textContent:e._s(e.translatedPlaceholders.submit_button||e.placeholders.submit_button)}})]:[n("div",{staticClass:"spinner"})]],2)]),e.hasInvalidTokens?n("div",{staticClass:"flex flex-col w-full bg-white rounded mt-6 p-4"},[n("ul",[n("li",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.organization_token)}}),n("li",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.campaign_token)}}),n("li",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.event_token)}})])]):e._e()]):e._e()]),n("transition",{attrs:{"enter-active-class":"transition-all transition ease-in duration-300","leave-active-class":"transition-all transition ease-in duration-300","enter-class":"opacity-0 scale-70","enter-to-class":"opacity-100 scale-100","leave-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-70"}},[e.showThankYou&&e.serverResponse?n("section",{staticClass:"flex flex-col justify-center items-center w-full  rounded mt-6 p-4 "},[n("p",{staticClass:"text-white text-center font-display my-4 text-3xl sm:text-5xl  leading-negative whitespace-normal"},[e._v("\n                        "+e._s(e.translatedPlaceholders.thank_you_heading||e.placeholders.thank_you_heading)+"\n\n                    ")]),n("p",{staticClass:"text-white w-full md:w-3/4 text-center text-base md:text-xl lg:text-2xl mb-8"},[e._v("\n                        "+e._s(e.translatedPlaceholders.thank_you_subheading||e.placeholders.thank_you_subheading)+"\n                    ")]),n("div",{staticClass:"w-full flex flex-wrap justify-center"},[n("button",{staticClass:"w-full overflow-hidden md:w-3/4 inline-block hover:bg-adra focus:bg-adra hover:text-white\n                                        focus:outline-none leading-7 outline-none text-center text-lg font-light italic cursor-pointer py-2 px-2\n                                        border border-solid border-adra rounded-r md:rounded-r-none  rounded-l\n                                        border-l-1\n                                        border-r-1 hover:bg-adra hover:text-white",attrs:{type:"text"},on:{click:function(t){return t.preventDefault(),e.copyReferrerURL(t)}}},[n("span",{staticClass:"text-xl text-black"},[e._v(e._s(e.generatedReferralLink))])]),n("button",{staticClass:"mt-4 md:mt-0 focus:bg-adra focus:outline-none  outline-none\n                                       leading-none btn-disabled hover:shadow-none focus:shadow-none\n                                       text-white btn-primary bg-primary-30% rounded md:rounded-l-none border-2 border-adra\n                                       font-light italic  px-2 py-1 border-l-0",on:{click:function(t){return t.preventDefault(),e.copyReferrerURL(t)}}},[e.states.isReferralLinkCopied?e._e():n("svg",{staticClass:"fill-current text-white pl-2 pt-2 w-10 h-10",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 40 40"}},[n("path",{attrs:{d:"M4 2a2 2 0 00-2 2v14h2V4h14V2H4zm4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H8zm0 2h12v12H8V8z"}})]),e.states.isReferralLinkCopied?n("svg",{staticClass:"fill-current text-white pl-2 pt-2 w-10 h-10",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 40 40"}},[n("path",{attrs:{d:"M20.285 2L9 13.567 3.714 8.556 0 12.272 9 21 24 5.715z"}})]):e._e()])]),n("div",{staticClass:"w-full"},[n("social-sharing",{attrs:{url:e.generatedReferralLink,hashtags:"EveryChildEverywhere"},inlineTemplate:{render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mt-6 flex items-center justify-center"},[n("network",{attrs:{network:"facebook"}},[n("div",{staticClass:"outline-none px-4 py-2 bg-adra text-white rounded mx-2 hover:opacity-75 focus:outline-none"},[n("svg",{staticClass:"fill-current text-white w-6 h-6 mr-auto",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24"}},[n("path",{attrs:{d:"M17.525 9H14V7c0-1.032.084-1.682 1.563-1.682h1.868v-3.18A26.065 26.065 0 0014.693 2C11.98 2 10 3.657 10 6.699V9H7v4l3-.001V22h4v-9.003l3.066-.001L17.525 9z"}})])])]),n("network",{attrs:{network:"twitter"}},[n("div",{staticClass:"outline-none px-4 py-2 bg-adra text-white rounded mx-2 hover:opacity-75 focus:outline-none"},[n("svg",{staticClass:"fill-current text-white w-6 h-6",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30"}},[n("path",{attrs:{d:"M28 6.937c-.957.425-1.985.711-3.064.84a5.343 5.343 0 002.345-2.951 10.696 10.696 0 01-3.388 1.295 5.334 5.334 0 00-9.089 4.864A15.143 15.143 0 013.809 5.411a5.321 5.321 0 00-.721 2.683 5.33 5.33 0 002.372 4.439 5.323 5.323 0 01-2.416-.667v.067a5.335 5.335 0 004.279 5.23 5.336 5.336 0 01-2.409.092 5.34 5.34 0 004.983 3.705 10.699 10.699 0 01-6.625 2.284c-.43 0-.855-.025-1.273-.075a15.102 15.102 0 008.177 2.396c9.812 0 15.176-8.128 15.176-15.177 0-.231-.005-.461-.015-.69A10.855 10.855 0 0028 6.937z"}})])])]),n("network",{attrs:{network:"whatsapp"}},[n("div",{staticClass:"outline-none px-4 py-2 bg-adra text-white rounded mx-2 hover:opacity-75 focus:outline-none flex-inline-flex justify-center"},[n("svg",{staticClass:"fill-current text-white w-6 h-6",attrs:{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"}})])])]),n("network",{attrs:{network:"email"}},[n("div",{staticClass:"outline-none px-4 py-2 bg-adra text-white rounded mx-2 hover:opacity-75 focus:outline-none flex-inline-flex justify-center"},[n("svg",{staticClass:"fill-current text-white w-6 h-6",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068A1.485 1.485 0 011.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"}})])])])],1)},staticRenderFns:[]}})],1)]):e._e()])],1)])},i=[],l=n("4a7a"),c=n.n(l),u=n("f62e"),d=n("5299"),m=n.n(d),p={name:"CampaignManagerFormV3",components:{vSelect:c.a,VueTelInput:u["a"],SocialSharing:m.a},props:{isLocal:{type:Boolean,default:!1}},data:function(){return{states:{countriesList:"empty",interestsList:"empty",formRequest:"idle",isReferralLinkCopied:!1},apiURL:"",showForm:!0,showThankYou:!1,attributes:null,countriesList:null,interestsList:null,serverForm:null,translatedPlaceholders:null,placeholders:null,form:{first_name:null,last_name:null,email:null,phone:null,country_id:null,zip_code:null,age_consent:0,communication_consent:0,communication_preference:null,interest_id:9,ref_token:null,campaign_token:null,organization_token:null,event_token:null},serverResponse:null,serverResponseErrors:{},submitButtonDisabled:!1,noDashMapInterest:null}},created:function(){this.attributes=this.$root.$data.shortcodeAttributes},mounted:function(){console.log("mounted!"),this.setApiURL(),this.fetchForm()},methods:{fetchForm:function(){var e=this,t=this.getParams("form_token")||this.attributes.form_token||"LbWiQjmIIRgshiEdgpVX";axios.get(this.apiURL+"/api/forms/"+t).then(function(t){e.serverForm=t.data,e.setData()}).catch(function(e){return console.log(e)})},setApiURL:function(){this.apiURL=this.isLocal?"https://adra-signup-api.loc":"https://campaigns.adra.cloud"},setData:function(){var e=this;this.translatedPlaceholders=this.serverForm.translated_fields,this.form.campaign_token=this.getParams("campaign_token")||this.serverForm.tokens.campaign_token||null,this.form.event_token=this.getParams("event_token")||this.serverForm.tokens.event_token||null,this.form.organization_token=this.getParams("organization_token")||this.serverForm.tokens.organization_token||null,this.form.ref_token=this.getParams("token"),this.placeholders=this.serverForm.default_fields,this.countriesList=this.serverForm.countriesList,this.setState("countriesList","fetched"),this.interestsList=Object.keys(this.serverForm.interestsList).map(function(t){return{label:e.serverForm.interestsList[t],code:t}}),this.setState("interestsList","fetched")},postForm:function(){var e=this,t="formRequest",n=this.translatedPlaceholders.submit_button||this.placeholders.submit_button;this.translatedPlaceholders.submit_button=". . .",this.submitButtonDisabled=!0,this.setState(t,"posting"),axios.post("".concat(this.apiURL,"/api/subscriptions"),this.form).then(function(n){e.serverResponse=n.data,e.showForm=!1,e.showThankYou=!0,e.setState(t,"success")}).catch(function(s){if(e.translatedPlaceholders.submit_button=n,e.submitButtonDisabled=!1,s.response){e.setState(t,"failed-"+s.response.status),e.serverResponseErrors={};var r=s.response.data.errors;Object.keys(r).map(function(t){return e.serverResponseErrors[t]=r[t].join()})}})},getParams:function(e){return this.fullCurrentURL.searchParams.get(e)},hasParams:function(e){return this.fullCurrentURL.searchParams.has(e)},formatEnteredPhoneNumber:function(){this.form.phone&&(this.form.phone=this.form.phone.replace(/-|\s/g,""))},setState:function(e,t){return this.states[e]=t},copyReferrerURL:function(){var e=this;if("undefined"!=typeof navigator.clipboard)navigator.clipboard.writeText(this.generatedReferralLink).then(function(){e.setState("isReferralLinkCopied",!0)},function(){e.setState("isReferralLinkCopied",!1)});else{var t=document.createElement("textarea");t.value=this.generatedReferralLink,t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{var n=document.execCommand("copy");this.setState("isReferralLinkCopied",n)}catch(s){this.setState("isReferralLinkCopied",!1)}document.body.removeChild(t)}}},computed:{communicationPreferenceOptions:function(){return[{text:this.translatedPlaceholders.communication_preference_option_email||this.placeholders.communication_preference_option_email,value:"email"},{text:this.translatedPlaceholders.communication_preference_option_phone||this.placeholders.communication_preference_option_phone,value:"phone"}]},enablePhoneInput:function(){return this.translatedPlaceholders.is_enabled_phone},strippedCurrentURL:function(){return"".concat(location.protocol,"//").concat(location.host).concat(location.pathname)},fullCurrentURL:function(){return new URL(window.location.href)},isSelectFieldsReady:function(){return"fetched"===this.states.countriesList&&"fetched"===this.states.interestsList},isReferrerTokenParamPresent:function(){return!!this.getParams("token")},hasInvalidTokens:function(){if(0===Object.keys(this.serverResponseErrors).length&&this.serverResponseErrors.constructor===Object)return!1;console.log(Object.keys(this.serverResponseErrors)),console.log("includes",Object.keys(this.serverResponseErrors).includes("_token"));var e=["event_token","campaign_token","organization_token"];return Object.keys(this.serverResponseErrors).some(function(t){return-1!==e.indexOf(t)})},generatedReferralLink:function(){var e=[];this.serverResponse&&this.serverResponse.token&&e.push({name:"token",value:this.serverResponse.token}),this.hasParams("organization_token")&&e.push({name:"organization_token",value:this.getParams("organization_token")}),this.hasParams("campaign_token")&&e.push({name:"campaign_token",value:this.getParams("campaign_token")}),this.hasParams("event_token")&&e.push({name:"event_token",value:this.getParams("event_token")});var t=e.map(function(e){return e.name+"="+e.value}).join("&");return(this.translatedPlaceholders.landing_url||this.strippedCurrentURL)+"?"+t}}},h=p,f=(n("eb05"),n("2877")),v=Object(f["a"])(h,a,i,!1,null,null,null),_=v.exports,g={name:"App",components:{CampaignManagerFormV3:_},mounted:function(){this.$root.$data.shortcodeAttributes},computed:{isFormTokenPresent:function(){return void 0!==this.$root.$data.shortcodeAttributes.form_token},isLocal:function(){var e=["local","loc","test","dev"],t=window.location.origin.split(".").pop();return e.includes(t)}}},b=g,w=Object(f["a"])(b,r,o,!1,null,null,null),x=w.exports,k=n("bc3a"),y=n.n(k),C=function(){var e=12,t=localStorage.getItem("setUpTime");t&&(new Date).getTime()-t>60*e*60*1e3&&localStorage.clear(),t||localStorage.setItem("setUpTime",(new Date).getTime())};n("557b");C(),window.axios=y.a,s["a"].config.productionTip=!1,s["a"].config.devtools=!1,document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector("#app");new s["a"]({render:function(e){return e(x)},data:function(){return{shortcodeAttributes:JSON.parse(e.dataset.adra)}}}).$mount("#app")})},5896:function(e,t,n){},eb05:function(e,t,n){"use strict";var s=n("5896"),r=n.n(s);r.a}});