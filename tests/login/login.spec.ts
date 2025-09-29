import {test, expect} from '@playwright/test'
import {LoginPage} from '../../pageobject/Login/loginPage.ts'
import {AddTransactionPage} from '../../pageobject/Add-TransactionPage/AddTransactionPage.ts'
import { faker } from '@faker-js/faker';
import {NavigateTo} from '../../pageobject/navigate/Navigate.ts'




test('login', async({page}) => {

    const navigateTo = new NavigateTo(page)  // crea una instancia de la clase NavigateTo
    await navigateTo.loginPage()  // llama al metodo loginPage de la clase NavigateTo   

    /*await page.goto ('http://127.0.0.1:5500/login.html')*/

    /*await page.locator('input#username').fill('user')
    await page.locator('input#password').fill('pass')

    await page.locator('//button[@type=\'submit\']').click()*/

    const transactionDate = faker.date.past().toISOString().split('T')[0]; // genera una fecha aleatoria en el pasado en formato YYYY-MM-DD
    const transactionAmount = faker.number.int({min: 100, max: 200}).toString(); // genera un numero aleatorio entre 100 y 200
    const transactionDescription = faker.animal.type(); // genera un tipo de animal aleatorio
    
   
    const loginPage = new LoginPage(page)  // crea una instancia de la clase LoginPage  
    await loginPage.login('user', 'pass')  // llama al metodo login de la clase LoginPage

   /* await loginPage.fillUsername() // llama a los metodos individuales de la clase LoginPage
    await loginPage.fillPassword()
    await loginPage.clickLoginButton()  */
    
    await page.waitForTimeout(500); // Espera 0,5 segundos 


    const addTransactionPage = new AddTransactionPage(page)  // crea una instancia de la clase AddTransactionPage
    await addTransactionPage.addTransaction(transactionDate, transactionAmount, transactionDescription) // llama al metodo addTransaction de la clase AddTransactionPage 


    expect (await addTransactionPage.getActualDate("1")).toEqual(transactionDate) // se compara el resultado esperado con el actual
    expect (await addTransactionPage.getActualAmount("1")).toEqual(transactionAmount) // se compara el resultado esperado con el actual
    expect (await addTransactionPage.getActualDescription("1")).toEqual(transactionDescription) // se compara el resultado esperado con el actual   


/*    await page.locator("//button[contains(text(),'Añadir transacción')]").click()
    await page.locator('id=date').fill('1996-12-25')
    await page.locator('id=amount').fill('3500000')
    await page.locator('id=description').fill('Prueba 1 del curso')
    await page.locator('//button[contains(text ( ), \'Guardar\' )]').click()*/

   /* const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent() // se inicia asercion para comparar con el resultado que se envio
    const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
    const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()*/

    /*expect (actualDate).toEqual(transactionDate) // se compara el resultado esperado con el actual
    expect (actualAmount).toEqual(transactionAmount) // se compara el resultado esperado con el actual
    expect (actualDescription).toEqual(transactionDescription) // se compara el resultado esperado con el actual*/
    


    await page.pause()
});