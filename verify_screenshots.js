const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to mobile size
  await page.setViewportSize({ width: 375, height: 667 });

  try {
    const filePath = 'file://' + path.resolve('index.html');
    console.log('Navigating to:', filePath);
    await page.goto(filePath);

    // Wait for cover
    await page.waitForSelector('#cover');

    // Screenshot Cover
    await page.screenshot({ path: 'screenshot_mobile_cover.png' });
    console.log('Screenshot cover taken');

    // Click "Abrir Herbario"
    await page.click('.btn-start');

    // Wait for page 1 to be active
    // We can wait for opacity to be 1 on page1
    // or just wait a bit
    await page.waitForTimeout(1000);

    // Screenshot Page 1
    await page.screenshot({ path: 'screenshot_mobile_page1.png' });
    console.log('Screenshot page 1 taken');

    // Go to Page 8 (click next 7 times)
    for (let i = 0; i < 7; i++) {
        await page.click('button.btn-nav:has-text("Siguiente")');
        await page.waitForTimeout(600); // wait for transition
    }

    // Wait for page 8
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot_mobile_page8.png' });
    console.log('Screenshot page 8 taken');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
