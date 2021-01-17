const chaiExpect = require('chai').expect
const Page = require('./page');
var productArray =[]

class ProductDetailsPage extends Page {
  constructor() {
    super()
    this.itemSelected = '//h1'
    this.productPrice = '#our_price_display'
    this.quantity = '#quantity_wanted'
    this.sizeDropdown = '#group_1'
    this.addToCartBtn = '//*[@id="add_to_cart"]/button'
    this.addCartSucMsg = '(//*[@id="layer_cart"]//h2)[1]'
    this.prodNameInCart = '#layer_cart_product_title'
    this.prodSizeColorInCart = '#layer_cart_product_attributes'
    this.prodQuantityInCart = '#layer_cart_product_quantity'
    this.productPriceInCart = '#layer_cart_product_price'
    this.itemPresentInCart = '//*[@class="layer_cart_cart col-xs-12 col-md-6"]//h2/span'
    this.proceedToCheckOutLink = '//a[@title="Proceed to checkout"]'
    this.continueShippingLink = '//a[@title="Continue shopping"]'
  }

  verifyLandingOnProductDetailsPage() {
    this.logToReport('Verify landing on product details page')
    expect(browser).toHaveUrlContaining('product')
  }

  enterProductDetails(productDetails) {
    this.logToReport('Enter product details')
    this.EnterTextValue(this.quantity, productDetails.quantity)
    $(this.sizeDropdown).selectByVisibleText(productDetails.size)
    $('//*[@name="' + productDetails.color + '"]').click()
  }

  clickOnAddToCart(){
    this.logToReport('Click on add to cart')
    $(this.addToCartBtn).click()
  }

  captureProductDetails() {
    const productName = $(this.itemSelected).getText()
    var prodPrice = $(this.productPrice).getText()
    prodPrice= prodPrice.replace(/\$/gi, '')
    console.log('prodPrice',prodPrice)
    const prodQuantity = $(this.quantity).getAttribute('value')
    const prodSize = $('//*[@id="uniform-group_1"]/span').getText()
    const prodColor = $('//*[@class="color_pick selected"]').getAttribute('name')
    var totalPrice = this.calculatePriceBasedOnQuantity(prodQuantity, prodPrice)
    productArray = [productName, prodPrice, prodQuantity, prodSize, prodColor, totalPrice]
    return productArray
  }

  calculatePriceBasedOnQuantity(quantity, price){
    return parseFloat(quantity) * parseFloat(price)
  }


}
module.exports = new ProductDetailsPage();