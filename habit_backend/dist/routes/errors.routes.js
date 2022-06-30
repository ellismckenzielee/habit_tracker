"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle500 = void 0;
const handle500 = (req, res, next) => {
    res.send({ status: 500, message: "internal server error" });
};
exports.handle500 = handle500;
