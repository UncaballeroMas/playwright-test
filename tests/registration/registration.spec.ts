import {test, expect} from '@playwright/test'
import {faker, Sex} from '@faker-js/faker'
import { NavigateTo } from '../../pageobject/navigate/Navigate'
import { RegistrationPage } from '../../pageobject/resgistration/RegistrationPage'

test('registration', async({page}, testInfo) => {


    const defaultName = faker.person.firstName() 
    const defaultLastName = faker.person.lastName() 
    const defaultAge =  faker.number.int({min: 18, max: 60}).toString()
    const defaultCountry = 'Colombia'
    const defaultEmail = faker.internet.email() 
    const defaultSex = 'F'

    const navigateTo = new NavigateTo(page)  // crea una instancia de la clase NavigateTo
    await navigateTo.registerPage()  // llama al metodo registerPage de la clase NavigateTo

    const resgistrationPage = new RegistrationPage(page)  // importa la clase RegistrationPage y crea una instancia de la misma
    await resgistrationPage.register(defaultName, defaultLastName, defaultAge, defaultCountry, defaultEmail, defaultSex) // llama al metodo register de la clase RegistrationPage y le pasa los datos generados por faker
    
    const summaryPage = await resgistrationPage.submitAndWaitForSummary() // llama al metodo submitAndWaitForSummary de la clase RegistrationPage y espera a que se abra la nueva pagina

    await  testInfo.attach('screenshot1', { body: await page.screenshot(),// captura de pantalla y la agrega al reporte
        contentType: 'image/png'})
        
    // await page.pause()

    await summaryPage.waitForLoadState() // espera que la nueva pagina cargue completamente
    await expect(summaryPage).toHaveTitle('Summary') // verifica que el titulo de la nueva pagina sea Summary

    expect(await resgistrationPage.getCurrentFormData(summaryPage)).toEqual({
        name: expect.stringContaining(defaultName),
        lastName: expect.stringContaining(defaultLastName),
        age: expect.stringContaining(defaultAge),
        country: expect.stringContaining(defaultCountry),
        email: expect.stringContaining(defaultEmail),
        sex: expect.stringContaining(defaultSex)
    }); // verifica que los datos mostrados en la nueva pagina sean los mismos que se ingresaron en el formulario   

      //await summaryPage.screenshot({path: 'screenshots/screenshots2.png', fullPage: true}) // captura de pantalla
    
      await  testInfo.attach('screenshot2', { body: await summaryPage.screenshot(),// captura de pantalla y la agrega al reporte
        contentType: 'image/png'})
        
    //await page.pause()
















})
