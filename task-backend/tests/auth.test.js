const request = require("supertest");
const app = require("../index"); // o donde exportes tu app

describe("Auth API", () => {
  let server;
  beforeAll(() => {
    server = app.listen(4000); // Para pruebas, puerto diferente
  });

  afterAll(async () => {
    await server.close();
    // Si tienes conexión a Mongoose, ciérrala también
    await require("mongoose").connection.close();
  });

  test("Register user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        email: `test_${Date.now()}@mail.com`,
        password: "123456",
        recaptchaToken: "test_token", // Puedes mockear validación o desactivarla en test
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBeDefined();
  });

  test("Login user", async () => {
    const email = `test_login_${Date.now()}@mail.com`;

    await request(server).post("/api/auth/register").send({
      email,
      password: "123456",
      recaptchaToken: "test_token",
    });

    const res = await request(server).post("/api/auth/login").send({
      email,
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
