require("dotenv").config({ path: __dirname + "/../.env" });

console.log("API Key desde process.env.BREVO_API_KEY:");
console.log(process.env.BREVO_API_KEY);
