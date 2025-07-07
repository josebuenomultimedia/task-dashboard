const request = require("supertest");
const app = require("../index");

describe("Tasks API", () => {
  let server;
  let token;

  beforeAll(async () => {
    server = app.listen(4001);

    const email = `task_${Date.now()}@mail.com`;

    await request(server).post("/api/auth/register").send({
      email,
      password: "123456",
      recaptchaToken: "test_token",
    });

    const res = await request(server).post("/api/auth/login").send({
      email,
      password: "123456",
    });

    token = res.body.token;
  });

  afterAll(async () => {
    await server.close();
    // Si tienes conexión a Mongoose, ciérrala también
    await require("mongoose").connection.close();
  });

  test("Create a task", async () => {
    const res = await request(server)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test task",
        status: "todo",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test task");
  });

  test("Get tasks", async () => {
    const res = await request(server)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
