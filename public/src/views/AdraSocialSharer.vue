<template>
    <social-sharing :url="generatedReferralLink" hashtags="EveryChildEverywhere" inline-template>
        <div>
            <div class="pure-g" style="margin-top: 1em; display:flex; justify-content: space-evenly">
                <div class="" style="display:flex; justify-content: space-evenly">
                    <network network="facebook">
                        <svg fill="#fff" role="img" width="24" height="24" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg"><title>Facebook icon</title>
                            <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"/>
                        </svg>
                    </network>
                </div>
                <div class="" style="display:flex; justify-content: center">
                    <network network="twitter">
                        <svg fill="#fff" role="img" width="24" height="24" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg"><title>Twitter icon</title>
                            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                        </svg>
                    </network>
                </div>
                <div class="" style="display:flex; justify-content: center">
                    <network network="whatsapp">
                        <svg fill="#fff" role="img" width="24" height="24" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg"><title>WhatsApp icon</title>
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                    </network>
                </div>
                <div class="" style="display:flex; justify-content: center">
                    <network network="email">
                        <svg fill="#fff" role="img" width="24" height="24" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg"><title>Gmail icon</title>
                            <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"/>
                        </svg>
                    </network>
                </div>
            </div>
        </div>
    </social-sharing>
</template>
<script>
  export default {
    name: 'AdraSocialSharer',
    props: {
      generatedReferralLink: {}
    }
  }
</script>
<style lang="css">
    .adra-campaign-manager-form input[type="text"],
    div.adra-plugin div.input-phone input[type="tel"] {
        border-radius: 4px;
        width: 100%;
    }

    .adra-campaign-manager-form input[type="text"] {
        min-height: 42px;
    }

    .pure-g > div {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    @media only screen and (max-width: 600px) {
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

    div.adra-plugin div.input-phone input[type="tel"] {
        height: auto !important;
        border: none;
        width: 0;
        flex: auto;
    }

    div.adra-plugin form#adra-campaign-manager input:not('vs__search') {
        border: 1px #B4B4B4 solid !important;
        height: 55px !important;
    }

</style>