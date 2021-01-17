const chaiExpect = require('chai').expect
const Page = require('./page');

class ShippingPage extends Page {
  constructor() {
    super()
    this.pageHeader = '//h1'
    this.termsOfServiceCheckBox = '#cgv'
    this.shippingPrice = '//div[@class="delivery_option_price"]'
    this.proceedToCheckOut = '//button[@name="processCarrier"]/span'

  }

  verifyLanding() {
    this.logToReport('Verify landing on shipping page')
    $(this.pageHeader).isExisting({ timeout: 45000 })
    expect($(this.pageHeader)).toHaveText('SHIPPING')
  }

  selectTermsOfServiceCheckBox(){
      this.logToReport('Tick "Terms of service" check box')
      $(this.termsOfServiceCheckBox).click()
  }

  getShippingPrice(){
     var shipPrice= $(this.shippingPrice).getText()
     shipPrice = shipPrice.replace(/$/g,"")
     return shipPrice
  }

  clickProceedToCheckOutLink(){
    this.logToReport('Click proceed to check out link on - Shipping page')
    $(this.proceedToCheckOut).click()
  }


}
module.exports = new ShippingPage();