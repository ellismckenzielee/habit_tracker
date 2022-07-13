"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pair_controllers_1 = require("../controllers/pair.controllers");
const pairRouter = express_1.default.Router();
pairRouter.delete("/:pair_id", pair_controllers_1.deletePair);
exports.default = pairRouter;
