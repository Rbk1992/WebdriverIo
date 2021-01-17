const { addStep } = require('@wdio/allure-reporter').default
const { addAttachment } = require('@wdio/allure-reporter').default

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
   /* open() {
        return browser.url('/index.php')
    } */

    get signInBtn() {
        return $('//*[@class="login"]')
    }

    /**
   * Click sign in button
   */
    clickSignIn() {
        this.signInBtn.click()
    }

    /**Refresh the application */
    refreshApplication() {
        browser.refresh()
    }

    /**Add information to the report*/
    logToReport(step) {
        addStep(step)
        console.log(step)
    }

    /** Add screen shot to allure report*/
    attachScreenShotToReport(message, name){
        var screenShot =browser.saveScreenshot('./screenShot/'+name+'.png')
        addAttachment(message, new Buffer.from(screenShot, 'base64'), 'img/png')
    }

    /**
     * Input value into the text field
     * @param {*} elem : Locator for the input field
     * @param {*} value : Value to be set
     */
    EnterTextValue(elem, value) {
        $(elem).setValue(value)
    }

}
