const cron = require("node-cron");
const Task = require("../models/Task");
const User = require("../models/User");
const { sendTaskReminderEmail } = require("../utils/emailService");

// Corre todos los días a las 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("🔔 Ejecutando job de recordatorio de tareas...");

  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Buscar tareas in-progress no actualizadas en 7+ días
    const tasks = await Task.find({
      status: "in-progress",
      updatedAt: { $lte: sevenDaysAgo },
    }).populate("user");

    console.log(`✅ Se encontraron ${tasks.length} tareas pendientes.`);

    for (const task of tasks) {
      if (task.user && task.user.email) {
        await sendTaskReminderEmail(task.user.email, task.title);
        console.log(
          `📧 Recordatorio enviado a ${task.user.email} para la tarea "${task.title}"`
        );
      }
    }
  } catch (err) {
    console.error("❌ Error en el job de recordatorio:", err);
  }
});
