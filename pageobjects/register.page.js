const Page = require('./page');
const chaiExpect = require('chai').expect
const chaiAssert = require('chai').assert


/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterPage extends Page {

    constructor() {
        super()
        this.pageHeader = '//h1'
        this.pageSubHeader = '//h3'
        this.mrTitle = '#id_gender1'
        this.mrsTitle = '#id_gender2'
        this.registerBtn = '#submitAccount'

        //The xpath validates both label and ID of First Name, Last Name etc.. 
        //(In this case selecting just an ID is not suitable as we have to validate both label & fileds)
        this.firstName = '//label[.="First name *"]/following-sibling::input[@id="customer_firstname"]'
        this.lastName = '//label[.="Last name *"]/following-sibling::input[@id="customer_lastname"]'
        this.email = '//label[.="Email *"]/following-sibling::input[@id="email"]'
        this.password = '//label[.="Password *"]/following-sibling::input[@id="passwd"]'
        this.dobDropDown = '//label[.="Date of Birth"]/following-sibling::div//'
        this.signUpNewsLetter = '#newsletter'
        this.specialOffer = '#optin'
        this.company = '//label[.="Company"]/following-sibling::input[@id="company"]'
        this.address = '//label[.="Address *"]/following-sibling::input[@id="address1"]'
        this.adressLine2 = '//label[.="Address (Line 2)"]/following-sibling::input[@id="address2"]'
        this.city = '//label[.="City *"]/following-sibling::input[@id="city"]'
        this.state = '//label[.="State *"]/following-sibling::div//select'
        this.postalCode = '//label[.="Zip/Postal Code *"]/following-sibling::input[@id="postcode"]'
        this.country = '//label[.="Country *"]/following-sibling::div//select'
        this.additionalInfo = '//label[.="Additional information"]/following-sibling::textarea[@id="other"]'
        this.homePhone = '//label[.="Home phone"]/following-sibling::input[@id="phone"]'
        this.mobilePhone = '//label[.="Mobile phone *"]/following-sibling::input[@id="phone_mobile"]'
        this.addressAlias = '//label[.="Assign an address alias for future reference. *"]/following-sibling::input[@id="alias"]'
        this.addFirstName = '//label[.="First name *"]/following-sibling::input[@id="firstname"]'
        this.addLastName = '//label[.="Last name *"]/following-sibling::input[@id="lastname"]'

    }

    /**
     * Verify landing on registration page
     * verifies the Header and SubHeader
     */
    verifyLanding() {
        this.logToReport('Verify landing on registration page')
        $(this.pageSubHeader).isDisplayed({ timeout: 45000 })
        expect($(this.pageHeader)).toHaveText('CREATE AN ACCOUNT')
        expect($(this.pageSubHeader)).toHaveText('YOUR PERSONAL INFORMATION')
    }
    
    /**Fill in all user personal information required for registration */
    enterUserDetails(userDetails, email) {
        this.logToReport('Fill Personal Information')
        this.selectTitle(userDetails.userTitle)
        this.EnterTextValue(this.firstName, userDetails.firstName)
        this.EnterTextValue(this.lastName, userDetails.lastName)
        this.verifyEmailIsAutoPopulated(email)
        this.EnterTextValue(this.password, userDetails.password)
        $(this.dobDropDown + 'select[@id="days"]').selectByAttribute('value', userDetails.day)
        $(this.dobDropDown + 'select[@id="months"]').selectByAttribute('value', userDetails.month)
        $(this.dobDropDown + 'select[@id="years"]').selectByAttribute('value', userDetails.year)
        this.optForNewsLetter(userDetails.newsLetter)
        this.optForSpecialOffer(userDetails.receiveSpclOffer)
        this.enterUserAddressDetails(userDetails)
    }
    
    /** Fill in all user address information required for registration */
    enterUserAddressDetails(userDetails) {
        this.enterAddressFirstNameLLastName(userDetails)
        this.enterCompanyDetails(userDetails)
        this.EnterTextValue(this.address, userDetails.address)
        $(this.country).selectByVisibleText(userDetails.country)
        $(this.state).selectByVisibleText(userDetails.state)
        this.EnterTextValue(this.city, userDetails.city)
        this.EnterTextValue(this.postalCode, userDetails.postalCode)
        this.enterAdditionalInformation(userDetails)
        this.enterHomephone(userDetails)
        this.EnterTextValue(this.mobilePhone, userDetails.mobilePhone)
        this.EnterTextValue(this.addressAlias, userDetails.aliasAddress)
    }

    enterAddressFirstNameLLastName(userDetails) {
        //Enter FirstName & LastName in address section 
        //if the user wants to input different addressFirstName & addressLastName
        if (userDetails.hasOwnProperty("addFirstName")) {
            this.EnterTextValue(this.addFirstName, userDetails.addFirstName)
            this.EnterTextValue(this.addLastName, userDetails.addLastName)
        }
    }

    enterCompanyDetails(userDetails) {
        //Enter company details only if the user has company details in data file
        if (userDetails.hasOwnProperty("company")) {
            this.EnterTextValue(this.company, userDetails.company)
        }
    }

    enterAdditionalInformation(userDetails) {
        //Enter additional information if the user have it in the test data
        if (userDetails.hasOwnProperty("additionalInfo")) {
            this.EnterTextValue(this.additionalInfo, userDetails.additionalInfo)
        }
    }

    optForNewsLetter(newsLetter) {
        //Select news letter checkbox if user gives the input as 'Y'
        if (newsLetter === 'Y') {
            $(this.signUpNewsLetter).click()
        }
    }

    enterHomephone(userDetails) {
        //Enter Home Phone if the user have it in the test data
        if (userDetails.hasOwnProperty("homePhone")) {
            this.EnterTextValue(this.homePhone, userDetails.homePhone)
        }
    }

    optForSpecialOffer(spclOffer) {
        //Select special offer checkbox if user gives the input as 'Y'
        if (spclOffer === 'Y') {
            $(this.specialOffer).click()
        }
    }
    
    /** Select title based on the user input */
    selectTitle(title) {
        if (title === 'Mr.') {
            $(this.mrTitle).click()
        } else {
            $(this.mrsTitle).click()
        }
    }
    
    /**Verifies email is auto populated properly on the registration page*/
    verifyEmailIsAutoPopulated(email) {
        $(this.email).isExisting({ timeout: 45000 })
        const mail = $(this.email).getAttribute('value')
        chaiExpect(mail).to.equal(email)
    }


    clickOnRegister() {
        this.logToReport('Click on Register Button')
        $(this.registerBtn).click()
    }


}
module.exports = new RegisterPage();