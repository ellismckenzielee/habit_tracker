"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const habit_utils_1 = require("./habit.utils");
jest.useFakeTimers();
jest.setSystemTime(new Date("2022-07-01T09:39:19.941Z"));
describe("testing habit util functions", () => {
    describe("addStreaks", () => {
        test("should return an array", () => {
            // ARRANGE
            const expected = true;
            // ACT
            const result = (0, habit_utils_1.addStreaks)([]);
            // ASSERT
            expect(Array.isArray(result)).toBe(expected);
        });
        test("should return an array of objects, where each object has a key of streak", () => {
            // ARRANGE
            const input = [
                {
                    name: "swim",
                    _id: "345346gfg",
                    user_id: "ellis",
                    dates: ["01-07-2022", "30-06-2022"],
                },
            ];
            const expected = { streak: expect.any(Number) };
            // ACT
            const result = (0, habit_utils_1.addStreaks)(input);
            // ASSERT
            result.forEach((obj) => {
                expect(obj).toEqual(expect.objectContaining({ streak: expect.any(Number) }));
            });
        });
        test("should correctly calculate the current streak based on number of consecutive days", () => {
            // ARRANGE
            const input = [
                {
                    name: "swim",
                    _id: "345346gfg",
                    user_id: "ellis",
                    dates: ["01-07-2022", "30-06-2022"],
                },
            ];
            const expected = [
                {
                    name: "swim",
                    _id: "345346gfg",
                    user_id: "ellis",
                    dates: ["01-07-2022", "30-06-2022"],
                    streak: 2,
                },
            ]; // ACT
            const result = (0, habit_utils_1.addStreaks)(input);
            // ASSERT
            console.log(result);
            expect(result).toEqual(expected);
        });
        test("should return streak of 0 when previous entries are not consecutive", () => {
            // ARRANGE
            const input = [
                {
                    name: "swim",
                    _id: "345346gfg",
                    user_id: "ellis",
                    dates: ["28-06-2022", "29-06-2022"],
                },
            ];
            const expected = [
                {
                    name: "swim",
                    _id: "345346gfg",
                    user_id: "ellis",
                    dates: ["28-06-2022", "29-06-2022"],
                    streak: 0,
                },
            ]; // ACT
            const result = (0, habit_utils_1.addStreaks)(input);
            // ASSERT
            console.log(result);
            expect(result).toEqual(expected);
        });
    });
});
