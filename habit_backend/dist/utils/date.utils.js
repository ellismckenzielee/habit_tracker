"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreakDate = exports.getMonday = void 0;
const moment_1 = __importDefault(require("moment"));
const getMonday = (offset = 0) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    console.log(currentDay - 1);
    let mostRecentMondayDate = new Date();
    mostRecentMondayDate.setDate(currentDate.getDate() - (currentDay - 1) + 7 * offset);
    console.log(" MOST RECENT MONDAY", mostRecentMondayDate);
    const match = mostRecentMondayDate
        .toISOString()
        .match(/^(?<year>[0-9]+)-(?<month>[0-9]+)-(?<day>[0-9]+)/);
    console.log(match);
    if (!(match === null || match === void 0 ? void 0 : match.groups)) {
        return "";
    }
    else {
        const groups = match.groups;
        const year = groups.year;
        const month = groups.month;
        const day = groups.day;
        return `${day}-${month}-${year}`;
    }
};
exports.getMonday = getMonday;
const getStreakDate = () => {
    const date = (0, moment_1.default)();
    date.subtract(1, "day");
    return date.format("DD-MM-YYYY");
};
exports.getStreakDate = getStreakDate;
