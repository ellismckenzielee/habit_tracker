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
exports.postHabit = exports.getHabitsByUserId = exports.deleteHabit = exports.putHabit = exports.getHabitsByUserIdAndWeek = exports.signupWithUsernamePassword = exports.loginUsingUsernamePassword = exports.loginUsingJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = require("../models/user.models");
const week_models_1 = require("../models/week.models");
const secret = process.env.JWT_SECRET;
const loginUsingJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/login function");
    res.json(req.user);
});
exports.loginUsingJWT = loginUsingJWT;
const loginUsingUsernamePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in POST userRouter/login function");
    if (req.user && typeof req.user === "object") {
        const username = req.user.username;
        const token = jsonwebtoken_1.default.sign(username, secret);
        res.json({
            userId: req.user._id,
            username: req.user.username,
            token,
        });
    }
});
exports.loginUsingUsernamePassword = loginUsingUsernamePassword;
const signupWithUsernamePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.signupWithUsernamePassword = signupWithUsernamePassword;
const getHabitsByUserIdAndWeek = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/:user_id/habits/:habit_week!");
    const user_id = req.params.user_id;
    const habit_week = req.params.habit_week;
    try {
        const result = yield (0, week_models_1.selectWeekByWeekStart)(user_id, habit_week);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.getHabitsByUserIdAndWeek = getHabitsByUserIdAndWeek;
const putHabit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/:user_id/habits/:habit_week");
    const user_id = req.params.user_id;
    const habit_week = req.params.habit_week;
    const instructions = req.body.instructions;
    const habitName = instructions.habitName;
    const updatedDays = instructions.updatedDays;
    try {
        (0, week_models_1.updateHabit)(habitName, habit_week, user_id, updatedDays);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.putHabit = putHabit;
const deleteHabit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" in userRouter DELETE");
    const user_id = req.params.user_id;
    const habit = req.body.habit;
    try {
        (0, week_models_1.deleteHabitFromDB)(user_id, habit);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteHabit = deleteHabit;
const getHabitsByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in getHabitsByUserId function");
    const userId = req.params.user_id;
    const habits = yield (0, user_models_1.selectHabitsByUserId)(userId);
    console.log(true);
    res.json(habits);
});
exports.getHabitsByUserId = getHabitsByUserId;
const postHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in POST userRouter/:user_id/habits function");
    const user_id = req.params.user_id;
    const habitName = req.body.habit;
    console.log(user_id, habitName);
    const week = (0, user_models_1.insertHabit)(user_id, habitName);
    console.log(week);
    res.sendStatus(204);
});
exports.postHabit = postHabit;
