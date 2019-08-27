##Adra Network Campaign Manager Plugin

Wordpress plugin

It uses a shortcode like the following 

``[campaign-manager parameter1="value" parameter2="value2"]``

It then displays a registration form allowing the user to register to a campaign via 
an API calls to Campaign Manager API

Some parameters are optional and some are required for the plugin to work



## Shortcode Parameters

 **first_name**

>  -  Placeholder text for "First Name" Input
 > -	Default | _First Name_
 >  - NULLABLE

**last_name** 

 >  -  Placeholder text for "Last Name" Input
 > -	Default | _Last Name_
 >  - NULLABLE
 

**email** 

 >  -  Placeholder text for "Email" Input
 > -	Default | _Email_
 >  - NULLABLE

 
**communication_preference**

 >  -  Placeholder text for "Communication preference" Select Field
 > -	Default | _Communication preference_
 >  - NULLABLE
 

**country**
 >  -  Placeholder text for "Country" Input
 > -	Default | _Choose a Country_
 >  - NULLABLE

**zip_code**

>  -  Placeholder text for "Zip Code" Input
 > -	Default | _Zip Code_
 >  - NULLABLE
 
 **interest** 
 
  >  -  Placeholder text for "Interest" Select Fields
  > -	Default | _How would you describe your interest ?_
  >  - NULLABLE

**age_consent**

 >  -  Text next to the age consent checkbox
 > -	Default | _By signing this form I confirm I am over 13 years old._
 >  - NULLABLE

**communication_consent** 

 >  -  Text next to the communication consent checkbox
 > -	Default | _I agree to receive communications from ADRA._
 >  - NULLABLE



**submit_button**

 >  -  Text for  submit button
 > -	Default | _Submit_
 >  - NULLABLE
 
 **thank_you_heading**
 
  >  -  Text for the "Thank You" heading after successfull registration
  > -	Default | _Thank you for your support!_
  >  - NULLABLE

**thank_you_subheading**

  >  -  Text for the "Thank You" subheading after successfull registration
  > -	Default | _Make sure to save your advocate link below_
  >  - NULLABLE

**country_code**

 >  -  Country code ( ISO 3166 -> Alpha3) allowing too push the country to the top of the Country Select field
 >   - Default | *null*
  >  - NULLABLE

**campaign_token**

 >  - Token of the campaign the user is gonna be subscribed to.
 >  - REQUIRED  

**organization_token**

 >  -  Token of the organization the user subscriptions is gonna be register under.
 >  - REQUIRED

**event_token**

 >  -  Token of the eventthe user subscriptions is gonna be register under.
 >  - Default | *null*
 >  - NULLABLE

**landing_url**

 >  -  URL where the form (shortcode) is present, will be used to generate the new user referral link
 >  -  Defaut | *Current page URL where the shortcode is inserted*
 >  - REQUIRED

**enable_phone**

 >  -  Enables the "Phone" input field
 >  - Default | *False*
  >  - NULLABLE

##Example
**The following shortcode** 

``[campaign-manager email="Enter Email" first_name="Enter First Name" last_name="Enter Last Name" zip_code="Enter ZIP Code" country="Choose your Country" communication_preference="Communication preference" campaign_token="Dnjb0lUhskKqXxHcrkcA" organization_token="rg773jMkuVo1CbEubgky" submit_button="Support the cause!" landing_url="https://inschool.adra.org/" country_code="CAN" enable_phone="true"  interest="What is your main interest?"  communication_consent="I want ADRA to communicate with me in the future" age_consent='I certify that I am over 13 years old']``

**Would generate** 

![enter image description here](https://i.imgur.com/kxMLVco.png)
