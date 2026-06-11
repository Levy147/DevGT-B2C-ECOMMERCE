# DevGT B2C E-Commerce — Demo Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Demo](https://img.shields.io/badge/Estado-Demo%20Frontend-orange?style=for-the-badge)

**Variedades Fatima** — Demo interactiva de tienda B2C y panel administrativo, construida con **React + Vite + Tailwind CSS**. Pensada para presentar flujos de compra, inventario y gestión de pedidos a clientes.

> **Alcance actual:** solo existe el **Frontend**. Los datos viven en mocks + `localStorage` del navegador. No hay backend, base de datos ni API desplegada todavía.

---

## ✨ Qué incluye la demo

### Tienda (cliente)
- Catálogo con **50 productos** en **10 categorías** + secciones **Ofertas**, **Lo Nuevo** y **Mayoreo**
- Carrusel promocional en home, ordenamiento (precio, ofertas, novedades) y paginación (15/25/30)
- Detalle de producto: SKU, descripción, reseñas, carrusel relacionado y suscripción a promociones
- Carrito reactivo con modal de cantidad, subtotal, envío y persistencia local
- Checkout en **3 pasos**: envío → pago → confirmación (con código de rastreo)
- Registro e inicio de sesión de usuario (ilustrativo) + edición de perfil
- Rastreo de pedidos por código `VF-XXXXXXXX`
- Códigos promocionales de ejemplo: `BIENVENIDO10`, `FATIMA15`
- Diseño responsive (mobile-first) y botón de contacto WhatsApp

### Panel administrativo
- Login protegido con ruta privada (`/admin/login`)
- Métricas: ventas del día, órdenes activas, bajo stock
- Pedidos unificados con detalle (cliente, dirección, pago, productos) y flujo de estados
- CRUD de inventario, ofertas/descuentos con confirmación, paginación y vista grid/lista
- Lista de usuarios registrados, suscriptores y campañas de email (simuladas)
- Generador de códigos promocionales

---

## 🛠️ Stack tecnológico (implementado)

| Tecnología | Uso |
|------------|-----|
| **React 19** | UI |
| **Vite 8** | Build y dev server |
| **Tailwind CSS 4** | Estilos (`@tailwindcss/vite`) |
| **React Router DOM 7** | Navegación |
| **Context API** | Estado global (carrito, productos, órdenes, auth, usuarios, promos) |
| **Lucide React** | Iconos |
| **SweetAlert2** | Alertas y confirmaciones |
| **localStorage** | Persistencia demo (productos, carrito, órdenes, usuarios) |

**No incluido aún:** C# .NET, PostgreSQL, JWT real, Axios, Swagger, backend API.

---

## 🚀 Cómo ejecutar

```bash
cd Frontend
npm install
npm run dev
```

Abre **http://localhost:5173**

```bash
npm run build    # producción → carpeta dist/
npm run preview  # previsualizar build
```

---

## 🌐 Desplegar en GitHub Pages

El proyecto incluye un workflow en `.github/workflows/deploy-pages.yml` que publica automáticamente el `Frontend` al hacer push a `main`.

### Pasos (una sola vez en GitHub)

1. Sube el repositorio a GitHub.
2. Ve a **Settings → Pages → Build and deployment**.
3. En **Source**, selecciona **GitHub Actions**.
4. Haz push a la rama `main` (o ejecuta el workflow manualmente en **Actions**).

Tu sitio quedará en:

`https://TU_USUARIO.github.io/DevGT-B2C-ECOMMERCE/`

> Si tu repositorio tiene **otro nombre**, edita `REPO_NAME` en `Frontend/vite.config.js`.

### Build local (simular GitHub Pages)

```bash
cd Frontend
# PowerShell:
$env:GITHUB_PAGES="true"; npm run build:pages
# Linux / macOS:
GITHUB_PAGES=true npm run build:pages
```

### Credenciales demo (admin)

| Campo | Valor |
|-------|-------|
| Usuario | `fatima` |
| Contraseña | `fatima` |
| Ruta | `/admin/login` |

Los usuarios de tienda se crean en `/registro` y entran por `/login`.

---

## 🗺️ Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home + catálogo paginado |
| `/categorias` | Hub de categorías |
| `/categorias/:slug` | Productos por categoría u ofertas |
| `/producto/:id` | Detalle de producto |
| `/checkout` | Finalizar compra (3 pasos) |
| `/registro` | Registro de usuario |
| `/login` | Login de usuario |
| `/perfil` | Editar perfil |
| `/rastreo` | Seguimiento de pedido |
| `/admin/login` | Login administrador |
| `/admin` | Panel de control |

---

## 📂 Estructura del proyecto

```text
DevGT-B2C-ECOMMERCE/
└── Frontend/
    ├── src/
    │   ├── components/     # UI reutilizable (Navbar, carrito, modales, carruseles…)
    │   ├── context/        # Cart, Products, Orders, Auth, Users, Promo, Subscribers
    │   ├── data/           # mockProducts, categorías, credenciales demo
    │   ├── pages/          # Home, Checkout, Admin, Categorías, Perfil, Rastreo…
    │   └── utils/          # storage, precios, confirmaciones
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚠️ Limitaciones de la demo

- Los datos **no se sincronizan** entre dispositivos ni usuarios
- La autenticación es **solo frontend** (sin JWT ni servidor)
- Las contraseñas se guardan en texto plano en `localStorage` (solo para demo)
- Los emails y campañas de marketing son **simulados**
- Al limpiar datos del navegador se pierde carrito, órdenes e inventario editado

---

## 🖼️ Capturas de pantalla

| Catálogo | Admin | Carrito |
| :---: | :---: | :---: |
| *(pendiente)* | *(pendiente)* | *(pendiente)* |

> Agregar URLs de imágenes o deploy (Vercel/Netlify) cuando esté publicado.

---

## 🔮 Roadmap (próxima fase)

Arquitectura objetivo para producción:

```text
DevGT-B2C-ECOMMERCE/
├── Backend/                  # Pendiente — C# .NET Core, N-Capas
│   ├── TiendaApi.API/
│   ├── TiendaApi.Core/
│   └── TiendaApi.Infrastructure/   # EF Core + PostgreSQL + JWT
└── Frontend/                 # ✅ Demo actual — conectar vía Axios
```

---

## 👤 Autor

Demo desarrollada por **Herbert Galeano** — Variedades Fatima, Guatemala.
