const checkPassword = (password: string) => {
  const responseMessages = {
    length: "Minimum 7 characters",
    numeric: "Includes numeric characters",
    non_alpha: "Includes non-alphanumeric characters",
    uppercase: "Includes uppercase characters",
    lowercase: "Includes lowercase characters",
    success: "Password satisfactory",
  };
  let success = false;
  let message: string;
  if (password.length < 7) {
    message = responseMessages["length"];
  } else if (!/[0-9]/.test(password)) {
    message = responseMessages["numeric"];
  } else if (!/[^0-9a-zA-Z]/.test(password)) {
    message = responseMessages["non_alpha"];
  } else if (!/[A-Z]/.test(password)) {
    message = responseMessages["uppercase"];
  } else if (!/[a-z]/.test(password)) {
    message = responseMessages["lowercase"];
  } else {
    success = true;
    message = responseMessages["success"];
  }

  return { success, message };
};

const checkUsername = (username = "") => {
  if (username.length < 5) {
    return { success: false, message: "should be at least 5 characters" };
  }
  if (username.includes(" ")) {
    return { success: false, message: "username cannot contain whitespace" };
  }
  return { success: true, message: "valid" };
};
export { checkPassword, checkUsername };
