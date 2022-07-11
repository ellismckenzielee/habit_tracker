"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const habit_utils_1 = require("./habit.utils");
describe("testing habit util functions", () => {
    describe("addStreaks", () => {
        test("should return an array", () => {
            // ARRANGE
            const expected = true;
            // ACT
            const result = (0, habit_utils_1.addStreaks)();
            // ASSERT
            expect(Array.isArray(result)).toBe(expected);
        });
        test("should return an object", () => {
            // ARRANGE
            const expected = "object";
            // ACT
            const result = (0, habit_utils_1.addStreaks)();
            // ASSERT
            expect(typeof result).toBe(expected);
        });
    });
});
