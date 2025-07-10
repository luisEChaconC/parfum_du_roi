# Backend - E-commerce de Perfumes

Aplicación backend del proyecto de comercio electrónico de perfumes, desarrollada con Node.js, TypeScript y siguiendo principios de Arquitectura Limpia (Clean Architecture).

## 🚀 Tecnologías Utilizadas

### Core

- **Node.js** - Entorno de ejecución de JavaScript
- **TypeScript** - Superset de JavaScript con tipado estático
- **Express.js** - Framework web minimalista y flexible

### Base de Datos

- **TypeORM** - ORM (Object-Relational Mapping) para TypeScript
- **MySQL** - Sistema de gestión de base de datos relacional

### Seguridad

- **Express-session** - Middleware para manejo de sesiones
- **CSRF Protection** - Protección contra ataques Cross-Site Request Forgery
- **Class-validator** - Validación de datos basada en decoradores

### Arquitectura y Patrones

- **Inversify** - Contenedor de inyección de dependencias
- **Clean Architecture** - Arquitectura hexagonal
- **SOLID Principles** - Principios de diseño de software

### Herramientas de Desarrollo

- **TSC-Alias** - Resolución de alias para TypeScript
- **Dotenv** - Manejo de variables de entorno
- **TypeORM-Extension** - Extensiones para TypeORM

## 🏗️ Arquitectura del Proyecto

El proyecto sigue los principios de **Arquitectura Limpia** con las siguientes capas:

```
src/
├── domain/              # Capa de Dominio
│   ├── entities/        # Entidades de negocio
│   ├── enums/          # Enumeraciones
│   └── errors/         # Errores de dominio
├── application/         # Capa de Aplicación
│   ├── dtos/           # Data Transfer Objects
│   ├── errors/         # Errores de aplicación
│   ├── ports/          # Interfaces (contratos)
│   ├── use-cases/      # Casos de uso
│   └── utils/          # Utilidades de aplicación
├── infrastructure/     # Capa de Infraestructura
│   ├── adapters/       # Adaptadores de repositorios
│   ├── config/         # Configuraciones
│   ├── errors/         # Errores de infraestructura
│   ├── mappers/        # Mappers de datos
│   └── persistence/    # Persistencia de datos
├── presentation/       # Capa de Presentación
│   ├── controllers/    # Controladores HTTP
│   ├── errors/         # Errores de presentación
│   ├── middleware/     # Middleware
│   └── routes/         # Rutas de la API
├── composition/        # Composición de dependencias
└── main.ts            # Punto de entrada
```

## 📋 Entidades del Dominio

### Entidades Principales

#### 👤 User (Usuario)

- `id`: Identificador único
- `email`: Correo electrónico
- `password`: Contraseña encriptada
- `firstName`: Nombre
- `lastName`: Apellido
- `phone`: Teléfono
- `address`: Dirección

#### 🌸 Perfume

- `id`: Identificador único
- `name`: Nombre del perfume
- `brand`: Marca
- `category`: Categoría (Nicho, Diseñador, Árabe, etc.)
- `concentration`: Concentración (EDP, EDT, etc.)
- `price`: Precio
- `stock`: Stock disponible
- `description`: Descripción
- `notes`: Notas olfativas
- `images`: Imágenes del producto

#### 🛒 Cart (Carrito)

- `id`: Identificador único
- `userId`: ID del usuario
- `items`: Elementos del carrito
- `total`: Total del carrito

#### 📦 Order (Pedido)

- `id`: Identificador único
- `userId`: ID del usuario
- `items`: Elementos del pedido
- `total`: Total del pedido
- `status`: Estado del pedido
- `date`: Fecha de creación

#### 💳 Payment (Pago)

- `id`: Identificador único
- `orderId`: ID del pedido
- `amount`: Monto
- `cardType`: Tipo de tarjeta
- `status`: Estado del pago

### Enumeraciones

#### PerfumeCategory

```typescript
export enum PerfumeCategory {
  NICHO = "nicho",
  DESIGNER = "designer",
  ARABE = "arabe",
  NUEVO = "nuevo",
  TESTER = "tester",
  DECANT = "decant",
}
```

#### PerfumeConcentration

```typescript
export enum PerfumeConcentration {
  EDP = "edp",
  EDT = "edt",
  PARFUM = "parfum",
  EDC = "edc",
}
```

#### Gender

```typescript
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  UNISEX = "unisex",
}
```

## 🔧 Casos de Uso

### Gestión de Usuarios

- **CreateUserUseCase**: Registrar nuevo usuario
- **LoginUseCase**: Autenticar usuario

### Gestión de Perfumes

- **CreatePerfumeUseCase**: Crear nuevo perfume
- **GetPerfumeByIdUseCase**: Obtener perfume por ID
- **GetPerfumesByCategoryUseCase**: Obtener perfumes por categoría

### Procesamiento de Pagos

- **ProcessPaymentUseCase**: Procesar pago de pedido

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- MySQL (v8 o superior)

### Instalación

1. **Navega al directorio del backend:**

   ```bash
   cd backend
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env`:

   ```env
   # Base de datos
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=perfume_store

   # Servidor
   PORT=3000

   # Sesiones
   SESSION_SECRET=tu_secret_key_muy_segura_aqui

   # Entorno
   NODE_ENV=development
   ```

4. **Configura la base de datos:**
   ```sql
   CREATE DATABASE perfume_store;
   ```

## 🚀 Ejecución

### Modo Desarrollo

