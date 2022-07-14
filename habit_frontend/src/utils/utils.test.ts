import { checkCheckBoxModifiable } from "./utils";

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
  });
});
