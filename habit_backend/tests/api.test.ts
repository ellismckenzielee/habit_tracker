import app from "../index";
import request from "supertest";
import client, { habitDb } from "../db/db";
const backend = request(app);
beforeEach(() => {
  return habitDb.dropDatabase();
});
afterAll(() => {
  return client.close();
});
describe("testing habit_backend API", () => {
  describe("GET /", () => {
    test("Retrieve JSON info", async () => {
      console.log("test");
      try {
        const response = await backend.get("/");
        console.dir(response.body);
        expect(response.body).toEqual({ success: "reached root" });
        expect(response.status).toBe(200);
      } catch (err) {
        console.log("/err", err);
      }
    });
  });
  describe("GET /user/login ENDPOINT", () => {
    test("Successful Login: returns status 200", async () => {
      const username = "ellis";
      const password = "password";
      try {
        const response = await backend
          .post("/user/login")
          .send({ username, password });
        expect(response.body).toEqual({ username });
      } catch (err) {
        console.log(err);
      }
    });
  });
  describe("POST /user/signup ENDPOINT", () => {
    test("Successful Signup: returns status 200 and userId", async () => {
      const username = "eddievedder";
      const password = "pearljam10";
      try {
        const response = await backend
          .post("/user/signup")
          .send({ username, password });
        console.log("RESPONSE", response.body);
        expect(response.body).toEqual({ userId: expect.any(String) });
      } catch (err) {
        console.log(err);
      }
    });
    test("Unsuccessful Signup: returns status 409 and message: username already exists", async () => {
      const username = "eddievedder";
      const password = "pearljam10";
      try {
        const response = await backend
          .post("/user/signup")
          .send({ username, password });
        console.log("RESPONSE", response.body);
        const response2 = await backend
          .post("/user/signup")
          .send({ username, password });
        expect(response2.status).toBe(409);
        expect(response2.body).toEqual({ message: "username already exists" });
      } catch (err) {
        console.log(err);
      }
    });
  });
  describe.only("DELETE /user/:user_id ENDPOINT", () => {
    test("Successful deletion: status 200", async () => {
      const username = "ellismckenzielee";
      const password = "pearljam10";
      await backend.post("/user/signup").send({ username, password });
      const response = await backend.delete(`/user/${username}`);
      expect(response.status).toBe(200);
    });
    test("Unsuccessful deletion: status 404, message: username not found", async () => {
      const username = "ellismckenzielee2";
      const response = await backend.delete(`/user/${username}`);
      expect(response.status).toBe(404);
    });
    test("Unsuccessful deletion: status 404, message: invalid url", async () => {
      const username = "ellismckenzielee";

      const response = await backend.delete(`/user/${username}/fb`);
      expect(response.status).toBe(404);
    });
  });
});
