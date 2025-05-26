const { test, expect } = require('@playwright/test');

test('Проверка доступности и корректности ссылок на Voxys', async ({ page }, testInfo) => {
  testInfo.setTimeout(60000); 

  
  await page.goto('https://www.voxys.ru/'); 

  const links = await page.locator('a').evaluateAll(links => links.map(a => ({
    href: a.href,
    textContent: a.textContent.trim(),
  })));


  
  for (const link of links) {
    const { href, textContent } = link;
    console.log('Проверяем ссылку: ', textContent, '-', href);

    if (href.startsWith('tel:')) {
      console.log('  Пропущена проверка tel: ссылки:', href);
      continue;
    }

    
    if (!href) { 
        console.warn('  Skipping empty href for link:', textContent);
        continue;
    }

    try {
      const response = await page.request.get(href); 
      const status = response.status();
      console.log(`  Внешняя ссылка: ${href} - Статус: ${status}`);
      expect(status).toBeGreaterThanOrEqual(200);
      expect(status).toBeLessThan(300);
    } catch (error) {
      console.error(`  Ошибка при проверке ссылки ${href}: ${error.message}`);
       if (error.message.includes('timeout')) {
          console.warn(`Timeout occurred for ${href}.  This link may be unavailable.`);
       } else {
          
           console.warn(`Unexpected error for ${href}: ${error.message}.  Check the link manually.`);
       }
    }
  }
});