"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const habit_utils_1 = require("./habit.utils");
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
        test("should an array of objects, where each object has a key of streak", () => {
            // ARRANGE
            const input = [{}, {}];
            const expected = { streak: expect.any(Number) };
            // ACT
            const result = (0, habit_utils_1.addStreaks)(input);
            // ASSERT
            result.forEach((obj) => {
                expect(obj).toEqual(expect.objectContaining({ streak: expect.any(Number) }));
            });
        });
    });
});
