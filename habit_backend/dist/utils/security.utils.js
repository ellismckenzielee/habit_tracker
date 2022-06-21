"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = void 0;
const checkPassword = (password) => {
    const responseMessages = {
        length: "Minimum 7 characters",
        numeric: "Includes numeric characters",
        non_alpha: "Includes non-alphanumeric characters",
        uppercase: "Includes uppercase characters",
        lowercase: "Includes lowercase characters",
        success: "Password satisfactory",
    };
    let success = false;
    let message;
    if (password.length < 7) {
        message = responseMessages["length"];
    }
    else if (!/[0-9]/.test(password)) {
        message = responseMessages["numeric"];
    }
    else if (!/[^0-9a-zA-Z]/.test(password)) {
        message = responseMessages["non_alpha"];
    }
    else if (!/[A-Z]/.test(password)) {
        message = responseMessages["uppercase"];
    }
    else if (!/[a-z]/.test(password)) {
        message = responseMessages["lowercase"];
    }
    else {
        success = true;
        message = responseMessages["success"];
    }
    return { success, message };
};
exports.checkPassword = checkPassword;
