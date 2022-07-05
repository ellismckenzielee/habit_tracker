"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewHabitLogic = void 0;
const moment_1 = __importDefault(require("moment"));
const date_utils_1 = require("./date.utils");
const createNewHabitLogic = (habit_week) => {
    const habitWeekDate = (0, moment_1.default)(habit_week, "DD-MM-YYYY");
    const mostRecentMonday = (0, moment_1.default)((0, date_utils_1.getMonday)(0), "DD-MM-YYYY");
    return mostRecentMonday.isSame(habitWeekDate);
};
exports.createNewHabitLogic = createNewHabitLogic;
