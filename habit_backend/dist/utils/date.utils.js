"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonday = void 0;
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
        return false;
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