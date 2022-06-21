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
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const mongodb_1 = require("mongodb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const url = process.env.DB_URL;
console.log(process.env.PORT, process.env.DB_URL);
const client = new mongodb_1.MongoClient(url);
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitDb = client.db("habit_tracker");
    const users = habitDb.collection("users");
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password, "!");
    const hash = yield bcryptjs_1.default.hash(password, 10);
    const user = yield users.insertOne({ username, password: hash });
    res.json(user);
}));
exports.default = userRouter;
