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
    else {
        success = true;
        message = "";
    }
    return { success, message };
};
exports.checkPassword = checkPassword;
