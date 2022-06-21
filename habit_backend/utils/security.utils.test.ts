import { checkPassword } from "./security.utils";
describe("testing security utility functions", () => {
  describe("testing checkPassword", () => {
    test("should return an object", () => {
      // ARRANGE
      const password = "";
      const expected = "object";
      // ACT
      const result = checkPassword(password);
      // ASSERT
      expect(typeof result).toBe(expected);
    });
    test("should return an object with a success and message key", () => {
      // ARRANGE
      const password = "";
      const expected = {
        success: expect.any(String),
        message: expect.any(String),
      };
      // ACT
      const result = checkPassword(password);
      // ASSERT
      expect(result).toEqual(expect.objectContaining(expected));
    });
  });
});
