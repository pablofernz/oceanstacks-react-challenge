# 🍽️ Sistema de Gestión de Órdenes - OceansStacks

Aplicación web para la gestión de órdenes en restaurantes desarrollada como prueba técnica. Sistema diseñado para optimizar el flujo de trabajo de meseros, implementando una arquitectura moderna con separación de responsabilidades, **TypeScript** en todo el stack, **React** con **Vite** en el frontend y **Node.js** con **Express** en el backend.

## ✨ Características

- 📋 **Gestión de Productos**: CRUD completo para administrar el menú del restaurante.
- 🧾 **Sistema de Órdenes**: Creación y cierre de órdenes con selección de productos del catálogo.
- 📊 **Dashboard de Órdenes**: Visualización completa de todas las órdenes creadas con detalles de productos, fecha y total.
- 💰 **Cálculo en Tiempo Real**: Total de la orden actualizado automáticamente al agregar productos.
- ✅ **Validación Robusta**: Formularios con validación completa y manejo claro de errores.
- 🎨 **Interfaz Moderna**: Diseño limpio y responsivo optimizado para uso en tablets y dispositivos móviles.
- 🚀 **Performance**: Build ultrarrápido con **Vite** y animaciones fluidas con **Framer Motion**.
- 🔒 **Tipado Seguro**: Código robusto gracias a **TypeScript** en frontend y backend.
- 🐳 **Docker Ready**: Backend contenerizado listo para despliegue.
- 🗄️ **Base de Datos**: Integración con **Supabase (PostgreSQL)**.

## 🚀 Tecnologías utilizadas

### Frontend (Client)

- **[React](https://react.dev/)** – Librería para construir interfaces de usuario.
- **[Vite](https://vitejs.dev/)** – Herramienta de build de próxima generación.
- **[TypeScript](https://www.typescriptlang.org/)** – JavaScript con sintaxis para tipos.
- **[Tailwind CSS](https://tailwindcss.com/)** – Framework de utilidades para diseño rápido.
- **[Framer Motion](https://www.framer.com/motion/)** – Librería de animaciones declarativas.
- **[Zod](https://zod.dev/)** & **[React Hook Form](https://react-hook-form.com/)** – Validación de esquemas y formularios.

### Backend (API)

- **[Node.js](https://nodejs.org/)** – Entorno de ejecución para JavaScript.
- **[Express](https://expressjs.com/)** – Framework web minimalista para Node.js.
- **[TypeScript](https://www.typescriptlang.org/)** – Tipado estático en el backend.
- **[Supabase (PostgreSQL)](https://supabase.com/)** – Backend as a Service para base de datos.
- **[Docker](https://www.docker.com/)** – Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.

## 🏗️ Arquitectura

La aplicación implementa una **API REST** con los siguientes endpoints:

### Productos
- `GET /products` - Obtener lista de productos
- `POST /products` - Crear nuevo producto
- `DELETE /products` - Borrar un producto (borrado lógico o soft delete)

### Órdenes
- `GET /orders` - Obtener todas las órdenes
- `POST /orders` - Crear nueva orden
- `DELETE /orders` - Borrar una orden

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **Docker** y **Docker Compose** (opcional, para ejecutar el backend en contenedor)
- **Git**

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/pablofernz/OceansStacks-Tienda
cd OceansStacks-Tienda
```

### 2. Configurar el Backend

1. Navega a la carpeta `api` e instala las dependencias:
```bash
   cd api
   npm install
```

2. Crea un archivo `.env` en `api/` con tus credenciales:
```env
   SUPABASE_URL=tu_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=tu_supabase_key
   PORT=3000
```

### 3. Configurar el Frontend

1. Navega a la carpeta `client` e instala las dependencias:
```bash
   cd ../client
   npm install
```

## 🏃‍♂️ Ejecución

### Opción A: Ejecución Local (Desarrollo)

Necesitarás dos terminales:

**Terminal 1 (Backend):**
```bash
cd api
npm run dev
```
_El servidor iniciará en http://localhost:3000_

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
_La aplicación estará disponible en http://localhost:5173_

### Opción B: Ejecución con Docker (Backend)

Si prefieres ejecutar el backend aislado:
```bash
cd api
docker-compose up --build
```

Esto levantará la API en el puerto 3000 usando la configuración de tu archivo `.env`.

## 🎯 Funcionalidades Implementadas

### ✅ CRUD de Productos
- Crear productos con nombre y precio
- Listar productos disponibles en el catálogo
- Validación de campos requeridos

### ✅ Sistema de Órdenes
- Selección de productos del catálogo
- Cálculo automático del total en tiempo real
- Botón para cerrar/guardar orden
- Validación completa del formulario

### ✅ Dashboard de Órdenes
- Lista completa de órdenes creadas
- Visualización de productos por orden
- Fecha de creación y total de cada orden

### ✅ Validaciones
- Formularios con validación robusta usando Zod
- Mensajes de error claros y específicos
- Prevención de datos inválidos (precios negativos, campos vacíos, etc.)

## 🚢 Despliegue (Producción)

### Backend (Render/Railway/Docker)

El proyecto incluye `Dockerfile` y `docker-compose.yml`.

- **Root Directory**: `api`
- **Build Command**: (Automático por Docker)
- **Start Command**: (Automático por Docker)

### Frontend (Vercel/Netlify)

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Deploy en Vercel**: ✅ Configurado y optimizado

## 👨‍💻 Autor

**Pablo Fernandez**

- GitHub: [pablofernz](https://github.com/pablofernz)
- LinkedIn: [Pablo Fernandez](https://linkedin.com/in/pablo-fz1)
- Email: pablodanyfer@gmail.com
- Portfolio: [pablofernz.vercel.app](https://pablofernz.vercel.app)

## 🔗 Links útiles

- [Demo del Proyecto](https://pablofernz-oceanstacks.vercel.app/) 🌐

---

**Nota**: Este proyecto fue desarrollado como parte del desafío técnico de OceansStacks, cumpliendo con todos los requisitos funcionales y técnicos solicitados.
