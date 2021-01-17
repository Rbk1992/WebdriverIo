const chaiExpect = require('chai').expect
const Page = require('./page');

class SearchPage extends Page {
  constructor() {
    super()
    this.categoryName = '//*[@class="category-name"]'
  }

  /**Verifies the user is landed on serach category - T-shirts*/
  verifyNavigationToTshirtsPage() {
    $(this.categoryName).isExisting({ timeout: 45000 })
    expect($(this.categoryName)).toHaveText('T-shirts')
  }
  
  /**click on the product/item present in search result*/
  clickOnProduct(item) {
    $('//*[@alt="' + item + '"]').click()
  }


}
module.exports = new SearchPage();