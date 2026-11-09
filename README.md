# 🛒 FrescoMarket – Gestión de inventario de supermercado

Proyecto de la asignatura **Desarrollo Frontend II (PFY2202)** – Experiencia 1, Semana 3:
*"Desarrollando sitios web con React avanzado"*.

**Autor:** Marcelo Díaz Canales

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 + Vite | Base del proyecto |
| React Router 7 (`HashRouter`) | Navegación entre pantallas |
| Context API + `useReducer` | Estado global de inventario y carrito |
| Tailwind CSS 4 | Framework CSS, diseño responsive |
| gh-pages | Publicación en GitHub Pages |

## Funcionalidades por semana

**Semana 1**
- Página principal (Home) y menú inferior hacia **Quiénes somos** y **Contáctanos**.
- Navegación con React Router.

**Semana 2**
- Menú superior con **Agregar artículo** e **Inventario**.
- Estado global con la lista de artículos (nombre, marca, tipo, precio y stock).
- Formulario con validaciones para agregar artículos.
- Tabla con todos los artículos del inventario.

**Semana 3 (sumativa)**
- **Filtro por categoría** en el inventario: el filtro guarda solo la categoría
  seleccionada y la lista mostrada se deriva con `useMemo`, de modo que los
  datos originales del estado global nunca se modifican.
- **Detalle de artículo** (`/articulos/:id`): al hacer clic en una fila se ve el
  detalle, se elige la cantidad (limitada al stock) y se agrega al carrito.
  Al agregar, el stock disponible disminuye.
- **Carrito de compras** (`/carrito`): lista los artículos agregados; con los
  botones − / + se ajusta la cantidad y el inventario general se actualiza
  (− devuelve una unidad al stock, + descuenta una). También permite quitar un
  artículo o vaciar el carrito devolviendo todo al stock.
- El estado se guarda en `localStorage` para no perder datos al recargar.

## Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.jsx           Estructura común (menús + contenido)
│   ├── MenuSuperior.jsx     Menú de inventario y carrito (con contador)
│   ├── MenuInferior.jsx     Menú inferior (semana 1)
│   ├── EnlaceMenu.jsx       NavLink con estilo activo
│   ├── TituloPagina.jsx     Encabezado de página
│   ├── Boton.jsx            Botón con variantes
│   ├── IndicadorStock.jsx   Etiqueta de stock por color
│   ├── SelectorCantidad.jsx Control − / +
│   ├── FiltroCategoria.jsx  Filtro por categoría
│   └── TablaArticulos.jsx   Tabla del inventario
├── context/
│   ├── InventarioContext.jsx  Provider + hook useInventario()
│   └── inventarioReducer.js   Lógica pura de inventario y carrito
├── data/productosIniciales.js Categorías e inventario inicial
├── pages/                   # Una página por ruta
│   ├── Home.jsx, QuienesSomos.jsx, Contactanos.jsx
│   ├── AgregarArticulo.jsx, ListaArticulos.jsx
│   ├── DetalleArticulo.jsx, Carrito.jsx, NoEncontrado.jsx
├── utils/formato.js         Formato de precios en CLP
├── App.jsx                  Definición de rutas
└── main.jsx                 Punto de entrada
```

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Home |
| `/quienes-somos` | Quiénes somos |
| `/contactanos` | Contáctanos |
| `/agregar` | Agregar artículo |
| `/articulos` | Inventario con filtro |
| `/articulos/:id` | Detalle de artículo |
| `/carrito` | Carrito de compras |

## Cómo ejecutar

```bash
npm install
npm run dev        # http://localhost:5173
```

## Cómo publicar en GitHub Pages

```bash
npm run deploy     # compila y sube la carpeta dist a la rama gh-pages
```

Luego en GitHub: **Settings → Pages → Branch: `gh-pages` / root → Save**.
