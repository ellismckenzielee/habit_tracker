"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = void 0;
const checkPassword = (password) => {
    let success;
    let message;
    if (password.length < 7) {
        success = false;
        message = "Minimum 7 characters";
    }
    else if (!/[0-9]/.test(password)) {
        success = false;
        message = "Includes numeric characters";
    }
    else if (!/[^0-9a-zA-Z]/.test(password)) {
        success = false;
        message = "Includes non-alphanumeric characters";
    }
    else if (!/[A-Z]/.test(password)) {
        success = false;
        message = "Includes uppercase characters";
    }
    else {
        success = true;
        message = "";
    }
    return { success, message };
};
exports.checkPassword = checkPassword;
