# 🛒 API de Inventario de Productos

API REST para gestión de inventario de productos, desarrollada como proyecto de portafolio. Incluye operaciones CRUD completas, documentación interactiva con Swagger y Frontend integrado.

## 🛠️ Tech Stack

- **Node.js** + **Express** — servidor y rutas HTTP
- **MySQL** + **mysql2** — base de datos relacional
- **Swagger** — documentación interactiva de endpoints
- **dotenv** — gestión de variables de entorno
- **HTML + CSS + JavaScript** — frontend integrado

## 📋 Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Listar todos los productos |
| GET | `/api/products/:id` | Obtener un producto por ID |
| POST | `/api/products` | Crear un nuevo producto |
| PUT | `/api/products/:id` | Actualizar un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |
| POST | `/api/products/reset` | Resetear productos a datos iniciales |

## 🚀 Instalación local

### Requisitos previos
- Node.js >= 18
- MySQL >= 8

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/PIPareja/product-inventory-api.git
cd product-inventory-api

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de MySQL

# 4. Crear la base de datos
# Ejecuta en tu cliente MySQL:
CREATE DATABASE product_manager;
USE product_manager;
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# 5. Iniciar el servidor
npm run dev
```

## 🌐 URLs disponibles

| URL | Descripción |
|-----|-------------|
| `http://localhost:3000` | Frontend — interfaz visual |
| `http://localhost:3000/api/products` | API REST |
| `http://localhost:3000/api-docs` | Documentación Swagger |

## 📦 Ejemplo de body para POST y PUT

```json
{
  "name": "Laptop Pro 15",
  "description": "Laptop de alto rendimiento",
  "price": 1300,
  "stock": 10
}
```

## 📁 Estructura del proyecto

```
src/
├── config/
│   ├── db.js              # Conexión a MySQL (pool de conexiones)
│   └── swagger.js         # Configuración de Swagger
├── controllers/
│   └── product.controller.js  # Lógica de negocio
├── routes/
│   └── product.routes.js      # Definición de endpoints
├── middlewares/
│   └── errorHandler.js        # Manejo centralizado de errores
└── app.js                 # Entry point del servidor
public/
└── index.html             # Frontend integrado
```

## 👤 Autor

**Pablo Pareja** — [GitHub](https://github.com/PIPareja) - [LinkedIn](https://www.linkedin.com/in/ppareja/)

