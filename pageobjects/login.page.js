const Page = require('./page');
const chaiExpect = require('chai').expect
var randomEmail = require('random-email');



/**
 * sub page containing specific selectors and methods for a specific page
 */
class CreateAnAccountPage extends Page {

  constructor() {
    super()
    this.pageHeader = '//h1[contains(text(), "Authentication")]'
    this.pageSubHeader = '//*[@id="create-account_form"]/h3'
    this.pageSubHeader2 = '//*[@id="login_form"]/h3'
    this.message = '//*[@id="create-account_form"]//div/p'
    this.emailInput = '#email_create'
    this.createAnActBtn = '#SubmitCreate'
    this.errorCode = '#create_account_error'
    this.errorMessage = '//*[@id="create_account_error"]//li'
    this.forgotPwdLink = '//a[.="Forgot your password?"]'
    this.signInEmail = '#email'
    this.signInPwd = '#passwd'
    this.loginBtn = '#SubmitLogin'

  }

  /**
   * Verify landing on the login page
   * verifies the header, subHeader, links and message
   */
  verifyLanding() {
    this.logToReport('Verify landing on create account page')
    expect($(this.pageHeader)).toHaveText('AUTHENTICATION')
    expect($(this.pageSubHeader)).toHaveText('CREATE AN ACCOUNT')
    expect($(this.pageSubHeader2)).toHaveText('ALREADY REGISTERED?')
    expect($(this.forgotPwdLink)).toBePresent()
    expect($(this.message)).toHaveText('Please enter your email address to create an account.')
  }

  enterExistingEmail(email){
    this.enterEmailAddress(email)
    this.clickCreateActBtn()
  }

  /**Generates a random email id for account creation */
  registerUserToWebsite() {
    this.logToReport('Create An Account')
    var email = randomEmail({ domain: 'gmail.com' })
    this.enterEmailAddress(email)
    this.clickCreateActBtn()
    return email
  }

  enterEmailAddress(email) {
    this.logToReport('Enter email address')
    $(this.emailInput).isDisplayed({ timeout: 45000 })
    $(this.emailInput).setValue(email)
  }

  clickCreateActBtn() {
    this.logToReport('Click on submit')
    $(this.createAnActBtn).click()
  }

  /**
   * Verifies the error message if the email entered by user is already registered to website
   * @param {*} ErrMsg : Error message displayed on the screen
   */
  validateError(ErrMsg) {
    if ($(this.errorCode).isExisting({ timeout: 45000 })) {
      this.logToReport('Validate Email is already registered with application')
      chaiExpect(($(this.errorMessage)).getText()).to.equal(ErrMsg)
      console.log('Error Message:=>', $(this.errorMessage).getText())
    }
  }

  /** Login to an application with registered user */
  loginToApplication(userDetails) {
    this.logToReport('Login with registered Email:' + userDetails.email + ' Password:' + userDetails.password)
    this.EnterTextValue(this.signInEmail, userDetails.email)
    this.EnterTextValue(this.signInPwd, userDetails.password)
    this.clickSignInBtn()
  }

  clickSignInBtn() {
    this.logToReport('Click on sign in')
    $(this.loginBtn).click()
  }



}

module.exports = new CreateAnAccountPage();
