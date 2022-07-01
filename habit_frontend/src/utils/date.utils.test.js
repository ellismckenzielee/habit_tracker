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
  });
});
