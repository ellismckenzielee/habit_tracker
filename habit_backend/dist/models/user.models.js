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
exports.handleSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db/db");
const handleSignup = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield db_1.users.findOne({ username });
    if (foundUser)
        return Promise.reject({ status: 409, message: "username already exists" });
    const hash = yield bcryptjs_1.default.hash(password, 10);
    const user = yield db_1.users.insertOne({ username, password: hash });
    return user;
});
exports.handleSignup = handleSignup;
