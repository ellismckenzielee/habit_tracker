import app from "../index";
import request from "supertest";
import client from "../db/db";
const backend = request(app);
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
  describe.only("POST /user/signup ENDPOINT", () => {
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
  });
});
