const chaiExpect = require('chai').expect
const Page = require('./page');

class PaymentsPage extends Page {
  constructor() {
    super()
    this.pageHeader = '//h1'
    this.prodNameOnPmtsPage = '//p[@class="product-name"]/a'
    this.prodColorSizeOnPmtsPage = '//p[@class="product-name"]/../small/a'
    this.prodUnitPrice = '//td[@data-title="Unit price"]/span/span'
    this.prodQuantity = '//*[@class="cart_quantity text-center"]/span'
    this.prodTotalPrice = '//td[@data-title="Total"]/span'
    this.totalProdcutPrice = '#total_product'
    this.totalShippingPrice = '#total_shipping'
    this.totalPriceContainer = '#total_price_container span'

  }

  verifyLanding() {
    $(this.pageHeader).isExisting({ timeout: 45000 })
    this.logToReport('Verify landing on payments page')
    expect($(this.pageHeader)).toHaveText('PLEASE CHOOSE YOUR PAYMENT METHOD')
  }
  
  /**click on the product/item present in search result*/
  verifyProductDetailsOnPaymentsPage(productDetailsArray, shipPrice){
    this.logToReport('Validate product details on payments page')
    //Verify product name
    expect($(this.prodNameOnPmtsPage)).toHaveText(productDetailsArray[0])
    console.log('Product Name verified as:', productDetailsArray[0])
    
    //Verify UnitPrice of product
    var unitPrice = $(this.prodUnitPrice).getText()
    unitPrice = unitPrice.replace(/\$/gi, '')
    chaiExpect(unitPrice).to.equal(productDetailsArray[1])
    console.log('Product unit price verified as:', productDetailsArray[1])
    
    //Verify quantity of product
    expect($(this.prodQuantity)).toHaveText(productDetailsArray[2])
    console.log('Product quantity verified as:', productDetailsArray[2])
    
    //Verify color & size of product
    var colorSize = $(this.prodColorSizeOnPmtsPage).getText()  
    var color = colorSize.split(",")[0]   
    color = color.split(":")[1]
    color = color.trim()
    var size = colorSize.split(",")[1]   
    size = size.split(":")[1]
    size = size.trim()
    chaiExpect(size).to.equal(productDetailsArray[3])
    chaiExpect(productDetailsArray[4]).to.equal(productDetailsArray[4])
    console.log('Product color & size verified as:', size, color)
    
    //Verify total price of product (quantity * UnitPrice)
    var prodTotalPrice = $(this.prodTotalPrice).getText()
    prodTotalPrice = prodTotalPrice.replace(/\$/gi, '')
    var totalProductPrice = $(this.totalProdcutPrice).getText()
    totalProductPrice= totalProductPrice.replace(/\$/gi, '')
    chaiExpect(prodTotalPrice).to .equal(JSON.stringify(productDetailsArray[5]))
    chaiExpect(totalProductPrice).to.equal(JSON.stringify(productDetailsArray[5]))
    console.log('Product total price - (quantity * UnitPrice) verified as:', productDetailsArray[5])

    //Verify Total price of product ((quantity * UnitPrice) + ShippingPrice)
    var gTotal = $(this.totalPriceContainer).getText()
    gTotal = gTotal.replace(/\$/gi, '')
    var shipPrice = shipPrice.replace(/\$/gi, '')
    var grandTotal = productDetailsArray[5] + parseFloat(shipPrice)
    chaiExpect(gTotal).to.equal(JSON.stringify(grandTotal))
    console.log('Total shipping price - ((quantity * UnitPrice) + ShippingPrice) verified as:', grandTotal)
    
    $(this.prodQuantity).scrollIntoView()
    this.attachScreenShotToReport('PaymentsPageScreenShot','paymentsPage')
  }

}
module.exports = new PaymentsPage();