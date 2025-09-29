import { Locator, Page } from "@playwright/test";


export class ShoppingCartPage {

  private readonly page: Page
  private readonly addToCartButton: Locator
  private readonly viewCartButton: Locator
  private readonly addNamePerson: Locator
  private readonly addEmailPerson: Locator
  private readonly addAddressPerson: Locator
  private readonly infoPaymentLink: Locator
  private readonly cardNumberInput: Locator
  private readonly cardExpiryInput: Locator
  private readonly cardCvcInput: Locator
  private readonly placeOrderButton: Locator

      
  constructor(page: Page) {
    this.page = page;
    this.viewCartButton = page.locator("button#view-cart-btn")
    this.addToCartButton = page.locator("id=checkout-btn")
    this.addNamePerson = page.locator("id=name")
    this.addEmailPerson = page.locator("id=email")
    this.addAddressPerson = page.locator("id=address")
    this.infoPaymentLink = page.locator('a.card-link', { hasText: 'Información de pago' })
    this.cardNumberInput = page.locator("id=card-number")
    this.cardExpiryInput = page.locator("id=card-expiry")
    this.cardCvcInput = page.locator("id=card-cvc")
    this.placeOrderButton = page.locator("id=place-order-btn")
   
  }

  async addProductMultipleTimes(productName: string, times: number) {
    for (let i = 0; i < times; i++) {
      await this.page.locator(`//h5[contains(., '${productName}')]/ancestor::div[contains(@class, 'card-body')]//button`).click();
    }
  }

  async addProduct(productName: string) {
    await this.page.locator(`//h5[contains(., '${productName}')]/ancestor::div[contains(@class, 'card-body')]//button`).click();
  }
    async viewCart() { 
    await this.viewCartButton.click();
  }
 
async getproductQuantities( ) {  
    return {  
    product1Quantity: await this.page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 1')]/ancestor::tr//td[3]").textContent(), // obtiene la cantidad del producto 1 en el carrito    
    product2Quantity: await this.page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 2')]/ancestor::tr//td[3]").textContent(),
    product3Quantity: await this.page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 3')]/ancestor::tr//td[3]").textContent(),
    };
    } // metodo para obtener las cantidades de los productos en el carrito  

    async checkout(name: string, email: string, address: string, cardNumber: string, cardExpiry: string, cardCvc: string) {
        await this.addToCartButton.click() // hace clic en el boton de checkout
        await this.addNamePerson.fill(name) // completa el formulario con datos aleatorios
        await this.addEmailPerson.fill(email)
        await this.addAddressPerson.fill(address)
        await this.page.waitForTimeout(500); // Espera 0,5 segundos
        await this.infoPaymentLink.click()  
        await this.cardNumberInput.fill(cardNumber)
        await this.cardExpiryInput.fill(cardExpiry) // formato MM/AA
        await this.cardCvcInput.fill(cardCvc)
        await this.placeOrderButton.click() 
    } // metodo para completar el formulario de checkout y enviarlo


 
}


/*await page.locator("id=checkout-btn").click() // hace clic en el boton de checkout
    
    await page.locator("id=name").fill(faker.person.firstName()) // completa el formulario con datos aleatorios

    await page.locator("id=email").fill(faker.internet.email())
    await page.locator("id=address").fill(faker.location.streetAddress())

    

    await page.waitForTimeout(500); // Espera 0,5 segundos

    await page.locator('a.card-link', { hasText: 'Información de pago' }).click()


    await page.locator("id=card-number").fill(faker.finance.creditCardNumber())
    await page.locator("id=card-expiry").fill(faker.date.future().toISOString().split('T')[0].slice(0,7).replace('-','/')) // formato MM/AA
    await page.locator("id=card-cvc").fill(faker.finance.creditCardCVV())

    await page.locator("id=place-order-btn").click()

    await expect (page.locator("//h4[contains(.,'Tu compra fue exitosa')]")).toBeVisible() // verifica que el mensaje de compra exitosa sea visible

        */