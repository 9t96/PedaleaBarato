import * as cheerio from 'cheerio';
import upsertRetailer from './query';
import { BicycleScraped, Retailer } from './types/types';

function getNumberFromString(str: string): number {
  const numberString = str.replace(/\D/g, "");
  return Number(numberString);
}
async function scrapBiciUrbana() {

  try {
    const $ = await cheerio.fromURL('https://biciurbana.com.ar/6-bicicletas');
    //Obtenego todas las bicis
    const bicyclesScraped = $.extract({
      value: [{
        selector: '.ajax_block_product',
        value:  {
          name: '.product-name', // Busca esta clase dentro de '.item' y extrae su texto
          price: { selector: '.price', value: (element) => {
            return element.children[0].data ? getNumberFromString(element.children[0].data) : 0;
          }},  // Busca esta clase dentro de '.item' y extrae su texto
          discount: '.price-percent-reduction',
          oldPrice:  { selector: '.old-price', value: (element) => {
            return element.children[0].data ? getNumberFromString(element.children[0].data) : 0;
          } },
          imageUrl: {
            selector: '.product_img_link > img',
            value: 'src'
          },
          productUrl: {
            selector: '.product_img_link',
            value: 'href'
          },
        }
      }]
    });
    const retailer: Retailer = {
      name: 'Biciurbana',
      url: 'https://biciurbana.com.ar/',
      scrapUrl: 'https://biciurbana.com.ar/6-bicicletas',
      bicycles: bicyclesScraped.value as BicycleScraped[]
    };
    console.log("Retailer scraped:", retailer);
    await upsertRetailer(retailer);

  } catch (error) {
    console.error(error);
  }
}

async function scrapPopeyeProBike() {

  try {
    const $ = await cheerio.fromURL('https://www.estacionbike.com.ar/bicicletas/', {
      requestOptions: {
        method: 'GET',
        headers: {
          'user-agent': 'PedaleaBaratoBot/1.0',
          'accept': 'text/html,application/xhtml+xml'
        }
      }
    });
    //Obtenego todas las bicis
    const bicyclesScraped = $.extract({
      value: [{
        selector: '.js-product-item-private ',
        value:  {
          name: '.product-item-name', // Busca esta clase dentro de '.item' y extrae su texto
          price: { selector: '.product-item-price', value: () => {
            return getNumberFromString($('.product-item-price').text());
          } },  // Busca esta clase dentro de '.item' y extrae su texto
          discount: '.price-percent-reduction',
          oldPrice:  { selector: '.old-price', value: () => {
            return getNumberFromString($('.old-price').text());
          } },
          imageUrl: {
            selector: '.product-item-slider-wrapper > div > img',
            value: 'src'
          },
          productUrl: {
            selector: '.product-item-information > a',
            value: 'href'
          },
        }
      }]
    });
    const retailer: Retailer = {
      name: 'Estacion Bike',
      url: 'https://www.estacionbike.com.ar/',
      scrapUrl: 'https://www.estacionbike.com.ar/bicicletas/',
      bicycles: bicyclesScraped.value as BicycleScraped[]
    };
    //await upsertRetailer(retailer);

  } catch (error) {
    console.error(error);
  }
}

async function scrapTrekArgentina() {
  try {
    const $ = await cheerio.fromURL('https://www.trekbikesargentina.com/bicicletas/', {
      requestOptions: {
        method: 'GET',
        headers: {
          'user-agent': 'PedaleaBaratoBot/1.0',
          'accept': 'text/html,application/xhtml+xml'
        }
      }
    });
    //Obtenego todas las bicis
    const bicyclesScraped = $("script[type='application/ld+json']");
    const bicycles: BicycleScraped[] = [];
    bicyclesScraped.each((index, element) => {
      const jsonData = JSON.parse(element.children[0].data);
      if (jsonData['@type'] === 'Product') {
        const bicycle: BicycleScraped = {
          name: jsonData.name,
          price: Number(jsonData.offers.price),
          oldPrice: 0, // Assuming oldPrice is not available in the JSON-LD data
          discount: '', // Assuming discount is not available in the JSON-LD data
          productUrl: jsonData.offers.url,
          imageUrl: jsonData.image,
        };
        bicycles.push(bicycle);
      }
    });
    console.log("Bicycles scraped:", bicycles);
    const retailer: Retailer = {
      name: 'Trek Argentina',
      url: 'https://www.trekbikesargentina.com/',
      scrapUrl: 'https://www.trekbikesargentina.com/bicicletas/',
      bicycles: bicycles
    };
    await upsertRetailer(retailer);

  } catch (error) {
    console.error(error);
  }
}

/* async function scrapCanaglia() {
    try {
    const testo = await fetch('https://www.canaglia.com/bicicletas');
    const textoText = await testo.text();
    const $ = await cheerio.load(textoText);
    //Obtenego todas las bicis
    const bicyclesScraped = $.extract({
      value: [{
        selector: '.js-item-product',
        value:  {
          name: '.item-name', // Busca esta clase dentro de '.item' y extrae su texto
          price: '#price_display',  // Busca esta clase dentro de '.item' y extrae su texto
          discount: '.price-percent-reduction',
          oldPrice: '.price-compare',
          imageUrl: {
            selector: '.img-absolute',
            value: 'src'
          },
          productUrl: {
            selector: 'div > div  > a',
            value: (el,key) => {
              const href = el.attribs.href;
              return href ? new URL(href, 'https://www.canaglia.com').href : '';
            }
          },
        }
      }]
    });
    const retailer: Retailer = {
      name: 'Canaglia',
      url: 'https://www.canaglia.com/',
      scrapUrl: 'https://www.canaglia.com/bicicletas',
      bicycles: bicyclesScraped.value as BicycleScraped[]
    };
    await upsertRetailer(retailer);

  } catch (error) {
    console.error(error);
  }
} */

//scrapPopeyeProBike().catch(console.error);
//scrapCanaglia().catch(console.error);
scrapTrekArgentina().catch(console.error);
scrapBiciUrbana().catch(console.error);