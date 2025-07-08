const nodemailer = require("nodemailer");
const SibTransport = require("nodemailer-sendinblue-transport");

const transporter = nodemailer.createTransport(
  new SibTransport({
    apiKey: process.env.BREVO_API_KEY,
  })
);

exports.sendResetEmail = async (to, resetLink) => {
  await transporter.sendMail({
    from: "noreply@taskapp.com", // Puedes usar noreply@tunombre.com
    to,
    subject: "Recuperar contraseña - Task Dashboard",
    html: `
      <h2>Recuperar contraseña</h2>
      <p>Has solicitado restablecer tu contraseña. Haz clic en el enlace de abajo:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Este enlace expira en 1 hora.</p>
    `,
  });
};

exports.sendReminderEmail = async (to, tasks) => {
  const taskList = tasks.map((t) => `<li>${t}</li>`).join("");

  await transporter.sendMail({
    from: "noreply@taskapp.com",
    to,
    subject: "Tienes tareas pendientes",
    html: `
      <h2>Hola 👋</h2>
      <p>Tienes las siguientes tareas pendientes desde hace más de una semana:</p>
      <ul>${taskList}</ul>
      <p>Por favor revísalas en tu panel de tareas.</p>
    `,
  });
};
