const chaiExpect = require('chai').expect
const Page = require('./page');

class AddToCartModalPage extends Page {
  constructor() {
    super()
    this.addCartSucMsg = '(//*[@id="layer_cart"]//h2)[1]'
    this.prodNameInCart = '#layer_cart_product_title'
    this.prodSizeColorInCart = '#layer_cart_product_attributes'
    this.prodQuantityInCart = '#layer_cart_product_quantity'
    this.productPriceInCart = '#layer_cart_product_price'
    this.itemPresentInCart = '//*[@class="layer_cart_cart col-xs-12 col-md-6"]//h2/span'
    this.proceedToCheckOutLink = '//span[contains(text(), "Proceed to checkout")]'
    this.continueShippingLink = '//a[@title="Continue shopping"]'
  }

  validateProductIsAddedToCart(){
     expect($(this.addCartSucMsg)).toHaveText('Product successfully added to your shopping cart')
     this.logToReport('Product is successfully added to cart')
  }

  clickProceedToCheckOutLink(){
      this.logToReport('Click proceed to check out link on - AddToCart Modal Page')
      $(this.proceedToCheckOutLink).click()
  }


}
module.exports = new AddToCartModalPage();