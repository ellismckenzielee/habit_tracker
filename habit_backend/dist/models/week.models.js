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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWeek = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const createWeek = (user_id, habit_week) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.users.findOne({ _id: new mongodb_1.ObjectId(user_id) });
    if (!user)
        return Promise.reject({ status: 404, message: "user not found" });
    const habitsArray = user.habits;
    const week = { user_id, habit_week, habits: {} };
    habitsArray.forEach((habit) => {
        console.log(habit);
        week["habits"][habit] = [0, 0, 0, 0, 0, 0, 0];
    });
    const result = yield db_1.weeks.insertOne(week);
    return week;
});
exports.createWeek = createWeek;
