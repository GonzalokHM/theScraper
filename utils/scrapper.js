const fs = require('fs');
const puppeteer = require('puppeteer');
const motosArrays = [];
const scrapper = async (findProduct) => {
  //   await connect();
  const url = 'https://mundimoto.com/es';
  let browser;
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

  await page.goto(url);

  //   cookies
  const configButtonId = '#onetrust-pc-btn-handler';
  await page.waitForSelector(configButtonId, { timeout: 60000 });
  await page.click(configButtonId);
  const rejectButtonClass = '.ot-pc-refuse-all-handler';
  await page.click(rejectButtonClass);

  //   search
  const inputId = '#header-search-input';
  //   const findProduct = 'Yamaha';
  await page.type(inputId, findProduct);

  const buttonDataTestId = '[data-testid="header-search-button"]';
  await page.waitForSelector(buttonDataTestId, { timeout: 60000 });
  await page.$eval(buttonDataTestId, (el) => el.click());

  await scrapePage(page, browser);
};

const scrapePage = async (page, browser) => {
  // Esperar a que los resultados se carguen
  const cardsId = '[data-testid="motorbike-card"]';
  await page.waitForSelector(cardsId);
  await autoScroll(page);

  //  Scrapeando los datos de los productos
  const arrayLi = await page.$$(cardsId);
  console.log(`Found ${arrayLi.length} items on this page `);

  for (const cardLi of arrayLi) {
    let image = await cardLi.$eval('img', (el) => el.src);
    let title = await cardLi.$eval('h3', (el) => el.textContent);
    let price = await cardLi.$$eval('h3', (els) =>
      parseFloat(
        els[1].textContent.slice(0, els[1].textContent.length - 1).trim()
      )
    );

    const moto = {
      image,
      title,
      price,
    };

    motosArrays.push(moto);
  }

  try {
    await closePopupIfPresent(page);
    const nextButtonSelector = 'button:has(svg > path[d="m9 18 6-6-6-6"])';
    const nextButton = await page.$(nextButtonSelector);

    console.log(`Navigating to the next page from page ${pageNum}`);
    await page.evaluate((btn) => btn.click(), nextButton);
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    scrapePage(page, browser);
  } catch (error) {
    console.log('Next button not found, ending pagination.');
    write(motosArrays);
    await browser.close();
  }
};

const write = (motosArrays) => {
  fs.writeFile('motos.json', JSON.stringify(motosArrays), () => {
    console.log('escrito correctamente');
  });
};

const closePopupIfPresent = async (page) => {
  try {
    const closePopupButton = '[data-testid="close-popup-promotion-button"]';
    await page.waitForSelector(closePopupButton, { timeout: 1000 });
    await page.click(closePopupButton);
    console.log('Popup cerrado con éxito');
  } catch (e) {
    // 'No popup to close. Next';
  }
};

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

module.exports = { scrapper };
