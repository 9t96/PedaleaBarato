# Pedalea Barato

Pedalea Barato es un proyecto para comparar precios de bicicletas en tiendas de Argentina y consultar cómo cambian con el tiempo. La idea es reunir productos de distintos comercios en un mismo lugar para ayudar a encontrar opciones y ofertas.

## Enfoque de desarrollo y uso de IA

Este proyecto se desarrolla escribiendo el código a mano, sin seguir un enfoque de *vibe coding* ni de desarrollo guiado por especificaciones para generar código con IA (*Spec-Driven Development*, SDD).

La IA se utiliza como apoyo para explorar la idea, resolver dudas técnicas y discutir alternativas de arquitectura y organización. También se utilizará para crear los tests. La implementación de la lógica de la aplicación se realiza manualmente, con el objetivo de comprender las decisiones y aprender durante el desarrollo.

## Qué busca ofrecer

- Un catálogo de bicicletas de distintas tiendas, con precio, imagen y enlace al producto original.
- Comparación de precios entre opciones y comercios.
- Historial de precios para conocer la evolución de cada producto.
- Actualización de la información mediante un scraper.

La compra se realiza en el sitio de cada tienda; Pedalea Barato está pensado como una herramienta de consulta y comparación.

## Tecnologías

| Componente | Tecnologías | Propósito |
| --- | --- | --- |
| Web | React, TypeScript y Vite | Interfaz para explorar bicicletas y consultar precios. |
| API (prevista) | NestJS y TypeScript | Exponer los datos de comercios, bicicletas e historial a la web. |
| Scraper | Node.js, TypeScript y Cheerio | Extraer información de productos de los sitios de las tiendas. |
| Acceso a datos | Prisma ORM y el driver `pg` | Consultar y guardar información en PostgreSQL. |
| Base de datos | PostgreSQL | Almacenar comercios, bicicletas e historial de precios. |
| Entorno local | Docker Compose y Adminer | Ejecutar y administrar la base de datos durante el desarrollo. |
| Pruebas del scraper | Node.js Test Runner y `tsx` | Verificar la lógica de persistencia con mocks. |

## Cómo va a funcionar

El scraper obtiene los productos de las tiendas y guarda sus datos en PostgreSQL mediante Prisma. La API de NestJS consultará esa información y la web consumirá la API para mostrar los resultados.

```text
Tiendas → Scraper → PostgreSQL → API NestJS → Web React
```

La web se comunicará con la API; las credenciales y el acceso directo a la base de datos quedarán del lado del servidor.

## Estructura actual

```text
apps/
  web/                  # Aplicación React con Vite
  api/                  # Carpeta reservada para la futura API NestJS
workers/
  scraper/              # Extracción y persistencia de productos
    prisma/             # Schema y migraciones de la base de datos
    compose.yml         # PostgreSQL y Adminer para desarrollo local
```

Actualmente, Prisma vive dentro del scraper. Más adelante se prevé extraerlo a un paquete compartido para que el scraper y la API utilicen los mismos modelos y migraciones.

## Estado del proyecto

El proyecto está en una etapa inicial:

- El scraper incluye integraciones con tiendas y lógica para guardar comercios, bicicletas y registros de precios.
- La base de datos tiene modelos y migraciones de Prisma.
- La web parte de la plantilla inicial de React y Vite; el catálogo todavía está pendiente.
- La API de NestJS todavía no está implementada.

Las dependencias se instalan por proyecto con npm; todavía no hay una instalación centralizada mediante workspaces.

## Configuración local

La configuración del scraper se guarda en `workers/scraper/.env`. El archivo `.env.example` sirve como plantilla y contiene las variables necesarias para conectar la base y configurar Docker Compose.

Los archivos `.env`, los datos locales de PostgreSQL, las dependencias y el cliente generado de Prisma se excluyen de Git. El schema, las migraciones y la plantilla de variables de entorno sí se versionan.

No se deben colocar credenciales de PostgreSQL en la web ni en variables con prefijo `VITE_`, ya que esas variables son accesibles desde el navegador.
