import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker'

test('create transactions', async({page}) => {
    await page.goto ('http://127.0.0.1:5500/login.html')

    await page.locator('input#username').fill('user')
    await page.locator('input#password').fill('pass')
    await page.locator('//button[@type=\'submit\']').click()
    await page.waitForTimeout(500); // Espera 0,5 segundos (2000 ms)


function randomDate(start: Date, end: Date): string {   // genera una fecha aleatoria entre start y end
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // formato YYYY-MM-DD
}

    for (let i = 0; i <=10; i++) {  // crea 50 transacciones con datos aleatorios   

        await page.locator("//button[contains(text(),'Añadir transacción')]").click();
        await page.locator('id=date').fill(randomDate(new Date(1990, 0, 1), new Date()));
        await page.locator('id=amount').fill(faker.number.int({min: 100, max: 200}).toString());
        await page.locator('id=description').fill(faker.person.firstName());
        await page.locator("//button[contains(text(),'Guardar')]").click();
    }

    await page.pause()


});