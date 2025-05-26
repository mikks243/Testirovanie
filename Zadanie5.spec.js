const { test, expect } = require('@playwright/test');

test.describe('JS Email Validation', () => {
  const emailFieldLocator = 'input[name="email"]';  
  const submitButtonLocator = 'button[type="submit"]'; 
  const errorMessageLocator = '#email-error';      

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.voxys.ru/'); 
   
  });

  test('TC-001: Empty email field', async ({ page }) => {
   
    await page.fill('input[name="name"]', 'Test Name'); 
    await page.fill('input[name="phone"]', '+79991234567'); 
    await page.fill('textarea[name="message"]', 'Test message'); 
    
    await page.check('#privacy-policy'); 
    await page.check('#data-processing'); 

    await page.click(submitButtonLocator);

    
    await expect(page.locator(errorMessageLocator)).toBeVisible();
    await expect(page.locator(errorMessageLocator)).toHaveText('Пожалуйста, введите email.'); 
   
  });

  test('TC-002: Invalid email format - no @', async ({ page }) => {
   
    await page.fill('input[name="name"]', 'Test Name'); 
    await page.fill('input[name="phone"]', '+79991234567'); 
    await page.fill('textarea[name="message"]', 'Test message'); 
    await page.check('#privacy-policy'); 
    await page.check('#data-processing'); 

    await page.fill(emailFieldLocator, 'testtest.com');
    await page.click(submitButtonLocator);

    await expect(page.locator(errorMessageLocator)).toBeVisible();
    await expect(page.locator(errorMessageLocator)).toHaveText('Некорректный email.'); 
  
  });

  test('TC-003: Valid email', async ({ page }) => {
  
    await page.fill('input[name="name"]', 'Test Name'); 
    await page.fill('input[name="phone"]', '+79991234567'); 
    await page.fill('textarea[name="message"]', 'Test message'); 
    await page.check('#privacy-policy'); 
    await page.check('#data-processing'); 

    await page.fill(emailFieldLocator, 'test@test.com');
    await page.click(submitButtonLocator);

   
    await expect(page.locator('#success-message')).toBeVisible();
    
  });
});
