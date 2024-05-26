# Proyecto de Web Scraping de Motos

## Descripción
Este proyecto realiza el scraping de información sobre motos desde el sitio web [mundimoto.com](https://mundimoto.com/es). La información obtenida incluye imágenes, títulos y precios de las motos. Los datos se almacenan en una base de datos MongoDB y se proporcionan a través de una API REST construida con Express.

## Tecnologías Utilizadas
- Node.js
- Express
- MongoDB + Mongoose
- Puppeteer para scraping web
- CORS para el manejo de solicitudes

## Modelos
- **Moto**: Representa las motos obtenidas mediante scraping. Cada moto incluye una imagen, un título y un precio.

## Endpoints

### Motos
- **POST** `/api/v1/motos/UpLoadDBScrap`: Inserta múltiples motos en la base de datos desde un archivo JSON.
- **GET** `/api/v1/motos/`: Obtiene todas las motos almacenadas en la base de datos.
- **PUT** `/api/v1/motos/:id`: Actualiza la información de una moto específica.
- **DELETE** `/api/v1/motos/:id`: Elimina una moto específica de la base de datos.

## Uso del Scrapper
El scrapper está diseñado para navegar por el sitio web de Mundimoto, recoger datos de todas las motos y guardarlos en un archivo JSON (`motos.json`). El scrapper es capaz de manejar modales emergentes y paginar hasta el final del listado de motos.

### Iniciar el Scrapper
Para ejecutar el scrapper y comenzar a recolectar datos, utiliza el siguiente comando:

```bash
npm run scrap


## Conclusión
Este proyecto ofrece una solución completa para la extracción, almacenamiento y manejo de datos de motos desde un sitio web específico. Utilizando Puppeteer para el scraping, Mongoose para la gestión de la base de datos y Express para la creación de una API REST, proporciona una base sólida para cualquier aplicación que necesite interactuar con estos datos.

## Despliegue
[motoscraper | vercel](https://motoscraper.vercel.app/api/v1/)