(function(e){function t(t){for(var r,a,i=t[0],c=t[1],l=t[2],m=0,p=[];m<i.length;m++)a=i[m],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&p.push(s[a][0]),s[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},s={app:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/wp-content/plugins/adra-network-campaign-manager/public/dist/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("campaign-manager-form")],1)},o=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"adra-plugin"},[n("div",{directives:[{name:"show",rawName:"v-show",value:!e.selectFieldsReady,expression:"!selectFieldsReady"}],staticClass:"flex"},[n("div",{staticClass:"flex-item"},[n("svg",{staticClass:"loader",attrs:{version:"1.1",id:"L4",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 100 100","enable-background":"new 0 0 0 0","xml:space":"preserve"}},[n("circle",{attrs:{fill:"#000",stroke:"none",cx:"6",cy:"50",r:"6"}},[n("animate",{attrs:{attributeName:"opacity",dur:"1s",values:"0;1;0",repeatCount:"indefinite",begin:"0.1"}})]),n("circle",{attrs:{fill:"#000",stroke:"none",cx:"26",cy:"50",r:"6"}},[n("animate",{attrs:{attributeName:"opacity",dur:"1s",values:"0;1;0",repeatCount:"indefinite",begin:"0.2"}})]),n("circle",{attrs:{fill:"#000",stroke:"none",cx:"46",cy:"50",r:"6"}},[n("animate",{attrs:{attributeName:"opacity",dur:"1s",values:"0;1;0",repeatCount:"indefinite",begin:"0.3"}})])])])]),e.showForm?n("form",{directives:[{name:"show",rawName:"v-show",value:e.selectFieldsReady,expression:"selectFieldsReady"}],staticClass:"adra-campaign-manager-form",attrs:{id:"adra-campaign-manager-form"},on:{submit:function(t){return t.preventDefault(),e.submitForm(t)}}},[n("div",{staticClass:"flex"},[n("div",{staticClass:"flex-item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.first_name,expression:"form.first_name"}],attrs:{name:"first_name",type:"text",placeholder:e.attributes.first_name||e.placeholders.first_name,required:""},domProps:{value:e.form.first_name},on:{input:function(t){t.target.composing||e.$set(e.form,"first_name",t.target.value)}}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.first_name)}})]),n("div",{staticClass:"flex-item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.last_name,expression:"form.last_name"}],attrs:{name:"last_name",type:"text",placeholder:e.attributes.last_name||e.placeholders.last_name},domProps:{value:e.form.last_name},on:{input:function(t){t.target.composing||e.$set(e.form,"last_name",t.target.value)}}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.last_name)}})])]),n("div",{staticClass:"flex"},[n("div",{staticClass:"flex-item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.email,expression:"form.email"}],attrs:{name:"email",type:"text",placeholder:e.attributes.email||e.placeholders.email},domProps:{value:e.form.email},on:{input:function(t){t.target.composing||e.$set(e.form,"email",t.target.value)}}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.email)}})])]),e.attributes.enable_phone?n("div",{staticClass:"flex"},[n("div",{staticClass:"flex-item w-half"},[n("vue-tel-input",{staticClass:"input-phone",attrs:{name:"phone",dynamicPlaceholder:!0,mode:"international"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.phone)}})],1),n("div",{staticClass:"flex-item w-half"},[n("v-select",{attrs:{options:e.communication_preference_options,reduce:function(e){return e.value},label:"text",placeholder:e.attributes.communication_preference||e.placeholders.communication_preference},model:{value:e.form.communication_preference,callback:function(t){e.$set(e.form,"communication_preference",t)},expression:"form.communication_preference"}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.communication_preference)}})],1)]):e._e(),n("div",{staticClass:"flex"},[n("div",{staticClass:"flex-item w-half"},[e.countriesList?n("v-select",{attrs:{options:e.countriesList,label:"country",placeholder:e.attributes.country||e.placeholders.country},model:{value:e.form.country,callback:function(t){e.$set(e.form,"country",t)},expression:"form.country"}}):e._e(),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.country)}})],1),n("div",{staticClass:"flex-item w-half"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.zip_code,expression:"form.zip_code"}],staticStyle:{"min-height":"54px"},attrs:{name:"zip_code",type:"text",placeholder:e.attributes.zip_code||e.placeholders.zip_code},domProps:{value:e.form.zip_code},on:{input:function(t){t.target.composing||e.$set(e.form,"zip_code",t.target.value)}}}),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.zip_code)}})])]),n("div",{staticClass:"flex"},[n("div",{staticClass:"flex-item "},[e.interestsList?n("v-select",{attrs:{options:e.interestsList,name:"interest",label:"interest",placeholder:e.attributes.interest||e.placeholders.interest},scopedSlots:e._u([{key:"search",fn:function(t){var r=t.attributes,s=t.events;return[n("input",e._g(e._b({staticClass:"vs__search",attrs:{required:!e.form.interest}},"input",r,!1),s))]}}],null,!1,1021180969),model:{value:e.form.interest,callback:function(t){e.$set(e.form,"interest",t)},expression:"form.interest"}}):e._e(),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.interest)}})],1)]),n("div",{staticClass:"flex age_consent"},[n("div",{staticClass:"flex-item ",staticStyle:{"max-width":"1.5em",margin:"0 1em 0 0"}},[n("input",{directives:[{name:"model",rawName:"v-model.numeric",value:e.form.age_consent,expression:"form.age_consent",modifiers:{numeric:!0}}],attrs:{type:"checkbox","true-value":1,"false-value":0},domProps:{checked:Array.isArray(e.form.age_consent)?e._i(e.form.age_consent,null)>-1:e._q(e.form.age_consent,1)},on:{change:function(t){var n=e.form.age_consent,r=t.target,s=r.checked?1:0;if(Array.isArray(n)){var o=null,a=e._i(n,o);r.checked?a<0&&e.$set(e.form,"age_consent",n.concat([o])):a>-1&&e.$set(e.form,"age_consent",n.slice(0,a).concat(n.slice(a+1)))}else e.$set(e.form,"age_consent",s)}}})]),n("div",{staticClass:"flex-item flex-3-quarter",staticStyle:{"align-self":"center",height:"50px","text-align":"left"}},[n("div",{class:{error:e.serverResponseErrors.age_consent}},[e._v("\n                    "+e._s(e.attributes.age_consent||e.placeholders.age_consent)+"\n                    ")])])]),n("div",{staticClass:"flex"},[n("div",{staticClass:"flex-item ",staticStyle:{"max-width":"1.5em",margin:"0 1em 0 0"}},[n("input",{directives:[{name:"model",rawName:"v-model.numeric",value:e.form.communication_consent,expression:"form.communication_consent",modifiers:{numeric:!0}}],attrs:{type:"checkbox","true-value":1,"false-value":0},domProps:{checked:Array.isArray(e.form.communication_consent)?e._i(e.form.communication_consent,null)>-1:e._q(e.form.communication_consent,1)},on:{change:function(t){var n=e.form.communication_consent,r=t.target,s=r.checked?1:0;if(Array.isArray(n)){var o=null,a=e._i(n,o);r.checked?a<0&&e.$set(e.form,"communication_consent",n.concat([o])):a>-1&&e.$set(e.form,"communication_consent",n.slice(0,a).concat(n.slice(a+1)))}else e.$set(e.form,"communication_consent",s)}}})]),n("div",{staticClass:"flex-item flex-3-quarter",staticStyle:{"align-self":"center",height:"50px","text-align":"left"}},[e._v("\n                        "+e._s(e.attributes.communication_consent||e.placeholders.communication_consent)+"\n                    "),n("div",{staticClass:"error",domProps:{textContent:e._s(e.serverResponseErrors.communication_consent)}})])]),n("div",{staticClass:"flex"},[n("div",{staticClass:"flex-item",staticStyle:{"text-align":"center"}},[n("button",{staticClass:"adra-form-submit",attrs:{disabled:e.submitButtonDisabled},on:{click:function(t){return t.preventDefault(),e.submitForm(t)}}},[e._v("\n                        "+e._s(e.attributes.submit_button||e.placeholders.submit_button)+"\n                    ")])])])]):e._e(),e.showThankYou&&e.serverResponse?n("div",[n("h1",[e._v(e._s(e.attributes.thank_you_heading||e.placeholders.thank_you_heading))]),n("h3",[e._v(e._s(e.attributes.thank_you_subheading||e.placeholders.thank_you_subheading))]),n("h3",[e._v(e._s(e.attributes.landing_url||e.currentURL)+"?token="+e._s(e.serverResponse.token||null))])]):e._e()])},i=[],c=(n("7f7f"),n("4a7a")),l=n.n(c),u=n("f62e"),m={name:"Home",components:{vSelect:l.a,VueTelInput:u["a"]},data:function(){return{apiURL:"",showForm:!0,showThankYou:!1,attributes:null,countriesList:null,interestsList:null,communication_preference_options:[{text:"Email",value:"email"},{text:"Phone",value:"phone"}],placeholders:{first_name:"First Name",last_name:"Last Name",email:"Email",communication_preference:"Communication Preference",country:"Choose a Country",zip_code:"Zip Code",age_consent:"By signing this form I confirm I am over 13 years old.",communication_consent:"I agree to receive communications from ADRA. ",interest:"How would you describe your interest ?",country_code:null,submit_button:"Submit",thank_you_heading:"Thank you for your support!",thank_you_subheading:"Make sure to save your advocate link below"},form:{first_name:null,last_name:null,email:null,phone:null,country:null,zip_code:null,age_consent:0,communication_consent:0,communication_preference:null,interest:null,ref_token:null,campaign_token:null,organization_token:null,event_token:null},serverResponse:null,serverResponseErrors:{},submitButtonDisabled:!1}},created:function(){this.attributes=this.$root.$data.shortcodeAttributes},methods:{submitForm:function(){var e=this;this.submitButtonDisabled=!0,axios.post("".concat(this.apiURL,"/api/subscriptions"),this.form).then(function(t){e.serverResponse=t.data,e.showForm=!1,e.showThankYou=!0}).catch(function(t){e.submitButtonDisabled=!1,e.serverResponseErrors={},_.map(t.response.data.errors,function(e,t){return this.serverResponseErrors[t]=e.join()}.bind(e))})},getParams:function(e){var t=new URL(window.location.href);return t.searchParams.get(e)}},computed:{currentURL:function(){return"".concat(location.protocol,"//").concat(location.host).concat(location.pathname)},selectFieldsReady:function(){return!(_.isEmpty(this.countriesList)&&_.isEmpty(this.interestsList))},pageHasReferrerToken:function(){return!!this.getParams("token")}},mounted:function(){var e=this;this.apiURL="//campaigns.adra.org",axios.get("".concat(this.apiURL,"/api/assets/countries?country_code=").concat(this.attributes.country_code)).then(function(t){e.countriesList=_.map(t.data,function(e){return e.name})}),axios.get("".concat(this.apiURL,"/api/assets/interests")).then(function(t){e.interestsList=t.data}),this.form.campaign_token=this.attributes.campaign_token||null,this.form.event_token=this.attributes.event_token||null,this.form.organization_token=this.attributes.organization_token||null,this.pageHasReferrerToken&&(this.form.ref_token=this.getParams("token"))}},p=m,d=(n("ae45"),n("2877")),f=Object(d["a"])(p,a,i,!1,null,null,null),v=f.exports,h={name:"App",components:{CampaignManagerForm:v}},g=h,b=(n("5c0b"),Object(d["a"])(g,s,o,!1,null,null,null)),x=b.exports,y=n("bc3a"),w=n.n(y),C=n("2ef0"),k=n.n(C);window.axios=w.a,window._=k.a,r["a"].config.productionTip=!1,r["a"].config.devtools=!0,document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector("#app");new r["a"]({render:function(e){return e(x)},data:function(){return{shortcodeAttributes:JSON.parse(e.dataset.adra)}}}).$mount("#app")})},"5c0b":function(e,t,n){"use strict";var r=n("e332"),s=n.n(r);s.a},a8fb:function(e,t,n){},ae45:function(e,t,n){"use strict";var r=n("a8fb"),s=n.n(r);s.a},e332:function(e,t,n){}});