jQuery( function( $ ) {
  // Add space for Elementor Menu Anchor link

  let counterElement;
  if (pageHasCounterElement()) {
    console.log('counter present')

    const campaignToken = counterElement.dataset.campaignToken || 'wDHfuweuy4PKYP9hHQcl'
    console.log('campaign token is', campaignToken)
    // headingElement.classList.toggle('elementor-hidden')
    counterElement.style.opacity = '0'
    counterElement.style.transition = 'all 0.5s'

    const originalInnerCountertext = counterElement.innerText;
    let totalCount;
    let finalInnerCounterText;
    console.log('inner text', originalInnerCountertext)
    fetch('https://campaigns.adra.cloud/api/campaigns/' + campaignToken + '/count')
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(campaign => {
        console.log('stats', campaign.stats)
        totalCount = campaign.stats.total_subscriptions
        finalInnerCounterText = totalCount + ' ' + originalInnerCountertext
        console.log('final text', finalInnerCounterText)

        counterElement.innerText = finalInnerCounterText
        counterElement.style.opacity = '1'
        // headingElement.classList.toggle('elementor-hidden')

      })
      .catch(function (error) {
        totalCount = null
        finalInnerCounterText = ''
        console.error(error);
      });

  }

  function pageHasCounterElement () {

    counterElement = document.querySelector('.js-adra-campaign-manager-counter');
    if (!counterElement) {

      return false;
    }
    return true;
  }
});