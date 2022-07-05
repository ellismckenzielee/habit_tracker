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
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../authentication/authentication"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const db_1 = require("../db/db");
const user_controllers_1 = require("../controllers/user.controllers");
dotenv_1.default.config();
const userRouter = express_1.default.Router();
userRouter.get("/login", authentication_1.default.authenticate("jwt", { session: false }), user_controllers_1.loginUsingJWT);
userRouter.post("/login", authentication_1.default.authenticate("local", { session: false }), user_controllers_1.loginUsingUsernamePassword);
userRouter.post("/signup", user_controllers_1.signupWithUsernamePassword);
userRouter.post("/:user_id/habits", user_controllers_1.postHabit);
userRouter.get("/:user_id/habits/:habit_week", user_controllers_1.getHabitsByUserIdAndWeek);
userRouter.post("/:user_id/habits/:habit_week", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in GET userRouter/:user_id/habits/:habit_week");
    const user_id = req.params.user_id;
    const habit_week = req.params.habit_week;
    const instructions = req.body.instructions;
    const habitName = instructions.habitName;
    const updatedDays = instructions.updatedDays;
    console.log(user_id);
    console.log(habit_week);
    console.log(instructions, habitName, updatedDays);
    console.log(true);
    yield db_1.weeks.updateOne({ habit_week, user_id }, { $set: { [`habits.${habitName}`]: updatedDays } });
    console.log("DONE");
    res.sendStatus(204);
}));
userRouter.delete("/:user_id/habits", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" in userRouter DELETE");
    const user_id = req.params.user_id;
    const habit = req.body.habit;
    const query = { [`habits`]: habit };
    try {
        yield db_1.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, { $pull: query });
        yield db_1.weeks.updateMany({ user_id }, { $unset: { [`habits.${habit}`]: "" } });
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = userRouter;
