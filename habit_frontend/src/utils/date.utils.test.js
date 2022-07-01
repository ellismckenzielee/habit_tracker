import { getMonday } from "./date.utils";
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
    test("should return a string of the format DD/MM/YYYY", () => {
      // ARRANGE
      const expected = true;
      // ACT
      const result = getMonday();
      // ASSERT
      expect(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(result)).toBe(expected);
    });
  });
});
