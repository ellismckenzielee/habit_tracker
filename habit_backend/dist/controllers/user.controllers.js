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
exports.signupWithUsernamePassword = exports.loginUsingUsernamePassword = exports.loginUsingJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = require("../models/user.models");
const secret = process.env.JWT_SECRET;
const loginUsingJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/login function");
    res.json(req.user);
});
exports.loginUsingJWT = loginUsingJWT;
const loginUsingUsernamePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in POST userRouter/login function");
    if (req.user && typeof req.user === "object") {
        const username = req.user.username;
        const token = jsonwebtoken_1.default.sign(username, secret);
        res.json({
            userId: req.user._id,
            username: req.user.username,
            token,
        });
    }
});
exports.loginUsingUsernamePassword = loginUsingUsernamePassword;
const signupWithUsernamePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in POST userRouter/signup function");
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = yield (0, user_models_1.handleSignup)(username, password);
        console.log("end of userRouter/signup function");
        console.log(user);
        res.json({ userId: user.insertedId });
    }
    catch (err) {
        next(err);
    }
});
exports.signupWithUsernamePassword = signupWithUsernamePassword;
