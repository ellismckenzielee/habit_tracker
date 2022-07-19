"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle500 = exports.handleErrors = void 0;
const handleErrors = (err, req, res, next) => {
    if (err.status) {
        res
            .status(err.status)
            .json({ message: err.message, errorCause: err.errorCause });
    }
    else {
        next();
    }
};
exports.handleErrors = handleErrors;
const handle500 = (err, req, res) => {
    res.send({ status: 500, message: "internal server error" });
};
exports.handle500 = handle500;
