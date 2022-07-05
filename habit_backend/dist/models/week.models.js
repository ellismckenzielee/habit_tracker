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
exports.deleteHabitFromDB = exports.updateHabit = exports.selectWeekByWeekStart = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const habit_utils_1 = require("../utils/habit.utils");
const selectWeekByWeekStart = (user_id, habit_week) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.weeks.findOne({ user_id, habit_week: habit_week });
    console.log("in selectWeekByWeekStart");
    console.log(result);
    if (result) {
        return result;
    }
    else {
        const user = yield db_1.users.findOne({ _id: new mongodb_1.ObjectId(user_id) });
        if (!user)
            return Promise.reject({ status: 404, message: "user not found" });
        if ((0, habit_utils_1.createNewHabitLogic)(habit_week)) {
            console.log("found user");
            const habitsArray = user.habits;
            const week = { user_id, habit_week, habits: {} };
            habitsArray.forEach((habit) => {
                console.log(habit);
                week["habits"][habit] = [0, 0, 0, 0, 0, 0, 0];
            });
            console.log(week);
            yield db_1.weeks.insertOne(week);
            return week;
        }
        else {
            return { habits: {} };
        }
    }
});
exports.selectWeekByWeekStart = selectWeekByWeekStart;
const updateHabit = (habitName, habit_week, user_id, updatedDays) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.weeks.updateOne({ habit_week, user_id }, { $set: { [`habits.${habitName}`]: updatedDays } });
    }
    catch (err) {
        return Promise.reject({ status: 500, message: "could not update habit" });
    }
});
exports.updateHabit = updateHabit;
const deleteHabitFromDB = (user_id, habit) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { [`habits`]: habit };
    try {
        yield db_1.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, { $pull: query });
        yield db_1.weeks.updateMany({ user_id }, { $unset: { [`habits.${habit}`]: "" } });
    }
    catch (err) {
        return Promise.reject({ status: 500, message: "could not delete habit" });
    }
});
exports.deleteHabitFromDB = deleteHabitFromDB;
