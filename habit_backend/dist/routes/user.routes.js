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
const db_1 = __importDefault(require("../db/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in userRouter/login function");
    const habitDb = db_1.default.db("habit_tracker");
    const users = habitDb.collection("users");
    const username = req.body.username;
    const password = req.body.password;
    habitDb.listCollections().forEach(console.log);
    try {
        console.log("trying findUser");
        const foundUser = yield users.findOne({ username });
        console.log(foundUser);
        if (foundUser) {
            const result = yield bcryptjs_1.default.compare(password, foundUser.password);
            if (result) {
                res.json({ username: foundUser.username });
            }
            else {
                res.json(null);
            }
        }
    }
    catch (err) {
        res.send(null);
    }
}));
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in userRouter/signup function");
    const habitDb = db_1.default.db("habit_tracker");
    const users = habitDb.collection("users");
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password, "!");
    const hash = yield bcryptjs_1.default.hash(password, 10);
    const user = yield users.insertOne({ username, password: hash });
    console.log("end of userRouter/signup function");
    res.json(user);
}));
exports.default = userRouter;
