# 📝 Task Dashboard

Aplicación fullstack de gestión de tareas con autenticación JWT, Node.js, MongoDB y React.

## 🚀 Características

✅ Registro y login de usuario con reCAPTCHA  
✅ Creación, edición y eliminación de tareas  
✅ Tareas privadas por usuario  
✅ Panel Kanban básico  
✅ Backend REST API con Express  
✅ Frontend en React + Redux Toolkit  
✅ Base de datos MongoDB  
✅ Pruebas con Jest y Supertest

---

## ⚙️ Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- React
- Redux Toolkit
- Tailwind CSS (opcional)
- Jest / Supertest

---

## 🛠 Instalación y ejecución local

### 1️⃣ Clonar el repositorio

git clone https://github.com/TU_USUARIO/TU_REPO.git
cd task-dashboard
2️⃣ Backend
cd backend
npm install
Crear archivo .env con:

MONGO_URI=tu_url_de_mongodb
JWT_SECRET=tu_secreto
RECAPTCHA_SECRET_KEY=tu_clave_recaptcha
Ejecutar en desarrollo:

npm run dev
3️⃣ Frontend
En otra terminal:

cd frontend
npm install
npm run dev
✅ Scripts disponibles
npm run dev: modo desarrollo

npm test: correr tests

🧪 Pruebas
Para correr pruebas backend:

NODE_ENV=test npm test
🌐 Despliegue
El frontend se puede desplegar en Vercel y el backend en Railway o Render.

✨ Autor
👤 José Alejandro Bueno Salazar

📸 Capturas
(Agrega aquí capturas de pantalla de tu app)
