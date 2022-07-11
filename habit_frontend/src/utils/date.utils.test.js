import { getMonday, getDatesForWeek, getStreak } from "./date.utils";
jest.useFakeTimers();
jest.setSystemTime(new Date("2022-07-01T09:39:19.941Z"));
describe("testing date related utility functions", () => {
  describe("getMonday", () => {
    test("should return a string", () => {
      // ARRANGE
      const expected = "string";
      // ACT
      const result = getMonday();
      // ASSERT
      expect(typeof result).toBe(expected);
    });
    test("should return a string of the format DD-MM-YYYY", () => {
      // ARRANGE
      const expected = true;
      // ACT
      const result = getMonday();
      // ASSERT
      expect(/[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(result)).toBe(expected);
    });
    test("should return the date of the most recent monday when passed a 0", () => {
      // ARRANGE
      const expected = "27-06-2022";
      // ACT
      const result = getMonday(0);
      // ASSERT
      expect(result).toBe(expected);
    });
    test("should return the date of the previous monday when passed a -1", () => {
      // ARRANGE
      const expected = "20-06-2022";
      // ACT
      const result = getMonday(-1);
      // ASSERT
      expect(result).toBe(expected);
    });
    test("should return the date of the second previous monday when passed a -2", () => {
      // ARRANGE
      const expected = "13-06-2022";
      // ACT
      const result = getMonday(-2);
      // ASSERT
      expect(result).toBe(expected);
    });
  });
  describe("getDatesForWeek", () => {
    test("should return an array", () => {
      // ARRANGE
      const expected = true;
      // ACT
      const result = getDatesForWeek();
      // ASSERT
      expect(Array.isArray(result)).toBe(expected);
    });
    test("should return an array of length 7", () => {
      // ARRANGE
      const expected = 7;
      // ACT
      const result = getDatesForWeek();
      // ASSERT
      expect(result.length).toBe(expected);
    });
    test("should return an array of strings", () => {
      // ARRANGE
      const expected = [
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
      ];
      // ACT
      const result = getDatesForWeek();
      // ASSERT
      expect(result).toEqual(expected);
    });
    test("should return an array of correct dates", () => {
      // ARRANGE
      const expected = [
        "01-07-2022",
        "02-07-2022",
        "03-07-2022",
        "04-07-2022",
        "05-07-2022",
        "06-07-2022",
        "07-07-2022",
      ];
      // ACT
      const result = getDatesForWeek("01-07-2022");
      // ASSERT
      expect(result).toEqual(expected);
    });
  });
});
