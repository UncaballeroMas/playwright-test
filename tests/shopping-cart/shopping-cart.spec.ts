import {test, expect} from '@playwright/test'
import { NavigateTo } from '../../pageobject/navigate/Navigate'
import {faker} from '@faker-js/faker'
import { ShoppingCartPage } from '../../pageobject/shopping-cardPage/ShoppingCardPage'


test('buying new products', async({page}) => {

    const name = faker.person.firstName()
    const email = faker.internet.email()
    const address = faker.location.streetAddress()
    const cardNumber = faker.finance.creditCardNumber()
    const cardExpiry = faker.date.future().toISOString().split('T')[0].slice(0,7).replace('-','/') // formato MM/AA
    const cardCvc = faker.finance.creditCardCVV()

   const navigateTo = new NavigateTo(page)  // crea una instancia de la clase NavigateTo
   await navigateTo.shoppingCardPage()  // llama al metodo shoppingCardPage de la clase NavigateTo


    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.addProductMultipleTimes('Producto 1', 50);
    await shoppingCartPage.addProduct('Producto 2');
    await shoppingCartPage.addProduct('Producto 3');

    await shoppingCartPage.viewCart();
  
      expect (await shoppingCartPage.getproductQuantities()).toEqual({ product1Quantity: '50', product2Quantity: '1', product3Quantity: '1' });  // verifica que las cantidades de los productos sean correctas

    
   
    await shoppingCartPage.checkout( name, email, address, cardNumber, cardExpiry, cardCvc) // completa el formulario de checkout con datos aleatorios

    await expect (page.locator("//h4[contains(.,'Tu compra fue exitosa')]")).toBeVisible() // verifica que el mensaje de compra exitosa sea visible

   // await page.pause()



    
    












































    /*for (let i = 0; i <=5; i++) {  // recarga la pagina 5 veces para que los productos cambien de posicion
        await page.locator("//h5 [contains(., 'Producto 1')]/ancestor::div[contains(@class, 'card-body')]//button").click()
    }
    
    await page.locator("//h5 [contains(., 'Producto 2')]/ancestor::div[contains(@class, 'card-body')]//button").click()
    await page.locator("//h5 [contains(., 'Producto 3')]/ancestor::div[contains(@class, 'card-body')]//button").click() 


    await page.locator("button#view-cart-btn").click()


    const product1Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 1')]/ancestor::tr//td[3]").textContent() // obtiene la cantidad del producto 1 en el carrito   
    const product2Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 2')]/ancestor::tr//td[3]").textContent() 
    const product3Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(., 'Producto 3')]/ancestor::tr//td[3]").textContent()

    expect (product1Quantity).toEqual('6')  // verifica que la cantidad de productos 1 sea 6
    expect (product2Quantity).toEqual('1')
    expect (product3Quantity).toEqual('1')  

    await page.locator("id=checkout-btn").click() // hace clic en el boton de checkout
    
    await page.locator("id=name").fill(faker.person.firstName()) // completa el formulario con datos aleatorios

    await page.locator("id=email").fill(faker.internet.email())
    await page.locator("id=address").fill(faker.location.streetAddress())

    

    await page.waitForTimeout(500); // Espera 0,5 segundos

    await page.locator('a.card-link', { hasText: 'Información de pago' }).click()


    await page.locator("id=card-number").fill(faker.finance.creditCardNumber())
    await page.locator("id=card-expiry").fill(faker.date.future().toISOString().split('T')[0].slice(0,7).replace('-','/')) // formato MM/AA
    await page.locator("id=card-cvc").fill(faker.finance.creditCardCVV())

    await page.locator("id=place-order-btn").click()

    await expect (page.locator("//h4[contains(.,'Tu compra fue exitosa')]")).toBeVisible() // verifica que el mensaje de compra exitosa sea visible */


})
