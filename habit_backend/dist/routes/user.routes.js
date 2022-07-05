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
const date_utils_1 = require("../utils/date.utils");
const moment_1 = __importDefault(require("moment"));
const week_models_1 = require("../models/week.models");
const user_controllers_1 = require("../controllers/user.controllers");
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const userRouter = express_1.default.Router();
userRouter.get("/login", authentication_1.default.authenticate("jwt", { session: false }), user_controllers_1.loginUsingJWT);
userRouter.post("/login", authentication_1.default.authenticate("local", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
                next({ status: 403, message: "incorrect password" });
            }
        }
    }
    catch (err) {
        next({ status: 500, message: "something went wrong" });
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
    console.log(user_id, habitName);
    const user = yield db_1.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, { $addToSet: { ["habits"]: habitName } });
    const weekToUpdate = (0, date_utils_1.getMonday)(0);
    console.log("WEEK TO UPDATE", weekToUpdate);
    const week = yield db_1.weeks.updateOne({ user_id, habit_week: weekToUpdate }, { $set: { [`habits.${habitName}`]: [0, 0, 0, 0, 0, 0, 0] } });
    console.log(week);
    res.sendStatus(204);
}));
userRouter.get("/:user_id/habits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/:user_id/habits");
    const user_id = req.params.user_id;
    const result = yield db_1.habits.find({ user_id });
    result.toArray().then((data) => {
        res.send(data);
    });
}));
userRouter.get("/:user_id/habits/:habit_week", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/:user_id/habits/:habit_week!");
    const user_id = req.params.user_id;
    const habit_week = req.params.habit_week;
    console.log("userr", user_id, "habitt", habit_week);
    const result = yield db_1.weeks.findOne({ user_id, habit_week: habit_week });
    const habitWeekDate = (0, moment_1.default)(habit_week, "DD-MM-YYYY");
    const mostRecentMonday = (0, moment_1.default)((0, date_utils_1.getMonday)(0), "DD-MM-YYYY");
    console.log((0, date_utils_1.getMonday)(0), habitWeekDate, habit_week, mostRecentMonday, mostRecentMonday.isSame(habitWeekDate));
    if (!result) {
        if (!mostRecentMonday.isSame(habitWeekDate)) {
            console.log("Returning empty");
            res.json({ habits: {} });
        }
        else {
            try {
                const week = yield (0, week_models_1.createWeek)(user_id, habit_week);
                res.json(week);
            }
            catch (err) {
                next(err);
            }
        }
    }
    else {
        res.json(result);
    }
}));
userRouter.post("/:user_id/habits/:habit_week", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/:user_id/habits/:habit_week");
    const user_id = req.params.user_id;
    const habit_week = req.params.habit_week;
    const instructions = req.body.instructions;
    const habitName = instructions.habitName;
    const updatedDays = instructions.updatedDays;
    console.log(user_id);
    console.log(habit_week);
    console.log(instructions, habitName, updatedDays);
    console.log(true);
    yield db_1.weeks.updateOne({ habit_week, user_id }, { $set: { [`habits.${habitName}`]: updatedDays } });
    console.log("DONE");
    res.sendStatus(204);
}));
userRouter.delete("/:user_id/habits", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" in userRouter DELETE");
    const user_id = req.params.user_id;
    const habit = req.body.habit;
    const query = { [`habits`]: habit };
    try {
        yield db_1.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, { $pull: query });
        yield db_1.weeks.updateMany({ user_id }, { $unset: { [`habits.${habit}`]: "" } });
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = userRouter;
