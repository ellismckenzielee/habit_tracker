import { checkPassword, checkUsername } from "./security.utils";
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
        success: expect.any(Boolean),
        message: expect.any(String),
      };
      // ACT
      const result = checkPassword(password);
      // ASSERT
      expect(result).toEqual(expect.objectContaining(expected));
    });
    test("should return an object with success: false and message: length", () => {
      // ARRANGE
      const password = "pass";
      const expectedSuccess = false;
      const expectedMessage = "Minimum 7 characters";
      // ACT
      const result = checkPassword(password);
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
      const result = checkPassword(password);
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
      const result = checkPassword(password);
      // ASSERT
      expect(result.success).toBe(expectedSuccess);
      expect(result.message).toBe(expectedMessage);
    });
    test("should return an object with success: false and message: no uppercase", () => {
      // ARRANGE
      const password = "password&123";
      const expectedSuccess = false;
      const expectedMessage = "Includes uppercase characters";
      // ACT
      const result = checkPassword(password);
      // ASSERT
      expect(result.success).toBe(expectedSuccess);
      expect(result.message).toBe(expectedMessage);
    });
    test("should return an object with success: false and message: no lowercase", () => {
      // ARRANGE
      const password = "PASSWORD&123";
      const expectedSuccess = false;
      const expectedMessage = "Includes lowercase characters";
      // ACT
      const result = checkPassword(password);
      // ASSERT
      expect(result.success).toBe(expectedSuccess);
      expect(result.message).toBe(expectedMessage);
    });
    test("should return an object with success: true and message: password passed", () => {
      // ARRANGE
      const password = "PASSWORDpassword&123";
      const expectedSuccess = true;
      const expectedMessage = "Password satisfactory";
      // ACT
      const result = checkPassword(password);
      // ASSERT
      expect(result.success).toBe(expectedSuccess);
      expect(result.message).toBe(expectedMessage);
    });
  });
  describe("testing checkUsername", () => {
    test("should return an object", () => {
      // ARRANGE
      const expected = "object";
      // ACT
      const result = checkUsername();
      // ASSERT
      expect(typeof result).toBe(expected);
    });
    test("should result an object with success and message key", () => {
      // ARRANGE
      const expected = {
        success: expect.any(Boolean),
        message: expect.any(String),
      };
      // ACT
      const result = checkUsername();
      // ASSERT
      expect(result).toEqual(expected);
    });
    test("should return an object with message: username should be at least 5 characters and success: false", () => {
      // ARRANGE
      const username = "eli";
      const expected = {
        success: false,
        message: "should be at least 5 characters",
      };
      // ACT
      const result = checkUsername(username);
      // ASSERT
      expect(result).toEqual(expected);
    });
    test("should return a success object for correct username", () => {
      // ARRANGE
      const username = "ellis1993";
      const expected = {
        success: true,
        message: "valid",
      };
      // ACT
      const result = checkUsername(username);
      // ASSERT
      expect(result).toEqual(expected);
    });
    test("should return a failure object for username containing whitespace", () => {
      // ARRANGE
      const username = "ellis1 993";
      const expected = {
        success: false,
        message: "username cannot contain whitespace",
      };
      // ACT
      const result = checkUsername(username);
      // ASSERT
      expect(result).toEqual(expected);
    });
  });
});
