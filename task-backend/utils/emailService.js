const SibApiV3Sdk = require("sib-api-v3-sdk");

const apiKey = process.env.BREVO_API_KEY;
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = apiKey;

const sendResetPasswordEmail = async (toEmail, resetLink) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email: toEmail }],
    sender: { email: "josebuenomultimedia@gmail.com", name: "Task Dashboard" },
    subject: "Recupera tu contraseña",
    htmlContent: `
      <h2>Recupera tu contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Este enlace expirará en 1 hora.</p>
    `,
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

const sendTaskReminderEmail = async (toEmail, taskTitle) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email: toEmail }],
    sender: { email: "josebuenomultimedia@gmail.com", name: "Task Dashboard" },
    subject: "Tarea pendiente",
    htmlContent: `
      <h2>Tienes una tarea pendiente</h2>
      <p>La siguiente tarea lleva más de 7 días en progreso:</p>
      <strong>${taskTitle}</strong>
      <p>Por favor, revisa tu tablero.</p>
    `,
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = {
  sendResetPasswordEmail,
  sendTaskReminderEmail,
};
