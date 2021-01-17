const chaiExpect = require('chai').expect
const Page = require('./page');

class AddressPage extends Page {
  constructor() {
    super()
    this.pageHeader = '//h1'
    this.proceedToCheckOut = '//button[@name="processAddress"]/span'

  }

  verifyLanding() {
    this.logToReport('Verify landing on address page')
    $(this.pageHeader).isExisting({ timeout: 45000 })
    expect($(this.pageHeader)).toHaveText('ADDRESSES')
  }

  clickProceedToCheckOutLink(){
    this.logToReport('Click proceed to check out link on - Address page')
    $(this.proceedToCheckOut).click()
  }


}
module.exports = new AddressPage();