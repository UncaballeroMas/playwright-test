import {Page} from  "@playwright/test";

export class NavigateTo {
    
    private readonly page: Page
    
    constructor ( page: Page) {
        this.page = page    

    }  // metodo para navegar a una url 
 
    async loginPage () {
        await this.page.goto ('http://127.0.0.1:5500/login.html')
    }  // metodo para navegar a la pagina de login

    async registerPage () {
        await this.page.goto ('http://127.0.0.1:5500/register.html') 
    }

    async shoppingCardPage () {
        await this.page.goto ('http://127.0.0.1:5500')
    }
}