```bash
# Compilar TypeScript
npm run build

# Iniciar servidor
npm start
```

### Modo Producción

```bash
# Compilar para producción
npm run build

# Iniciar servidor en producción
NODE_ENV=production npm start
```

### Semillas de Datos

```bash
# Poblar la base de datos con datos de ejemplo
npm run seed
```

## 🌐 API Endpoints

### Autenticación

#### POST /api/auth/register

Registrar nuevo usuario

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "123456789",
  "address": "Calle Ejemplo 123"
}
```

#### POST /api/auth/login

Iniciar sesión

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

### Perfumes

#### GET /api/perfumes

Obtener todos los perfumes

```bash
GET /api/perfumes?category=nicho&limit=10&offset=0
```

#### GET /api/perfumes/:id

Obtener perfume por ID

```bash
GET /api/perfumes/1
```

#### POST /api/perfumes

Crear nuevo perfume (Admin)

```json
{
  "name": "Aventus",
  "brand": "Creed",
  "category": "nicho",
  "concentration": "edp",
  "price": 299.99,
  "stock": 50,
  "description": "Perfume de nicho premium",
  "gender": "male"
}
```

### Carrito

#### GET /api/cart

Obtener carrito del usuario actual

#### POST /api/cart/add

Agregar producto al carrito

```json
{
  "perfumeId": 1,
  "quantity": 2
}
```

#### PUT /api/cart/update

Actualizar cantidad en el carrito

```json
{
  "perfumeId": 1,
  "quantity": 3
}
```

#### DELETE /api/cart/remove/:perfumeId

Eliminar producto del carrito

### Pagos

#### POST /api/payments/process

Procesar pago

```json
{
  "cardNumber": "4111111111111111",
  "expiryDate": "12/25",
  "cvv": "123",
  "cardType": "visa",
  "amount": 299.99
}
```

## 🔐 Seguridad

### Características de Seguridad Implementadas

1. **Protección CSRF**: Tokens CSRF para prevenir ataques de falsificación de peticiones
2. **Sesiones Seguras**: Manejo de sesiones con cookies seguras
3. **Validación de Datos**: Validación robusta usando class-validator
4. **Encriptación de Contraseñas**: Contraseñas hasheadas con bcrypt
5. **Sanitización de Entradas**: Prevención de inyección SQL y XSS

### Middleware de Seguridad

```typescript
// Protección CSRF
app.use(csrf());

// Validación de datos
app.use(validationMiddleware);

// Manejo de errores
app.use(errorHandler);
```

## 📊 Base de Datos

### Modelo de Datos

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de perfumes
CREATE TABLE perfumes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category ENUM('nicho', 'designer', 'arabe', 'nuevo', 'tester', 'decant') NOT NULL,
  concentration ENUM('edp', 'edt', 'parfum', 'edc') NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  description TEXT,
  gender ENUM('male', 'female', 'unisex') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de imágenes
CREATE TABLE images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  perfumeId INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  alt VARCHAR(255),
  isPrimary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (perfumeId) REFERENCES perfumes(id) ON DELETE CASCADE
);

-- Tabla de notas olfativas
CREATE TABLE notes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  perfumeId INT NOT NULL,
  type ENUM('top', 'middle', 'base') NOT NULL,
  name VARCHAR(100) NOT NULL,
  FOREIGN KEY (perfumeId) REFERENCES perfumes(id) ON DELETE CASCADE
);
```

## 🧪 Testing

### Estructura de Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

## 📝 Logging

### Configuración de Logs

```typescript
// Logger personalizado
const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  error: (message: string) => console.error(`[ERROR] ${message}`),
  warn: (message: string) => console.warn(`[WARN] ${message}`),
};
```

## 🔍 Monitoreo

### Métricas Disponibles

- Tiempo de respuesta de endpoints
- Errores de aplicación
- Uso de memoria
- Conexiones a base de datos

## 📦 Scripts Disponibles

```json
{
  "build": "tsc && tsc-alias", // Compilar TypeScript
  "start": "node dist/main.js", // Iniciar servidor
  "test": "jest", // Ejecutar tests
  "seed": "ts-node -r tsconfig-paths/register ./node_modules/typeorm-extension/dist/cli/index.js seed -d src/infrastructure/database/data-source.ts"
}
```

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Error de conexión a base de datos:**

   ```bash
   # Verificar que MySQL esté ejecutándose
   systemctl status mysql

   # Verificar credenciales en .env
   cat .env
   ```

2. **Errores de TypeScript:**

   ```bash
   # Limpiar build anterior
   rm -rf dist/

   # Recompilar
   npm run build
   ```

3. **Problemas de dependencias:**

   ```bash
   # Limpiar node_modules
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Errores de migración:**
   ```bash
   # Ejecutar migraciones manualmente
   npm run migration:run
   ```

## 🚀 Despliegue

### Configuración para Producción

1. **Variables de entorno:**

   ```env
   NODE_ENV=production
   PORT=3000
   DB_HOST=tu_host_produccion
   DB_NAME=perfume_store_prod
   SESSION_SECRET=secret_muy_seguro_para_produccion
   ```

2. **Compilar para producción:**

   ```bash
   npm run build
   ```

3. **Iniciar con PM2:**
   ```bash
   pm2 start dist/main.js --name perfume-backend
   ```

## 👥 Integrantes del Equipo

- **Kenneth Osorio Masis** - C15724
- **Antony Picado Alvarado** - C15939
- **Esteban Chacón Chaves** - C22039
- **Ignacio Alesina Acuña** - C5A073
