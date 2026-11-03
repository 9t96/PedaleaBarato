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
| API | NestJS y TypeScript | Exponer los datos de comercios, bicicletas e historial a la web. |
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
  web/                  # Interfaz React con Vite
  api/                  # API NestJS
workers/
  scraper/              # Extracción y persistencia de productos
infra/
  compose.yml           # PostgreSQL y Adminer para desarrollo local
packages/
  database/             # Paquete interno @pedalea-barato/database
    prisma/             # Schema y migraciones existentes
    src/generated/      # Cliente Prisma generado, fuera de Git
    src/index.ts        # Exporta el cliente, modelos y adaptador PostgreSQL
    dist/               # JavaScript y declaraciones TypeScript, fuera de Git
```

`database` comparte la definición de datos y el cliente generado. Cada consumidor
crea su propia instancia: el scraper conserva su conexión en `lib/prisma.ts`;
la integración de NestJS mediante un `PrismaService` todavía está pendiente.
El paquete no carga credenciales ni abre conexiones al importarlo.

Las aplicaciones se pueden desplegar por separado. Tanto el build de la API como
el del scraper necesitan acceso a `packages/database`, por lo que el entorno de
construcción debe disponer de la raíz del repositorio.

## Estado del proyecto

El proyecto está en una etapa inicial:

- El scraper incluye integraciones con tiendas y lógica para guardar comercios, bicicletas y registros de precios.
- La base de datos tiene modelos y migraciones de Prisma.
- La web parte de la plantilla inicial de React y Vite; el catálogo todavía está pendiente.
- La API tiene módulos iniciales y declara la dependencia del paquete compartido; sus consultas a PostgreSQL todavía están pendientes.

El repositorio usa npm workspaces y un único `package-lock.json` en la raíz.
Cada componente conserva su `package.json`. Las dependencias se instalan desde
la raíz con `npm install` (o `npm ci` cuando ya existe el lockfile). El script
`prepare` genera y compila automáticamente el paquete `database`.

Las herramientas de Nest instaladas declaran soporte para Node
`^22.22.3 || ^24.15.0 || >=26.0.0`. Usá una versión compatible para evitar
advertencias de `EBADENGINE` al instalar.

Comandos desde la raíz:

| Comando | Propósito |
| --- | --- |
| `npm run db:generate` | Regenerar el cliente Prisma sin cambiar la base |
| `npm run build:database` | Generar y compilar el paquete compartido |
| `npm run build:api` | Compilar el paquete compartido y la API |
| `npm run build:web` | Compilar la web |
| `npm run test:scraper` | Ejecutar los tests del scraper con mocks |
| `npm run test:api` | Ejecutar los tests unitarios de la API |
| `npm run start:dev --workspace api` | Iniciar NestJS en desarrollo |
| `npm run dev --workspace pedalea-barato` | Iniciar Vite en desarrollo |

Después de modificar el schema, ejecutá `npm run build:database` para actualizar
el cliente que consumen ambas aplicaciones. Generar y compilar no aplica
migraciones ni ejecuta el scraper.

## Configuración local

La configuración del scraper se guarda en `workers/scraper/.env`; su
`.env.example` contiene las variables para conectar la base y configurar Docker
Compose. La configuración está en `infra/compose.yml` y carga esas variables
mediante `--env-file`. El montaje apunta explícitamente a
`workers/scraper/data`, donde permanecen los datos existentes. El nombre
predeterminado del proyecto Compose sigue siendo `scraper`. No hay que mover
ni borrar esa carpeta para usar la nueva ubicación del archivo.

Los comandos de Prisma ahora se ejecutan en `packages/database` y usan
`prisma.config.ts`. Para operaciones que accedan a PostgreSQL, configurá
`packages/database/.env` siguiendo su `.env.example`, o proporcioná
`DATABASE_URL` mediante el entorno. Ya no se utiliza `prisma7.config.ts` dentro
del scraper. Las migraciones existentes se trasladaron sin modificar su contenido.
La API necesitará su propia configuración de entorno al implementar su conexión.

En producción, la plataforma debe proporcionar las variables a cada proceso.
Las migraciones se aplican como un paso controlado del despliegue, no en cada
ejecución programada del scraper.

Los archivos `.env`, los datos locales de PostgreSQL, las dependencias y el cliente generado de Prisma se excluyen de Git. El schema, las migraciones y la plantilla de variables de entorno sí se versionan.

No se deben colocar credenciales de PostgreSQL en la web ni en variables con prefijo `VITE_`, ya que esas variables son accesibles desde el navegador.


## Recorrido de desarrollo local

Ejecutá estos pasos desde la raíz del repositorio. Docker debe estar instalado
con su motor iniciado para levantar PostgreSQL y Adminer.

1. **Instalar dependencias:** ejecutá `npm ci`. El script `prepare` genera y
   compila automáticamente `@pedalea-barato/database`.
2. **Preparar Prisma:** después de cambiar el schema, ejecutá
   `npm run build:database`. Esto genera el cliente y compila el paquete;
   no crea tablas ni aplica migraciones.
3. **Configurar PostgreSQL:** si todavía no existe `workers/scraper/.env`,
   crealo a partir de su `.env.example`. Si ya existe, conservá sus valores y
   verificá que incluya `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` y
   `DATABASE_URL`. La URL debe corresponder a esa base y sus credenciales.
   Las variables de inicialización de PostgreSQL no modifican usuarios ni bases
   de un almacenamiento ya inicializado.
4. **Levantar la infraestructura:** ejecutá
   `docker compose --env-file workers/scraper/.env -f infra/compose.yml up -d`.
   PostgreSQL se publica en `localhost:5432` y Adminer en
   `http://localhost:8080`. Desde Adminer, el servidor de PostgreSQL es `db`.
5. **Ejecutar los componentes:** abrí terminales separadas según lo que necesites:

   | Componente | Comando desde la raíz |
   | --- | --- |
   | API NestJS | `npm run start:dev --workspace api` |
   | Web Vite | `npm run dev --workspace pedalea-barato` |
   | Scraper, ejecución manual | `npm exec --workspace scraper -- tsx scrapper.ts` |

   La API todavía no consulta PostgreSQL y la web no tiene integrado el catálogo.
   Ejecutar el scraper consulta las tiendas habilitadas y escribe en la base;
   no forma parte de los pasos de verificación con mocks. Su programación cada
   seis horas todavía está pendiente.

Para los comandos de Prisma que requieran conexión a PostgreSQL, usá
`packages/database/.env` como se describe arriba. Iniciar PostgreSQL no aplica
el schema de la aplicación: si la base es nueva, todavía requiere aplicar las
migraciones existentes como una operación separada y deliberada.

Para verificar sin consultar tiendas ni modificar la base, ejecutá
`npm run build:api`, `npm run build:web`, `npm run test:scraper` y
`npm run test:api`. Los tests del scraper usan mocks. Los builds no comprueban
una conexión real a PostgreSQL.
