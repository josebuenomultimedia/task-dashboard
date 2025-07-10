# Task Dashboard

Aplicación avanzada de gestión de tareas estilo Kanban con autenticación segura, recordatorios automáticos y experiencia de usuario moderna.

---

## 🚀 Características principales

- Registro e inicio de sesión con Google reCAPTCHA v2 y JWT
- Modo invitado sin necesidad de registro (datos no persistentes)
- Recuperación de contraseña automática vía email seguro
- Recordatorios diarios de tareas en progreso durante más de 7 días
- Cada usuario gestiona exclusivamente sus propias tareas
- Creación, edición, cambio de estado y eliminación de tareas
- Panel Kanban interactivo y responsivo
- Diseño moderno compatible con dispositivos móviles y escritorio
- Pruebas unitarias de endpoints y lógica con Jest y Supertest
- Validación en tiempo real de formularios (campos de email y contraseña con mensajes contextualizados)
- Validación de formato de correo electrónico en registro
- Modal de confirmación para borrar todas las tareas
- Tema claro y oscuro con selector persistente
- Etiquetado de tareas como importantes (resaltadas y ordenadas primero)
- Selector de tema siempre visible y responsive
- Visualización clara de errores sin depender de alertas del navegador

---

## 🖼 Capturas de pantalla

Pantalla de inicio / Login

![image](https://github.com/user-attachments/assets/a02ee45d-18db-4a60-804b-b42a8176004b)

Registro de usuario con Google Captcha

![image](https://github.com/user-attachments/assets/5731a053-f567-45c2-bf79-20d110c30162)

Panel principal Kanban

![image](https://github.com/user-attachments/assets/5665f7d9-8a2c-4631-b438-d1ab7a646505)

Recordatorio de tarea antigua

![image](https://github.com/user-attachments/assets/1e8d2cad-3a93-4508-8290-5827bb94e000)

Recuperación de contraseña

![image](https://github.com/user-attachments/assets/b26325f3-ac7a-4cb6-88ac-8e33b3f94d9c)

Email de recuperación

![image](https://github.com/user-attachments/assets/5260ea14-aeb4-45fd-83b3-d63cc916692f)

---

## ⚙️ Tecnologías utilizadas

- Frontend: React, Vite, Redux Toolkit, TypeScript, Tailwind CSS, Axios, React Router DOM
- Backend: Node.js, Express, MongoDB + Mongoose
- Autenticación: JWT
- Seguridad: Google reCAPTCHA v2, bcrypt, CORS
- Email: Brevo (ex Sendinblue)
- Testing: Jest y Supertest
- Despliegue: Vercel (frontend), Railway (backend), MongoDB Atlas

---

## 📦 Instalación local

1. Clonar el repositorio:
   \`\`\`bash
   git clone https://github.com/josebuenomultimedia/task-dashboard.git
   \`\`\`

2. Backend:
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

3. Frontend:
   \`\`\`bash
   cd ../frontend
   npm install
   \`\`\`

4. Configurar variables de entorno en \`backend/.env\`:
   \`\`\`env
   MONGODB_URI=tu_mongodb_uri
   JWT_SECRET=tu_clave_segura
   RECAPTCHA_SECRET_KEY=tu_clave_secreta_recaptcha
   BREVO_API_KEY=tu_api_key_brevo
   FRONTEND_URL=https://tu-frontend.vercel.app
   \`\`\`

5. Configurar variables de entorno en \`frontend/.env\`:
   \`\`\`env
   VITE_API_URL=https://tu-backend-production.up.railway.app/api
   \`\`\`

6. Iniciar backend:
   \`\`\`bash
   npm run dev
   \`\`\`

7. Iniciar frontend:
   \`\`\`bash
   npm run dev
   \`\`\`

---

## 🧪 Correr tests

En el backend:
\`\`\`bash
NODE_ENV=test npm test
\`\`\`

---

## 🌐 Despliegue

El proyecto puede desplegarse en:

- Frontend: Vercel – CDN global y despliegue continuo
- Backend: Railway – Entorno escalable y logs en tiempo real
- Base de datos: MongoDB Atlas

---

## 🛠 Scripts disponibles

Frontend:
\`\`\`bash
npm run dev # Desarrollo
npm run build # Producción
\`\`\`

Backend:
\`\`\`bash
npm run dev # Desarrollo con nodemon
npm test # Tests unitarios
node scripts/sendReminders.js # Ejecutar recordatorio manual de tareas
\`\`\`

---

## 💡 Ventajas técnicas

- Arquitectura RESTful escalable y modular
- Seguridad avanzada con JWT, bcrypt y reCAPTCHA
- Recuperación de contraseña con enlaces temporales de 1 hora
- Recordatorio automático de tareas mediante cron diario
- Código limpio y comentado, listo para equipos ágiles
- Preparada para nuevas funcionalidades (notificaciones push, soporte multiusuario)
- Validación contextual con mensajes en campos específicos
- Soporte de modo claro/oscuro con persistencia en localStorage
- Modal de confirmación elegante y accesible para acciones destructivas
- Etiquetado visual de tareas importantes con borde destacado y prioridad en orden
- Experiencia de usuario optimizada para móviles y escritorio

---

## 🌟 Roadmap futuro

- Notificaciones en tiempo real con WebSocket
- Roles y permisos por usuario
- Integración con calendarios externos
- Asignación colaborativa de tareas
- Notificaciones push

---

## 👨‍💻 Autor

Desarrollado por José Alejandro Bueno Salazar  
[GitHub](https://github.com/josebuenomultimedia)  
[josebuenomultimedia@gmail.com](mailto:josebuenomultimedia@gmail.com)

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.
