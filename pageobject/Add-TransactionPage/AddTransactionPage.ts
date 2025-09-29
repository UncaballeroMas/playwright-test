import {Locator, Page } from '@playwright/test';



export class AddTransactionPage {
    
    private readonly addTransactionButton: Locator  // boton añadir transaccion
    private readonly transactionDate: Locator //  campo fecha
    private readonly transactionAmount: Locator //   campo monto
    private readonly transactionDescription: Locator  //    campo descripcion
    private readonly saveTransactionButton: Locator   // boton guardar transaccion
    private readonly page: Page 
    
    private actualDateRow!: Locator 
    private actualAmountRow!: Locator
    private actualDescriptionRow!: Locator

    constructor ( page: Page) {

        this.page = page    
        this.addTransactionButton = page.locator("//button[contains(text(),'Añadir transacción')]")
        this.transactionDate = page.locator('id=date')
        this.transactionAmount = page.locator('id=amount')
        this.transactionDescription = page.locator('id=description')
        this.saveTransactionButton = page.locator("//button[contains(text(),'Guardar')]")
    }// constructor defiene los selectores de los elementos de la pagina    
    
    async addTransaction (transactionDate: string, transactionAmount: string, transactionDescription: string) {  
        await this.addTransactionButton.click()
        await this.transactionDate.fill(transactionDate) 
        await this.transactionAmount.fill(transactionAmount)
        await this.transactionDescription.fill(transactionDescription) 
        await this.saveTransactionButton.click()
    }   // metodo para crear una nueva transaccion  

    async getActualDate (row: string)    {
        this.actualDateRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[1]`)
        return await this.actualDateRow.textContent()   
    }  // metodo para obtener la fecha de una fila especifica
    async getActualAmount (row: string) {
        this.actualAmountRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[2]`)
        return await this.actualAmountRow.textContent()     
    }  // metodo para obtener el monto de una fila especifica
        
    async getActualDescription (row: string) {
        this.actualDescriptionRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[3]`)
        return await this.actualDescriptionRow.textContent()
    }  // metodo para obtener la descripcion de una fila especifica


}



    /*await page.locator("//button[contains(text(),'Añadir transacción')]").click()

    await page.locator('id=date').fill('1996-12-25')
    await page.locator('id=amount').fill('3500000')
    await page.locator('id=description').fill('Prueba 1 del curso')

    await page.locator('//button[contains(text ( ), \'Guardar\' )]').click()*/


     /*const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent() // se inicia asercion para comparar con el resultado que se envio
    const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
    const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()*/
