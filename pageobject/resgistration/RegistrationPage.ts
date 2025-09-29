import { Sex } from '@faker-js/faker'
import {Locator, Page } from '@playwright/test'


export class RegistrationPage {

private readonly addName: Locator
private readonly addLastName: Locator
private readonly addAge: Locator
private readonly addCountry: Locator
private readonly addEmail: Locator
private readonly page: Page
private readonly addHobbies: Locator
private readonly addPicture: Locator
private readonly submitButton: Locator

  

constructor ( page: Page) {
    this.page = page
    this.addName = page.locator("id=name")
    this.addLastName = page.locator("id=last-name")
    this.addAge = page.locator("//label[contains(text(),'Edad')]/following-sibling::input") // identifica el input a partir del label
    this.addCountry = page.locator("id=country")
    this.addEmail = page.locator("id=email")
    this.addHobbies = page.locator("id=wednesday")
    this.addPicture = page.locator("id=picture")
    this.submitButton = page.locator("id=save-btn") 

  
} // constructor defiene los selectores de los elementos de la pagina

    
async register (defaultName: string, defaultLastName: string, defaultAge: string, defaultCountry: string, defaultEmail: string, defaultSex: string ) {  
    await this.addName.fill(defaultName)
    await this.addLastName.fill(defaultLastName)
    await this.addAge.fill(defaultAge) 
    await this.addCountry.selectOption(defaultCountry)
    await this.page.locator(`input[value='${defaultSex}']`).click() // selecciona el radio button por su valor
    await this.addEmail.fill(defaultEmail)
    await this.addHobbies.click()  
    await this.addPicture.setInputFiles('./images/Sofjon.jpg') // carga de archivos
    await this.submitButton.click() 
}   // metodo para completar el formulario de registro y enviarlo 

async submitAndWaitForSummary(): Promise<Page> {
  const [summaryPage] = await Promise.all([
    this.submitButton.page().waitForEvent('popup'),
    this.submitButton.click()
  ]);
  await summaryPage.waitForLoadState();
  return summaryPage;
}// 

async getCurrentFormData(summaryPage: Page) {
  return {
    name: await summaryPage.locator("//strong[contains(.,'Nombre')]/ancestor::p").textContent(),
    lastName: await summaryPage.locator("//strong[contains(.,'Apellido')]/ancestor::p").textContent(),
    age: await summaryPage.locator("//strong[contains(.,'Edad')]/ancestor::p").textContent(),
    country: await summaryPage.locator("//strong[contains(.,'País')]/ancestor::p").textContent(),
    email: await summaryPage.locator("//strong[contains(.,'Correo electrónico:')]/ancestor::p").textContent(),
    sex: await summaryPage.locator("//strong[contains(.,'Sexo')]/ancestor::p").textContent()
  };
} // metodo para obtener los datos actuales del formulario en la pagina de resumen

}
