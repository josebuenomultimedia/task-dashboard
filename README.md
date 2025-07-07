# Task Dashboard

Panel de tareas estilo Kanban con autenticación de usuarios.

---

## 🚀 Características principales

- Registro y login con Google reCAPTCHA v2
- Sesiones seguras con JWT
- Cada usuario gestiona sus propias tareas
- Crear, editar, cambiar estado y eliminar tareas
- Estado persistente por sesión
- Pruebas unitarias básicas con Jest y Supertest

---

## 🖼 Capturas de pantalla

Próximamente

---

## ⚙️ Tecnologías utilizadas

- Frontend: React, Redux Toolkit, TypeScript, Tailwind CSS
- Backend: Node.js, Express, MongoDB + Mongoose
- Autenticación: JWT
- Seguridad: Google reCAPTCHA v2
- Testing: Jest y Supertest

---

## 📦 Instalación local

1. Clonar el repositorio:
   git clone https://github.com/josebuenomultimedia/task-dashboard.git

2. Backend:
   cd backend
   npm install

3. Frontend:
   cd ../frontend
   npm install

4. Configurar variables de entorno en `backend/.env`:
   MONGODB_URI=tu_mongodb_uri
   JWT_SECRET=tu_secreto_jwt
   RECAPTCHA_SECRET_KEY=tu_clave_secreta_recaptcha

5. Iniciar backend:
   npm run dev

6. Iniciar frontend:
   npm run dev

---

## 🧪 Correr tests

En el backend:
   NODE_ENV=test npm test

---

## 🌐 Despliegue

El proyecto puede desplegarse en:

- Frontend: Vercel
- Backend: Railway o Render

---

## 🛠 Scripts disponibles

Frontend:
   npm run dev – Desarrollo
   npm run build – Producción

Backend:
   npm run dev – Desarrollo con nodemon
   npm test – Tests unitarios

---

## 👨‍💻 Autor

Desarrollado por José Alejandro Bueno Salazar
https://github.com/josebuenomultimedia
---

## 📄 Licencia

Este proyecto está bajo licencia MIT.
