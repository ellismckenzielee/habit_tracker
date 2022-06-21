"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const security_utils_1 = require("./security.utils");
describe("testing security utility functions", () => {
    describe("testing checkPassword", () => {
        test("should return an object", () => {
            // ARRANGE
            const password = "";
            const expected = "object";
            // ACT
            const result = (0, security_utils_1.checkPassword)(password);
            // ASSERT
            expect(typeof result).toBe(expected);
        });
        test("should return an object with a success and message key", () => {
            // ARRANGE
            const password = "";
            const expected = {
                success: expect.any(Boolean),
                message: expect.any(String),
            };
            // ACT
            const result = (0, security_utils_1.checkPassword)(password);
            // ASSERT
            expect(result).toEqual(expect.objectContaining(expected));
        });
        test("should return an object with success: false and message: length", () => {
            // ARRANGE
            const password = "pass";
            const expectedSuccess = false;
            const expectedMessage = "Minimum 7 characters";
            // ACT
            const result = (0, security_utils_1.checkPassword)(password);
            // ASSERT
            expect(result.success).toBe(expectedSuccess);
            expect(result.message).toBe(expectedMessage);
        });
        test("should return an object with success: false and message: numbers", () => {
            // ARRANGE
            const password = "password";
            const expectedSuccess = false;
            const expectedMessage = "Includes numeric characters";
            // ACT
            const result = (0, security_utils_1.checkPassword)(password);
            // ASSERT
            expect(result.success).toBe(expectedSuccess);
            expect(result.message).toBe(expectedMessage);
        });
        test("should return an object with success: false and message: non-alphanumeric", () => {
            // ARRANGE
            const password = "password123";
            const expectedSuccess = false;
            const expectedMessage = "Includes non-alphanumeric characters";
            // ACT
            const result = (0, security_utils_1.checkPassword)(password);
            // ASSERT
            expect(result.success).toBe(expectedSuccess);
            expect(result.message).toBe(expectedMessage);
        });
    });
});
