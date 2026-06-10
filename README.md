# DevGT B2C E-Commerce & Inventory Management

![C#](https://img.shields.io/badge/C%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

Plataforma B2C de comercio electrónico y sistema de gestión de inventario, diseñada con una arquitectura Cliente-Servidor fuertemente desacoplada. El proyecto implementa un *backend* robusto y escalable en C# (.NET Core) utilizando Arquitectura N-Capas, y un *frontend* interactivo y optimizado construido con React y Vite.

🔗 **[Ver Demo en Producción (Frontend)](#)**  |  🔗 **[Documentación API Swagger](#)**

---

## ✨ Características Principales (Features)
- **Catálogo Dinámico B2C:** Visualización de productos organizados por categorías con carga asíncrona.
- **Carrito de Compras Reactivo:** Gestión de estado global para agregar, actualizar cantidades y calcular subtotales en tiempo real.
- **Panel de Administración Privado:** Dashboard para gestión de inventario (CRUD de productos), control de stock y seguimiento de órdenes.
- **Seguridad y Autenticación:** Acceso administrativo protegido mediante JSON Web Tokens (JWT) y rutas privadas.
- **Diseño Responsivo (Mobile-First):** Interfaz optimizada con Tailwind CSS para una experiencia de usuario perfecta en cualquier dispositivo.

---

## 🖼️ Interfaz de Usuario (Screenshots)

| Vista del Catálogo | Panel de Administración | Carrito de Compras |
| :---: | :---: | :---: |
| <img src="URL_IMAGEN_CATALOGO" width="250"/> | <img src="URL_IMAGEN_ADMIN" width="250"/> | <img src="URL_IMAGEN_CARRITO" width="250"/> |

*(Nota: Reemplazar los marcadores con las URLs de las capturas de pantalla una vez desplegada la aplicación).*

---

## 🚀 Arquitectura Tecnológica

### Backend (API RESTful)
Desarrollado bajo los principios de *Clean Architecture* para garantizar alta cohesión y bajo acoplamiento.
- **Framework:** C# .NET Core
- **Arquitectura:** N-Tier (API, Core/Domain, Infrastructure)
- **ORM:** Entity Framework Core (Code-First)
- **Base de Datos:** Relacional (SQL Server / PostgreSQL)
- **Seguridad:** Autenticación y autorización basada en JWT, encriptación de contraseñas, políticas estrictas de CORS y prevención de inyecciones SQL.

### Frontend (SPA)
Construido para ofrecer una experiencia de usuario fluida y reactiva.
- **Core:** React.js (Vite para HMR y compilación ultrarrápida)
- **Estilos:** Tailwind CSS
- **Enrutamiento:** React Router DOM
- **Gestión de Estado:** Context API / Zustand
- **Cliente HTTP:** Axios (con interceptores para manejo automático de *tokens*)

---

## 📂 Estructura del Monorepo

```text
DevGT-B2C-ECOMMERCE/
├── Backend/                          # Solución C# .NET
│   ├── TiendaApi.API/                # Capa de Presentación (Controladores, Middlewares, CORS)
│   ├── TiendaApi.Core/               # Capa de Dominio (Entidades, DTOs, Interfaces)
│   └── TiendaApi.Infrastructure/     # Capa de Acceso a Datos (DbContext, Repositorios, Servicios JWT)
│
└── Frontend/                         # Aplicación React
    ├── src/
    │   ├── assets/                   # Recursos estáticos
    │   ├── components/               # Componentes UI reutilizables
    │   ├── context/                  # Estado global (Cart, Auth)
    │   ├── pages/                    # Vistas (Catálogo, Checkout, Admin Dashboard)
    │   └── services/                 # Peticiones Axios y lógica HTTP
    ├── tailwind.config.js            # Configuración de diseño
    └── vite.config.js                # Configuración de empaquetado