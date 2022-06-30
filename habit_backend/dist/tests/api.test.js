"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const db_1 = __importDefault(require("../db/db"));
const backend = (0, supertest_1.default)(index_1.default);
afterAll(() => {
    return db_1.default.close();
});
describe("testing habit_backend API", () => {
    describe("GET /", () => {
        test("Retrieve JSON info", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("test");
            try {
                const response = yield backend.get("/");
                console.dir(response.body);
                expect(response.body).toEqual({ success: "reached root" });
                expect(response.status).toBe(200);
            }
            catch (err) {
                console.log("/err", err);
            }
        }));
    });
    describe("GET /user/login ENDPOINT", () => {
        test("Successful Login: returns status 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const username = "ellis";
            const password = "password";
            try {
                const response = yield backend
                    .post("/user/login")
                    .send({ username, password });
                expect(response.body).toEqual({ username });
            }
            catch (err) {
                console.log(err);
            }
        }));
    });
    describe.only("POST /user/signup ENDPOINT", () => {
        test("Successful Signup: returns status 200 and userId", () => __awaiter(void 0, void 0, void 0, function* () {
            const username = "eddievedder";
            const password = "pearljam10";
            try {
                const response = yield backend
                    .post("/user/signup")
                    .send({ username, password });
                console.log("RESPONSE", response.body);
                expect(response.body).toEqual({ userId: expect.any(String) });
            }
            catch (err) {
                console.log(err);
            }
        }));
    });
});
