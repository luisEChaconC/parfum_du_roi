# Proyecto E-commerce de Perfumes

Este es un proyecto de comercio electrónico especializado en la venta de perfumes, desarrollado con tecnologías modernas y siguiendo principios de arquitectura limpia.

## 📋 Descripción

El proyecto consiste en una aplicación web completa para la venta de perfumes con las siguientes características:

- **Catálogo de perfumes**: Organizado por categorías (Nicho, Diseñador, Árabes, Nuevos, Testers, Decants)
- **Sistema de usuarios**: Registro, autenticación y perfiles de usuario
- **Carrito de compras**: Gestión de productos seleccionados
- **Procesamiento de pagos**: Integración con sistemas de pago
- **Panel de administración**: Gestión de productos y usuarios

## 🚀 Tecnologías Principales

### Frontend

- **React 18** con TypeScript
- **Vite** como bundler y servidor de desarrollo
- **Material-UI (MUI)** para componentes de interfaz
- **Bootstrap** para estilos adicionales
- **React Router Dom** para navegación
- **Axios** para peticiones HTTP

### Backend

- **Node.js** con TypeScript
- **Express.js** como framework web
- **TypeORM** para manejo de base de datos
- **MySQL** como base de datos
- **Inversify** para inyección de dependencias
- **Class-validator** para validación de datos
- **Express-session** para manejo de sesiones
- **CSRF protection** para seguridad

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Limpia (Clean Architecture)** con las siguientes capas:

### Backend

```
src/
├── domain/           # Entidades y reglas de negocio
├── application/      # Casos de uso y lógica de aplicación
├── infrastructure/   # Adaptadores y configuraciones externas
├── presentation/     # Controladores y rutas HTTP
└── composition/      # Configuración de dependencias
```

### Frontend

```
src/
├── components/       # Componentes reutilizables
├── pages/           # Páginas principales
├── Context/         # Contextos de React
├── data/            # Datos estáticos
├── utils/           # Utilidades y helpers
└── global/          # Configuraciones globales
```

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- MySQL (v8 o superior)

### Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd proyecto_desarrollo_web
   ```

2. **Instala las dependencias del root:**

   ```bash
   npm install
   ```

3. **Configura el backend:**

   ```bash
   cd backend
   npm install
   ```

4. **Configura el frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuración de Base de Datos

1. **Crea una base de datos MySQL:**

   ```sql
   CREATE DATABASE perfume_store;
   ```

2. **Configura las variables de entorno del backend:**
   ```bash
   # En backend/.env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=perfume_store
   SESSION_SECRET=tu_secret_key_aqui
   PORT=3000
   ```

## 🚀 Ejecución

### Desarrollo

1. **Inicia el backend:**

   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Inicia el frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Accede a la aplicación:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

### Producción

1. **Compila el frontend:**

   ```bash
   cd frontend
   npm run build
   ```

2. **Compila el backend:**

   ```bash
   cd backend
   npm run build
   ```

3. **Inicia el servidor:**
   ```bash
   npm start
   ```

## 🌟 Características Principales

### 🛍️ Catálogo de Productos

- Navegación por categorías de perfumes
- Búsqueda y filtrado de productos
- Detalles completos de cada perfume
- Información de pirámide olfativa y acordes

### 👤 Gestión de Usuarios

- Registro de nuevos usuarios
- Autenticación segura
- Perfiles de usuario personalizables
- Historial de compras

### 🛒 Carrito de Compras

- Agregar/remover productos
- Modificar cantidades
- Cálculo automático de totales
- Persistencia entre sesiones

### 💳 Procesamiento de Pagos

- Validación de datos de tarjetas
- Integración con gateways de pago
- Confirmación de transacciones
- Generación de órdenes

### 🔐 Seguridad

- Protección CSRF
- Validación de datos
- Sesiones seguras
- Encriptación de contraseñas

## 📁 Estructura del Proyecto

```
proyecto_desarrollo_web/
├── backend/                 # Aplicación backend
│   ├── src/
│   │   ├── application/     # Casos de uso y DTOs
│   │   ├── domain/          # Entidades y reglas de negocio
│   │   ├── infrastructure/  # Adaptadores y configuraciones
│   │   ├── presentation/    # Controladores y rutas
│   │   └── composition/     # Inyección de dependencias
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Aplicación frontend
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── Context/        # Contextos de React
│   │   └── utils/          # Utilidades
│   ├── public/             # Archivos estáticos
│   ├── package.json
│   └── vite.config.ts
├── package.json            # Dependencias del root
└── README.md              # Este archivo
```

## 👥 Integrantes del Equipo

- **Kenneth Osorio Masis** - C15724
- **Antony Picado Alvarado** - C15939
- **Esteban Chacón Chaves** - C22039
- **Ignacio Alesina Acuña** - C5A073
