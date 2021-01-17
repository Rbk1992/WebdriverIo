const chaiExpect = require('chai').expect
const Page = require('./page');

class ShoppingCartSummaryPage extends Page {
  constructor() {
    super()
    this.pageHeader = '//h1[@id="cart_title"]'
    this.proceedToCheckOut = '//*[@id="HOOK_SHOPPING_CART"]/following-sibling::p/a[@title="Proceed to checkout"]'
  }

  
  verifyLanding() {
    this.logToReport('Verify landing on shopping-cart summary page')
    $(this.pageHeader).isExisting({ timeout: 45000 })
    expect($(this.pageHeader)).toHaveTextContaining('SHOPPING-CART SUMMARY')
  }

  clickProceedToCheckOutLink(){
    this.logToReport('Click proceed to check out link on - ShoppingCart summary page')
    $(this.proceedToCheckOut).click()
  }


}
module.exports = new ShoppingCartSummaryPage();