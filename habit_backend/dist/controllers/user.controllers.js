"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsingUsernamePassword = exports.loginUsingJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const loginUsingJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/login function");
    res.json(req.user);
});
exports.loginUsingJWT = loginUsingJWT;
const loginUsingUsernamePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in POST userRouter/login function");
    const username = req.user.username;
    const token = jsonwebtoken_1.default.sign(username, secret);
    res.json({
        userId: req.user._id,
        username: req.user.username,
        token,
    });
});
exports.loginUsingUsernamePassword = loginUsingUsernamePassword;
