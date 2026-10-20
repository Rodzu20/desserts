# Desserts

Tienda de postres desarrollada con React, Vite y TypeScript.
Incluye catálogo, carrito persistente y CRUD de productos mediante una API local.

Diseño basado en [Product List with Cart de Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d).

## Tecnologías

- React + Vite + TypeScript.
- Tailwind CSS.
- React Router.
- Axios y TanStack Query.
- React Hook Form y Zod.
- Zustand.
- Sonner.
- json-server.

## Instalación

Requisitos: Node.js 22.12 o superior, npm y Git.

```bash
git clone --branch nivel-3 https://github.com/Rodzu20/desserts.git
cd desserts
npm ci
```

En PowerShell, si `npm.ps1` está bloqueado, utilizar `npm.cmd`
en lugar de `npm`.

## Cómo ejecutar el proyecto

Abrir dos terminales dentro de la carpeta del proyecto.

En la primera, iniciar la API:

```bash
npm run api
```

API disponible en http://localhost:3000

En la segunda, iniciar el frontend:

```bash
npm run dev
```

Frontend disponible en http://localhost:5173

Mantener ambas terminales ejecutándose.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el frontend en desarrollo. |
| `npm run api` | Inicia json-server en el puerto 3000. |
| `npm run lint` | Revisa el código con ESLint. |
| `npm run build` | Comprueba TypeScript y genera la carpeta `dist`. |
| `npm run preview` | Permite visualizar la compilación de producción. |

## Funcionalidades

- Catálogo responsive con imagen, nombre, categoría y precio.
- Skeletons y estados de carga, error y resultados vacíos.
- Búsqueda y filtros realizados contra la API.
- Paginación de ocho productos por página.
- Detalle de producto y manejo de errores 404.
- Creación y edición con formulario reutilizable y validación.
- Eliminación con modal de confirmación.
- Notificaciones de éxito y error.
- Carrito con control de cantidades y cálculo del total.
- Persistencia del carrito en localStorage.
- Drawer y confirmación del pedido con vaciado del carrito.

## Navegación

| Ruta | Vista |
| --- | --- |
| `/` | Catálogo. |
| `/producto/:id` | Detalle de producto. |
| `/productos/nuevo` | Crear producto. |
| `/productos/:id/editar` | Editar producto. |
| Cualquier otra ruta | Página 404. |

## Arquitectura

El código se organiza por funcionalidades:

```text
src/
├── features/
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── interfaces/
│   │   ├── pages/
│   │   ├── schemas/
│   │   └── services/
│   ├── categories/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── interfaces/
│   │   └── services/
│   └── cart/
│       ├── components/
│       ├── interfaces/
│       └── stores/
├── shared/
│   ├── components/
│   ├── pages/
│   └── services/
├── routes/
├── App.tsx
├── main.tsx
└── index.css
```

- `components`: elementos visuales reutilizables.
- `pages`: vistas asociadas a las rutas.
- `hooks`: consultas y mutaciones.
- `services`: peticiones HTTP.
- `schemas`: validaciones con Zod.
- `stores`: estado del carrito.
- `interfaces`: tipos de los datos.
- `routes`: configuración de navegación.

Las consultas y mutaciones de productos están separadas en
`useProductsQueries.ts` y `useProductsMutations.ts`.

## Funcionamiento de la API

Se utiliza json-server `1.0.0-beta.15`.
Los datos se almacenan en el archivo `db.json`.

| Método | Endpoint | Operación |
| --- | --- | --- |
| GET | `/products` | Listar, buscar, filtrar y paginar. |
| GET | `/products/:id` | Obtener un producto. |
| POST | `/products` | Crear un producto. |
| PUT | `/products/:id` | Actualizar un producto. |
| DELETE | `/products/:id` | Eliminar un producto. |
| GET | `/categories` | Listar categorías. |

Las modificaciones de productos se guardan en `db.json`
y persisten al reiniciar la API.

Los productos se relacionan con las categorías mediante `categoryId`.
Los identificadores se almacenan como texto.

La paginación utiliza `_page` y `_per_page=8`.
La respuesta contiene los productos en `data`, el total de registros
en `items` y el total de páginas en `pages`.

La búsqueda y el filtro se combinan mediante `_where`.
Ejemplo de su contenido antes de codificarlo en la URL:

```json
{
  "name": { "contains": "waffle" },
  "categoryId": { "eq": "1" }
}
```

## Decisiones técnicas

- TanStack Query administra la caché de los datos remotos.
- Las query keys incluyen los filtros y la página.
- Las mutaciones invalidan las consultas después de cada operación exitosa.
- Zustand administra el carrito, separado de los datos de la API.
- El carrito se persiste en localStorage bajo la clave `desserts-cart`.
- Los totales se calculan en centavos para reducir errores decimales.
- La edición actualiza los datos del producto que esté en el carrito.
- La eliminación también quita el producto del carrito.
- La confirmación conserva un resumen en memoria y vacía el carrito.
- Crear y editar reutilizan `ProductForm`; la edición usa `defaultValues`.
- Los GET tienen un delay artificial de 1200 ms, configurado en
  `src/shared/services/api.ts`.
- Las imágenes se sirven desde `public/assets/images`.
- Todas las peticiones de datos se realizan contra json-server local.

## Ramas

- `nivel-1`: interfaz visual con datos locales.
- `nivel-2`: API, búsqueda, filtros y navegación.
- `nivel-3`: carrito persistente, CRUD, formularios y paginación.

Las ramas anteriores se conservan para mostrar la evolución del proyecto.