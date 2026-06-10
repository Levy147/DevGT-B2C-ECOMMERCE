# DevGT B2C E-Commerce & Inventory Management

Plataforma B2C de comercio electrónico y sistema de gestión de inventario, diseñada con una arquitectura Cliente-Servidor fuertemente desacoplada. El proyecto implementa un *backend* robusto y escalable en C# (.NET Core) utilizando Arquitectura N-Capas, y un *frontend* interactivo y optimizado construido con React y Vite.

## 🚀 Arquitectura Tecnológica

### Backend (API RESTful)
Desarrollado bajo los principios de *Clean Architecture* para garantizar alta cohesión y bajo acoplamiento.
- **Framework:** C# .NET Core
- **Arquitectura:** N-Tier (API, Core/Domain, Infrastructure)
- **ORM:** Entity Framework Core (Code-First)
- **Base de Datos:** Relacional (SQL Server / PostgreSQL)
- **Seguridad:** Autenticación y autorización basada en JWT (JSON Web Tokens), encriptación de contraseñas, políticas estrictas de CORS y sanitización de *inputs* para mitigar inyecciones SQL.

### Frontend (SPA)
Construido para ofrecer una experiencia de usuario fluida, diseño *responsive* y un panel de administración en tiempo real.
- **Core:** React.js (inicializado con Vite para HMR y compilación rápida)
- **Estilos:** Tailwind CSS
- **Enrutamiento:** React Router DOM
- **Gestión de Estado:** Context API
- **Cliente HTTP:** Axios (con interceptores para manejo seguro de *tokens*)

----------

## 📂 Estructura del Monorepo

El repositorio está organizado en dos entornos principales aislados:

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
    │   ├── components/               # Componentes UI reutilizables y Layouts
    │   ├── context/                  # Estado global (Cart, Auth)
    │   ├── hooks/                    # Custom hooks para encapsular lógica
    │   ├── pages/                    # Vistas (Catálogo, Checkout, Admin Dashboard)
    │   └── services/                 # Configuración de Axios y llamadas a la API
    ├── tailwind.config.js            # Configuración de diseño
    └── vite.config.js                # Configuración de empaquetado