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
