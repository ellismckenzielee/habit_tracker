const checkPassword: Function = (password: String) => {
  const success = false;
  const message = "Minimum 7 characters";
  return { success, message };
};
export { checkPassword };
