import { addStreaks } from "./habit.utils";
describe("testing habit util functions", () => {
  describe("addStreaks", () => {
    test("should return an array", () => {
      // ARRANGE
      const expected = true;
      // ACT
      const result = addStreaks();
      // ASSERT
      expect(Array.isArray(result)).toBe(expected);
    });
    test("should return an object", () => {
      // ARRANGE
      const expected = "object";
      // ACT
      const result = addStreaks();
      // ASSERT
      expect(typeof result).toBe(expected);
    });
  });
});
