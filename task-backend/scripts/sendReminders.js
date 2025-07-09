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

    // Buscar tareas en progreso de hace más de 7 días y que no hayan sido notificadas
    const tasks = await Task.find({
      status: "in-progress",
      createdAt: { $lte: oneWeekAgo },
      notified: false,
    }).populate("user");

    if (tasks.length === 0) {
      console.log("✅ No hay tareas pendientes antiguas.");
      process.exit(0);
    }

    // Agrupar tareas por usuario
    const userTasks = {};
    tasks.forEach((task) => {
      if (!task.user || !task.user._id) {
        console.log(`⚠️ Tarea sin usuario asignado: ${task._id}`);
        return;
      }

      const userId = task.user._id.toString();
      if (!userTasks[userId]) {
        userTasks[userId] = {
          email: task.user.email,
          tasks: [],
        };
      }
      userTasks[userId].tasks.push(task);
    });

    // Enviar correos y marcar como notificadas
    for (const userId in userTasks) {
      const { email, tasks } = userTasks[userId];
      const titles = tasks.map((t) => t.title);
      await sendReminderEmail(email, titles);

      // Marcar todas las tareas como notificadas
      const taskIds = tasks.map((t) => t._id);
      await Task.updateMany(
        { _id: { $in: taskIds } },
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
