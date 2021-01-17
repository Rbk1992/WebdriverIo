const chaiExpect = require('chai').expect
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    constructor() {
        super()
        this.pageHeader = '//h1'
        this.myActName = '//*[@title="View my customer account"]/span'
        this.signOut = '//*[@title="Log me out"]'
        this.myAccountLinks = '//*[@class ="myaccount-link-list"]/li/a//span'
        this.womenLink = '//*[@title="Women"]'
        this.tshirtLinkInWomen = '//*[@title="T-shirts"]'
        this.viewMyCart = '//*[@title="View my shopping cart"]'
        this.removeProductFromCart = '//*[@title="remove this product from my cart"]'
    }

    verifyLanding() {
        this.logToReport('Verify landing on the login page')
        expect($(this.pageHeader)).toHaveText('MY ACCOUNT')
        expect($(this.signOut)).toBePresent()

    }
    
    /**Verifies the link present under 'My Accounts' section*/
    verifyLinksOnMyAccount(links) {
        this.logToReport('Verify links on the login page')
        const lists = []
        $$(this.myAccountLinks).map(function (elem) {
            lists.push(elem.getText())
        })
        chaiExpect(lists).to.deep.equal(links)
    }

    /** Validates the user name & last name post login */
    validateUserName(userDetails) {
        this.logToReport('Validate userName post login')
        chaiExpect(($(this.myActName)).getText()).to.equal(userDetails.firstName + ' ' + userDetails.lastName)
    }

    clickLogout() {
        this.logToReport('Logout')
        $(this.signOut).click()
    }

    /**Hover the mouse on 'Women' Link*/
    mouseHoverToWomenLink() {
        $(this.womenLink).moveTo()
    }

    /**Clicks on T-shirts link*/
    clickOnTshirtsLink() {
        $(this.tshirtLinkInWomen).isExisting({ timeout: 45000 })
        $(this.tshirtLinkInWomen).click()
    }

    validateCartisEmpty(){
        $(this.viewMyCart).moveTo()
        if($(this.removeProductFromCart).isExisting()){
            $(this.removeProductFromCart).click()
            expect($('//*[contains(text(), "(empty)")]/../../a[@title="View my shopping cart"]')).toBePresent()
        }else{
            expect($('//*[contains(text(), "(empty)")]/../../a[@title="View my shopping cart"]')).toBePresent()
        }  
    }
}

module.exports = new HomePage();
