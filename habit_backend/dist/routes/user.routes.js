"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../authentication/authentication"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_controllers_1 = require("../controllers/user.controllers");
dotenv_1.default.config();
const userRouter = express_1.default.Router();
userRouter.get("/login", authentication_1.default.authenticate("jwt", { session: false }), user_controllers_1.loginUsingJWT);
userRouter.post("/login", authentication_1.default.authenticate("local", { session: false }), user_controllers_1.loginUsingUsernamePassword);
userRouter.post("/signup", user_controllers_1.signupWithUsernamePassword);
userRouter.get("/:user_id/habits", user_controllers_1.getHabitsByUserId);
userRouter.post("/:user_id/habits", user_controllers_1.postHabit);
userRouter.get("/:user_id/habits/:habit_week", user_controllers_1.getHabitsByUserIdAndWeek);
userRouter.put("/:user_id/habits", user_controllers_1.putHabit);
userRouter.delete("/:user_id/habits", user_controllers_1.deleteHabit);
exports.default = userRouter;
