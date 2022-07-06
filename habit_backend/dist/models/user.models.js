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
exports.selectHabitsByUserId = exports.insertHabit = exports.handleSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongodb_1 = require("mongodb");
const db_1 = require("../db/db");
const date_utils_1 = require("../utils/date.utils");
const handleSignup = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield db_1.users.findOne({ username });
    if (foundUser)
        return Promise.reject({ status: 409, message: "username already exists" });
    const hash = yield bcryptjs_1.default.hash(password, 10);
    const user = yield db_1.users.insertOne({ username, password: hash });
    return user;
});
exports.handleSignup = handleSignup;
const insertHabit = (user_id, habitName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, { $addToSet: { ["habits"]: habitName } });
    const weekToUpdate = (0, date_utils_1.getMonday)(0);
    console.log("WEEK TO UPDATE", weekToUpdate);
    const week = yield db_1.weeks.updateOne({ user_id, habit_week: weekToUpdate }, { $set: { [`habits.${habitName}`]: [0, 0, 0, 0, 0, 0, 0] } });
    return week;
});
exports.insertHabit = insertHabit;
const selectHabitsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundHabits = yield db_1.habits.find({ user_id: userId });
        const habitsArray = foundHabits.toArray();
        return habitsArray;
    }
    catch (err) {
        return Promise.reject({ status: 500, message: "internal server error" });
    }
});
exports.selectHabitsByUserId = selectHabitsByUserId;
