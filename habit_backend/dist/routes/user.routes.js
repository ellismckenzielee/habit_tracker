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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authentication_1 = __importDefault(require("../authentication/authentication"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const db_1 = require("../db/db");
const user_models_1 = require("../models/user.models");
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const userRouter = express_1.default.Router();
userRouter.get("/login", authentication_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/login function");
    res.json(req.user);
}));
userRouter.post("/login", authentication_1.default.authenticate("local", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in POST userRouter/login function");
    const username = req.body.username;
    const password = req.body.password;
    try {
        const foundUser = yield db_1.users.findOne({ username });
        if (foundUser) {
            const result = yield bcryptjs_1.default.compare(password, foundUser.password);
            if (result) {
                const token = jsonwebtoken_1.default.sign(foundUser.username, secret);
                res.json({
                    userId: foundUser._id,
                    username: foundUser.username,
                    token,
                });
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
userRouter.post("/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in POST userRouter/signup function");
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = yield (0, user_models_1.handleSignup)(username, password);
        console.log("end of userRouter/signup function");
        console.log(user);
        res.json({ userId: user.insertedId });
    }
    catch (err) {
        next(err);
    }
}));
userRouter.post("/:user_id/habits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in POST userRouter/:user_id/habits function");
    const user_id = req.params.user_id;
    const habitName = req.body.habit;
    const habit = yield db_1.habits.insertOne({ user_id, habit: habitName });
    res.json(habit);
}));
userRouter.get("/:user_id/habits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/:user_id/habits");
    const user_id = req.params.user_id;
    const result = yield db_1.habits.find({ user_id });
    result.toArray().then((data) => {
        res.send(data);
    });
}));
userRouter.delete("/:user_id/habits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" in userRouter DELETE");
    const user_id = req.params.user_id;
    const habit_id = req.body.habitId;
    try {
        yield db_1.habits.deleteMany({
            _id: new mongodb_1.ObjectId(habit_id),
            user_id,
        });
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = userRouter;
