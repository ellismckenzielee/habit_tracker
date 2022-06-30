"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle500 = exports.handleErrors = void 0;
const handleErrors = (err, req, res, next) => {
    const errorTypes = { 404: "resource not found" };
    res.send({ status: 404, message: "resource not found" });
};
exports.handleErrors = handleErrors;
const handle500 = (err, req, res, next) => {
    res.send({ status: 500, message: "internal server error" });
};
exports.handle500 = handle500;
