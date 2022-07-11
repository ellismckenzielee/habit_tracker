import { addStreaks } from "./habit.utils";
describe("testing habit util functions", () => {
  describe("addStreaks", () => {
    test("should return an array", () => {
      // ARRANGE
      const expected = true;
      // ACT
      const result = addStreaks([]);
      // ASSERT
      expect(Array.isArray(result)).toBe(expected);
    });
    test("should an array of objects, where each object has a key of streak", () => {
      // ARRANGE
      const input = [{}, {}];
      const expected = { streak: expect.any(Number) };
      // ACT
      const result = addStreaks(input);
      // ASSERT
      result.forEach((obj) => {
        expect(obj).toEqual(
          expect.objectContaining({ streak: expect.any(Number) })
        );
      });
    });
  });
});
