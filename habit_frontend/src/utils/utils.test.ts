import { checkCheckBoxModifiable } from "./utils";

jest.useFakeTimers();
jest.setSystemTime(new Date("2022-07-01T09:39:19.941Z"));
describe("testing utility functions", () => {
  describe("testing checkCheckboxModifiable function", () => {
    test("should return a boolean", () => {
      // ARRANGE
      const expected = "boolean";
      const date = "01-01-2022";
      const username = "ellismckenzielee";
      const displayUser = "ellismckenzielee";
      // ACT
      const result = checkCheckBoxModifiable(date, username, displayUser);
      // ASSERT
      expect(typeof result).toBe(expected);
    });
    test("should return true when the current date matches the date input, and the username matches the displayUser", () => {
      // ARRANGE
      const expected = true;
      const date = "01-07-2022";
      const username = "ellismckenzielee";
      const displayUser = "ellismckenzielee";
      // ACT
      const result = checkCheckBoxModifiable(date, username, displayUser);
      // ASSERT
      expect(result).toBe(expected);
    });
  });
});
