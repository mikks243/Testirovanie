import { test, expect } from '@playwright/test';

const contactPageURL = 'https://www.voxys.ru/contacts.html'; 

test.describe('Form Testing', () => {

    test('Успешная отправка формы с корректными данными', async ({ page }) => {
        await page.goto(contactPageURL);

        
        await page.waitForSelector('input[name="name"]', { timeout: 5000 });
        await page.waitForSelector('input[name="email"]', { timeout: 5000 });
        await page.waitForSelector('textarea[name="message"]', { timeout: 5000 });
        await page.waitForSelector('button[type="submit"]', { timeout: 5000 });

        
        await page.fill('input[name="name"]', 'Иван Иванов');
        await page.fill('input[name="email"]', 'ivan@example.com');
        await page.fill('textarea[name="message"]', 'Тестовое сообщение');

        
        await page.click('button[type="submit"]');

       
        await expect(page.locator('input[name="name"]')).toHaveValue('');
        await expect(page.locator('input[name="email"]')).toHaveValue('');
        await expect(page.locator('textarea[name="message"]')).toHaveValue('');


    });

    test('Проверка обязательных полей: Email', async ({ page }) => {
        await page.goto(contactPageURL);

       
        await page.fill('input[name="name"]', 'Иван Иванов');
        await page.fill('textarea[name="message"]', 'Тестовое сообщение');

        
        await page.click('button[type="submit"]');

       
        await page.waitForTimeout(2000); 
        await expect(page.locator('input[name="name"]')).toHaveValue('');
        await expect(page.locator('textarea[name="message"]')).toHaveValue('');
    });
    test('Проверка обязательных полей: Имя', async ({ page }) => {
        await page.goto(contactPageURL);

        
        await page.fill('input[name="email"]', 'test@test.ru');
        await page.fill('textarea[name="message"]', 'Тестовое сообщение');

        
        await page.click('button[type="submit"]');

        
        await page.waitForTimeout(2000); 
        await expect(page.locator('input[name="email"]')).toHaveValue('');
        await expect(page.locator('textarea[name="message"]')).toHaveValue('');
    });

    test.skip('Проверка email-валидации', async ({ page }) => { 
       
    });

    test('Наличие и содержимое блока контактов', async ({ page }) => {
        await page.goto(contactPageURL);

        
        await page.waitForSelector('.page-content__aside', { timeout: 5000 }); 

        const contactsBlock = page.locator('.page-content__aside'); 
        await expect(contactsBlock).toBeVisible({ timeout: 5000 });

        
        await expect(contactsBlock).toContainText('+7 (495) 135-30-60', { timeout: 5000 }); 
        await expect(contactsBlock).toContainText('info@voxys.ru', { timeout: 5000 }); 
    });
});
