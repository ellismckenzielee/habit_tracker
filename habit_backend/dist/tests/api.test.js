"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const db_1 = __importStar(require("../db/db"));
const backend = (0, supertest_1.default)(index_1.default);
beforeEach(() => {
    return db_1.habitDb.dropDatabase();
});
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
    describe("POST /user/signup ENDPOINT", () => {
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
        test("Unsuccessful Signup: returns status 409 and message: username already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const username = "eddievedder";
            const password = "pearljam10";
            try {
                const response = yield backend
                    .post("/user/signup")
                    .send({ username, password });
                console.log("RESPONSE", response.body);
                const response2 = yield backend
                    .post("/user/signup")
                    .send({ username, password });
                expect(response2.status).toBe(409);
                expect(response2.body).toEqual({ message: "username already exists" });
            }
            catch (err) {
                console.log(err);
            }
        }));
    });
    describe.only("DELETE /user/:user_id ENDPOINT", () => {
        test("Successful deletion: status 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const username = "ellismckenzielee";
            const password = "pearljam10";
            yield backend.post("/user/signup").send({ username, password });
            const response = yield backend.delete(`/user/${username}`);
            expect(response.status).toBe(200);
        }));
        test("Unsuccessful deletion: status 404, message: username not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const username = "ellismckenzielee2";
            const response = yield backend.delete(`/user/${username}`);
            expect(response.status).toBe(404);
        }));
        test("Unsuccessful deletion: status 404, message: invalid url", () => __awaiter(void 0, void 0, void 0, function* () {
            const username = "ellismckenzielee";
            const response = yield backend.delete(`/user/${username}/fb`);
            expect(response.status).toBe(404);
        }));
    });
});
