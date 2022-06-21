"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = void 0;
const checkPassword = (password) => {
    const success = false;
    const message = "Minimum 7 characters";
    return { success, message };
};
exports.checkPassword = checkPassword;
