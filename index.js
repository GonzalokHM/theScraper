require('dotenv').config();
const puppeteer = require('puppeteer');
// const mongoose = require('mongoose');

// const Data = mongoose.model(
//   'Data',
//   new mongoose.Schema({
//     title: String,
//     price: String,
//   })
// );

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.URI);
//     console.log('connected to BD 👌');
//   } catch (error) {
//     console.log('Not connected to DB ❌');
//   }
// };

const scrapeProduct = async () => {
  //   await connect();
  const url = 'https://mundimoto.com/es';
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath:
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Cerrar todas las pestañas en blanco que se abren por defecto
    const pages = await browser.pages();
    if (pages.length > 1) {
      await pages[0].close();
    }

    try {
      await page.goto(url);

      //   cookies
      const configButtonId = '#onetrust-pc-btn-handler';
      await page.waitForSelector(configButtonId, { timeout: 60000 });
      await page.click(configButtonId);
      const rejectButtonClass = '.ot-pc-refuse-all-handler';
      await page.click(rejectButtonClass);

      //   search
      const inputId = '#header-search-input';
      const findProduct = 'Yamaha';
      await page.type(inputId, findProduct);

      const buttonDataTestId = '[data-testid="header-search-button"]';
      await page.waitForSelector(buttonDataTestId, { timeout: 60000 });
      // Forzar el clic usando evaluate
      await page.evaluate((buttonDataTestId) => {
        document.querySelector(buttonDataTestId).click();
      }, buttonDataTestId);

      nameClass = '.m-0 text-base sm:text-base text-left font-semibold uppercase'
      await page
    } catch (error) {
      console.error('Failed to navigate or interact with the page:', error);
    }
    // finally {
    //   if (browser) {
    //     await browser.close();
    //   }
    // }
  } catch (error) {
    console.error('Failed to launch the browser:', error);
    console.error('Please check the troubleshooting guide.....');
  }
};

scrapeProduct();
