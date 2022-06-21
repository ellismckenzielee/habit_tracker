const checkPassword: Function = (password: string) => {
  let success: Boolean;
  let message: string;
  if (password.length < 7) {
    success = false;
    message = "Minimum 7 characters";
  } else if (!/[0-9]/.test(password)) {
    success = false;
    message = "Includes numeric characters";
  } else {
    success = true;
    message = "";
  }

  return { success, message };
};
export { checkPassword };
