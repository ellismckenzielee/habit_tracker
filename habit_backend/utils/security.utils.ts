const checkPassword: Function = (password: string) => {
  let success: Boolean;
  let message: string;
  if (password.length < 7) {
    success = false;
    message = "Minimum 7 characters";
  } else if (!/[0-9]/.test(password)) {
    success = false;
    message = "Includes numeric characters";
  } else if (!/[^0-9a-zA-Z]/.test(password)) {
    success = false;
    message = "Includes non-alphanumeric characters";
  } else if (!/[A-Z]/.test(password)) {
    success = false;
    message = "Includes uppercase characters";
  } else if (!/[a-z]/.test(password)) {
    success = false;
    message = "Includes lowercase characters";
  } else {
    success = true;
    message = "Password satisfactory";
  }

  return { success, message };
};
export { checkPassword };
