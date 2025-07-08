require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Task = require("../models/Task");
const { sendReminderEmail } = require("../utils/sendEmail");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Encontrar todas las tareas en progreso de hace más de 7 días
    const tasks = await Task.find({
      status: "in-progress",
      // createdAt: { $lte: oneWeekAgo },
      notified: false,
    }).populate("user");

    if (tasks.length === 0) {
      console.log("✅ No hay tareas pendientes antiguas.");
      process.exit(0);
    }

    // Agrupar tareas por usuario
    // Agrupar tareas por usuario
    const userTasks = {};
    tasks.forEach((task) => {
      if (!task.user || !task.user._id) {
        console.log(`⚠️ Tarea sin usuario asignado: ${task._id}`);
        return; // saltar esta tarea
      }

      const userId = task.user._id.toString();
      if (!userTasks[userId]) {
        userTasks[userId] = {
          email: task.user.email,
          tasks: [],
        };
      }
      userTasks[userId].tasks.push(task.title);
    });

    // Enviar un correo a cada usuario
    for (const userId in userTasks) {
      const { email, tasks } = userTasks[userId];
      await sendReminderEmail(email, tasks);

      // Marcar como notificadas
      await Task.updateMany(
        {
          user: userId,
          status: "in-progress",
          notified: false,
          createdAt: { $lte: oneWeekAgo },
        },
        { $set: { notified: true } }
      );

      console.log(
        `📧 Recordatorio enviado a ${email} y tareas marcadas como notificadas.`
      );
    }

    console.log("✅ Todos los recordatorios enviados.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error en el script de recordatorio:", err);
    process.exit(1);
  }
})();
