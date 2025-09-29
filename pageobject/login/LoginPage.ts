import {Locator, Page} from '@playwright/test';


export class LoginPage {

private readonly usernameTextBox: Locator
private readonly passwordTextBox: Locator
private readonly loginButtton: Locator

    constructor ( page: Page) {

        this.usernameTextBox = page.locator('input#username')
        this.passwordTextBox = page.locator('input#password')
        this.loginButtton = page.locator('//button[@type=\'submit\']')
    }

    async login (username: string, password: string) {  
        await this.usernameTextBox.fill('user')
        await this.passwordTextBox.fill('pass')
        await this.loginButtton.click()
    }   // metodo para iniciar sesion


    async fillUsername(){

    await this.usernameTextBox.fill('user')
    } 

    async fillPassword(){

    await this.passwordTextBox.fill('pass')   
    
}
    async clickLoginButton(){

    await this.loginButtton.click()           
}
}


    /*await page.locator('input#username').fill('user')
    await page.locator('input#password').fill('pass')

    await page.locator('//button[@type=\'submit\']').click()*/