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
  } else {
    success = true;
    message = "";
  }

  return { success, message };
};
export { checkPassword };
