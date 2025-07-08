require("dotenv").config({ path: __dirname + "/../.env" });

const { sendResetPasswordEmail } = require("./emailService");

(async () => {
  try {
    await sendResetPasswordEmail(
      "josebuenomultimedia@gmail.com",
      "https://tusitio.com/reset-password/TESTTOKEN"
    );
    console.log("Correo enviado con éxito!");
  } catch (error) {
    console.error(error);
  }
})();
