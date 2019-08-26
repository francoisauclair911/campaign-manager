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
 > -	Default | First Name
 >  - NULLABLE

**last_name** 

 >  -  Placeholder text for "Last Name" Input
 > -	Default | Last Name
 >  - NULLABLE
 

**email** 

 >  -  Placeholder text for "Email" Input
 > -	Default | Email
 >  - NULLABLE

**phone**

 >  -  Placeholder text for "Phone" Input
 > -	Default | Phone Number
 >  - NULLABLE
 
 
**communication_preference**

 >  -  Placeholder text for "Communication preference" Select Field
 > -	Default | Communication preference
 >  - NULLABLE
 

**country**
 >  -  Placeholder text for "Country" Input
 > -	Default | Choose a Country
 >  - NULLABLE

**zip_code**

>  -  Placeholder text for "Zip Code" Input
 > -	Default | Zip Code
 >  - NULLABLE

**age_consent**

 >  -  Text next to the age consent checkbox
 > -	Default | By signing this form I confirm I am over 13 years old.
 >  - NULLABLE

**communication_consent** 

 >  -  Text next to the communication consent checkbox
 > -	Default | I agree to receive communications from ADRA.
 >  - NULLABLE

**interest** 

 >  -  Placeholder text for "Interest" Select Fields
 > -	Default | How would you describe your interest ?
 >  - NULLABLE

**submit_button**

 >  -  Text for  submit button
 > -	Default | Submit
 >  - NULLABLE

**country_code**

 >  -  Country code ( ISO 3166 ) allowing too push the country to the top of the Country Select field
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

