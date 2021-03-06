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
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const db_1 = __importDefault(require("../db/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in local strategy");
        const habitDb = db_1.default.db("habit_tracker");
        const users = habitDb.collection("users");
        const user = yield users.findOne({ username });
        console.log(user);
        if (user) {
            const result = yield bcryptjs_1.default.compare(password, user.password);
            if (result) {
                done(null, user);
            }
            else {
                done({
                    status: 403,
                    message: "incorrect password",
                    errorCause: "password",
                });
            }
        }
        else {
            done({
                status: 404,
                message: "username not found",
                errorCause: "username",
            });
        }
    });
}));
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("JWT");
    const habitDb = db_1.default.db("habit_tracker");
    const users = habitDb.collection("users");
    const user = yield users.findOne({ username: jwtPayload });
    if (user) {
        done(null, {
            username: user.username,
            userId: user._id,
            pairId: user.pairId,
            pairName: user.pairName,
        });
    }
})));
console.log("PASSPORT", passport_1.default);
exports.default = passport_1.default;
