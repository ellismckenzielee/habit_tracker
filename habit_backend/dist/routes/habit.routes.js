"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const habit_controllers_1 = require("../controllers/habit.controllers");
dotenv_1.default.config();
const habitRouter = express_1.default.Router();
habitRouter.put("/:habit_id", habit_controllers_1.putHabit);
exports.default = habitRouter;
