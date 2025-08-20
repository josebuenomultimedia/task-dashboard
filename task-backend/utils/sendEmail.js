const nodemailer = require("nodemailer");

// Transport con Gmail y App Password
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // 465 = SSL/TLS
  secure: true, // true para 465
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  // 👇 SOLO en desarrollo, por si un antivirus/proxy mete un cert auto-firmado
  tls:
    process.env.NODE_ENV !== "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

exports.sendResetEmail = async (to, link) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
    to,
    subject: "Recuperar contraseña",
    html: `<p>Para restablecer tu contraseña, haz clic aquí: <a href="${link}">${link}</a></p>`,
  });
};

exports.sendReminderEmail = async (to, tasks) => {
  const taskList = tasks.map((t) => `<li>${t}</li>`).join("");

  await transporter.sendMail({
    from: `TaskApp <${process.env.GMAIL_USER}>`,
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

exports.sendVerificationEmail = async (to, verifyLink) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
    to,
    subject: "Confirma tu correo",
    html: `<p>Confirma tu correo aquí: <a href="${verifyLink}">${verifyLink}</a></p>`,
  });
};
