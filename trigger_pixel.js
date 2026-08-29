const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Listen to network requests to verify fbq is firing
    page.on('request', request => {
      if (request.url().includes('facebook.com/tr') || request.url().includes('fbevents.js')) {
        console.log('FB Pixel Request Intercepted:', request.url());
      }
    });

    console.log('Navigating to landing page...');
    await page.goto('http://localhost:3000/self-cleaning-flat-mop', { waitUntil: 'networkidle2' });
    
    console.log('Filling out the form...');
    await page.type('input[name="name"]', 'AI Pixel Tester');
    await page.type('input[name="email"]', 'ai@tester.com');
    await page.type('input[name="phone"]', '08000000000');
    await page.type('input[name="address"]', '123 Pixel Street');
    await page.type('input[name="city"]', 'Lagos');
    
    console.log('Submitting form...');
    // Click submit
    await page.click('button[type="submit"]');
    
    // Wait a few seconds for the success response and pixel to fire
    await new Promise(r => setTimeout(r, 5000));
    
    console.log('Checking for success message...');
    const content = await page.content();
    if (content.includes('Order Confirmed!')) {
      console.log('Form submission was successful! Order Confirmed page reached.');
    } else {
      console.log('Failed to reach Order Confirmed page.');
    }
    
    await browser.close();
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
  }
})();
