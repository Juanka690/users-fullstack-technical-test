# Gestión de usuarios – Prueba técnica Full-Stack

Aplicación full-stack para gestionar un listado de usuarios con un backend en Node.js/Express + Prisma (PostgreSQL) y un frontend en React + TypeScript (Vite).

El objetivo es cubrir:

- Listado de usuarios paginado.
- Detalle de usuario.
- Creación, edición y eliminación de usuarios.
- Validaciones, manejo de errores y diseño responsive con modo claro/oscuro.

---

## 🧩 Arquitectura general

Repositorio con estructura tipo monorepo:

```txt
users-fullstack-technical-test/
  backend/    → API REST (Node.js, Express, TypeScript, Prisma)
  frontend/   → SPA (React, TypeScript, Vite)
```

---

## 🌍 Despliegue en producción

El proyecto está desplegado en Render (frontend + backend) con base de datos PostgreSQL en Neon.

- **Frontend (React + Vite)**  
  URL pública:  
  👉 https://users-frontend-qytg.onrender.com

- **Backend (Node.js + Express + Prisma)**  
  URL base de la API:  
  👉 https://users-backend-pmob.onrender.com/api

Endpoints de ejemplo:

- Healthcheck:  
  `GET https://users-backend-pmob.onrender.com/api/health`

- Listado paginado de usuarios:  
  `GET https://users-backend-pmob.onrender.com/api/users?page=1&pageSize=10`

- Detalle de usuario:  
  `GET https://users-backend-pmob.onrender.com/api/users/:id`

---

## 🚀 Ejecutar el Backend en Local

Sigue estos pasos para levantar el backend usando Node.js, Express y Prisma, conectado directamente a la base de datos de Neon.

### 1. Entrar a la carpeta del backend

```bash
cd backend

npm install

npx prisma generate

npm run dev
```

### 2. Entrar a la carpeta del frontend

```bash
cd frontend

npm install

npm run dev
```

Luego edita .env y coloca el DATABASE_URL de Neon y el CORS_ORIGIN adecuado.
